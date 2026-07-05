import { create } from 'zustand';
import type { ModuleId, SubView, Company } from '@/types/erp';

interface ERPState {
  // Navigation
  activeModule: ModuleId;
  activeSubView: SubView;
  selectedItemId: string | null;
  sidebarCollapsed: boolean;

  // Company
  activeCompany: Company | null;
  companySelectorOpen: boolean;

  // Global UI
  commandPaletteOpen: boolean;

  // Actions
  setActiveModule: (module: ModuleId) => void;
  setActiveSubView: (view: SubView) => void;
  setSelectedItemId: (id: string | null) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveCompany: (company: Company) => void;
  setCompanySelectorOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  navigateTo: (module: ModuleId, subView?: SubView, itemId?: string | null) => void;
  goBack: () => void;
}

export const useERPStore = create<ERPState>((set, get) => ({
  activeModule: 'dashboard',
  activeSubView: 'list',
  selectedItemId: null,
  sidebarCollapsed: false,
  activeCompany: {
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
  companySelectorOpen: false,
  commandPaletteOpen: false,

  setActiveModule: (module) => set({ activeModule: module, activeSubView: 'list', selectedItemId: null }),
  setActiveSubView: (view) => set({ activeSubView: view }),
  setSelectedItemId: (id) => set({ selectedItemId: id, activeSubView: id ? 'details' : 'list' }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setActiveCompany: (company) => set({ activeCompany: company, companySelectorOpen: false }),
  setCompanySelectorOpen: (open) => set({ companySelectorOpen: open }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  navigateTo: (module, subView = 'list', itemId = null) =>
    set({ activeModule: module, activeSubView: subView, selectedItemId: itemId }),
  goBack: () => set({ activeSubView: 'list', selectedItemId: null }),
}));