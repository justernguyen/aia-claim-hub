import React from 'react';
import { Search, Plus, LayoutGrid, Table, RotateCw } from 'lucide-react';
import { ClaimStatus, ClaimType, STATUS_CONFIG, CLAIM_TYPE_LABELS } from '../../types/claim';
import { SortOption, ViewMode } from '../../hooks/useClaims';

interface FilterToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ClaimStatus | 'all';
  onStatusFilterChange: (status: ClaimStatus | 'all') => void;
  typeFilter: ClaimType | 'all';
  onTypeFilterChange: (type: ClaimType | 'all') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenCreateModal: () => void;
  onRefresh: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenCreateModal,
  onRefresh,
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3 mb-6 shadow-2xs">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[280px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm số HĐ, người được bảo hiểm, loại quyền lợi..."
            className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-colors"
          />
        </div>

        {/* Center: Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as ClaimStatus | 'all')}
            className="text-xs sm:text-sm py-2 px-2.5 border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>

          {/* Claim Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value as ClaimType | 'all')}
            className="text-xs sm:text-sm py-2 px-2.5 border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
          >
            <option value="all">Tất cả quyền lợi</option>
            {Object.entries(CLAIM_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-xs sm:text-sm py-2 px-2.5 border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
          >
            <option value="date_desc">Mới nhất trước</option>
            <option value="date_asc">Cũ nhất trước</option>
            <option value="amount_desc">Tiền yêu cầu cao nhất</option>
            <option value="amount_asc">Tiền yêu cầu thấp nhất</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 rounded-md p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              title="Chế độ xem Thẻ"
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white shadow-2xs text-rose-700 font-medium'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              title="Chế độ xem Bảng"
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white shadow-2xs text-rose-700 font-medium'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
          </div>

          {/* Refresh button */}
          <button
            type="button"
            onClick={onRefresh}
            title="Làm mới danh sách"
            className="p-2 border border-slate-200 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: + Thêm button (Crimson style as in reference image) */}
        <div>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="w-full lg:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-rose-700 hover:bg-rose-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Thêm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
