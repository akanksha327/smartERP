'use client';

import { useState } from 'react';
import { useERPStore } from '@/store/useERPStore';
import { ledgers, ledgerGroups, transactions, formatCurrency } from '@/data/mockData';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  BookOpen,
  ArrowUpDown,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function LedgerModule() {
  const { activeSubView, setActiveSubView, setSelectedItemId, selectedItemId } = useERPStore();

  if (activeSubView === 'create') return <LedgerCreate />;
  if (activeSubView === 'details' && selectedItemId) return <LedgerDetails ledgerId={selectedItemId} />;
  return <LedgerList />;
}

function LedgerList() {
  const { setActiveSubView } = useERPStore();
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState<string>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = ledgers.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase());
    const matchGroup = filterGroup === 'all' || l.group === filterGroup;
    return matchSearch && matchGroup;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortCol as keyof typeof a] ?? '';
    const bVal = b[sortCol as keyof typeof b] ?? '';
    if (sortDir === 'asc') return String(aVal).localeCompare(String(bVal));
    return String(bVal).localeCompare(String(aVal));
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
        title="Ledger"
        description="Manage your ledger accounts"
        action={{ label: 'New Ledger', onClick: () => setActiveSubView('create'), shortcut: 'Ctrl+B' }}
      />

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ledgers..."
            className="h-8 pl-8 text-sm"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <Select value={filterGroup} onValueChange={(v) => { setFilterGroup(v); setCurrentPage(1); }}>
          <SelectTrigger className="h-8 w-48 text-sm">
            <Filter size={14} className="mr-1.5" />
            <SelectValue placeholder="Filter by group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {ledgerGroups.map((g) => (
              <SelectItem key={g.id} value={g.name}>{g.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-8">
          <Download size={14} className="mr-1.5" />
          Export
        </Button>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9 cursor-pointer" onClick={() => handleSort('name')}>
                <span className="flex items-center gap-1">Ledger Name <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 cursor-pointer" onClick={() => handleSort('group')}>
                <span className="flex items-center gap-1">Group <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 text-right cursor-pointer" onClick={() => handleSort('openingBalance')}>
                <span className="flex items-center justify-end gap-1">Opening Balance <ArrowUpDown size={12} /></span>
              </TableHead>
              <TableHead className="text-xs h-9 text-center">Type</TableHead>
              <TableHead className="text-xs h-9 text-right">Closing Balance</TableHead>
              <TableHead className="text-xs h-9 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState
                    icon={<BookOpen size={24} />}
                    title="No ledgers found"
                    description="Create your first ledger account to get started."
                    action={{ label: 'Create Ledger', onClick: () => setActiveSubView('create') }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((ledger) => (
                <TableRow key={ledger.id} className="cursor-pointer hover:bg-accent/50">
                  <TableCell className="text-sm font-medium py-2.5" onClick={() => setSelectedItemId(ledger.id)}>
                    {ledger.name}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground py-2.5">
                    <Badge variant="outline" className="text-[10px] font-normal">{ledger.group}</Badge>
                  </TableCell>
                  <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono">
                    {formatCurrency(ledger.openingBalance)}
                  </TableCell>
                  <TableCell className="text-xs py-2.5 text-center">
                    <Badge variant={ledger.balanceType === 'Debit' ? 'secondary' : 'outline'} className="text-[10px]">
                      {ledger.balanceType === 'Debit' ? 'Dr' : 'Cr'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs py-2.5 text-right tabular-nums font-mono font-medium">
                    {formatCurrency(ledger.closingBalance ?? 0)}
                  </TableCell>
                  <TableCell className="text-xs py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedItemId(ledger.id)}>
                        <Eye size={13} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Pencil size={13} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => setDeleteId(ledger.id)}>
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, sorted.length)} of {sorted.length}</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Ledger</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this ledger? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => { setDeleteId(null); toast.success('Ledger deleted'); }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function LedgerCreate() {
  const { goBack } = useERPStore();
  const [form, setForm] = useState({
    name: '', group: '', openingBalance: '0', balanceType: 'Debit' as 'Debit' | 'Credit',
    gstNumber: '', pan: '', address: '', mobile: '', email: '', state: '', pinCode: '', notes: '',
  });

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Ledger name is required'); return; }
    toast.success(`Ledger "${form.name}" created successfully`);
    goBack();
  };

  const handleSaveAndNew = () => {
    if (!form.name.trim()) { toast.error('Ledger name is required'); return; }
    toast.success(`Ledger "${form.name}" created successfully`);
    setForm({ name: '', group: '', openingBalance: '0', balanceType: 'Debit', gstNumber: '', pan: '', address: '', mobile: '', email: '', state: '', pinCode: '', notes: '' });
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <PageHeader title="Create Ledger" showBack description="Add a new ledger account" />

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label className="text-xs font-medium">Ledger Name <span className="text-destructive">*</span></Label>
              <Input placeholder="e.g. Rajesh Kumar" className="h-9 mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
            </div>
            <div>
              <Label className="text-xs font-medium">Group <span className="text-destructive">*</span></Label>
              <Select value={form.group} onValueChange={(v) => setForm({ ...form, group: v })}>
                <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="Select group" /></SelectTrigger>
                <SelectContent>
                  {ledgerGroups.map((g) => <SelectItem key={g.id} value={g.name}>{g.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium">Opening Balance</Label>
                <Input type="number" placeholder="0" className="h-9 mt-1 tabular-nums" value={form.openingBalance} onChange={(e) => setForm({ ...form, openingBalance: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs font-medium">Balance Type</Label>
                <Select value={form.balanceType} onValueChange={(v) => setForm({ ...form, balanceType: v as 'Debit' | 'Credit' })}>
                  <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Debit">Debit</SelectItem>
                    <SelectItem value="Credit">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium">GST Number</Label>
              <Input placeholder="Enter GST number" className="h-9 mt-1 font-mono text-sm" value={form.gstNumber} onChange={(e) => setForm({ ...form, gstNumber: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">PAN</Label>
              <Input placeholder="Enter PAN" className="h-9 mt-1 font-mono text-sm uppercase" value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs font-medium">Address</Label>
              <Textarea placeholder="Enter address" className="mt-1 text-sm" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">Mobile</Label>
              <Input placeholder="Enter mobile number" className="h-9 mt-1" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium">Email</Label>
              <Input type="email" placeholder="Enter email" className="h-9 mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
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
              <Label className="text-xs font-medium">Notes</Label>
              <Textarea placeholder="Additional notes" className="mt-1 text-sm" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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

function LedgerDetails({ ledgerId }: { ledgerId: string }) {
  const { goBack } = useERPStore();
  const ledger = ledgers.find((l) => l.id === ledgerId);

  if (!ledger) {
    return (
      <div className="p-6">
        <PageHeader title="Ledger Not Found" showBack />
        <EmptyState icon={<BookOpen size={24} />} title="Ledger not found" description="The ledger you are looking for does not exist." />
      </div>
    );
  }

  const ledgerTransactions = transactions.filter(
    (t) => t.party.toLowerCase().includes(ledger.name.toLowerCase()) || Math.random() > 0.7
  ).slice(0, 10);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title={ledger.name} showBack description={`Group: ${ledger.group}`} />

      {/* Balance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Opening Balance</p>
            <p className="text-lg font-semibold tabular-nums">{formatCurrency(ledger.openingBalance)}</p>
            <Badge variant={ledger.balanceType === 'Debit' ? 'secondary' : 'outline'} className="text-[10px] mt-1">
              {ledger.balanceType}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Debits</p>
            <p className="text-lg font-semibold tabular-nums text-green-600">{formatCurrency(ledger.closingBalance ?? 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Closing Balance</p>
            <p className="text-lg font-semibold tabular-nums">{formatCurrency(ledger.closingBalance ?? 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Details */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Ledger Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { label: 'GST Number', value: ledger.gstNumber || '-' },
              { label: 'PAN', value: ledger.pan || '-' },
              { label: 'Mobile', value: ledger.mobile || '-' },
              { label: 'Email', value: ledger.email || '-' },
              { label: 'Address', value: ledger.address || '-' },
              { label: 'State', value: ledger.state || '-' },
              { label: 'Pin Code', value: ledger.pinCode || '-' },
              { label: 'Notes', value: ledger.notes || '-' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-medium mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs h-9">Date</TableHead>
                <TableHead className="text-xs h-9">Type</TableHead>
                <TableHead className="text-xs h-9">Voucher</TableHead>
                <TableHead className="text-xs h-9 text-right">Debit</TableHead>
                <TableHead className="text-xs h-9 text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgerTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-xs py-2 font-mono">{t.date}</TableCell>
                  <TableCell className="text-xs py-2"><Badge variant="outline" className="text-[10px]">{t.type}</Badge></TableCell>
                  <TableCell className="text-xs py-2 font-medium text-primary">{t.voucherNumber}</TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{t.debit > 0 ? formatCurrency(t.debit) : '-'}</TableCell>
                  <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{t.credit > 0 ? formatCurrency(t.credit) : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Import for setSelectedItemId
function useSetSelectedItemId() {
  const { setSelectedItemId } = useERPStore();
  return setSelectedItemId;
}