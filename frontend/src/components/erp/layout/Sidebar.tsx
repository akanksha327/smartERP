'use client';

import { cn } from '@/lib/utils';
import { useERPStore } from '@/store/useERPStore';
import type { ModuleId } from '@/types/erp';
import {
  LayoutDashboard,
  Database,
  BookOpen,
  Users,
  Truck,
  Package,
  ArrowLeftRight,
  ShoppingCart,
  FileText,
  Landmark,
  Receipt,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MenuItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
  children?: { id: ModuleId; label: string; icon?: React.ReactNode }[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
  { id: 'masters', label: 'Masters', icon: <Database size={17} /> },
  { id: 'ledger', label: 'Ledger', icon: <BookOpen size={17} /> },
  { id: 'customers', label: 'Customers', icon: <Users size={17} /> },
  { id: 'suppliers', label: 'Suppliers', icon: <Truck size={17} /> },
  { id: 'inventory', label: 'Inventory', icon: <Package size={17} /> },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: <ArrowLeftRight size={17} />,
    children: [
      { id: 'sales', label: 'Sales', icon: <ShoppingCart size={15} /> },
      { id: 'purchases', label: 'Purchases', icon: <FileText size={15} /> },
      { id: 'banking', label: 'Banking', icon: <Landmark size={15} /> },
    ],
  },
  { id: 'gst', label: 'GST', icon: <Receipt size={17} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={17} /> },
  {
    id: 'administration',
    label: 'Administration',
    icon: <ShieldCheck size={17} />,
    children: [
      { id: 'settings', label: 'Settings', icon: <Settings size={15} /> },
    ],
  },
];

export function Sidebar() {
  const { activeModule, activeCompany, sidebarCollapsed, setActiveModule, toggleSidebar, setCompanySelectorOpen } = useERPStore();
  const [expandedItems, setExpandedItems] = useState<string[]>(['transactions', 'administration']);

  const toggleExpand = useCallback((id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleNav = useCallback(
    (id: ModuleId) => {
      setActiveModule(id);
    },
    [setActiveModule]
  );

  return (
    <div className="flex-shrink-0 p-3 h-screen flex flex-col z-30">
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 58 : 248 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'h-full flex flex-col rounded-2xl overflow-hidden relative flex-1',
          'bg-white dark:bg-[#0f172a]',
          'border border-gray-200/60 dark:border-white/[0.08]',
          'shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.08)]',
          'dark:shadow-[0_2px_4px_rgba(0,0,0,0.3),0_12px_40px_rgba(0,0,0,0.35)]',
          'backdrop-blur-sm',
        )}
      >
        {/* Subtle top highlight gradient */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/40 dark:from-white/[0.03] to-transparent pointer-events-none z-0" />

        {/* Logo + Company */}
        <div className="relative z-10 px-3 pt-4 pb-1">
          {/* Logo row */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary/20">
              <Briefcase size={15} className="text-primary-foreground" />
            </div>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.15 }}
                  className="font-semibold text-[15px] tracking-tight whitespace-nowrap"
                >
                  SmartERP
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Company selector */}
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[13px] font-medium text-foreground/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors duration-150">
                      <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary leading-none">
                          {(activeCompany?.name || 'S').charAt(0)}
                        </span>
                      </div>
                      <span className="truncate flex-1 text-left">{activeCompany?.name || 'Select Company'}</span>
                      <ChevronDown size={12} className="text-muted-foreground flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    <DropdownMenuItem onClick={() => setCompanySelectorOpen(true)}>
                      <Database size={14} />
                      <span>Switch Company</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="mx-3 my-2 h-px bg-gray-200/70 dark:bg-white/[0.06] relative z-10" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-2.5 py-1 relative z-10">
          <div className="space-y-0.5">
            {menuItems.map((item) => {
              const isActive = activeModule === item.id;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.includes(item.id);
              const isChildActive = hasChildren && item.children!.some((c) => c.id === activeModule);

              const button = (
                <button
                  key={item.id}
                  onClick={() => (hasChildren ? toggleExpand(item.id) : handleNav(item.id))}
                  className={cn(
                    'w-full flex items-center gap-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 relative group cursor-pointer',
                    sidebarCollapsed ? 'px-0 py-2 justify-center' : 'px-2.5 py-2',
                    isActive || isChildActive
                      ? 'bg-primary/[0.08] dark:bg-primary/[0.12] text-primary'
                      : 'text-foreground/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:text-foreground/90',
                  )}
                  aria-label={item.label}
                >
                  {/* Active indicator pill */}
                  {(isActive || isChildActive) && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  <span className="flex-shrink-0 transition-transform duration-150 group-hover:scale-105">
                    {item.icon}
                  </span>

                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap overflow-hidden flex-1 text-left"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {!sidebarCollapsed && hasChildren && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-auto flex-shrink-0 text-foreground/40"
                    >
                      {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    </motion.span>
                  )}
                </button>
              );

              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.id} delayDuration={0}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10} className="text-xs">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <div key={item.id}>
                  {button}
                  <AnimatePresence initial={false}>
                    {!sidebarCollapsed && hasChildren && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="ml-3 pl-3.5 border-l border-gray-200/60 dark:border-white/[0.06] mt-0.5 mb-1 space-y-0.5">
                          {item.children!.map((child) => {
                            const childActive = activeModule === child.id;
                            return (
                              <button
                                key={child.id}
                                onClick={() => handleNav(child.id)}
                                className={cn(
                                  'w-full flex items-center gap-2 rounded-lg text-[12.5px] transition-all duration-150 py-1.5 px-2 cursor-pointer',
                                  childActive
                                    ? 'text-primary font-semibold'
                                    : 'text-foreground/50 hover:text-foreground/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                                )}
                              >
                                {child.icon}
                                <span>{child.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom: Collapse toggle */}
        <div className="relative z-10 px-2.5 pb-3 pt-1">
          <div className="h-px bg-gray-200/70 dark:bg-white/[0.06] mb-2" />
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={toggleSidebar}
                className={cn(
                  'w-full flex items-center gap-2.5 text-[13px] font-medium text-foreground/40 hover:text-foreground/70 rounded-xl transition-all duration-150 cursor-pointer',
                  'hover:bg-black/[0.04] dark:hover:bg-white/[0.05]',
                  sidebarCollapsed ? 'px-0 py-2 justify-center' : 'px-2.5 py-2'
                )}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <ChevronRight
                  size={16}
                  className={cn(
                    'transition-transform duration-300 ease-out',
                    sidebarCollapsed ? '' : 'rotate-180'
                  )}
                />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.12 }}
                      className="text-[12px]"
                    >
                      Collapse
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </TooltipTrigger>
            {sidebarCollapsed && (
              <TooltipContent side="right" sideOffset={10} className="text-xs">Expand sidebar</TooltipContent>
            )}
          </Tooltip>
        </div>
      </motion.aside>
    </div>
  );
}