import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface TopNavBarProps {
  customerName?: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  customerName = 'Nguyễn Thị Hạnh Dung',
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Back button */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="inline-flex items-center text-sm font-semibold text-rose-700 hover:text-rose-800 transition-colors py-1.5 px-2 rounded-md hover:bg-rose-50 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Quay lại</span>
            </button>
          </div>

          {/* Center: Customer Context */}
          <div className="text-center">
            <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
              Quản lý khách hàng hiện hữu
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {customerName}
            </div>
          </div>

          {/* Right: Sheets Link */}
          <div className="flex items-center space-x-2">
            <a
              href="#sheets"
              className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-3 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span>Sheets</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
