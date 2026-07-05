'use client';

import { useState } from 'react';
import { useERPStore } from '@/store/useERPStore';
import { ledgers, monthlyRevenue, salesInvoices, purchaseInvoices, stockItems, formatCurrency } from '@/data/mockData';
import { PageHeader } from '@/components/erp/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  BarChart3,
  FileText,
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  Activity,
  Landmark,
  Package,
  ShoppingCart,
  Receipt,
  FileBarChart2,
  Filter,
  CalendarDays,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

export function ReportsModule() {
  const { activeSubView, setActiveSubView } = useERPStore();

  if (activeSubView === 'balance-sheet') return <BalanceSheet />;
  if (activeSubView === 'profit-loss') return <ProfitLoss />;
  if (activeSubView === 'trial-balance') return <TrialBalance />;
  if (activeSubView === 'cash-flow') return <CashFlow />;
  if (activeSubView === 'stock-summary') return <StockSummary />;
  if (activeSubView === 'sales-report') return <SalesReport />;
  if (activeSubView === 'purchase-report') return <PurchaseReport />;
  if (activeSubView === 'gst-report') return <GSTReport />;
  return <ReportsList />;
}

function ReportsList() {
  const { setActiveSubView } = useERPStore();
  const reports = [
    { id: 'balance-sheet', label: 'Balance Sheet', icon: <FileBarChart2 size={20} />, description: 'Financial position of the company', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' },
    { id: 'profit-loss', label: 'Profit & Loss', icon: <TrendingUp size={20} />, description: 'Income and expenditure statement', color: 'bg-green-50 dark:bg-green-900/20 text-green-600' },
    { id: 'trial-balance', label: 'Trial Balance', icon: <BarChart3 size={20} />, description: 'List of all ledger balances', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' },
    { id: 'cash-flow', label: 'Cash Flow', icon: <Landmark size={20} />, description: 'Cash inflow and outflow analysis', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' },
    { id: 'stock-summary', label: 'Stock Summary', icon: <Package size={20} />, description: 'Inventory stock overview', color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600' },
    { id: 'sales-report', label: 'Sales Report', icon: <ShoppingCart size={20} />, description: 'Detailed sales analysis', color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' },
    { id: 'purchase-report', label: 'Purchase Report', icon: <ArrowDownLeft size={20} />, description: 'Purchase order analysis', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' },
    { id: 'gst-report', label: 'GST Report', icon: <Receipt size={20} />, description: 'GST compliance and returns', color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title="Reports" description="Financial and business reports" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => setActiveSubView(report.id as any)}
          >
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-lg ${report.color} flex items-center justify-center mb-3`}>
                {report.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{report.label}</h3>
              <p className="text-xs text-muted-foreground">{report.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportWrapper({ title, children, goBack }: { title: string; children: React.ReactNode; goBack: () => void }) {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader
        title={title}
        showBack
        action={{ label: 'Export', onClick: () => {} }}
      />
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">Period:</span>
          <Input type="date" className="h-8 w-36 text-xs" defaultValue="2024-04-01" />
          <span className="text-muted-foreground">to</span>
          <Input type="date" className="h-8 w-36 text-xs" defaultValue="2025-01-16" />
        </div>
        <Button variant="outline" size="sm" className="h-8">
          <Filter size={14} className="mr-1.5" /> Filter
        </Button>
      </div>
      {children}
    </div>
  );
}

function BalanceSheet() {
  const { goBack } = useERPStore();
  const assets = [
    { name: 'Cash Account', amount: 125000 },
    { name: 'HDFC Bank', amount: 875000 },
    { name: 'SBI Current Account', amount: 320000 },
    { name: 'Sundry Debtors', amount: 509000 },
    { name: 'Office Equipment', amount: 142500 },
    { name: 'Stock-in-Hand', amount: 961010 },
  ];
  const liabilities = [
    { name: 'Capital Account', amount: 1000000 },
    { name: 'Sundry Creditors', amount: 731000 },
    { name: 'CGST Payable', amount: 67500 },
    { name: 'SGST Payable', amount: 67500 },
    { name: 'IGST Payable', amount: 32000 },
  ];
  const totalAssets = assets.reduce((a, b) => a + b.amount, 0);
  const totalLiabilities = liabilities.reduce((a, b) => a + b.amount, 0);

  return (
    <ReportWrapper title="Balance Sheet" goBack={goBack}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ArrowDownLeft size={16} className="text-green-500" /> Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {assets.map((a) => (
                  <TableRow key={a.name}>
                    <TableCell className="text-sm py-2">{a.name}</TableCell>
                    <TableCell className="text-sm py-2 text-right tabular-nums font-mono">{formatCurrency(a.amount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-border">
                  <TableCell className="text-sm font-semibold py-2">Total Assets</TableCell>
                  <TableCell className="text-sm font-semibold py-2 text-right tabular-nums font-mono">{formatCurrency(totalAssets)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ArrowUpRight size={16} className="text-red-500" /> Liabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {liabilities.map((l) => (
                  <TableRow key={l.name}>
                    <TableCell className="text-sm py-2">{l.name}</TableCell>
                    <TableCell className="text-sm py-2 text-right tabular-nums font-mono">{formatCurrency(l.amount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-border">
                  <TableCell className="text-sm font-semibold py-2">Total Liabilities</TableCell>
                  <TableCell className="text-sm font-semibold py-2 text-right tabular-nums font-mono">{formatCurrency(totalLiabilities)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 p-3 bg-primary/5 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Surplus / Deficit</span>
                <span className={`text-lg font-bold tabular-nums ${totalAssets > totalLiabilities ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalAssets - totalLiabilities)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ReportWrapper>
  );
}

function ProfitLoss() {
  const { goBack } = useERPStore();
  const incomes = [
    { name: 'Sales Account', amount: 2450000 },
    { name: 'Interest Income', amount: 12500 },
  ];
  const expenses = [
    { name: 'Purchase Account', amount: 1820000 },
    { name: 'Rent Expense', amount: 180000 },
    { name: 'Salary Expense', amount: 480000 },
    { name: 'Electricity Expense', amount: 42000 },
    { name: 'Depreciation', amount: 7500 },
  ];
  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <ReportWrapper title="Profit & Loss Statement" goBack={goBack}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-green-600">Income / Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {incomes.map((i) => (
                    <TableRow key={i.name}>
                      <TableCell className="text-sm py-2">{i.name}</TableCell>
                      <TableCell className="text-sm py-2 text-right tabular-nums font-mono text-green-600">{formatCurrency(i.amount)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-border">
                    <TableCell className="text-sm font-semibold py-2">Total Income</TableCell>
                    <TableCell className="text-sm font-semibold py-2 text-right tabular-nums font-mono text-green-600">{formatCurrency(totalIncome)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-red-600">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {expenses.map((e) => (
                    <TableRow key={e.name}>
                      <TableCell className="text-sm py-2">{e.name}</TableCell>
                      <TableCell className="text-sm py-2 text-right tabular-nums font-mono text-red-600">{formatCurrency(e.amount)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-border">
                    <TableCell className="text-sm font-semibold py-2">Total Expenses</TableCell>
                    <TableCell className="text-sm font-semibold py-2 text-right tabular-nums font-mono text-red-600">{formatCurrency(totalExpenses)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Card className="h-fit">
          <CardContent className="p-6 text-center">
            <p className="text-xs text-muted-foreground mb-2">Net Profit</p>
            <p className={`text-3xl font-bold tabular-nums ${netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netProfit)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Margin: {((netProfit / totalIncome) * 100).toFixed(1)}%
            </p>
            <div className="mt-4 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={[
                    { name: 'Profit', value: netProfit },
                    { name: 'Expenses', value: totalExpenses },
                  ]} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                    <Cell fill="#16A34A" />
                    <Cell fill="#DC2626" />
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </ReportWrapper>
  );
}

function TrialBalance() {
  const { goBack } = useERPStore();
  const totalDebit = ledgers.reduce((acc, l) => acc + Math.abs(l.closingBalance ?? 0), 0);

  return (
    <ReportWrapper title="Trial Balance" goBack={goBack}>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9">Ledger Name</TableHead>
              <TableHead className="text-xs h-9">Group</TableHead>
              <TableHead className="text-xs h-9 text-right">Debit (₹)</TableHead>
              <TableHead className="text-xs h-9 text-right">Credit (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ledgers.map((l) => {
              const isDebit = ['Cash-in-Hand', 'Bank Accounts', 'Sundry Debtors', 'Fixed Assets', 'Purchase Accounts', 'Indirect Expenses', 'Direct Expenses'].includes(l.group);
              return (
                <TableRow key={l.id}>
                  <TableCell className="text-sm py-2 font-medium">{l.name}</TableCell>
                  <TableCell className="text-xs py-2 text-muted-foreground"><Badge variant="outline" className="text-[10px]">{l.group}</Badge></TableCell>
                  <TableCell className="text-sm py-2 text-right tabular-nums font-mono">
                    {isDebit ? formatCurrency(l.closingBalance ?? 0) : '-'}
                  </TableCell>
                  <TableCell className="text-sm py-2 text-right tabular-nums font-mono">
                    {!isDebit ? formatCurrency(l.closingBalance ?? 0) : '-'}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="border-t-2 border-border bg-muted/30">
              <TableCell className="text-sm font-bold py-2.5">Total</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-sm font-bold py-2.5 text-right tabular-nums font-mono">{formatCurrency(Math.round(totalDebit / 2))}</TableCell>
              <TableCell className="text-sm font-bold py-2.5 text-right tabular-nums font-mono">{formatCurrency(Math.round(totalDebit / 2))}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </ReportWrapper>
  );
}

function CashFlow() {
  const { goBack } = useERPStore();

  return (
    <ReportWrapper title="Cash Flow" goBack={goBack}>
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Cash Flow Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="revenue" fill="#16A34A" radius={[4, 4, 0, 0]} name="Inflow" />
                <Bar dataKey="expenses" fill="#DC2626" radius={[4, 4, 0, 0]} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Inflow</p>
            <p className="text-xl font-bold tabular-nums text-green-600">{formatCurrency(monthlyRevenue.reduce((a, b) => a + b.revenue, 0))}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Outflow</p>
            <p className="text-xl font-bold tabular-nums text-red-600">{formatCurrency(monthlyRevenue.reduce((a, b) => a + b.expenses, 0))}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Net Cash Flow</p>
            <p className="text-xl font-bold tabular-nums text-primary">
              {formatCurrency(monthlyRevenue.reduce((a, b) => a + (b.revenue - b.expenses), 0))}
            </p>
          </CardContent>
        </Card>
      </div>
    </ReportWrapper>
  );
}

function StockSummary() {
  const { goBack } = useERPStore();

  const categorySummary = [...new Set(stockItems.map((i) => i.category))].map((cat) => {
    const items = stockItems.filter((i) => i.category === cat);
    return {
      category: cat,
      items: items.length,
      value: items.reduce((a, i) => a + i.inventoryValue, 0),
      quantity: items.reduce((a, i) => a + i.quantity, 0),
    };
  });

  return (
    <ReportWrapper title="Stock Summary" goBack={goBack}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-lg font-bold tabular-nums">{formatCurrency(stockItems.reduce((a: number, i: any) => a + i.inventoryValue, 0))}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Items</p>
            <p className="text-lg font-bold tabular-nums">{stockItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Quantity</p>
            <p className="text-lg font-bold tabular-nums">{stockItems.reduce((a: number, i: any) => a + i.quantity, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Categories</p>
            <p className="text-lg font-bold tabular-nums">{categorySummary.length}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9">Category</TableHead>
              <TableHead className="text-xs h-9 text-right">Items</TableHead>
              <TableHead className="text-xs h-9 text-right">Total Qty</TableHead>
              <TableHead className="text-xs h-9 text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorySummary.map((c) => (
              <TableRow key={c.category}>
                <TableCell className="text-sm py-2 font-medium">{c.category}</TableCell>
                <TableCell className="text-sm py-2 text-right tabular-nums">{c.items}</TableCell>
                <TableCell className="text-sm py-2 text-right tabular-nums">{c.quantity}</TableCell>
                <TableCell className="text-sm py-2 text-right tabular-nums font-mono font-medium">{formatCurrency(c.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ReportWrapper>
  );
}

function SalesReport() {
  const { goBack } = useERPStore();
  const totalSales = salesInvoices.reduce((a, b) => a + b.grandTotal, 0);
  const paidSales = salesInvoices.filter((s) => s.status === 'Paid').reduce((a, b) => a + b.grandTotal, 0);
  const unpaidSales = salesInvoices.filter((s) => s.status !== 'Paid').reduce((a, b) => a + b.grandTotal, 0);

  return (
    <ReportWrapper title="Sales Report" goBack={goBack}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Sales</p>
            <p className="text-lg font-bold tabular-nums">{formatCurrency(totalSales)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Paid</p>
            <p className="text-lg font-bold tabular-nums text-green-600">{formatCurrency(paidSales)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Outstanding</p>
            <p className="text-lg font-bold tabular-nums text-red-600">{formatCurrency(unpaidSales)}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9">Invoice</TableHead>
              <TableHead className="text-xs h-9">Date</TableHead>
              <TableHead className="text-xs h-9">Customer</TableHead>
              <TableHead className="text-xs h-9 text-right">Amount</TableHead>
              <TableHead className="text-xs h-9">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesInvoices.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="text-xs py-2 font-medium text-primary">{s.invoiceNumber}</TableCell>
                <TableCell className="text-xs py-2 font-mono">{s.date}</TableCell>
                <TableCell className="text-xs py-2">{s.customerName}</TableCell>
                <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{formatCurrency(s.grandTotal)}</TableCell>
                <TableCell className="text-xs py-2"><Badge variant={s.status === 'Paid' ? 'default' : 'destructive'} className="text-[10px]">{s.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ReportWrapper>
  );
}

function PurchaseReport() {
  const { goBack } = useERPStore();
  const totalPurchases = purchaseInvoices.reduce((a, b) => a + b.grandTotal, 0);

  return (
    <ReportWrapper title="Purchase Report" goBack={goBack}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Purchases</p>
            <p className="text-lg font-bold tabular-nums">{formatCurrency(totalPurchases)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Orders</p>
            <p className="text-lg font-bold tabular-nums">{purchaseInvoices.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Tax Paid</p>
            <p className="text-lg font-bold tabular-nums">{formatCurrency(purchaseInvoices.reduce((a, b) => a + b.cgst + b.sgst + b.igst, 0))}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs h-9">P.O. No.</TableHead>
              <TableHead className="text-xs h-9">Date</TableHead>
              <TableHead className="text-xs h-9">Supplier</TableHead>
              <TableHead className="text-xs h-9 text-right">Amount</TableHead>
              <TableHead className="text-xs h-9">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseInvoices.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="text-xs py-2 font-medium text-primary">{p.invoiceNumber}</TableCell>
                <TableCell className="text-xs py-2 font-mono">{p.date}</TableCell>
                <TableCell className="text-xs py-2">{p.supplierName}</TableCell>
                <TableCell className="text-xs py-2 text-right tabular-nums font-mono">{formatCurrency(p.grandTotal)}</TableCell>
                <TableCell className="text-xs py-2"><Badge variant={p.paymentStatus === 'Paid' ? 'default' : 'destructive'} className="text-[10px]">{p.paymentStatus}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </ReportWrapper>
  );
}

function GSTReport() {
  const { goBack } = useERPStore();
  const totalCgst = salesInvoices.reduce((a, b) => a + b.cgst, 0);
  const totalSgst = salesInvoices.reduce((a, b) => a + b.sgst, 0);
  const totalIgst = salesInvoices.reduce((a, b) => a + b.igst, 0);
  const inputCgst = purchaseInvoices.reduce((a, b) => a + b.cgst, 0);
  const inputSgst = purchaseInvoices.reduce((a, b) => a + b.sgst, 0);

  return (
    <ReportWrapper title="GST Report" goBack={goBack}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-green-600">Output GST (Sales)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>CGST Collected</span>
                <span className="tabular-nums font-mono font-medium">{formatCurrency(Math.round(totalCgst))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>SGST Collected</span>
                <span className="tabular-nums font-mono font-medium">{formatCurrency(Math.round(totalSgst))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IGST Collected</span>
                <span className="tabular-nums font-mono font-medium">{formatCurrency(Math.round(totalIgst))}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                <span>Total Output GST</span>
                <span className="tabular-nums font-mono">{formatCurrency(Math.round(totalCgst + totalSgst + totalIgst))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-red-600">Input GST (Purchases)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>CGST Paid</span>
                <span className="tabular-nums font-mono font-medium">{formatCurrency(Math.round(inputCgst))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>SGST Paid</span>
                <span className="tabular-nums font-mono font-medium">{formatCurrency(Math.round(inputSgst))}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                <span>Total Input GST</span>
                <span className="tabular-nums font-mono">{formatCurrency(Math.round(inputCgst + inputSgst))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6 bg-primary/5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Net GST Payable</span>
            <span className="text-2xl font-bold tabular-nums text-primary">
              {formatCurrency(Math.round((totalCgst + totalSgst + totalIgst) - (inputCgst + inputSgst)))}
            </span>
          </div>
        </CardContent>
      </Card>
    </ReportWrapper>
  );
}