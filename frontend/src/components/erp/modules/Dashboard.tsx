'use client';

import { useERPStore } from '@/store/useERPStore';
import { formatCurrency } from '@/data/mockData';
import { monthlyRevenue, transactions, stockItems, activities, salesInvoices } from '@/data/mockData';
import { PageHeader, StatusBadge } from '@/components/erp/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Wallet,
  Landmark,
  ArrowDownLeft,
  ArrowUpRight,
  AlertTriangle,
  Package,
  ShoppingCart,
  FileText,
  Clock,
  ArrowRight,
  BarChart3,
  Plus,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const quickStats = [
  { label: "Today's Sales", value: '₹1,58,917', change: '+12.5%', changeType: 'positive' as const, icon: <TrendingUp size={18} />, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
  { label: "Today's Purchases", value: '₹2,75,730', change: '+8.2%', changeType: 'positive' as const, icon: <ShoppingCart size={18} />, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Cash Balance', value: '₹1,25,000', change: '', changeType: 'neutral' as const, icon: <Wallet size={18} />, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Bank Balance', value: '₹11,95,000', change: '+5.1%', changeType: 'positive' as const, icon: <Landmark size={18} />, color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20' },
  { label: 'Receivables', value: '₹5,09,000', change: '+2.3%', changeType: 'negative' as const, icon: <ArrowDownLeft size={18} />, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
  { label: 'Payables', value: '₹7,31,000', change: '-4.5%', changeType: 'positive' as const, icon: <ArrowUpRight size={18} />, color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
];

const lowStockItems = stockItems.filter((i) => i.status !== 'In Stock').slice(0, 5);
const recentTransactions = transactions.slice(0, 8);
const pendingPayments = salesInvoices.filter((i) => i.status !== 'Paid');
const topSellingItems = [
  { name: 'Cashew Nuts (1kg)', sold: 340, revenue: 374000 },
  { name: 'Premium Basmati Rice', sold: 220, revenue: 231000 },
  { name: 'Tea Powder (1kg)', sold: 450, revenue: 261000 },
  { name: 'Toor Dal (50kg)', sold: 85, revenue: 442000 },
  { name: 'Wheat Flour (50kg)', sold: 180, revenue: 396000 },
];

export function Dashboard() {
  const { activeCompany, setActiveModule, setActiveSubView } = useERPStore();

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Dashboard"
        description={`${activeCompany?.name} — FY ${activeCompany?.financialYear}`}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-sm transition-shadow cursor-default">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                <div className={`p-1.5 rounded-md ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-lg font-semibold tabular-nums">{stat.value}</p>
              {stat.change && (
                <p className={`text-[11px] mt-1 font-medium ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'}`}>
                  {stat.changeType === 'positive' && '↑'}
                  {stat.changeType === 'negative' && '↓'}
                  {' '}{stat.change} from yesterday
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Monthly Revenue vs Expenses</CardTitle>
              <Badge variant="outline" className="text-[10px]">FY 2024-25</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: number) => [formatCurrency(value)]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke="#DC2626" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} name="Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Items */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Top Selling Items</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-primary"
                onClick={() => setActiveModule('inventory')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSellingItems} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={120} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-primary"
                onClick={() => setActiveModule('sales')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs h-8">Date</TableHead>
                  <TableHead className="text-xs h-8">Type</TableHead>
                  <TableHead className="text-xs h-8">Voucher</TableHead>
                  <TableHead className="text-xs h-8">Party</TableHead>
                  <TableHead className="text-xs h-8 text-right">Debit</TableHead>
                  <TableHead className="text-xs h-8 text-right">Credit</TableHead>
                  <TableHead className="text-xs h-8">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer hover:bg-accent/50">
                    <TableCell className="text-xs py-2 font-mono">{t.date}</TableCell>
                    <TableCell className="text-xs py-2">
                      <Badge variant="outline" className="text-[10px] font-normal">{t.type}</Badge>
                    </TableCell>
                    <TableCell className="text-xs py-2 font-medium text-primary">{t.voucherNumber}</TableCell>
                    <TableCell className="text-xs py-2">{t.party}</TableCell>
                    <TableCell className="text-xs py-2 text-right tabular-nums font-mono">
                      {t.debit > 0 ? formatCurrency(t.debit) : '-'}
                    </TableCell>
                    <TableCell className="text-xs py-2 text-right tabular-nums font-mono">
                      {t.credit > 0 ? formatCurrency(t.credit) : '-'}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      {t.status && <StatusBadge status={t.status} />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right sidebar panels */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-500" />
                  Low Stock Alert
                </CardTitle>
                <Badge variant="destructive" className="text-[10px]">{lowStockItems.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">Min: {item.minQuantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold tabular-nums">{item.quantity}</p>
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Clock size={14} />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2.5 max-h-[240px] overflow-y-auto custom-scrollbar">
                {activities.map((a) => (
                  <div key={a.id} className="flex gap-2.5">
                    <div className={`w-1.5 rounded-full flex-shrink-0 mt-1 ${
                      a.type === 'create' ? 'bg-green-500' :
                      a.type === 'payment' ? 'bg-blue-500' :
                      a.type === 'update' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium">{a.action}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{a.details}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Pending Payments</CardTitle>
                <Badge variant="outline" className="text-[10px]">{pendingPayments.length} invoices</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {pendingPayments.slice(0, 4).map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-xs font-medium">{inv.customerName}</p>
                      <p className="text-[11px] text-muted-foreground">{inv.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold tabular-nums">{formatCurrency(inv.grandTotal)}</p>
                      <StatusBadge status={inv.status} />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 h-7 text-xs text-primary"
                onClick={() => setActiveModule('sales')}
              >
                View All <ArrowRight size={12} className="ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Shortcut Panel */}
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              { label: 'New Sales', icon: <Plus size={15} />, module: 'sales' as const, shortcut: 'F8' },
              { label: 'New Purchase', icon: <Plus size={15} />, module: 'purchases' as const, shortcut: 'F9' },
              { label: 'Add Ledger', icon: <Plus size={15} />, module: 'ledger' as const, shortcut: 'Ctrl+B' },
              { label: 'Add Customer', icon: <Plus size={15} />, module: 'customers' as const, shortcut: '' },
              { label: 'View Reports', icon: <BarChart3 size={15} />, module: 'reports' as const, shortcut: '' },
              { label: 'Inventory', icon: <Package size={15} />, module: 'inventory' as const, shortcut: '' },
            ].map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className="h-9 justify-start gap-2 text-xs font-normal"
                onClick={() => {
                  setActiveModule(item.module);
                  if (item.module === 'sales' || item.module === 'purchases') {
                    setActiveSubView('create');
                  }
                }}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && (
                  <kbd className="text-[10px] font-mono text-muted-foreground">{item.shortcut}</kbd>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}