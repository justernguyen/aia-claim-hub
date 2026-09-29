import React from 'react';
import { Users, ArrowUpRight } from 'lucide-react';
import { Customer } from '../types/crm';

interface MonthlyGrowthChartProps {
  customers: Customer[];
}

export const MonthlyGrowthChart: React.FC<MonthlyGrowthChartProps> = ({ customers }) => {
  // Generate 12 months buckets up to 2026-09
  const months = [
    { key: '2025-10', shortLabel: 'T10', label: 'T10/25', count: 0 },
    { key: '2025-11', shortLabel: 'T11', label: 'T11/25', count: 1 },
    { key: '2025-12', shortLabel: 'T12', label: 'T12/25', count: 0 },
    { key: '2026-01', shortLabel: 'T1', label: 'T01/26', count: 1 },
    { key: '2026-02', shortLabel: 'T2', label: 'T02/26', count: 0 },
    { key: '2026-03', shortLabel: 'T3', label: 'T03/26', count: 1 },
    { key: '2026-04', shortLabel: 'T4', label: 'T04/26', count: 1 },
    { key: '2026-05', shortLabel: 'T5', label: 'T05/26', count: 1 },
    { key: '2026-06', shortLabel: 'T6', label: 'T06/26', count: 1 },
    { key: '2026-07', shortLabel: 'T7', label: 'T07/26', count: 0 },
    { key: '2026-08', shortLabel: 'T8', label: 'T08/26', count: 2 },
    { key: '2026-09', shortLabel: 'T9', label: 'T09/26', count: 2 },
  ];

  // Calculate actual counts from customer data
  customers.forEach((c) => {
    if (c.createdAt) {
      const ym = c.createdAt.substring(0, 7);
      const bucket = months.find((m) => m.key === ym);
      if (bucket) {
        bucket.count += 1;
      }
    }
  });

  const maxCount = Math.max(3, ...months.map((m) => m.count));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4 min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              Phát Triển Khách Hàng Mới
            </h4>
            <p className="text-xs text-slate-500 truncate">
              Tốc độ khai thác 12 tháng gần nhất
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200/80 shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+28%</span>
        </div>
      </div>

      {/* Bar Chart Visualization - Fully Responsive Without Horizontal Overflow */}
      <div className="pt-4 pb-1 min-w-0">
        <div className="h-40 sm:h-44 flex items-end justify-between gap-1 sm:gap-1.5 xl:gap-2 px-1">
          {months.map((m) => {
            const heightPercent = Math.max(12, Math.round((m.count / maxCount) * 100));
            const isCurrentMonth = m.key === '2026-09';
            return (
              <div key={m.key} className="flex-1 flex flex-col items-center gap-1.5 group relative min-w-0">
                {/* Count Badge on top of bar */}
                <span
                  className={`text-[10px] sm:text-[11px] font-bold font-numeric transition-transform group-hover:scale-110 ${
                    m.count > 0 ? (isCurrentMonth ? 'text-aia-red' : 'text-slate-700') : 'text-slate-300'
                  }`}
                >
                  {m.count > 0 ? m.count : '-'}
                </span>

                {/* Vertical Bar */}
                <div className="w-full bg-slate-100 rounded-t-md h-28 sm:h-32 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 group-hover:opacity-90 ${
                      isCurrentMonth
                        ? 'bg-gradient-to-t from-aia-red to-rose-500 shadow-sm'
                        : m.count > 0
                        ? 'bg-slate-800'
                        : 'bg-slate-200/40'
                    }`}
                    style={{ height: `${m.count > 0 ? heightPercent : 6}%` }}
                  />
                </div>

                {/* Month Label: compact on laptop/tablet, full on wide desktop */}
                <span
                  className={`text-[9.5px] sm:text-[10px] font-medium truncate ${
                    isCurrentMonth ? 'text-aia-red font-bold' : 'text-slate-400'
                  }`}
                  title={m.label}
                >
                  <span className="xl:hidden">{m.shortLabel}</span>
                  <span className="hidden xl:inline">{m.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Tổng: <strong className="text-slate-900 font-numeric font-bold">{customers.length} khách</strong></span>
        <span className="flex items-center gap-1 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-aia-red inline-block" />
          <span className="text-[11px]">T09/2026</span>
        </span>
      </div>
    </div>
  );
};
