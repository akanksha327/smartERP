import type {
  Company,
  Ledger,
  Customer,
  Supplier,
  StockItem,
  SalesInvoice,
  PurchaseInvoice,
  Transaction,
  StockMovement,
  MonthlyRevenue,
  ActivityItem,
  LedgerGroup,
} from '@/types/erp';

export const companies: Company[] = [
  {
    id: '1',
    name: 'Sharma Trading Co.',
    gstNumber: '27AABCS1429B1Z5',
    financialYear: '2024-25',
    state: 'Maharashtra',
    address: '123, Shivaji Nagar, Pune',
    pinCode: '411005',
    phone: '+91 98765 43210',
    email: 'accounts@sharmatrading.in',
  },
  {
    id: '2',
    name: 'Patel Electronics',
    gstNumber: '24AABCP5678C2Z3',
    financialYear: '2024-25',
    state: 'Gujarat',
    address: '456, CG Road, Ahmedabad',
    pinCode: '380006',
    phone: '+91 87654 32109',
    email: 'info@patelelectronics.in',
  },
  {
    id: '3',
    name: 'Mehta & Sons',
    gstNumber: '07AABCM9012D3Z1',
    financialYear: '2024-25',
    state: 'Delhi',
    address: '789, Connaught Place, New Delhi',
    pinCode: '110001',
    phone: '+91 76543 21098',
    email: 'accounts@mehtasons.com',
  },
];

export const ledgerGroups: LedgerGroup[] = [
  { id: '1', name: 'Capital Account', type: 'Liabilities' },
  { id: '2', name: 'Current Assets', type: 'Assets' },
  { id: '3', name: 'Current Liabilities', type: 'Liabilities' },
  { id: '4', name: 'Fixed Assets', type: 'Assets' },
  { id: '5', name: 'Direct Expenses', type: 'Expenses' },
  { id: '6', name: 'Direct Incomes', type: 'Income' },
  { id: '7', name: 'Indirect Expenses', type: 'Expenses' },
  { id: '8', name: 'Indirect Incomes', type: 'Income' },
  { id: '9', name: 'Bank Accounts', type: 'Current Assets' },
  { id: '10', name: 'Cash-in-Hand', type: 'Current Assets' },
  { id: '11', name: 'Sundry Debtors', type: 'Current Assets' },
  { id: '12', name: 'Sundry Creditors', type: 'Current Liabilities' },
  { id: '13', name: 'Purchase Accounts', type: 'Direct Expenses' },
  { id: '14', name: 'Sales Accounts', type: 'Direct Incomes' },
  { id: '15', name: 'Duties & Taxes', type: 'Current Liabilities' },
];

export const ledgers: Ledger[] = [
  { id: 'L1', name: 'Cash Account', group: 'Cash-in-Hand', openingBalance: 50000, balanceType: 'Debit', closingBalance: 125000, createdAt: '2024-04-01' },
  { id: 'L2', name: 'HDFC Bank', group: 'Bank Accounts', openingBalance: 500000, balanceType: 'Debit', gstNumber: '', pan: 'AABCS1429B', mobile: '9876543210', closingBalance: 875000, createdAt: '2024-04-01' },
  { id: 'L3', name: 'SBI Current Account', group: 'Bank Accounts', openingBalance: 250000, balanceType: 'Debit', closingBalance: 320000, createdAt: '2024-04-01' },
  { id: 'L4', name: 'Rajesh Kumar', group: 'Sundry Debtors', openingBalance: 45000, balanceType: 'Debit', mobile: '9812345678', state: 'Maharashtra', closingBalance: 78000, createdAt: '2024-04-01' },
  { id: 'L5', name: 'ABC Suppliers', group: 'Sundry Creditors', openingBalance: 120000, balanceType: 'Credit', gstNumber: '27AABCX1234E1Z7', mobile: '9876512345', state: 'Maharashtra', closingBalance: 95000, createdAt: '2024-04-01' },
  { id: 'L6', name: 'Sales Account', group: 'Sales Accounts', openingBalance: 0, balanceType: 'Credit', closingBalance: 2450000, createdAt: '2024-04-01' },
  { id: 'L7', name: 'Purchase Account', group: 'Purchase Accounts', openingBalance: 0, balanceType: 'Debit', closingBalance: 1820000, createdAt: '2024-04-01' },
  { id: 'L8', name: 'Rent Expense', group: 'Indirect Expenses', openingBalance: 0, balanceType: 'Debit', closingBalance: 180000, createdAt: '2024-04-01' },
  { id: 'L9', name: 'Salary Expense', group: 'Indirect Expenses', openingBalance: 0, balanceType: 'Debit', closingBalance: 480000, createdAt: '2024-04-01' },
  { id: 'L10', name: 'CGST', group: 'Duties & Taxes', openingBalance: 0, balanceType: 'Credit', closingBalance: 67500, createdAt: '2024-04-01' },
  { id: 'L11', name: 'SGST', group: 'Duties & Taxes', openingBalance: 0, balanceType: 'Credit', closingBalance: 67500, createdAt: '2024-04-01' },
  { id: 'L12', name: 'IGST', group: 'Duties & Taxes', openingBalance: 0, balanceType: 'Credit', closingBalance: 32000, createdAt: '2024-04-01' },
  { id: 'L13', name: 'Priya Enterprises', group: 'Sundry Debtors', openingBalance: 28000, balanceType: 'Debit', mobile: '9823456789', state: 'Gujarat', closingBalance: 52000, createdAt: '2024-04-15' },
  { id: 'L14', name: 'XYZ Wholesalers', group: 'Sundry Creditors', openingBalance: 85000, balanceType: 'Credit', gstNumber: '24AABCY5678F2Z9', mobile: '9876523456', state: 'Gujarat', closingBalance: 62000, createdAt: '2024-04-01' },
  { id: 'L15', name: 'Interest Income', group: 'Indirect Incomes', openingBalance: 0, balanceType: 'Credit', closingBalance: 12500, createdAt: '2024-04-01' },
  { id: 'L16', name: 'Office Equipment', group: 'Fixed Assets', openingBalance: 150000, balanceType: 'Debit', closingBalance: 142500, createdAt: '2024-04-01' },
  { id: 'L17', name: 'Capital Account', group: 'Capital Account', openingBalance: 1000000, balanceType: 'Credit', pan: 'AABCS1429B', closingBalance: 1000000, createdAt: '2024-04-01' },
  { id: 'L18', name: 'Electricity Expense', group: 'Indirect Expenses', openingBalance: 0, balanceType: 'Debit', closingBalance: 42000, createdAt: '2024-04-01' },
];

export const customers: Customer[] = [
  { id: 'C1', name: 'Rajesh Kumar', mobile: '9812345678', email: 'rajesh@gmail.com', city: 'Mumbai', state: 'Maharashtra', gstNumber: '27AADCR5678G1Z3', pinCode: '400001', outstanding: 78000, lastPurchase: '2025-01-15', totalPurchases: 456000, createdAt: '2024-04-01' },
  { id: 'C2', name: 'Priya Enterprises', mobile: '9823456789', email: 'priya@enterprises.in', city: 'Ahmedabad', state: 'Gujarat', gstNumber: '24AADCP9012H2Z5', pinCode: '380001', outstanding: 52000, lastPurchase: '2025-01-12', totalPurchases: 320000, createdAt: '2024-04-15' },
  { id: 'C3', name: 'Suresh Traders', mobile: '9834567890', email: 'suresh@traders.com', city: 'Delhi', state: 'Delhi', gstNumber: '07AABCS3456I3Z7', pinCode: '110002', outstanding: 0, lastPurchase: '2025-01-10', totalPurchases: 198000, createdAt: '2024-05-01' },
  { id: 'C4', name: 'Meera Textiles', mobile: '9845678901', email: 'meera@textiles.in', city: 'Jaipur', state: 'Rajasthan', gstNumber: '08AABCM7890J4Z9', pinCode: '302001', outstanding: 35000, lastPurchase: '2025-01-08', totalPurchases: 267000, createdAt: '2024-06-01' },
  { id: 'C5', name: 'Kiran Electronics', mobile: '9856789012', email: 'kiran@electronics.com', city: 'Bangalore', state: 'Karnataka', gstNumber: '29AADCK1234K5Z1', pinCode: '560001', outstanding: 95000, lastPurchase: '2025-01-14', totalPurchases: 589000, createdAt: '2024-04-10' },
  { id: 'C6', name: 'Deepak Hardware', mobile: '9867890123', email: 'deepak@hardware.in', city: 'Chennai', state: 'Tamil Nadu', gstNumber: '33AABCD5678L6Z3', pinCode: '600001', outstanding: 18000, lastPurchase: '2025-01-05', totalPurchases: 145000, createdAt: '2024-07-01' },
  { id: 'C7', name: 'Anita General Store', mobile: '9878901234', email: 'anita@generalstore.com', city: 'Pune', state: 'Maharashtra', gstNumber: '27AADCA9012M7Z5', pinCode: '411001', outstanding: 0, lastPurchase: '2024-12-28', totalPurchases: 89000, createdAt: '2024-08-01' },
  { id: 'C8', name: 'Vikram Industries', mobile: '9889012345', email: 'vikram@industries.in', city: 'Hyderabad', state: 'Telangana', gstNumber: '36AABCV3456N8Z7', pinCode: '500001', outstanding: 124000, lastPurchase: '2025-01-16', totalPurchases: 723000, createdAt: '2024-04-05' },
  { id: 'C9', name: 'Nandini Sarees', mobile: '9890123456', email: 'nandini@sarees.com', city: 'Surat', state: 'Gujarat', gstNumber: '24AABCN7890O9Z9', pinCode: '395001', outstanding: 42000, lastPurchase: '2025-01-11', totalPurchases: 312000, createdAt: '2024-05-15' },
  { id: 'C10', name: 'Ravi Medical Store', mobile: '9801234567', email: 'ravi@medical.in', city: 'Nagpur', state: 'Maharashtra', gstNumber: '27AADCR1234P1Z1', pinCode: '440001', outstanding: 65000, lastPurchase: '2025-01-13', totalPurchases: 478000, createdAt: '2024-06-15' },
  { id: 'C11', name: 'Sunil Provision Store', mobile: '9812345670', email: 'sunil@provision.in', city: 'Mumbai', state: 'Maharashtra', outstanding: 23000, lastPurchase: '2025-01-09', totalPurchases: 156000, createdAt: '2024-07-15' },
  { id: 'C12', name: 'Geeta Fashions', mobile: '9823456780', email: 'geeta@fashions.com', city: 'Delhi', state: 'Delhi', outstanding: 88000, lastPurchase: '2025-01-16', totalPurchases: 634000, createdAt: '2024-04-20' },
];

export const suppliers: Supplier[] = [
  { id: 'S1', name: 'ABC Suppliers', mobile: '9876512345', email: 'sales@abcsuppliers.in', city: 'Mumbai', state: 'Maharashtra', gstNumber: '27AABCX1234E1Z7', pinCode: '400002', outstanding: 95000, totalPurchases: 1250000, createdAt: '2024-04-01' },
  { id: 'S2', name: 'XYZ Wholesalers', mobile: '9876523456', email: 'info@xyzwholesale.com', city: 'Ahmedabad', state: 'Gujarat', gstNumber: '24AABCY5678F2Z9', pinCode: '380002', outstanding: 62000, totalPurchases: 890000, createdAt: '2024-04-01' },
  { id: 'S3', name: 'National Distributors', mobile: '9876534567', email: 'contact@nationaldist.in', city: 'Delhi', state: 'Delhi', gstNumber: '07AABCN9012G3Z1', pinCode: '110003', outstanding: 145000, totalPurchases: 2100000, createdAt: '2024-04-01' },
  { id: 'S4', name: 'Southern Textiles', mobile: '9876545678', email: 'orders@southerntextiles.com', city: 'Chennai', state: 'Tamil Nadu', gstNumber: '33AABCS1234H4Z3', pinCode: '600002', outstanding: 38000, totalPurchases: 567000, createdAt: '2024-05-01' },
  { id: 'S5', name: 'Western Electronics', mobile: '9876556789', email: 'supply@westernelec.in', city: 'Pune', state: 'Maharashtra', gstNumber: '27AABCW5678I5Z5', pinCode: '411002', outstanding: 178000, totalPurchases: 1560000, createdAt: '2024-04-15' },
  { id: 'S6', name: 'Royal Chemicals', mobile: '9876567890', email: 'info@royalchemicals.com', city: 'Hyderabad', state: 'Telangana', gstNumber: '36AABCR9012J6Z7', pinCode: '500002', outstanding: 0, totalPurchases: 234000, createdAt: '2024-06-01' },
  { id: 'S7', name: 'Global Trading Corp', mobile: '9876578901', email: 'trade@globalcorp.in', city: 'Mumbai', state: 'Maharashtra', gstNumber: '27AABCG3456K7Z9', pinCode: '400003', outstanding: 210000, totalPurchases: 1890000, createdAt: '2024-04-01' },
  { id: 'S8', name: 'Pioneer Industries', mobile: '9876589012', email: 'sales@pioneerind.com', city: 'Bangalore', state: 'Karnataka', gstNumber: '29AABCP7890L8Z1', pinCode: '560002', outstanding: 56000, totalPurchases: 445000, createdAt: '2024-07-01' },
];

export const stockItems: StockItem[] = [
  { id: 'I1', sku: 'SKU-001', name: 'Premium Basmati Rice (25kg)', category: 'Grocery', purchasePrice: 850, sellingPrice: 1050, quantity: 120, gstRate: 5, hsn: '10063020', unit: 'Bag', status: 'In Stock', minQuantity: 20, inventoryValue: 102000, createdAt: '2024-04-01' },
  { id: 'I2', sku: 'SKU-002', name: 'Refined Sunflower Oil (15L)', category: 'Oil', purchasePrice: 1400, sellingPrice: 1680, quantity: 85, gstRate: 5, hsn: '15121100', unit: 'Can', status: 'In Stock', minQuantity: 15, inventoryValue: 119000, createdAt: '2024-04-01' },
  { id: 'I3', sku: 'SKU-003', name: 'Toor Dal (50kg)', category: 'Pulses', purchasePrice: 4200, sellingPrice: 5200, quantity: 45, gstRate: 5, hsn: '07132010', unit: 'Bag', status: 'In Stock', minQuantity: 10, inventoryValue: 189000, createdAt: '2024-04-01' },
  { id: 'I4', sku: 'SKU-004', name: 'Sugar (50kg)', category: 'Grocery', purchasePrice: 2450, sellingPrice: 2900, quantity: 8, gstRate: 5, hsn: '17019910', unit: 'Bag', status: 'Low Stock', minQuantity: 10, inventoryValue: 19600, createdAt: '2024-04-01' },
  { id: 'I5', sku: 'SKU-005', name: 'Wheat Flour (50kg)', category: 'Flour', purchasePrice: 1800, sellingPrice: 2200, quantity: 65, gstRate: 5, hsn: '11010010', unit: 'Bag', status: 'In Stock', minQuantity: 15, inventoryValue: 117000, createdAt: '2024-04-01' },
  { id: 'I6', sku: 'SKU-006', name: 'Soyabean Oil (15L)', category: 'Oil', purchasePrice: 1650, sellingPrice: 1980, quantity: 0, gstRate: 5, hsn: '15121100', unit: 'Can', status: 'Out of Stock', minQuantity: 10, inventoryValue: 0, createdAt: '2024-04-15' },
  { id: 'I7', sku: 'SKU-007', name: 'Moong Dal (25kg)', category: 'Pulses', purchasePrice: 3200, sellingPrice: 3900, quantity: 35, gstRate: 5, hsn: '07132010', unit: 'Bag', status: 'In Stock', minQuantity: 8, inventoryValue: 112000, createdAt: '2024-04-01' },
  { id: 'I8', sku: 'SKU-008', name: 'Tea Powder (1kg)', category: 'Beverages', purchasePrice: 450, sellingPrice: 580, quantity: 200, gstRate: 5, hsn: '09023010', unit: 'Packet', status: 'In Stock', minQuantity: 30, inventoryValue: 90000, createdAt: '2024-04-01' },
  { id: 'I9', sku: 'SKU-009', name: 'Jaggery (25kg)', category: 'Grocery', purchasePrice: 1250, sellingPrice: 1550, quantity: 5, gstRate: 5, hsn: '17026000', unit: 'Block', status: 'Low Stock', minQuantity: 8, inventoryValue: 6250, createdAt: '2024-05-01' },
  { id: 'I10', sku: 'SKU-010', name: 'Cashew Nuts (1kg)', category: 'Dry Fruits', purchasePrice: 800, sellingPrice: 1100, quantity: 150, gstRate: 12, hsn: '08013110', unit: 'Packet', status: 'In Stock', minQuantity: 20, inventoryValue: 120000, createdAt: '2024-04-01' },
  { id: 'I11', sku: 'SKU-011', name: 'Almonds (500g)', category: 'Dry Fruits', purchasePrice: 550, sellingPrice: 750, quantity: 0, gstRate: 12, hsn: '08021110', unit: 'Packet', status: 'Out of Stock', minQuantity: 25, inventoryValue: 0, createdAt: '2024-04-15' },
  { id: 'I12', sku: 'SKU-012', name: 'Salt (1kg)', category: 'Grocery', purchasePrice: 25, sellingPrice: 35, quantity: 500, gstRate: 5, hsn: '25010010', unit: 'Packet', status: 'In Stock', minQuantity: 50, inventoryValue: 12500, createdAt: '2024-04-01' },
  { id: 'I13', sku: 'SKU-013', name: 'Turmeric Powder (500g)', category: 'Spices', purchasePrice: 120, sellingPrice: 175, quantity: 3, gstRate: 5, hsn: '09103030', unit: 'Packet', status: 'Low Stock', minQuantity: 10, inventoryValue: 360, createdAt: '2024-06-01' },
  { id: 'I14', sku: 'SKU-014', name: 'Red Chilli Powder (500g)', category: 'Spices', purchasePrice: 140, sellingPrice: 200, quantity: 95, gstRate: 5, hsn: '09042020', unit: 'Packet', status: 'In Stock', minQuantity: 15, inventoryValue: 13300, createdAt: '2024-04-01' },
  { id: 'I15', sku: 'SKU-015', name: 'Basmati Rice (5kg)', category: 'Grocery', purchasePrice: 280, sellingPrice: 350, quantity: 250, gstRate: 5, hsn: '10063020', unit: 'Packet', status: 'In Stock', minQuantity: 30, inventoryValue: 70000, createdAt: '2024-04-01' },
];

export const salesInvoices: SalesInvoice[] = [
  {
    id: 'SI-001', invoiceNumber: 'INV-2025-001', customerId: 'C1', customerName: 'Rajesh Kumar', date: '2025-01-16', paymentType: 'Credit',
    items: [
      { id: 'ii1', itemId: 'I1', itemName: 'Premium Basmati Rice (25kg)', hsn: '10063020', quantity: 10, rate: 1050, discount: 0, gstRate: 5, cgst: 262.5, sgst: 262.5, igst: 0, amount: 11025 },
      { id: 'ii2', itemId: 'I8', itemName: 'Tea Powder (1kg)', hsn: '09023010', quantity: 20, rate: 580, discount: 0, gstRate: 5, cgst: 290, sgst: 290, igst: 0, amount: 12180 },
    ],
    subtotal: 18100, cgst: 552.5, sgst: 552.5, igst: 0, grandTotal: 19205, status: 'Unpaid', createdAt: '2025-01-16',
  },
  {
    id: 'SI-002', invoiceNumber: 'INV-2025-002', customerId: 'C5', customerName: 'Kiran Electronics', date: '2025-01-16', paymentType: 'Cash',
    items: [
      { id: 'ii3', itemId: 'I10', itemName: 'Cashew Nuts (1kg)', hsn: '08013110', quantity: 50, rate: 1100, discount: 0, gstRate: 12, cgst: 330, sgst: 330, igst: 0, amount: 61600 },
    ],
    subtotal: 55000, cgst: 3300, sgst: 3300, igst: 0, grandTotal: 61600, status: 'Paid', createdAt: '2025-01-16',
  },
  {
    id: 'SI-003', invoiceNumber: 'INV-2025-003', customerId: 'C2', customerName: 'Priya Enterprises', date: '2025-01-15', paymentType: 'Credit',
    items: [
      { id: 'ii4', itemId: 'I5', itemName: 'Wheat Flour (50kg)', hsn: '11010010', quantity: 20, rate: 2200, discount: 0, gstRate: 5, cgst: 1100, sgst: 1100, igst: 0, amount: 46200 },
    ],
    subtotal: 44000, cgst: 1100, sgst: 1100, igst: 0, grandTotal: 46200, status: 'Unpaid', createdAt: '2025-01-15',
  },
  {
    id: 'SI-004', invoiceNumber: 'INV-2025-004', customerId: 'C8', customerName: 'Vikram Industries', date: '2025-01-15', paymentType: 'Credit',
    items: [
      { id: 'ii5', itemId: 'I3', itemName: 'Toor Dal (50kg)', hsn: '07132010', quantity: 15, rate: 5200, discount: 200, gstRate: 5, cgst: 1875, sgst: 1875, igst: 0, amount: 78750 },
    ],
    subtotal: 75000, cgst: 1875, sgst: 1875, igst: 0, grandTotal: 78750, status: 'Partial', createdAt: '2025-01-15',
  },
  {
    id: 'SI-005', invoiceNumber: 'INV-2025-005', customerId: 'C4', customerName: 'Meera Textiles', date: '2025-01-14', paymentType: 'Cash',
    items: [
      { id: 'ii6', itemId: 'I2', itemName: 'Refined Sunflower Oil (15L)', hsn: '15121100', quantity: 8, rate: 1680, discount: 0, gstRate: 5, cgst: 336, sgst: 336, igst: 0, amount: 14112 },
    ],
    subtotal: 13440, cgst: 336, sgst: 336, igst: 0, grandTotal: 14112, status: 'Paid', createdAt: '2025-01-14',
  },
  {
    id: 'SI-006', invoiceNumber: 'INV-2025-006', customerId: 'C10', customerName: 'Ravi Medical Store', date: '2025-01-13', paymentType: 'Credit',
    items: [
      { id: 'ii7', itemId: 'I7', itemName: 'Moong Dal (25kg)', hsn: '07132010', quantity: 10, rate: 3900, discount: 0, gstRate: 5, cgst: 975, sgst: 975, igst: 0, amount: 40950 },
    ],
    subtotal: 39000, cgst: 975, sgst: 975, igst: 0, grandTotal: 40950, status: 'Unpaid', createdAt: '2025-01-13',
  },
  {
    id: 'SI-007', invoiceNumber: 'INV-2025-007', customerId: 'C9', customerName: 'Nandini Sarees', date: '2025-01-12', paymentType: 'Cash',
    items: [
      { id: 'ii8', itemId: 'I14', itemName: 'Red Chilli Powder (500g)', hsn: '09042020', quantity: 100, rate: 200, discount: 0, gstRate: 5, cgst: 500, sgst: 500, igst: 0, amount: 21000 },
    ],
    subtotal: 20000, cgst: 500, sgst: 500, igst: 0, grandTotal: 21000, status: 'Paid', createdAt: '2025-01-12',
  },
  {
    id: 'SI-008', invoiceNumber: 'INV-2025-008', customerId: 'C3', customerName: 'Suresh Traders', date: '2025-01-10', paymentType: 'Cash',
    items: [
      { id: 'ii9', itemId: 'I12', itemName: 'Salt (1kg)', hsn: '25010010', quantity: 200, rate: 35, discount: 0, gstRate: 5, cgst: 175, sgst: 175, igst: 0, amount: 7350 },
    ],
    subtotal: 7000, cgst: 175, sgst: 175, igst: 0, grandTotal: 7350, status: 'Paid', createdAt: '2025-01-10',
  },
];

export const purchaseInvoices: PurchaseInvoice[] = [
  {
    id: 'PI-001', invoiceNumber: 'PUR-2025-001', supplierId: 'S1', supplierName: 'ABC Suppliers', date: '2025-01-16',
    items: [
      { id: 'pi1', itemId: 'I1', itemName: 'Premium Basmati Rice (25kg)', hsn: '10063020', quantity: 50, rate: 850, discount: 0, gstRate: 5, cgst: 1062.5, sgst: 1062.5, igst: 0, amount: 44625 },
    ],
    subtotal: 42500, cgst: 1062.5, sgst: 1062.5, igst: 0, grandTotal: 44625, paymentStatus: 'Unpaid', createdAt: '2025-01-16',
  },
  {
    id: 'PI-002', invoiceNumber: 'PUR-2025-002', supplierId: 'S2', supplierName: 'XYZ Wholesalers', date: '2025-01-15',
    items: [
      { id: 'pi2', itemId: 'I2', itemName: 'Refined Sunflower Oil (15L)', hsn: '15121100', quantity: 30, rate: 1400, discount: 0, gstRate: 5, cgst: 1050, sgst: 1050, igst: 0, amount: 44100 },
    ],
    subtotal: 42000, cgst: 1050, sgst: 1050, igst: 0, grandTotal: 44100, paymentStatus: 'Partial', createdAt: '2025-01-15',
  },
  {
    id: 'PI-003', invoiceNumber: 'PUR-2025-003', supplierId: 'S3', supplierName: 'National Distributors', date: '2025-01-14',
    items: [
      { id: 'pi3', itemId: 'I3', itemName: 'Toor Dal (50kg)', hsn: '07132010', quantity: 25, rate: 4200, discount: 100, gstRate: 5, cgst: 2612.5, sgst: 2612.5, igst: 0, amount: 109725 },
    ],
    subtotal: 104500, cgst: 2612.5, sgst: 2612.5, igst: 0, grandTotal: 109725, paymentStatus: 'Unpaid', createdAt: '2025-01-14',
  },
  {
    id: 'PI-004', invoiceNumber: 'PUR-2025-004', supplierId: 'S5', supplierName: 'Western Electronics', date: '2025-01-13',
    items: [
      { id: 'pi4', itemId: 'I10', itemName: 'Cashew Nuts (1kg)', hsn: '08013110', quantity: 80, rate: 800, discount: 0, gstRate: 12, cgst: 2400, sgst: 2400, igst: 0, amount: 71680 },
    ],
    subtotal: 64000, cgst: 2400, sgst: 2400, igst: 0, grandTotal: 71680, paymentStatus: 'Paid', createdAt: '2025-01-13',
  },
  {
    id: 'PI-005', invoiceNumber: 'PUR-2025-005', supplierId: 'S7', supplierName: 'Global Trading Corp', date: '2025-01-12',
    items: [
      { id: 'pi5', itemId: 'I5', itemName: 'Wheat Flour (50kg)', hsn: '11010010', quantity: 40, rate: 1800, discount: 0, gstRate: 5, cgst: 1800, sgst: 1800, igst: 0, amount: 75600 },
    ],
    subtotal: 72000, cgst: 1800, sgst: 1800, igst: 0, grandTotal: 75600, paymentStatus: 'Unpaid', createdAt: '2025-01-12',
  },
];

export const transactions: Transaction[] = [
  { id: 'T1', date: '2025-01-16', type: 'Sales', voucherNumber: 'INV-2025-001', party: 'Rajesh Kumar', debit: 0, credit: 19205, status: 'Unpaid' },
  { id: 'T2', date: '2025-01-16', type: 'Sales', voucherNumber: 'INV-2025-002', party: 'Kiran Electronics', debit: 0, credit: 61600, status: 'Paid' },
  { id: 'T3', date: '2025-01-16', type: 'Purchase', voucherNumber: 'PUR-2025-001', party: 'ABC Suppliers', debit: 44625, credit: 0, status: 'Unpaid' },
  { id: 'T4', date: '2025-01-15', type: 'Sales', voucherNumber: 'INV-2025-003', party: 'Priya Enterprises', debit: 0, credit: 46200, status: 'Unpaid' },
  { id: 'T5', date: '2025-01-15', type: 'Sales', voucherNumber: 'INV-2025-004', party: 'Vikram Industries', debit: 0, credit: 78750, status: 'Partial' },
  { id: 'T6', date: '2025-01-15', type: 'Purchase', voucherNumber: 'PUR-2025-002', party: 'XYZ Wholesalers', debit: 44100, credit: 0, status: 'Partial' },
  { id: 'T7', date: '2025-01-15', type: 'Payment', voucherNumber: 'PAY-2025-001', party: 'XYZ Wholesalers', debit: 20000, credit: 0, status: '' },
  { id: 'T8', date: '2025-01-14', type: 'Sales', voucherNumber: 'INV-2025-005', party: 'Meera Textiles', debit: 0, credit: 14112, status: 'Paid' },
  { id: 'T9', date: '2025-01-14', type: 'Purchase', voucherNumber: 'PUR-2025-003', party: 'National Distributors', debit: 109725, credit: 0, status: 'Unpaid' },
  { id: 'T10', date: '2025-01-14', type: 'Receipt', voucherNumber: 'REC-2025-001', party: 'Kiran Electronics', debit: 0, credit: 61600, status: '' },
  { id: 'T11', date: '2025-01-13', type: 'Sales', voucherNumber: 'INV-2025-006', party: 'Ravi Medical Store', debit: 0, credit: 40950, status: 'Unpaid' },
  { id: 'T12', date: '2025-01-13', type: 'Purchase', voucherNumber: 'PUR-2025-004', party: 'Western Electronics', debit: 71680, credit: 0, status: 'Paid' },
  { id: 'T13', date: '2025-01-12', type: 'Sales', voucherNumber: 'INV-2025-007', party: 'Nandini Sarees', debit: 0, credit: 21000, status: 'Paid' },
  { id: 'T14', date: '2025-01-12', type: 'Purchase', voucherNumber: 'PUR-2025-005', party: 'Global Trading Corp', debit: 75600, credit: 0, status: 'Unpaid' },
  { id: 'T15', date: '2025-01-10', type: 'Sales', voucherNumber: 'INV-2025-008', party: 'Suresh Traders', debit: 0, credit: 7350, status: 'Paid' },
  { id: 'T16', date: '2025-01-09', type: 'Contra', voucherNumber: 'CON-2025-001', party: 'Cash to HDFC Bank', debit: 50000, credit: 50000, status: '' },
  { id: 'T17', date: '2025-01-08', type: 'Journal', voucherNumber: 'JR-2025-001', party: 'Depreciation - Office Equipment', debit: 2500, credit: 2500, status: '' },
  { id: 'T18', date: '2025-01-05', type: 'Payment', voucherNumber: 'PAY-2025-002', party: 'ABC Suppliers', debit: 25000, credit: 0, status: '' },
];

export const stockMovements: StockMovement[] = [
  { id: 'SM1', date: '2025-01-16', item: 'Premium Basmati Rice (25kg)', type: 'In', quantity: 50, reference: 'PUR-2025-001', notes: 'From ABC Suppliers' },
  { id: 'SM2', date: '2025-01-16', item: 'Premium Basmati Rice (25kg)', type: 'Out', quantity: 10, reference: 'INV-2025-001', notes: 'Sold to Rajesh Kumar' },
  { id: 'SM3', date: '2025-01-16', item: 'Cashew Nuts (1kg)', type: 'Out', quantity: 50, reference: 'INV-2025-002', notes: 'Sold to Kiran Electronics' },
  { id: 'SM4', date: '2025-01-15', item: 'Wheat Flour (50kg)', type: 'Out', quantity: 20, reference: 'INV-2025-003', notes: 'Sold to Priya Enterprises' },
  { id: 'SM5', date: '2025-01-15', item: 'Toor Dal (50kg)', type: 'In', quantity: 25, reference: 'PUR-2025-003', notes: 'From National Distributors' },
  { id: 'SM6', date: '2025-01-14', item: 'Refined Sunflower Oil (15L)', type: 'Out', quantity: 8, reference: 'INV-2025-005', notes: 'Sold to Meera Textiles' },
  { id: 'SM7', date: '2025-01-13', item: 'Cashew Nuts (1kg)', type: 'In', quantity: 80, reference: 'PUR-2025-004', notes: 'From Western Electronics' },
  { id: 'SM8', date: '2025-01-12', item: 'Wheat Flour (50kg)', type: 'In', quantity: 40, reference: 'PUR-2025-005', notes: 'From Global Trading Corp' },
  { id: 'SM9', date: '2025-01-10', item: 'Salt (1kg)', type: 'Out', quantity: 200, reference: 'INV-2025-008', notes: 'Sold to Suresh Traders' },
  { id: 'SM10', date: '2025-01-08', item: 'Sugar (50kg)', type: 'Adjustment', quantity: -5, reference: 'ADJ-2025-001', notes: 'Damaged stock written off' },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Apr', revenue: 320000, expenses: 245000 },
  { month: 'May', revenue: 380000, expenses: 278000 },
  { month: 'Jun', revenue: 290000, expenses: 215000 },
  { month: 'Jul', revenue: 410000, expenses: 295000 },
  { month: 'Aug', revenue: 350000, expenses: 260000 },
  { month: 'Sep', revenue: 425000, expenses: 310000 },
  { month: 'Oct', revenue: 390000, expenses: 285000 },
  { month: 'Nov', revenue: 460000, expenses: 340000 },
  { month: 'Dec', revenue: 520000, expenses: 375000 },
  { month: 'Jan', revenue: 445000, expenses: 320000 },
];

export const activities: ActivityItem[] = [
  { id: 'A1', action: 'Sales Invoice Created', details: 'INV-2025-001 for Rajesh Kumar - ₹19,205', time: '10 min ago', type: 'create' },
  { id: 'A2', action: 'Payment Received', details: '₹61,600 from Kiran Electronics', time: '25 min ago', type: 'payment' },
  { id: 'A3', action: 'Purchase Order', details: 'PUR-2025-001 from ABC Suppliers - ₹44,625', time: '1 hour ago', type: 'create' },
  { id: 'A4', action: 'Stock Updated', details: 'Premium Basmati Rice - 50 bags received', time: '1 hour ago', type: 'update' },
  { id: 'A5', action: 'New Customer Added', details: 'Geeta Fashions - Delhi', time: '2 hours ago', type: 'create' },
  { id: 'A6', action: 'Sales Invoice Created', details: 'INV-2025-003 for Priya Enterprises - ₹46,200', time: '3 hours ago', type: 'create' },
  { id: 'A7', action: 'Payment Made', details: '₹20,000 to XYZ Wholesalers', time: '4 hours ago', type: 'payment' },
  { id: 'A8', action: 'Ledger Updated', details: 'Closing balance updated for HDFC Bank', time: '5 hours ago', type: 'update' },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};