'use client';

import { useState } from 'react';
import { useERPStore } from '@/store/useERPStore';
import { purchaseInvoices, suppliers, stockItems, formatCurrency } from '@/data/mockData';
import { PageHeader, EmptyState, StatusBadge } from '@/components/erp/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import {
  Search,
  Plus,
  Eye,
  Trash2,
  Download,
  Printer,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';

export function PurchaseModule() {
  const { activeSubView, setActiveSubView } = useERPStore();
  if (activeSubView === 'create') return <PurchaseVoucher />;
  return <PurchaseList />;
}

function PurchaseList() {
  const { setActiveSubView } = useERPStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = purchaseInvoices.filter((p) => {
    const matchSearch = p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.supplierName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.paymentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortCol === 'grandTotal') return sortDir === 'asc' ? a.grandTotal - b.grandTotal : b.grandTotal - a.grandTotal;
    return sortDir === 'asc'
      ? String(a[sortCol as keyof typeof a]).localeCompare(String(b[sortCol as keyof typeof b]))
      : String(b[sortCol as keyof typeof b]).localeCompare(String(a[sortCol as keyof typeof a]));
  });

  const perPage = 8;
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Purchases"
        description={`${purchaseInvoices.length} orders · Total: ${formatCurrency(purchaseInvoices.reduce((a, b) => a + b.grandTotal, 0))}`}
        action={{ label: 'New Purchase', onClick: () => setActiveSubView('create'), shortcut: 'F9' }}
      />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search purchases..." className="h-8 pl-8 text-sm" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setCurrentPage(1); }}>
          <SelectTrigger className="h-8 w-36 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
            <SelectItem value="Partial">Partial</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-8"><Download size={14} className="mr-1.5" /> Export</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9 cursor-pointer" onClick={() => handleSort('invoiceNumber')}>
                <span className="flex items-center gap-1">P.O. No. <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 cursor-pointer" onClick={() => handleSort('date')}>
                <span className="flex items-center gap-1">Date <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9">Supplier</TableHead>
              <TableHead className="text-xs h-9 text-right">Subtotal</TableHead>
              <TableHead className="text-xs h-9 text-right">Tax</TableHead>
              <TableHead className="text-xs h-9 text-right cursor-pointer" onClick={() => handleSort('grandTotal')}>
                <span className="flex items-center justify-end gap-1">Total <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9">Payment Status</TableHead>
              <TableHead className="text-xs h-9 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState icon={<FileText size={24} />} title="No purchases found" description="Create your first purchase order." action={{ label: 'New Purchase', onClick: () => setActiveSubView('create') }} />
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((p) => (
                <TableRow key={p.id} className="hover:bg-accent/50">
                  <TableCell className="text-xs py-2.5 font-medium text-primary">{p.invoiceNumber}</TableCell>
                  <TableCell className="text-xs py-2.5 font-mono">{p.date}</TableCell>
                  <TableCell className="text-xs py-2.5 font-medium">{p.supplierName}</TableCell>
                  <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono">{formatCurrency(p.subtotal)}</TableCell>
                  <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono text-muted-foreground">{formatCurrency(p.cgst + p.sgst + p.igst)}</TableCell>
                  <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono font-semibold">{formatCurrency(p.grandTotal)}</TableCell>
                  <TableCell className="text-xs py-2.5"><StatusBadge status={p.paymentStatus} /></TableCell>
                  <TableCell className="text-xs py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Eye size={13} /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Printer size={13} /></Button>
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
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={14} /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={14} /></Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function PurchaseVoucher() {
  const { goBack } = useERPStore();
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [purchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [lineItems, setLineItems] = useState([
    { itemId: '', quantity: 1, rate: 0, discount: 0, gstRate: 5, amount: 0 },
  ]);

  const addItem = () => setLineItems([...lineItems, { itemId: '', quantity: 1, rate: 0, discount: 0, gstRate: 5, amount: 0 }]);
  const removeItem = (index: number) => { if (lineItems.length > 1) setLineItems(lineItems.filter((_, i) => i !== index)); };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updated = [...lineItems];
    (updated[index] as Record<string, unknown>)[field] = value;
    if (field === 'itemId') {
      const item = stockItems.find((i) => i.id === value);
      if (item) { updated[index].rate = item.purchasePrice; updated[index].gstRate = item.gstRate; }
    }
    const qty = Number(updated[index].quantity) || 0;
    const rate = Number(updated[index].rate) || 0;
    const disc = Number(updated[index].discount) || 0;
    const gst = Number(updated[index].gstRate) || 0;
    const taxable = qty * rate - disc;
    updated[index].amount = taxable + (taxable * gst / 100);
    setLineItems(updated);
  };

  const subtotal = lineItems.reduce((acc, item) => acc + ((Number(item.quantity) || 0) * (Number(item.rate) || 0) - (Number(item.discount) || 0)), 0);
  const totalCgst = lineItems.reduce((acc, item) => {
    const taxable = (Number(item.quantity) || 0) * (Number(item.rate) || 0) - (Number(item.discount) || 0);
    return acc + (taxable * (Number(item.gstRate) || 0) / 200);
  }, 0);
  const grandTotal = subtotal + totalCgst * 2;

  const handleSave = () => {
    if (!selectedSupplier) { toast.error('Please select a supplier'); return; }
    toast.success('Purchase saved successfully');
    goBack();
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title="Create Purchase Order" showBack description="PUR-2025-006" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-medium">Supplier <span className="text-destructive">*</span></Label>
                  <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                    <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="Select supplier" /></SelectTrigger>
                    <SelectContent>
                      {suppliers.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium">Purchase Date</Label>
                  <Input type="date" className="h-9 mt-1" value={purchaseDate} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Items</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-9 min-w-[200px]">Item</TableHead>
                      <TableHead className="text-xs h-9 min-w-[80px] text-right">Qty</TableHead>
                      <TableHead className="text-xs h-9 min-w-[120px] text-right">Purchase Price</TableHead>
                      <TableHead className="text-xs h-9 min-w-[70px] text-center">GST%</TableHead>
                      <TableHead className="text-xs h-9 min-w-[120px] text-right">Amount</TableHead>
                      <TableHead className="text-xs h-9 w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lineItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="py-1.5">
                          <Select value={item.itemId} onValueChange={(v) => updateItem(index, 'itemId', v)}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select item" /></SelectTrigger>
                            <SelectContent>
                              {stockItems.map((si) => <SelectItem key={si.id} value={si.id}>{si.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="py-1.5">
                          <Input type="number" className="h-8 text-xs text-right tabular-nums" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} min="1" />
                        </TableCell>
                        <TableCell className="py-1.5">
                          <Input type="number" className="h-8 text-xs text-right tabular-nums" value={item.rate} onChange={(e) => updateItem(index, 'rate', e.target.value)} />
                        </TableCell>
                        <TableCell className="py-1.5 text-center">
                          <Input type="number" className="h-8 text-xs text-center tabular-nums w-16 mx-auto" value={item.gstRate} onChange={(e) => updateItem(index, 'gstRate', e.target.value)} />
                        </TableCell>
                        <TableCell className="py-1.5 text-right">
                          <span className="text-xs font-medium tabular-nums font-mono">{formatCurrency(item.amount)}</span>
                        </TableCell>
                        <TableCell className="py-1.5">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(index)} disabled={lineItems.length <= 1}>
                            <Trash2 size={12} className="text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs text-primary" onClick={addItem}>
                <Plus size={13} className="mr-1" /> Add Item
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums font-mono">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CGST</span>
                <span className="tabular-nums font-mono">{formatCurrency(Math.round(totalCgst))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SGST</span>
                <span className="tabular-nums font-mono">{formatCurrency(Math.round(totalCgst))}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-sm font-semibold">Grand Total</span>
                <span className="text-lg font-bold tabular-nums text-primary">{formatCurrency(Math.round(grandTotal))}</span>
              </div>
              <div className="space-y-2 pt-2">
                <Button className="w-full h-9" onClick={handleSave}>Save <kbd className="ml-2 text-[10px] font-mono bg-white/20 px-1 rounded">Ctrl+S</kbd></Button>
                <Button variant="outline" className="w-full h-9"><Printer size={14} className="mr-2" />Print</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}