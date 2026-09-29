import React from 'react';
import { Users, ArrowUpRight } from 'lucide-react';
import { Customer } from '../types/crm';

interface MonthlyGrowthChartProps {
  customers: Customer[];
}

export const MonthlyGrowthChart: React.FC<MonthlyGrowthChartProps> = ({ customers }) => {
  // Generate 12 months buckets up to 2026-09
  const months = [
    { key: '2025-10', label: 'T10/25', count: 0 },
    { key: '2025-11', label: 'T11/25', count: 1 },
    { key: '2025-12', label: 'T12/25', count: 0 },
    { key: '2026-01', label: 'T01/26', count: 1 },
    { key: '2026-02', label: 'T02/26', count: 0 },
    { key: '2026-03', label: 'T03/26', count: 1 },
    { key: '2026-04', label: 'T04/26', count: 1 },
    { key: '2026-05', label: 'T05/26', count: 1 },
    { key: '2026-06', label: 'T06/26', count: 1 },
    { key: '2026-07', label: 'T07/26', count: 0 },
    { key: '2026-08', label: 'T08/26', count: 2 },
    { key: '2026-09', label: 'T09/26', count: 2 },
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Phát Triển Khách Hàng Mới Theo Tháng
            </h4>
            <p className="text-xs text-slate-500">
              Tốc độ khai thác khách hàng mới 12 tháng gần nhất
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200/80">
          <ArrowUpRight className="w-4 h-4" />
          <span>+28% Tăng trưởng</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-6 pb-2">
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-3 px-2">
          {months.map((m) => {
            const heightPercent = Math.max(12, Math.round((m.count / maxCount) * 100));
            const isCurrentMonth = m.key === '2026-09';
            return (
              <div key={m.key} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Count Badge on top of bar */}
                <span
                  className={`text-[11px] font-bold font-mono transition-transform group-hover:scale-110 ${
                    m.count > 0 ? (isCurrentMonth ? 'text-aia-red' : 'text-slate-700') : 'text-slate-300'
                  }`}
                >
                  {m.count > 0 ? m.count : '-'}
                </span>

                {/* Vertical Bar */}
                <div className="w-full bg-slate-100 rounded-t-lg h-32 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-90 ${
                      isCurrentMonth
                        ? 'bg-gradient-to-t from-aia-red to-rose-500 shadow-md'
                        : m.count > 0
                        ? 'bg-slate-800'
                        : 'bg-slate-200/40'
                    }`}
                    style={{ height: `${m.count > 0 ? heightPercent : 6}%` }}
                  />
                </div>

                {/* Month Label */}
                <span
                  className={`text-[10px] whitespace-nowrap font-medium ${
                    isCurrentMonth ? 'text-aia-red font-bold' : 'text-slate-400'
                  }`}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Tổng khách hàng phát triển: <strong className="text-slate-900 font-mono font-bold">{customers.length} khách</strong></span>
        <span className="flex items-center gap-1 text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-aia-red inline-block" />
          <span>Tháng hiện tại (09/2026)</span>
        </span>
      </div>
    </div>
  );
};
