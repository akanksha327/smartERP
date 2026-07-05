'use client';

import { useState } from 'react';
import { useERPStore } from '@/store/useERPStore';
import { suppliers, formatCurrency, purchaseInvoices } from '@/data/mockData';
import { PageHeader, EmptyState, StatusBadge } from '@/components/erp/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Truck,
  Phone,
  MapPin,
  Mail,
  FileText,
  IndianRupee,
} from 'lucide-react';
import { toast } from 'sonner';

export function SupplierModule() {
  const { activeSubView, setActiveSubView, setSelectedItemId, selectedItemId } = useERPStore();
  if (activeSubView === 'create') return <SupplierCreate />;
  if (activeSubView === 'details' && selectedItemId) return <SupplierDetails supplierId={selectedItemId} />;
  return <SupplierList />;
}

function SupplierList() {
  const { setSelectedItemId, setActiveSubView } = useERPStore();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.mobile.includes(search) ||
    (s.city && s.city.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortCol === 'outstanding' || sortCol === 'totalPurchases') {
      return sortDir === 'asc' ? a[sortCol] - b[sortCol] : b[sortCol] - a[sortCol];
    }
    return sortDir === 'asc'
      ? String(a[sortCol as keyof typeof a]).localeCompare(String(b[sortCol as keyof typeof b]))
      : String(b[sortCol as keyof typeof b]).localeCompare(String(a[sortCol as keyof typeof a]));
  });

  const perPage = 10;
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Suppliers"
        description={`${suppliers.length} total suppliers`}
        action={{ label: 'New Supplier', onClick: () => setActiveSubView('create') }}
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            className="h-8 pl-8 text-sm"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <Button variant="outline" size="sm" className="h-8">
          <Download size={14} className="mr-1.5" /> Export
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9 cursor-pointer" onClick={() => handleSort('name')}>
                <span className="flex items-center gap-1">Supplier <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9">Mobile</TableHead>
              <TableHead className="text-xs h-9">City</TableHead>
              <TableHead className="text-xs h-9">GST</TableHead>
              <TableHead className="text-xs h-9 text-right cursor-pointer" onClick={() => handleSort('outstanding')}>
                <span className="flex items-center justify-end gap-1">Outstanding <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 text-right">Total Purchases</TableHead>
              <TableHead className="text-xs h-9 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((s) => (
              <TableRow key={s.id} className="cursor-pointer hover:bg-accent/50">
                <TableCell className="text-sm font-medium py-2.5" onClick={() => setSelectedItemId(s.id)}>
                  {s.name}
                </TableCell>
                <TableCell className="text-xs py-2.5 text-muted-foreground font-mono">{s.mobile}</TableCell>
                <TableCell className="text-xs py-2.5">{s.city || '-'}</TableCell>
                <TableCell className="text-xs py-2.5 font-mono text-muted-foreground">{s.gstNumber ? s.gstNumber.slice(0, 15) + '...' : '-'}</TableCell>
                <TableCell className={`text-xs py-2.5 text-right tabular-nums font-mono font-medium ${s.outstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(s.outstanding)}
                </TableCell>
                <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono">{formatCurrency(s.totalPurchases)}</TableCell>
                <TableCell className="text-xs py-2.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedItemId(s.id)}>
                      <Eye size={13} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Pencil size={13} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, sorted.length)} of {sorted.length}</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <Button key={p} variant={p === currentPage ? 'default' : 'outline'} size="icon" className="h-7 w-7" onClick={() => setCurrentPage(p)}>
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function SupplierCreate() {
  const { goBack } = useERPStore();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    gstNumber: '',
    pinCode: '',
    address: '',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.error('Supplier name is required');
      return false;
    }
    if (!form.mobile.trim()) {
      toast.error('Mobile number is required');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    toast.success('Supplier created successfully');
    goBack();
  };

  const handleSaveAndNew = () => {
    if (!validate()) return;
    toast.success('Supplier created successfully');
    setForm({
      name: '',
      mobile: '',
      email: '',
      city: '',
      state: '',
      gstNumber: '',
      pinCode: '',
      address: '',
    });
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <PageHeader title="New Supplier" showBack description="Add a new supplier" />
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-medium">
                Supplier Name <span className="text-destructive">*</span>
              </Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter supplier name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">
                Mobile Number <span className="text-destructive">*</span>
              </Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter mobile number"
                value={form.mobile}
                onChange={(e) => updateField('mobile', e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Email</Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter email address"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">GST Number</Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter GST number"
                value={form.gstNumber}
                onChange={(e) => updateField('gstNumber', e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">City</Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter city"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">State</Label>
              <Select value={form.state} onValueChange={(value) => updateField('state', value)}>
                <SelectTrigger className="h-9 mt-1">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Bihar">Bihar</SelectItem>
                  <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                  <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Manipur">Manipur</SelectItem>
                  <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                  <SelectItem value="Mizoram">Mizoram</SelectItem>
                  <SelectItem value="Nagaland">Nagaland</SelectItem>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Sikkim">Sikkim</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                  <SelectItem value="Tripura">Tripura</SelectItem>
                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Pin Code</Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter pin code"
                value={form.pinCode}
                onChange={(e) => updateField('pinCode', e.target.value)}
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs font-medium">Address</Label>
              <Textarea
                className="mt-1"
                rows={2}
                placeholder="Enter full address"
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={goBack}>
              Cancel <kbd className="ml-1.5 inline-flex h-5 items-center rounded border border-border bg-muted px-1 text-[10px] font-mono text-muted-foreground">Esc</kbd>
            </Button>
            <Button variant="outline" onClick={handleSaveAndNew}>
              Save & New
            </Button>
            <Button onClick={handleSave}>
              Save <kbd className="ml-1.5 inline-flex h-5 items-center rounded border border-primary-foreground/30 bg-primary-foreground/20 px-1 text-[10px] font-mono text-primary-foreground">Ctrl+S</kbd>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SupplierDetails({ supplierId }: { supplierId: string }) {
  const { goBack } = useERPStore();
  const supplier = suppliers.find((s) => s.id === supplierId);

  if (!supplier) {
    return (
      <div className="p-6">
        <PageHeader title="Supplier Not Found" showBack />
        <EmptyState icon={<Truck size={24} />} title="Supplier not found" description="The supplier you are looking for does not exist." />
      </div>
    );
  }

  const supplierPurchases = purchaseInvoices.filter((p) => p.supplierId === supplierId);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title={supplier.name} showBack description={`Supplier since ${supplier.createdAt}`} />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee size={14} className="text-red-500" />
              <p className="text-xs text-muted-foreground">Outstanding</p>
            </div>
            <p className={`text-lg font-semibold tabular-nums ${supplier.outstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(supplier.outstanding)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Purchases</p>
            <p className="text-lg font-semibold tabular-nums">{formatCurrency(supplier.totalPurchases)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Purchase Orders</p>
            <p className="text-lg font-semibold tabular-nums">{supplierPurchases.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Items Supplied</p>
            <p className="text-lg font-semibold tabular-nums">{supplierPurchases.reduce((acc, p) => acc + p.items.length, 0)}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">General Information</TabsTrigger>
          <TabsTrigger value="purchases">Purchase History</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-muted-foreground mt-0.5" />
                  <div><p className="text-xs text-muted-foreground">Mobile</p><p className="text-sm font-medium">{supplier.mobile}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-muted-foreground mt-0.5" />
                  <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium">{supplier.email || '-'}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-muted-foreground mt-0.5" />
                  <div><p className="text-xs text-muted-foreground">Location</p><p className="text-sm font-medium">{supplier.city}, {supplier.state}</p></div>
                </div>
                <div><p className="text-xs text-muted-foreground">GST Number</p><p className="text-sm font-medium font-mono">{supplier.gstNumber || '-'}</p></div>
                <div><p className="text-xs text-muted-foreground">Pin Code</p><p className="text-sm font-medium">{supplier.pinCode || '-'}</p></div>
                <div><p className="text-xs text-muted-foreground">Address</p><p className="text-sm font-medium">{supplier.address || '-'}</p></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs h-9">Purchase No.</TableHead>
                    <TableHead className="text-xs h-9">Date</TableHead>
                    <TableHead className="text-xs h-9 text-right">Amount</TableHead>
                    <TableHead className="text-xs h-9">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierPurchases.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-8 text-sm text-muted-foreground">No purchases found</TableCell></TableRow>
                  ) : (
                    supplierPurchases.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="text-xs py-2 font-medium text-primary">{p.invoiceNumber}</TableCell>
                        <TableCell className="text-xs py-2 font-mono">{p.date}</TableCell>
                        <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{formatCurrency(p.grandTotal)}</TableCell>
                        <TableCell className="text-xs py-2"><StatusBadge status={p.paymentStatus} /></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger">
          <Card>
            <CardContent className="pt-6">
              <div className="py-8 text-center text-sm text-muted-foreground">
                Ledger view for {supplier.name} — transactions will appear here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}