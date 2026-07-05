'use client';

import { useState } from 'react';
import { useERPStore } from '@/store/useERPStore';
import { customers, formatCurrency, salesInvoices, transactions } from '@/data/mockData';
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
import { Badge } from '@/components/ui/badge';
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
  Users,
  Phone,
  MapPin,
  Mail,
  FileText,
  IndianRupee,
} from 'lucide-react';
import { toast } from 'sonner';

export function CustomerModule() {
  const { activeSubView, setActiveSubView, setSelectedItemId, selectedItemId } = useERPStore();
  if (activeSubView === 'create') return <CustomerCreate />;
  if (activeSubView === 'details' && selectedItemId) return <CustomerDetails customerId={selectedItemId} />;
  return <CustomerList />;
}

function CustomerList() {
  const { setActiveSubView, setSelectedItemId } = useERPStore();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.mobile.includes(search) ||
    (c.city && c.city.toLowerCase().includes(search.toLowerCase()))
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
        title="Customers"
        description={`${customers.length} total customers`}
        action={{ label: 'New Customer', onClick: () => setActiveSubView('create') }}
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
                <span className="flex items-center gap-1">Customer <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9">Mobile</TableHead>
              <TableHead className="text-xs h-9 cursor-pointer" onClick={() => handleSort('city')}>
                <span className="flex items-center gap-1">City <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9">GST</TableHead>
              <TableHead className="text-xs h-9 text-right cursor-pointer" onClick={() => handleSort('outstanding')}>
                <span className="flex items-center justify-end gap-1">Outstanding <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9">Last Purchase</TableHead>
              <TableHead className="text-xs h-9 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState
                    icon={<Users size={24} />}
                    title="No customers found"
                    description="Add your first customer to start tracking sales."
                    action={{ label: 'Add Customer', onClick: () => setActiveSubView('create') }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((c) => (
                <TableRow key={c.id} className="cursor-pointer hover:bg-accent/50">
                  <TableCell className="text-sm font-medium py-2.5" onClick={() => setSelectedItemId(c.id)}>
                    {c.name}
                  </TableCell>
                  <TableCell className="text-xs py-2.5 text-muted-foreground font-mono">{c.mobile}</TableCell>
                  <TableCell className="text-xs py-2.5">{c.city || '-'}</TableCell>
                  <TableCell className="text-xs py-2.5 font-mono text-muted-foreground">{c.gstNumber ? c.gstNumber.slice(0, 15) + '...' : '-'}</TableCell>
                  <TableCell className={`text-xs py-2.5 text-right tabular-nums font-mono font-medium ${c.outstanding > 0 ? 'text-red-600' : ''}`}>
                    {formatCurrency(c.outstanding)}
                  </TableCell>
                  <TableCell className="text-xs py-2.5 text-muted-foreground">{c.lastPurchase || '-'}</TableCell>
                  <TableCell className="text-xs py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedItemId(c.id)}>
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
              ))
            )}
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

function CustomerCreate() {
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

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Customer name is required'); return; }
    if (!form.mobile.trim()) { toast.error('Mobile number is required'); return; }
    toast.success(`Customer "${form.name}" created successfully`);
    goBack();
  };

  const handleSaveAndNew = () => {
    if (!form.name.trim()) { toast.error('Customer name is required'); return; }
    if (!form.mobile.trim()) { toast.error('Mobile number is required'); return; }
    toast.success(`Customer "${form.name}" created successfully`);
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
      <PageHeader title="New Customer" showBack description="Add a new customer" />

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium">Customer Name <span className="text-destructive">*</span></Label>
              <Input placeholder="e.g. Rajesh Kumar" className="h-9 mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
            </div>
            <div>
              <Label className="text-xs font-medium">Mobile <span className="text-destructive">*</span></Label>
              <Input placeholder="Enter mobile number" className="h-9 mt-1" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">Email</Label>
              <Input type="email" placeholder="Enter email" className="h-9 mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">GST Number</Label>
              <Input placeholder="Enter GST number" className="h-9 mt-1 font-mono text-sm" value={form.gstNumber} onChange={(e) => setForm({ ...form, gstNumber: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">City</Label>
              <Input placeholder="Enter city" className="h-9 mt-1" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">State</Label>
              <Input placeholder="Enter state" className="h-9 mt-1" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">Pin Code</Label>
              <Input placeholder="Enter pin code" className="h-9 mt-1" value={form.pinCode} onChange={(e) => setForm({ ...form, pinCode: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs font-medium">Address</Label>
              <Textarea placeholder="Enter full address" className="mt-1 text-sm" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border">
            <Button onClick={handleSave} className="h-8">Save <kbd className="ml-2 text-[10px] font-mono bg-white/20 px-1 rounded">Ctrl+S</kbd></Button>
            <Button variant="outline" onClick={handleSaveAndNew} className="h-8">Save & New</Button>
            <Button variant="ghost" onClick={goBack} className="h-8">Cancel <kbd className="ml-2 text-[10px] font-mono px-1 rounded border border-border">Esc</kbd></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CustomerDetails({ customerId }: { customerId: string }) {
  const { goBack } = useERPStore();
  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <div className="p-6">
        <PageHeader title="Customer Not Found" showBack />
        <EmptyState icon={<Users size={24} />} title="Customer not found" description="The customer you are looking for does not exist." />
      </div>
    );
  }

  const customerSales = salesInvoices.filter((s) => s.customerId === customerId);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title={customer.name} showBack description={`Customer since ${customer.createdAt}`} />

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee size={14} className="text-red-500" />
              <p className="text-xs text-muted-foreground">Outstanding</p>
            </div>
            <p className={`text-lg font-semibold tabular-nums ${customer.outstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(customer.outstanding)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText size={14} className="text-blue-500" />
              <p className="text-xs text-muted-foreground">Total Purchases</p>
            </div>
            <p className="text-lg font-semibold tabular-nums">{formatCurrency(customer.totalPurchases)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Invoices</p>
            <p className="text-lg font-semibold tabular-nums">{customerSales.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Last Purchase</p>
            <p className="text-lg font-semibold">{customer.lastPurchase || '-'}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">General Information</TabsTrigger>
          <TabsTrigger value="sales">Sales History</TabsTrigger>
          <TabsTrigger value="bills">Outstanding Bills</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="text-sm font-medium">{customer.mobile}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{customer.email || '-'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{customer.city}, {customer.state}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">GST Number</p>
                  <p className="text-sm font-medium font-mono">{customer.gstNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pin Code</p>
                  <p className="text-sm font-medium">{customer.pinCode || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">{customer.address || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs h-9">Invoice</TableHead>
                    <TableHead className="text-xs h-9">Date</TableHead>
                    <TableHead className="text-xs h-9">Type</TableHead>
                    <TableHead className="text-xs h-9 text-right">Amount</TableHead>
                    <TableHead className="text-xs h-9">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerSales.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-sm text-muted-foreground">No sales found</TableCell></TableRow>
                  ) : (
                    customerSales.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-xs py-2 font-medium text-primary">{s.invoiceNumber}</TableCell>
                        <TableCell className="text-xs py-2 font-mono">{s.date}</TableCell>
                        <TableCell className="text-xs py-2"><StatusBadge status={s.paymentType} /></TableCell>
                        <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{formatCurrency(s.grandTotal)}</TableCell>
                        <TableCell className="text-xs py-2"><StatusBadge status={s.status} /></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills">
          <Card>
            <CardContent className="pt-4">
              {customer.outstanding > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-9">Invoice</TableHead>
                      <TableHead className="text-xs h-9">Date</TableHead>
                      <TableHead className="text-xs h-9 text-right">Amount</TableHead>
                      <TableHead className="text-xs h-9">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerSales.filter((s) => s.status !== 'Paid').map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-xs py-2 font-medium text-primary">{s.invoiceNumber}</TableCell>
                        <TableCell className="text-xs py-2 font-mono">{s.date}</TableCell>
                        <TableCell className="text-xs py-2 text-right tabular-nums font-mono font-medium text-red-600">{formatCurrency(s.grandTotal)}</TableCell>
                        <TableCell className="text-xs py-2"><StatusBadge status={s.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">No outstanding bills</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}