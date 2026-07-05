'use client';

import { useERPStore } from '@/store/useERPStore';
import { companies as mockCompanies } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  Hash,
} from 'lucide-react';
import { useState } from 'react';
import type { Company } from '@/types/erp';

export function CompanySelector() {
  const { companySelectorOpen, setCompanySelectorOpen, activeCompany, setActiveCompany } = useERPStore();
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [creating, setCreating] = useState(false);

  const handleSelect = (company: Company) => {
    setActiveCompany(company);
  };

  const handleDelete = (id: string) => {
    if (companies.length <= 1) return;
    setCompanies(companies.filter((c) => c.id !== id));
  };

  return (
    <Dialog open={companySelectorOpen} onOpenChange={setCompanySelectorOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 size={20} />
            Select Company
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto custom-scrollbar max-h-[55vh] p-1">
          {companies.map((company) => (
            <div
              key={company.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 hover:shadow-sm ${
                activeCompany?.id === company.id
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : 'border-border hover:border-primary/30'
              }`}
              onClick={() => handleSelect(company)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{company.name}</h3>
                {activeCompany?.id === company.id && (
                  <Badge variant="default" className="text-[10px] px-1.5 py-0">Active</Badge>
                )}
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Hash size={12} />
                  <span className="font-mono">{company.gstNumber}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>FY: {company.financialYear}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} />
                  <span>{company.state}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(company);
                  }}
                >
                  Open
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil size={13} />
                </Button>
                {companies.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(company.id);
                    }}
                  >
                    <Trash2 size={13} />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {companies.length < 5 && !creating && (
            <button
              onClick={() => setCreating(true)}
              className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors min-h-[140px]"
            >
              <Plus size={20} />
              <span className="text-sm font-medium">Create Company</span>
            </button>
          )}

          {creating && (
            <div className="border rounded-lg p-4 bg-accent/30 space-y-3">
              <h3 className="font-semibold text-sm">New Company</h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Company Name</Label>
                  <Input placeholder="Enter company name" className="h-8 text-sm mt-1" />
                </div>
                <div>
                  <Label className="text-xs">GST Number</Label>
                  <Input placeholder="Enter GST number" className="h-8 text-sm mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">State</Label>
                    <Input placeholder="State" className="h-8 text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Financial Year</Label>
                    <Input placeholder="2024-25" className="h-8 text-sm mt-1" />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="h-7 text-xs flex-1" onClick={() => setCreating(false)}>Create</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setCreating(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}