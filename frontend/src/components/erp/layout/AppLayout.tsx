'use client';

import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { CommandPalette } from '@/components/erp/shared/CommandPalette';
import { CompanySelector } from '@/components/erp/shared/CompanySelector';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#EEF2F7] dark:bg-[#080A10]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden py-3 pr-3 pl-1.5">
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden rounded-2xl bg-background border border-gray-200/50 dark:border-white/[0.06] shadow-[0_2px_4px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.25),0_8px_32px_rgba(0,0,0,0.3)]">
          <TopNav />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
      <CommandPalette />
      <CompanySelector />
    </div>
  );
}