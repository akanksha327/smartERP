// SmartERP Type Definitions

export type ModuleId =
  | 'dashboard'
  | 'masters'
  | 'ledger'
  | 'customers'
  | 'suppliers'
  | 'inventory'
  | 'transactions'
  | 'sales'
  | 'purchases'
  | 'banking'
  | 'gst'
  | 'reports'
  | 'administration'
  | 'settings';

export type SubView =
  | 'list'
  | 'create'
  | 'details'
  | 'balance-sheet'
  | 'profit-loss'
  | 'trial-balance'
  | 'cash-flow'
  | 'stock-summary'
  | 'sales-report'
  | 'purchase-report'
  | 'gst-report';

export interface Company {
  id: string;
  name: string;
  gstNumber: string;
  financialYear: string;
  state: string;
  address: string;
  pinCode: string;
  phone: string;
  email: string;
  logo?: string;
}

export interface Ledger {
  id: string;
  name: string;
  group: string;
  openingBalance: number;
  balanceType: 'Debit' | 'Credit';
  gstNumber?: string;
  pan?: string;
  address?: string;
  mobile?: string;
  email?: string;
  state?: string;
  pinCode?: string;
  notes?: string;
  closingBalance?: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  state?: string;
  gstNumber?: string;
  pinCode?: string;
  address?: string;
  outstanding: number;
  lastPurchase?: string;
  totalPurchases: number;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  state?: string;
  gstNumber?: string;
  pinCode?: string;
  address?: string;
  outstanding: number;
  totalPurchases: number;
  createdAt: string;
}

export interface StockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  gstRate: number;
  hsn: string;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  minQuantity: number;
  inventoryValue: number;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  itemId: string;
  itemName: string;
  hsn: string;
  quantity: number;
  rate: number;
  discount: number;
  gstRate: number;
  cgst: number;
  sgst: number;
  igst: number;
  amount: number;
}

export interface SalesInvoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  paymentType: 'Cash' | 'Credit';
  items: InvoiceItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  grandTotal: number;
  status: 'Paid' | 'Unpaid' | 'Partial';
  createdAt: string;
}

export interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  supplierId: string;
  supplierName: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  grandTotal: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
  createdAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Sales' | 'Purchase' | 'Payment' | 'Receipt' | 'Journal' | 'Contra';
  voucherNumber: string;
  party: string;
  debit: number;
  credit: number;
  status?: string;
}

export interface StockMovement {
  id: string;
  date: string;
  item: string;
  type: 'In' | 'Out' | 'Adjustment';
  quantity: number;
  reference: string;
  notes?: string;
}

export interface LedgerGroup {
  id: string;
  name: string;
  parent?: string;
  type: 'Assets' | 'Liabilities' | 'Income' | 'Expenses';
}

export interface SidebarItem {
  id: ModuleId;
  label: string;
  icon: string;
  children?: { id: ModuleId; label: string; icon?: string }[];
}

export interface QuickStat {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
}

export interface ActivityItem {
  id: string;
  action: string;
  details: string;
  time: string;
  type: 'create' | 'update' | 'delete' | 'payment';
}