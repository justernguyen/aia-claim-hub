import React from 'react';
import { BarChart3, FileSpreadsheet, Calendar, Sparkles } from 'lucide-react';
import { AnalyticsPeriod, PERIOD_CONFIG } from './types';

interface ExecutiveToolbarProps {
  activePeriod: AnalyticsPeriod;
  onPeriodChange: (period: AnalyticsPeriod) => void;
  onExportCSV?: () => void;
}

export const ExecutiveToolbar: React.FC<ExecutiveToolbarProps> = ({
  activePeriod,
  onPeriodChange,
  onExportCSV,
}) => {
  const periods: AnalyticsPeriod[] = ['all', '2026', 'last_6_months', 'q3_2026'];

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Left: Branding & Sub-Header */}
      <div className="flex items-start sm:items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/60 text-aia-red flex items-center justify-center shrink-0 border border-rose-200/60 shadow-xs">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Trung Tâm Thống Kê & Báo Cáo Hiệu Quả Nghiệp Vụ
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-rose-50 text-aia-red border border-rose-200/70">
              <Sparkles className="w-3 h-3 text-aia-red" />
              <span>MDRT Executive Hub</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            {PERIOD_CONFIG[activePeriod].description}
          </p>
        </div>
      </div>

      {/* Right: Period Filter Switcher & Export Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
        {/* Period Pills Filter */}
        <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/70 text-xs font-semibold self-start sm:self-auto overflow-x-auto max-w-full">
          <div className="flex items-center gap-1 px-1.5 text-slate-400 hidden sm:flex">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          {periods.map((p) => {
            const isActive = activePeriod === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPeriodChange(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title={PERIOD_CONFIG[p].description}
              >
                {PERIOD_CONFIG[p].shortLabel}
              </button>
            );
          })}
        </div>

        {/* Export CSV / Excel Button */}
        {onExportCSV && (
          <button
            type="button"
            onClick={onExportCSV}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Xuất Báo Cáo (CSV)</span>
          </button>
        )}
      </div>
    </div>
  );
};
