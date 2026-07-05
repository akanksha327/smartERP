'use client';

import { useState } from 'react';
import { useERPStore } from '@/store/useERPStore';
import { stockItems, stockMovements, formatCurrency, salesInvoices, purchaseInvoices } from '@/data/mockData';
import { PageHeader, EmptyState, StatusBadge } from '@/components/erp/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Filter,
  Package,
  AlertTriangle,
  XCircle,
  Warehouse,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

const emptyForm = {
  name: '',
  sku: '',
  category: '',
  purchasePrice: '',
  sellingPrice: '',
  quantity: '',
  gstRate: '',
  hsn: '',
  unit: '',
  minQuantity: '',
};

const categoryOptions = ['Electronics', 'Electrical', 'Hardware', 'Plumbing', 'Paints', 'Tools', 'Accessories', 'Stationery', 'Other'];
const unitOptions = ['Pcs', 'Kg', 'Meter', 'Box', 'Pair', 'Set', 'Dozen', 'Roll', 'Pack', 'Lot'];
const gstRateOptions = [0, 5, 12, 18, 28];

export function InventoryModule() {
  const { activeSubView, setActiveSubView, setSelectedItemId, selectedItemId } = useERPStore();
  if (activeSubView === 'create') return <ItemCreate />;
  if (activeSubView === 'details' && selectedItemId) return <InventoryDetails itemId={selectedItemId} />;
  return <InventoryDashboard />;
}

function InventoryDashboard() {
  const { setSelectedItemId, setActiveSubView } = useERPStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const totalItems = stockItems.length;
  const lowStock = stockItems.filter((i) => i.status === 'Low Stock').length;
  const outOfStock = stockItems.filter((i) => i.status === 'Out of Stock').length;
  const inventoryValue = stockItems.reduce((acc, i) => acc + i.inventoryValue, 0);

  const categories = [...new Set(stockItems.map((i) => i.category))];

  const filtered = stockItems.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    const matchCategory = filterCategory === 'all' || i.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortCol === 'quantity' || sortCol === 'purchasePrice' || sortCol === 'sellingPrice' || sortCol === 'inventoryValue') {
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
        title="Inventory"
        description="Stock management and tracking"
        action={{ label: 'New Item', onClick: () => setActiveSubView('create') }}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600">
              <Package size={18} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Items</p>
              <p className="text-xl font-semibold tabular-nums">{totalItems}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Low Stock</p>
              <p className="text-xl font-semibold tabular-nums text-amber-600">{lowStock}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600">
              <XCircle size={18} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Out of Stock</p>
              <p className="text-xl font-semibold tabular-nums text-red-600">{outOfStock}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600">
              <Warehouse size={18} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Inventory Value</p>
              <p className="text-lg font-semibold tabular-nums">{formatCurrency(inventoryValue)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or SKU..."
            className="h-8 pl-8 text-sm"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setCurrentPage(1); }}>
          <SelectTrigger className="h-8 w-36 text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); setCurrentPage(1); }}>
          <SelectTrigger className="h-8 w-36 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-8">
          <Download size={14} className="mr-1.5" /> Export
        </Button>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9">SKU</TableHead>
              <TableHead className="text-xs h-9 cursor-pointer" onClick={() => handleSort('name')}>
                <span className="flex items-center gap-1">Item Name <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9">Category</TableHead>
              <TableHead className="text-xs h-9 text-right cursor-pointer" onClick={() => handleSort('purchasePrice')}>
                <span className="flex items-center justify-end gap-1">P. Price <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 text-right cursor-pointer" onClick={() => handleSort('sellingPrice')}>
                <span className="flex items-center justify-end gap-1">S. Price <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 text-right cursor-pointer" onClick={() => handleSort('quantity')}>
                <span className="flex items-center justify-end gap-1">Qty <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 text-center">GST</TableHead>
              <TableHead className="text-xs h-9">Status</TableHead>
              <TableHead className="text-xs h-9 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <EmptyState
                    icon={<Package size={24} />}
                    title="No items found"
                    description="Add stock items to your inventory."
                    action={{ label: 'Add Item', onClick: () => setActiveSubView('create') }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-accent/50">
                  <TableCell className="text-xs py-2 font-mono text-muted-foreground">{item.sku}</TableCell>
                  <TableCell className="text-sm font-medium py-2.5 max-w-[200px] truncate" onClick={() => setSelectedItemId(item.id)}>
                    {item.name}
                  </TableCell>
                  <TableCell className="text-xs py-2.5"><Badge variant="outline" className="text-[10px]">{item.category}</Badge></TableCell>
                  <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono">{formatCurrency(item.purchasePrice)}</TableCell>
                  <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono">{formatCurrency(item.sellingPrice)}</TableCell>
                  <TableCell className={`text-xs py-2.5 text-right tabular-nums font-mono font-medium ${item.quantity <= item.minQuantity ? 'text-red-600' : ''}`}>
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-xs py-2.5 text-center">{item.gstRate}%</TableCell>
                  <TableCell className="text-xs py-2.5"><StatusBadge status={item.status} /></TableCell>
                  <TableCell className="text-xs py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedItemId(item.id)}>
                        <Eye size={13} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Pencil size={13} />
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

function ItemCreate() {
  const { goBack } = useERPStore();
  const [form, setForm] = useState(emptyForm);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!form.name.trim()) {
      toast.error('Item name is required');
      return false;
    }
    if (!form.sku.trim()) {
      toast.error('SKU is required');
      return false;
    }
    if (!form.category) {
      toast.error('Category is required');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    toast.success('Stock item saved successfully');
    goBack();
  };

  const handleSaveAndNew = () => {
    if (!validate()) return;
    toast.success('Stock item saved successfully');
    setForm(emptyForm);
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <PageHeader
        title="New Stock Item"
        showBack
        description="Add a new item to inventory"
      />

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Name */}
            <div>
              <Label className="text-xs font-medium">
                Item Name <span className="text-red-500">*</span>
              </Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter item name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>

            {/* SKU */}
            <div>
              <Label className="text-xs font-medium">
                SKU <span className="text-red-500">*</span>
              </Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter SKU"
                value={form.sku}
                onChange={(e) => updateField('sku', e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <Label className="text-xs font-medium">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={form.category} onValueChange={(v) => updateField('category', v)}>
                <SelectTrigger className="h-9 mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Unit */}
            <div>
              <Label className="text-xs font-medium">
                Unit <span className="text-red-500">*</span>
              </Label>
              <Select value={form.unit} onValueChange={(v) => updateField('unit', v)}>
                <SelectTrigger className="h-9 mt-1">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Purchase Price */}
            <div>
              <Label className="text-xs font-medium">Purchase Price</Label>
              <Input
                type="number"
                className="h-9 mt-1 tabular-nums"
                placeholder="0.00"
                value={form.purchasePrice}
                onChange={(e) => updateField('purchasePrice', e.target.value)}
              />
            </div>

            {/* Selling Price */}
            <div>
              <Label className="text-xs font-medium">Selling Price</Label>
              <Input
                type="number"
                className="h-9 mt-1 tabular-nums"
                placeholder="0.00"
                value={form.sellingPrice}
                onChange={(e) => updateField('sellingPrice', e.target.value)}
              />
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-xs font-medium">Opening Quantity</Label>
              <Input
                type="number"
                className="h-9 mt-1 tabular-nums"
                placeholder="0"
                value={form.quantity}
                onChange={(e) => updateField('quantity', e.target.value)}
              />
            </div>

            {/* Min Quantity */}
            <div>
              <Label className="text-xs font-medium">Min. Quantity Alert</Label>
              <Input
                type="number"
                className="h-9 mt-1 tabular-nums"
                placeholder="0"
                value={form.minQuantity}
                onChange={(e) => updateField('minQuantity', e.target.value)}
              />
            </div>

            {/* GST Rate */}
            <div>
              <Label className="text-xs font-medium">GST Rate (%)</Label>
              <Select value={form.gstRate} onValueChange={(v) => updateField('gstRate', v)}>
                <SelectTrigger className="h-9 mt-1 tabular-nums">
                  <SelectValue placeholder="Select GST rate" />
                </SelectTrigger>
                <SelectContent>
                  {gstRateOptions.map((r) => (
                    <SelectItem key={r} value={String(r)}>{r}%</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* HSN Code */}
            <div>
              <Label className="text-xs font-medium">HSN Code</Label>
              <Input
                className="h-9 mt-1"
                placeholder="Enter HSN code"
                value={form.hsn}
                onChange={(e) => updateField('hsn', e.target.value)}
              />
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t">
            <Button onClick={handleSave}>
              Save
              <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                Ctrl+S
              </kbd>
            </Button>
            <Button variant="outline" onClick={handleSaveAndNew}>
              Save & New
            </Button>
            <Button variant="ghost" onClick={goBack}>
              Cancel
              <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                Esc
              </kbd>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InventoryDetails({ itemId }: { itemId: string }) {
  const { goBack } = useERPStore();
  const item = stockItems.find((i) => i.id === itemId);

  if (!item) {
    return (
      <div className="p-6">
        <PageHeader title="Item Not Found" showBack />
        <EmptyState icon={<Package size={24} />} title="Item not found" description="The stock item you are looking for does not exist." />
      </div>
    );
  }

  const itemMovements = stockMovements.filter((m) => m.item === item.name);
  const itemSales = salesInvoices.filter((s) => s.items.some((i) => i.itemId === itemId));

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title={item.name} showBack description={`SKU: ${item.sku} · HSN: ${item.hsn}`} />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Current Quantity</p>
            <p className={`text-lg font-semibold tabular-nums ${item.quantity <= item.minQuantity ? 'text-red-600' : ''}`}>{item.quantity} {item.unit}s</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Purchase Price</p>
            <p className="text-lg font-semibold tabular-nums">{formatCurrency(item.purchasePrice)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Selling Price</p>
            <p className="text-lg font-semibold tabular-nums">{formatCurrency(item.sellingPrice)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Inventory Value</p>
            <p className="text-lg font-semibold tabular-nums">{formatCurrency(item.inventoryValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <StatusBadge status={item.status} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="movements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="movements">Stock Movement</TabsTrigger>
          <TabsTrigger value="sales">Sales History</TabsTrigger>
          <TabsTrigger value="info">Item Details</TabsTrigger>
        </TabsList>

        <TabsContent value="movements">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs h-9">Date</TableHead>
                    <TableHead className="text-xs h-9">Type</TableHead>
                    <TableHead className="text-xs h-9 text-right">Quantity</TableHead>
                    <TableHead className="text-xs h-9">Reference</TableHead>
                    <TableHead className="text-xs h-9">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemMovements.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-sm text-muted-foreground">No stock movements</TableCell></TableRow>
                  ) : (
                    itemMovements.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="text-xs py-2 font-mono">{m.date}</TableCell>
                        <TableCell className="text-xs py-2">
                          <span className="flex items-center gap-1">
                            {m.type === 'In' && <TrendingDown size={12} className="text-green-500" />}
                            {m.type === 'Out' && <TrendingUp size={12} className="text-red-500" />}
                            {m.type === 'Adjustment' && <RefreshCw size={12} className="text-amber-500" />}
                            {m.type}
                          </span>
                        </TableCell>
                        <TableCell className={`text-xs py-2 text-right tabular-nums font-mono font-medium ${m.type === 'In' ? 'text-green-600' : 'text-red-600'}`}>
                          {m.type === 'In' ? '+' : m.type === 'Out' ? '-' : ''}{Math.abs(m.quantity)}
                        </TableCell>
                        <TableCell className="text-xs py-2 font-medium text-primary">{m.reference}</TableCell>
                        <TableCell className="text-xs py-2 text-muted-foreground">{m.notes || '-'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
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
                    <TableHead className="text-xs h-9">Customer</TableHead>
                    <TableHead className="text-xs h-9 text-right">Qty</TableHead>
                    <TableHead className="text-xs h-9 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemSales.map((s) => {
                    const lineItem = s.items.find((i) => i.itemId === itemId);
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="text-xs py-2 font-medium text-primary">{s.invoiceNumber}</TableCell>
                        <TableCell className="text-xs py-2 font-mono">{s.date}</TableCell>
                        <TableCell className="text-xs py-2">{s.customerName}</TableCell>
                        <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{lineItem?.quantity || 0}</TableCell>
                        <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{formatCurrency(lineItem?.amount || 0)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div><p className="text-xs text-muted-foreground">SKU</p><p className="font-medium font-mono">{item.sku}</p></div>
                <div><p className="text-xs text-muted-foreground">HSN Code</p><p className="font-medium font-mono">{item.hsn}</p></div>
                <div><p className="text-xs text-muted-foreground">Category</p><p className="font-medium">{item.category}</p></div>
                <div><p className="text-xs text-muted-foreground">Unit</p><p className="font-medium">{item.unit}</p></div>
                <div><p className="text-xs text-muted-foreground">GST Rate</p><p className="font-medium">{item.gstRate}%</p></div>
                <div><p className="text-xs text-muted-foreground">Min. Quantity</p><p className="font-medium">{item.minQuantity}</p></div>
                <div><p className="text-xs text-muted-foreground">Margin</p><p className="font-medium text-green-600">{((item.sellingPrice - item.purchasePrice) / item.purchasePrice * 100).toFixed(1)}%</p></div>
                <div><p className="text-xs text-muted-foreground">Created</p><p className="font-medium">{item.createdAt}</p></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}