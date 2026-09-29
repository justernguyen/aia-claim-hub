import React, { useState, useMemo } from 'react';
import { PieChart, ShieldCheck, AlertCircle } from 'lucide-react';
import { Policy, PolicyStatus } from '../../../types/crm';
import { formatShortCurrency } from '../../../utils/formatters';

interface DonutChartProps {
  policies: Policy[];
  onSelectStatus?: (status: PolicyStatus) => void;
}

interface SegmentData {
  status: PolicyStatus;
  label: string;
  count: number;
  pct: number;
  premiumSum: number;
  color: string;
  hoverColor: string;
  badgeBg: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ policies, onSelectStatus }) => {
  const [hoveredStatus, setHoveredStatus] = useState<PolicyStatus | null>(null);

  const totalCount = policies.length;

  const segments: SegmentData[] = useMemo(() => {
    const inForceList = policies.filter((p) => p.status === 'in_force');
    const pendingList = policies.filter((p) => p.status === 'pending_payment');
    const lapsedList = policies.filter((p) => p.status === 'lapsed');
    const surrenderedList = policies.filter((p) => p.status === 'surrendered');

    const inForceSum = inForceList.reduce((sum, p) => sum + p.premiumAmount, 0);
    const pendingSum = pendingList.reduce((sum, p) => sum + p.premiumAmount, 0);
    const lapsedSum = lapsedList.reduce((sum, p) => sum + p.premiumAmount, 0);
    const surrenderedSum = surrenderedList.reduce((sum, p) => sum + p.premiumAmount, 0);

    const calcPct = (cnt: number) => (totalCount > 0 ? Math.round((cnt / totalCount) * 100) : 0);

    const list: SegmentData[] = [
      {
        status: 'in_force',
        label: 'Đang hiệu lực',
        count: inForceList.length,
        pct: calcPct(inForceList.length),
        premiumSum: inForceSum,
        color: '#0F172A', // Slate-900 AIA Dark Charcoal
        hoverColor: '#1E293B',
        badgeBg: 'bg-slate-900',
      },
      {
        status: 'pending_payment',
        label: 'Chờ nộp phí',
        count: pendingList.length,
        pct: calcPct(pendingList.length),
        premiumSum: pendingSum,
        color: '#D31145', // AIA Red
        hoverColor: '#B00E3A',
        badgeBg: 'bg-aia-red',
      },
      {
        status: 'lapsed',
        label: 'Mất hiệu lực',
        count: lapsedList.length,
        pct: calcPct(lapsedList.length),
        premiumSum: lapsedSum,
        color: '#94A3B8', // Slate-400
        hoverColor: '#64748B',
        badgeBg: 'bg-slate-400',
      },
    ];

    if (surrenderedList.length > 0) {
      list.push({
        status: 'surrendered',
        label: 'Đã hủy/Đáo hạn',
        count: surrenderedList.length,
        pct: calcPct(surrenderedList.length),
        premiumSum: surrenderedSum,
        color: '#CBD5E1', // Slate-300
        hoverColor: '#94A3B8',
        badgeBg: 'bg-slate-300',
      });
    }

    return list;
  }, [policies, totalCount]);

  // Geometry: radius = 68, circumference = 2 * PI * 68 ~= 427.256
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke-dasharray and stroke-dashoffset for each slice
  let accumulatedLength = 0;
  const renderedSlices = segments.map((seg) => {
    const sliceLength = (seg.pct / 100) * circumference;
    const offset = accumulatedLength;
    accumulatedLength += sliceLength;

    return {
      ...seg,
      sliceLength,
      offset,
    };
  });

  const activeSegment = hoveredStatus
    ? segments.find((s) => s.status === hoveredStatus)
    : segments[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Cơ Cấu Tình Trạng Hợp Đồng</h4>
            <p className="text-xs text-slate-500">Phân bổ tỷ trọng danh mục HĐ bảo vệ</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-numeric">
          Tổng {totalCount} HĐ
        </span>
      </div>

      {/* Main Body: Donut SVG + Legend */}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-12 items-center gap-6">
        {/* Donut SVG Left/Center */}
        <div className="sm:col-span-5 flex justify-center relative select-none">
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48 -rotate-90 transform overflow-visible"
            onMouseLeave={() => setHoveredStatus(null)}
          >
            {/* Background Base Ring */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="24"
            />

            {/* Slices */}
            {renderedSlices.map((slice) => {
              if (slice.count === 0) return null;
              const isHovered = hoveredStatus === slice.status;

              return (
                <circle
                  key={slice.status}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={isHovered ? slice.hoverColor : slice.color}
                  strokeWidth={isHovered ? 28 : 24}
                  strokeDasharray={`${slice.sliceLength} ${circumference - slice.sliceLength}`}
                  strokeDashoffset={-slice.offset}
                  strokeLinecap="butt"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredStatus(slice.status)}
                  onClick={() => onSelectStatus?.(slice.status)}
                />
              );
            })}
          </svg>

          {/* Donut Center Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            {activeSegment ? (
              <>
                <span className="text-2xl font-black font-numeric text-slate-900 tracking-tight">
                  {activeSegment.count} <span className="text-xs font-semibold text-slate-400">HĐ</span>
                </span>
                <span className="text-[11px] font-bold text-slate-500 mt-0.5 max-w-[100px] truncate">
                  {activeSegment.label}
                </span>
                <span className="text-[10px] font-extrabold text-aia-red font-numeric">
                  {activeSegment.pct}%
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl font-black font-numeric text-slate-900">
                  {totalCount}
                </span>
                <span className="text-xs text-slate-400 font-medium">Hợp đồng</span>
              </>
            )}
          </div>
        </div>

        {/* Legend Right */}
        <div className="sm:col-span-7 space-y-2.5">
          {segments.map((seg) => {
            const isHovered = hoveredStatus === seg.status;
            return (
              <div
                key={seg.status}
                onMouseEnter={() => setHoveredStatus(seg.status)}
                onMouseLeave={() => setHoveredStatus(null)}
                onClick={() => onSelectStatus?.(seg.status)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-slate-50 border-slate-300 shadow-xs'
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${seg.badgeBg} shrink-0`} />
                    <span className="font-bold text-slate-800 truncate">{seg.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-numeric">
                    <strong className="text-slate-900">{seg.count} HĐ</strong>
                    <span className="text-slate-400 text-[11px]">({seg.pct}%)</span>
                  </div>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100 font-numeric">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Phí thường niên:</span>
                  <span className="font-semibold text-slate-700">
                    {formatShortCurrency(seg.premiumSum)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Insight */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tỷ lệ hợp đồng hiệu lực: <strong className="text-slate-900 font-numeric">{segments[0]?.pct || 0}%</strong></span>
        </div>
        {segments.find((s) => s.status === 'pending_payment' && s.count > 0) && (
          <div className="flex items-center gap-1 text-aia-red font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Cần thu phí đúng hạn</span>
          </div>
        )}
      </div>
    </div>
  );
};
