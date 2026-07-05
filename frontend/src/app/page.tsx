'use client';

import { AppLayout } from '@/components/erp/layout/AppLayout';
import { useERPStore } from '@/store/useERPStore';
import { useAuth } from '@/context/AuthContext';
import { LoginView } from '@/components/erp/shared/LoginView';
import { Loader2 } from 'lucide-react';
import { Dashboard } from '@/components/erp/modules/Dashboard';
import { LedgerModule } from '@/components/erp/modules/LedgerModule';
import { CustomerModule } from '@/components/erp/modules/CustomerModule';
import { SupplierModule } from '@/components/erp/modules/SupplierModule';
import { InventoryModule } from '@/components/erp/modules/InventoryModule';
import { SalesModule } from '@/components/erp/modules/SalesModule';
import { PurchaseModule } from '@/components/erp/modules/PurchaseModule';
import { ReportsModule } from '@/components/erp/modules/ReportsModule';
import {
  BankingModule,
  GSTModule,
  SettingsModule,
  MastersModule,
  TransactionsModule,
  AdministrationModule,
} from '@/components/erp/modules/OtherModules';
import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function ModuleRouter() {
  const { activeModule } = useERPStore();

  const modules: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    masters: <MastersModule />,
    ledger: <LedgerModule />,
    customers: <CustomerModule />,
    suppliers: <SupplierModule />,
    inventory: <InventoryModule />,
    transactions: <TransactionsModule />,
    sales: <SalesModule />,
    purchases: <PurchaseModule />,
    banking: <BankingModule />,
    gst: <GSTModule />,
    reports: <ReportsModule />,
    settings: <SettingsModule />,
    administration: <AdministrationModule />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeModule}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.15 }}
      >
        {modules[activeModule] || <Dashboard />}
      </motion.div>
    </AnimatePresence>
  );
}

function KeyboardShortcuts() {
  const { setCommandPaletteOpen, setActiveModule, setActiveSubView } = useERPStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ctrl+K: Command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }

      // F8: New Sales
      if (e.key === 'F8') {
        e.preventDefault();
        setActiveModule('sales');
        setActiveSubView('create');
        return;
      }

      // F9: New Purchase
      if (e.key === 'F9') {
        e.preventDefault();
        setActiveModule('purchases');
        setActiveSubView('create');
        return;
      }

      // Ctrl+B: New Ledger
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setActiveModule('ledger');
        setActiveSubView('create');
        return;
      }

      // Escape: Close command palette
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    },
    [setCommandPaletteOpen, setActiveModule, setActiveSubView]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
}

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#080A10] text-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-xs text-gray-400">Loading SmartERP...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  return (
    <AppLayout>
      <KeyboardShortcuts />
      <ModuleRouter />
    </AppLayout>
  );
}