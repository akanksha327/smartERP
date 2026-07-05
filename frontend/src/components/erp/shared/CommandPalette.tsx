'use client';

import { useERPStore } from '@/store/useERPStore';
import type { ModuleId } from '@/types/erp';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Truck,
  Package,
  ShoppingCart,
  FileText,
  Landmark,
  Receipt,
  BarChart3,
  Settings,
  Search,
  ArrowRight,
  Database,
} from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  module: ModuleId;
  action: string;
}

const moduleCommands: CommandItem[] = [
  { id: 'nav-dashboard', title: 'Dashboard', icon: <LayoutDashboard size={16} />, module: 'dashboard', action: 'navigate', subtitle: 'Overview & statistics' },
  { id: 'nav-masters', title: 'Masters', icon: <Database size={16} />, module: 'masters', action: 'navigate', subtitle: 'Manage master data' },
  { id: 'nav-ledger', title: 'Ledger', icon: <BookOpen size={16} />, module: 'ledger', action: 'navigate', subtitle: 'Manage ledgers' },
  { id: 'nav-customers', title: 'Customers', icon: <Users size={16} />, module: 'customers', action: 'navigate', subtitle: 'Customer management' },
  { id: 'nav-suppliers', title: 'Suppliers', icon: <Truck size={16} />, module: 'suppliers', action: 'navigate', subtitle: 'Supplier management' },
  { id: 'nav-inventory', title: 'Inventory', icon: <Package size={16} />, module: 'inventory', action: 'navigate', subtitle: 'Stock management' },
  { id: 'nav-sales', title: 'Sales', icon: <ShoppingCart size={16} />, module: 'sales', action: 'navigate', subtitle: 'Sales invoices' },
  { id: 'nav-purchases', title: 'Purchases', icon: <FileText size={16} />, module: 'purchases', action: 'navigate', subtitle: 'Purchase orders' },
  { id: 'nav-banking', title: 'Banking', icon: <Landmark size={16} />, module: 'banking', action: 'navigate', subtitle: 'Bank transactions' },
  { id: 'nav-gst', title: 'GST', icon: <Receipt size={16} />, module: 'gst', action: 'navigate', subtitle: 'GST compliance' },
  { id: 'nav-reports', title: 'Reports', icon: <BarChart3 size={16} />, module: 'reports', action: 'navigate', subtitle: 'Financial reports' },
  { id: 'nav-settings', title: 'Settings', icon: <Settings size={16} />, module: 'settings', action: 'navigate', subtitle: 'Application settings' },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setActiveModule } = useERPStore();
  const [query, setQuery] = useState('');

  const handleClose = useCallback((open: boolean) => {
    setCommandPaletteOpen(open);
    if (!open) setQuery('');
  }, [setCommandPaletteOpen]);

  const filtered = useMemo(() => {
    if (!query.trim()) return moduleCommands;
    const q = query.toLowerCase();
    return moduleCommands.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = useCallback(
    (item: CommandItem) => {
      setActiveModule(item.module);
      setCommandPaletteOpen(false);
    },
    [setActiveModule, setCommandPaletteOpen]
  );

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden border border-border/50 shadow-2xl">
        <div className="flex items-center border-b border-border px-3">
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search modules, customers, invoices..."
            className="flex-1 h-12 px-3 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-[320px] overflow-y-auto custom-scrollbar p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            <div className="space-y-0.5">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors text-left group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-border px-3 py-2 flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">esc</kbd>
            Close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}