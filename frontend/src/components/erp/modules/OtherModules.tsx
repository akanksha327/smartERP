'use client';

import { useState } from 'react';
import { useERPStore } from '@/store/useERPStore';
import { PageHeader } from '@/components/erp/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Landmark,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Settings,
  Database,
  Users,
  BookOpen,
  Package,
  FileText,
  BarChart3,
  Bell,
  ShieldCheck,
  Globe,
  Building2,
  Printer,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { formatCurrency } from '@/data/mockData';
import { toast } from 'sonner';

// ==================== BANKING MODULE ====================
export function BankingModule() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader title="Banking" description="Bank accounts and transactions" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3 text-blue-100">
              <Landmark size={16} />
              <span className="text-xs font-medium">HDFC Bank</span>
            </div>
            <p className="text-2xl font-bold tabular-nums mb-1">₹8,75,000</p>
            <p className="text-xs text-blue-200">A/C: ****4521 · Savings</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3 text-emerald-100">
              <Landmark size={16} />
              <span className="text-xs font-medium">SBI Current</span>
            </div>
            <p className="text-2xl font-bold tabular-nums mb-1">₹3,20,000</p>
            <p className="text-xs text-emerald-200">A/C: ****7832 · Current</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              <Wallet size={16} />
              <span className="text-xs font-medium">Cash in Hand</span>
            </div>
            <p className="text-2xl font-bold tabular-nums mb-1">₹1,25,000</p>
            <p className="text-xs text-muted-foreground">Physical cash</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Recent Bank Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs h-9">Date</TableHead>
                <TableHead className="text-xs h-9">Type</TableHead>
                <TableHead className="text-xs h-9">Particulars</TableHead>
                <TableHead className="text-xs h-9">Bank</TableHead>
                <TableHead className="text-xs h-9 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: '2025-01-16', type: 'Receipt', particulars: 'Kiran Electronics', bank: 'HDFC', amount: 61600, inflow: true },
                { date: '2025-01-15', type: 'Payment', particulars: 'XYZ Wholesalers', bank: 'SBI', amount: 20000, inflow: false },
                { date: '2025-01-13', type: 'Receipt', particulars: 'Western Electronics (Refund)', bank: 'HDFC', amount: 5000, inflow: true },
                { date: '2025-01-09', type: 'Contra', particulars: 'Cash to HDFC Bank', bank: 'HDFC', amount: 50000, inflow: true },
                { date: '2025-01-05', type: 'Payment', particulars: 'ABC Suppliers', bank: 'SBI', amount: 25000, inflow: false },
              ].map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs py-2 font-mono">{t.date}</TableCell>
                  <TableCell className="text-xs py-2">
                    <Badge variant="outline" className="text-[10px]">{t.type}</Badge>
                  </TableCell>
                  <TableCell className="text-xs py-2 font-medium">{t.particulars}</TableCell>
                  <TableCell className="text-xs py-2 text-muted-foreground">{t.bank}</TableCell>
                  <TableCell className={`text-xs py-2 text-right tabular-nums font-mono font-medium ${t.inflow ? 'text-green-600' : 'text-red-600'}`}>
                    {t.inflow ? '+' : '-'}{formatCurrency(t.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== GST MODULE ====================
export function GSTModule() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader title="GST" description="GST compliance and returns" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'GSTR-1 (Sales)', value: '₹2,59,075', status: 'Filed', color: 'text-green-600' },
          { label: 'GSTR-3B (Summary)', value: '₹1,67,000', status: 'Pending', color: 'text-amber-600' },
          { label: 'GSTR-2A (Purchase)', value: '₹1,42,670', status: 'Auto-filled', color: 'text-blue-600' },
          { label: 'ITC Available', value: '₹1,42,670', status: '', color: 'text-foreground' },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-lg font-semibold tabular-nums">{item.value}</p>
              {item.status && (
                <Badge variant="outline" className="text-[10px] mt-1">{item.status}</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">GST Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { due: 'Jan 20, 2025', return: 'GSTR-1', period: 'December 2024', status: 'Filed' },
                { due: 'Jan 22, 2025', return: 'GSTR-3B', period: 'December 2024', status: 'Pending' },
                { due: 'Feb 20, 2025', return: 'GSTR-1', period: 'January 2025', status: 'Upcoming' },
              ].map((item) => (
                <div key={item.return + item.period} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.return}</p>
                    <p className="text-xs text-muted-foreground">{item.period} · Due: {item.due}</p>
                  </div>
                  <Badge variant={item.status === 'Filed' ? 'default' : item.status === 'Pending' ? 'destructive' : 'outline'} className="text-[10px]">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Quick GST Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { label: 'Output CGST', value: '₹9,507' },
                { label: 'Output SGST', value: '₹9,507' },
                { label: 'Output IGST', value: '₹0' },
                { label: 'Input CGST', value: '₹9,325' },
                { label: 'Input SGST', value: '₹9,325' },
                { label: 'Input IGST', value: '₹0' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-1.5 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="tabular-nums font-mono">{item.value}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between pt-1 text-sm font-semibold">
                <span>Net GST Payable</span>
                <span className="text-primary">{formatCurrency(364)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ==================== SETTINGS MODULE ====================
export function SettingsModule() {
  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <PageHeader title="Settings" description="Application preferences" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Toggle dark/light theme</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium">Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium">Number Format</Label>
                  <Select defaultValue="indian">
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian (1,23,456)</SelectItem>
                      <SelectItem value="international">International (123,456)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium">Currency Symbol</Label>
                  <Input className="h-9 mt-1" defaultValue="₹" />
                </div>
                <div>
                  <Label className="text-xs font-medium">Decimal Places</Label>
                  <Select defaultValue="2">
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="h-8" onClick={() => toast.success('Settings saved')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div><Label className="text-xs font-medium">Company Name</Label><Input className="h-9 mt-1" defaultValue="Sharma Trading Co." /></div>
              <div><Label className="text-xs font-medium">GST Number</Label><Input className="h-9 mt-1 font-mono" defaultValue="27AABCS1429B1Z5" /></div>
              <div><Label className="text-xs font-medium">PAN</Label><Input className="h-9 mt-1 font-mono" defaultValue="AABCS1429B" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-xs font-medium">State</Label><Input className="h-9 mt-1" defaultValue="Maharashtra" /></div>
                <div><Label className="text-xs font-medium">Financial Year</Label><Input className="h-9 mt-1" defaultValue="2024-25" /></div>
              </div>
              <Button className="h-8" onClick={() => toast.success('Company details saved')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {[
                { label: 'Low Stock Alerts', desc: 'Get notified when items are below minimum quantity' },
                { label: 'Payment Reminders', desc: 'Receive reminders for outstanding payments' },
                { label: 'GST Filing Reminders', desc: 'Alerts for upcoming GST filing due dates' },
                { label: 'Daily Summary', desc: 'Receive a daily summary of transactions' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label className="text-xs font-medium">Current Password</Label>
                <Input type="password" className="h-9 mt-1" />
              </div>
              <div>
                <Label className="text-xs font-medium">New Password</Label>
                <Input type="password" className="h-9 mt-1" />
              </div>
              <div>
                <Label className="text-xs font-medium">Confirm Password</Label>
                <Input type="password" className="h-9 mt-1" />
              </div>
              <Button className="h-8" onClick={() => toast.success('Password updated')}>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ==================== MASTERS MODULE ====================
export function MastersModule() {
  const { setActiveModule } = useERPStore();

  const masters = [
    { label: 'Ledger Groups', icon: <BookOpen size={20} />, count: 15, module: 'ledger' as const },
    { label: 'Customers', icon: <Users size={20} />, count: 12, module: 'customers' as const },
    { label: 'Suppliers', icon: <FileText size={20} />, count: 8, module: 'suppliers' as const },
    { label: 'Stock Items', icon: <Package size={20} />, count: 15, module: 'inventory' as const },
    { label: 'GST Rates', icon: <Receipt size={20} />, count: 4, module: 'gst' as const },
    { label: 'Reports', icon: <BarChart3 size={20} />, count: 8, module: 'reports' as const },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title="Masters" description="Configure your master data" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {masters.map((master) => (
          <Card
            key={master.label}
            className="cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => setActiveModule(master.module)}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                {master.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{master.label}</h3>
                <p className="text-xs text-muted-foreground">{master.count} records</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ==================== TRANSACTIONS MODULE ====================
export function TransactionsModule() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title="Transactions" description="All financial transactions" />
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
          <ArrowUpRight size={24} />
        </div>
        <h3 className="text-sm font-semibold mb-1">Transaction Center</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          Navigate to Sales, Purchases, or Banking from the sidebar to view and manage transactions.
        </p>
      </div>
    </div>
  );
}

// ==================== ADMINISTRATION MODULE ====================
export function AdministrationModule() {
  const { setActiveModule } = useERPStore();

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader title="Administration" description="System administration" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Settings', desc: 'Application preferences', icon: <Settings size={20} />, module: 'settings' as const },
          { label: 'User Management', desc: 'Manage users and roles', icon: <ShieldCheck size={20} />, module: 'settings' as const },
          { label: 'Data Backup', desc: 'Backup and restore data', icon: <Database size={20} />, module: 'settings' as const },
          { label: 'Company Settings', desc: 'Company information', icon: <Building2 size={20} />, module: 'settings' as const },
          { label: 'Print Settings', desc: 'Invoice and report templates', icon: <Printer size={20} />, module: 'settings' as const },
          { label: 'Integrations', desc: 'Email, SMS, and API', icon: <Globe size={20} />, module: 'settings' as const },
        ].map((item) => (
          <Card key={item.label} className="cursor-pointer hover:shadow-md transition-shadow group" onClick={() => setActiveModule(item.module)}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}