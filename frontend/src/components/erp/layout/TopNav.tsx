'use client';

import { useERPStore } from '@/store/useERPStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ThemeToggle } from '@/components/erp/shared/ThemeToggle';
import {
  Search,
  Bell,
  Building2,
  ChevronDown,
  User,
  Keyboard,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const moduleLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  masters: 'Masters',
  ledger: 'Ledger',
  customers: 'Customers',
  suppliers: 'Suppliers',
  inventory: 'Inventory',
  transactions: 'Transactions',
  sales: 'Sales',
  purchases: 'Purchases',
  banking: 'Banking',
  gst: 'GST',
  reports: 'Reports',
  administration: 'Administration',
  settings: 'Settings',
};

export function TopNav() {
  const {
    activeModule,
    activeCompany,
    setCompanySelectorOpen,
    setCommandPaletteOpen,
  } = useERPStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    },
    [setCommandPaletteOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header className="h-14 border-b border-border/60 dark:border-white/[0.06] bg-transparent flex items-center px-5 gap-3 flex-shrink-0 z-20">
      {/* Company Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-accent transition-colors text-sm font-medium max-w-[260px]">
            <Building2 size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">{activeCompany?.name || 'Select Company'}</span>
            <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          <DropdownMenuItem onClick={() => setCompanySelectorOpen(true)}>
            <Building2 size={14} />
            <span>Switch Company</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5">
            <p className="text-xs text-muted-foreground">
              FY: {activeCompany?.financialYear} &middot; {activeCompany?.state}
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Module Breadcrumb */}
      <div className="hidden sm:flex items-center text-sm text-muted-foreground">
        <span>{moduleLabels[activeModule] || activeModule}</span>
      </div>

      <div className="flex-1" />

      {/* Search Trigger */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2 text-muted-foreground h-8 w-64 justify-start font-normal"
            onClick={() => setCommandPaletteOpen(true)}
          >
            <Search size={14} />
            <span className="text-xs">Search everything...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Search (Ctrl+K)</TooltipContent>
      </Tooltip>

      {/* Mobile search button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-8 w-8"
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search size={16} />
      </Button>

      {/* Notifications */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell size={16} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>

      {/* Keyboard Shortcuts */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
            <Keyboard size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Keyboard Shortcuts</TooltipContent>
      </Tooltip>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* User Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 h-8 px-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={14} className="text-primary" />
            </div>
            <span className="hidden sm:inline text-sm">Admin</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <User size={14} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings size={14} />
            <span>Preferences</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut size={14} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function Settings(props: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}