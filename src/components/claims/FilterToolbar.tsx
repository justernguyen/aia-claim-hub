import React from 'react';
import { Search, Plus, LayoutGrid, Table } from 'lucide-react';
import { ClaimStatus, STATUS_CONFIG } from '../../types/claim';
import { ViewMode } from '../../hooks/useClaims';

interface FilterToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ClaimStatus | 'all';
  onStatusFilterChange: (status: ClaimStatus | 'all') => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenCreateModal: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
  onOpenCreateModal,
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-2.5 mb-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        {/* Left: Input tìm kiếm sát ảnh mẫu */}
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm số HĐ, người được bảo hiểm, loại quyền lợi..."
            className="block w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-md bg-slate-50/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-colors"
          />
        </div>

        {/* Right: Bộ lọc trạng thái, Chuyển chế độ xem & Nút Thêm */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Lọc Trạng thái */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as ClaimStatus | 'all')}
            className="text-xs py-1.5 px-2.5 border border-slate-200 rounded-md bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>

          {/* Chuyển Grid / Table View */}
          <div className="flex items-center border border-slate-200 rounded-md p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              title="Chế độ xem Thẻ"
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white shadow-2xs text-rose-700 font-medium'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              title="Chế độ xem Bảng"
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white shadow-2xs text-rose-700 font-medium'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Nút + Thêm đỏ mận chuẩn theo ảnh mẫu */}
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold rounded-md text-white bg-rose-700 hover:bg-rose-800 transition-colors shadow-2xs cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Thêm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
