import React from 'react';
import {
  Search,
  X,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown,
} from 'lucide-react';
import { ClaimStatus, ClaimType, CLAIM_TYPE_LABELS } from '../types/claim';
import { SortOption, ViewMode } from '../hooks/useClaims';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: ClaimStatus | 'all';
  onStatusChange: (s: ClaimStatus | 'all') => void;
  typeFilter: ClaimType | 'all';
  onTypeChange: (t: ClaimType | 'all') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (vm: ViewMode) => void;
  statusCounts: Record<string, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  statusCounts,
}) => {
  const statusTabs: Array<{ id: ClaimStatus | 'all'; label: string; count?: number }> = [
    { id: 'all', label: 'Tất cả', count: statusCounts.total || 0 },
    { id: 'intake', label: 'Tiếp nhận', count: statusCounts.intake || 0 },
    { id: 'pending_docs', label: 'Cần bổ sung', count: statusCounts.pending_docs || 0 },
    { id: 'underwriting', label: 'AIA Thẩm định', count: statusCounts.underwriting || 0 },
    { id: 'approved', label: 'Đã duyệt', count: statusCounts.approved || 0 },
    { id: 'paid', label: 'Đã chi trả', count: statusCounts.paid || 0 },
    { id: 'rejected', label: 'Từ chối', count: statusCounts.rejected || 0 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-4">
      {/* Top row: Search input + Type Filter + Sort + View mode switcher */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên khách hàng, mã claim, số HĐ, bệnh viện, chẩn đoán..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red placeholder:text-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns & View Mode */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filter by Benefit Type */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value as ClaimType | 'all')}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red cursor-pointer"
            >
              <option value="all">Tất cả loại quyền lợi</option>
              {Object.entries(CLAIM_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red cursor-pointer"
            >
              <option value="date_desc">Ngày nộp: Mới nhất</option>
              <option value="date_asc">Ngày nộp: Cũ nhất</option>
              <option value="amount_desc">Số tiền: Cao nhất</option>
              <option value="amount_asc">Số tiền: Thấp nhất</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dual View Toggle Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Chế độ xem Bảng dữ liệu"
            >
              <TableIcon className="w-3.5 h-3.5 text-aia-red" />
              <span>Bảng</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Chế độ xem Bảng luồng Kanban"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-aia-red" />
              <span>Kanban</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row: Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onStatusChange(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isActive
                  ? 'bg-aia-red text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
