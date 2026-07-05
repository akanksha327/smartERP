'use client';

import { Button } from '@/components/ui/button';
import { useERPStore } from '@/store/useERPStore';
import { ChevronLeft, Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
  action?: {
    label: string;
    onClick: () => void;
    shortcut?: string;
  };
  children?: React.ReactNode;
}

export function PageHeader({ title, description, showBack, action, children }: PageHeaderProps) {
  const { goBack } = useERPStore();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goBack}
          >
            <ChevronLeft size={18} />
          </Button>
        )}
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {action && (
          <Button size="sm" onClick={action.onClick} className="h-8">
            <Plus size={14} className="mr-1.5" />
            {action.label}
            {action.shortcut && (
              <kbd className="ml-2 inline-flex h-4 select-none items-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground">
                {action.shortcut}
              </kbd>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">{description}</p>
      {action && (
        <Button size="sm" variant="outline" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Unpaid': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Partial': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'In Stock': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Low Stock': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Out of Stock': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Cash': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Credit': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
        colorMap[status] || 'bg-muted text-muted-foreground'
      }`}
    >
      {status}
    </span>
  );
}