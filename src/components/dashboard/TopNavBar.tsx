import React from 'react';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';

interface TopNavBarProps {
  customerName?: string;
  onResetData?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  customerName = 'Nguyễn Thị Hạnh Dung',
  onResetData,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Back button */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-rose-700 hover:text-rose-800 transition-colors py-1.5 px-2 rounded hover:bg-rose-50 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Quay lại</span>
            </button>
          </div>

          {/* Center: Customer Context */}
          <div className="text-center">
            <div className="text-[11px] font-medium tracking-wider uppercase text-slate-400">
              Quản lý khách hàng hiện hữu
            </div>
            <div className="text-base font-semibold text-slate-900 leading-tight">
              {customerName}
            </div>
          </div>

          {/* Right: Actions (Sheets Sync & Reset) */}
          <div className="flex items-center space-x-3">
            {onResetData && (
              <button
                type="button"
                onClick={onResetData}
                title="Khôi phục dữ liệu mẫu ban đầu"
                className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800 py-1.5 px-2.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span className="hidden sm:inline">Dữ liệu gốc</span>
              </button>
            )}

            <a
              href="#sheets"
              className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-slate-900 py-1.5 px-2.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span>Sheets</span>
              <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
