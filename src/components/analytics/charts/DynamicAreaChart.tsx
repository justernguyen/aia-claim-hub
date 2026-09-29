import React, { useState, useMemo } from 'react';
import { TrendingUp, HelpCircle } from 'lucide-react';
import { Policy } from '../../../types/crm';
import { ClaimItem } from '../../../types/claim';
import { Customer } from '../../../types/crm';
import { AnalyticsPeriod, MonthlyTrendDataPoint } from '../types';
import { formatCurrencyVND, formatShortCurrency } from '../../../utils/formatters';

interface DynamicAreaChartProps {
  policies: Policy[];
  claims: ClaimItem[];
  customers: Customer[];
  period: AnalyticsPeriod;
}

export const DynamicAreaChart: React.FC<DynamicAreaChartProps> = ({
  policies,
  claims,
  customers: _customers,
  period,
}) => {
  const [metricMode, setMetricMode] = useState<'revenue' | 'policies'>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate monthly buckets according to selected period
  const monthlyData: MonthlyTrendDataPoint[] = useMemo(() => {
    let monthsList: { key: string; label: string; shortLabel: string }[] = [];

    if (period === 'q3_2026') {
      monthsList = [
        { key: '2026-07', label: 'Tháng 07/2026', shortLabel: 'T07' },
        { key: '2026-08', label: 'Tháng 08/2026', shortLabel: 'T08' },
        { key: '2026-09', label: 'Tháng 09/2026', shortLabel: 'T09' },
      ];
    } else if (period === 'last_6_months') {
      monthsList = [
        { key: '2026-04', label: 'Tháng 04/2026', shortLabel: 'T04' },
        { key: '2026-05', label: 'Tháng 05/2026', shortLabel: 'T05' },
        { key: '2026-06', label: 'Tháng 06/2026', shortLabel: 'T06' },
        { key: '2026-07', label: 'Tháng 07/2026', shortLabel: 'T07' },
        { key: '2026-08', label: 'Tháng 08/2026', shortLabel: 'T08' },
        { key: '2026-09', label: 'Tháng 09/2026', shortLabel: 'T09' },
      ];
    } else if (period === '2026') {
      monthsList = [
        { key: '2026-01', label: 'Tháng 01/2026', shortLabel: 'T01' },
        { key: '2026-02', label: 'Tháng 02/2026', shortLabel: 'T02' },
        { key: '2026-03', label: 'Tháng 03/2026', shortLabel: 'T03' },
        { key: '2026-04', label: 'Tháng 04/2026', shortLabel: 'T04' },
        { key: '2026-05', label: 'Tháng 05/2026', shortLabel: 'T05' },
        { key: '2026-06', label: 'Tháng 06/2026', shortLabel: 'T06' },
        { key: '2026-07', label: 'Tháng 07/2026', shortLabel: 'T07' },
        { key: '2026-08', label: 'Tháng 08/2026', shortLabel: 'T08' },
        { key: '2026-09', label: 'Tháng 09/2026', shortLabel: 'T09' },
        { key: '2026-10', label: 'Tháng 10/2026', shortLabel: 'T10' },
        { key: '2026-11', label: 'Tháng 11/2026', shortLabel: 'T11' },
        { key: '2026-12', label: 'Tháng 12/2026', shortLabel: 'T12' },
      ];
    } else {
      // 'all': 12 months rolling up to 2026-09
      monthsList = [
        { key: '2025-10', label: 'Tháng 10/2025', shortLabel: 'T10/25' },
        { key: '2025-11', label: 'Tháng 11/2025', shortLabel: 'T11/25' },
        { key: '2025-12', label: 'Tháng 12/2025', shortLabel: 'T12/25' },
        { key: '2026-01', label: 'Tháng 01/2026', shortLabel: 'T01/26' },
        { key: '2026-02', label: 'Tháng 02/2026', shortLabel: 'T02/26' },
        { key: '2026-03', label: 'Tháng 03/2026', shortLabel: 'T03/26' },
        { key: '2026-04', label: 'Tháng 04/2026', shortLabel: 'T04/26' },
        { key: '2026-05', label: 'Tháng 05/2026', shortLabel: 'T05/26' },
        { key: '2026-06', label: 'Tháng 06/2026', shortLabel: 'T06/26' },
        { key: '2026-07', label: 'Tháng 07/2026', shortLabel: 'T07/26' },
        { key: '2026-08', label: 'Tháng 08/2026', shortLabel: 'T08/26' },
        { key: '2026-09', label: 'Tháng 09/2026', shortLabel: 'T09/26' },
      ];
    }

    const bucketMap = new Map<string, MonthlyTrendDataPoint>();
    monthsList.forEach((m) => {
      bucketMap.set(m.key, {
        key: m.key,
        label: m.label,
        shortLabel: m.shortLabel,
        premiumAmount: 0,
        policiesCount: 0,
        claimsCount: 0,
        claimsAmount: 0,
      });
    });

    // Populate policy issue data
    policies.forEach((p) => {
      if (p.issueDate) {
        const ym = p.issueDate.substring(0, 7);
        const item = bucketMap.get(ym);
        if (item) {
          item.premiumAmount += p.premiumAmount || 0;
          item.policiesCount += 1;
        }
      }
    });

    // Populate claims data
    claims.forEach((c) => {
      const claimDate = c.intakeDate || c.admissionDate;
      if (claimDate) {
        const ym = claimDate.substring(0, 7);
        const item = bucketMap.get(ym);
        if (item) {
          item.claimsCount += 1;
          item.claimsAmount += c.approvedAmount || c.claimedAmount || 0;
        }
      }
    });

    return Array.from(bucketMap.values());
  }, [policies, claims, period]);

  // Compute total aggregates for the displayed chart
  const totalPeriodRevenue = useMemo(
    () => monthlyData.reduce((sum, d) => sum + d.premiumAmount, 0),
    [monthlyData]
  );
  const totalPeriodPolicies = useMemo(
    () => monthlyData.reduce((sum, d) => sum + d.policiesCount, 0),
    [monthlyData]
  );

  // SVG Chart Geometry Constants
  const width = 640;
  const height = 230;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Max value calculation
  const maxVal = useMemo(() => {
    if (metricMode === 'revenue') {
      const highest = Math.max(...monthlyData.map((d) => d.premiumAmount), 0);
      return Math.max(50000000, Math.ceil(highest / 20000000) * 20000000);
    } else {
      const highest = Math.max(...monthlyData.map((d) => d.policiesCount), 0);
      return Math.max(4, Math.ceil(highest / 2) * 2);
    }
  }, [monthlyData, metricMode]);

  // Coordinates mapping
  const points = useMemo(() => {
    if (monthlyData.length === 0) return [];
    const step = chartWidth / Math.max(1, monthlyData.length - 1);
    return monthlyData.map((d, i) => {
      const val = metricMode === 'revenue' ? d.premiumAmount : d.policiesCount;
      const x = paddingLeft + i * step;
      const y = paddingTop + chartHeight - (val / (maxVal || 1)) * chartHeight;
      return { x, y, data: d, value: val };
    });
  }, [monthlyData, metricMode, maxVal, chartWidth, chartHeight]);

  // Construct smooth spline path using cubic Bezier curves
  const { linePath, areaPath } = useMemo(() => {
    if (points.length === 0) return { linePath: '', areaPath: '' };
    if (points.length === 1) {
      const p = points[0];
      return {
        linePath: `M ${p.x} ${p.y}`,
        areaPath: `M ${p.x} ${p.y} L ${p.x} ${paddingTop + chartHeight} Z`,
      };
    }

    let dLine = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      dLine += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    const first = points[0];
    const last = points[points.length - 1];
    const zeroY = paddingTop + chartHeight;
    const dArea = `${dLine} L ${last.x},${zeroY} L ${first.x},${zeroY} Z`;

    return { linePath: dLine, areaPath: dArea };
  }, [points, chartHeight]);

  // Current active data point for tooltip
  const activePoint = hoveredIndex !== null && points[hoveredIndex] ? points[hoveredIndex] : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
      {/* Top Header & Toggle Modes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0 border border-rose-200/50">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Diễn Biến Doanh Số & Hợp Đồng Mới</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {monthlyData.length} Kỳ
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              Tổng doanh số phát hành:{' '}
              <strong className="text-slate-900 font-numeric">
                {formatShortCurrency(totalPeriodRevenue)}
              </strong>{' '}
              ({totalPeriodPolicies} HĐ)
            </p>
          </div>
        </div>

        {/* Metric Toggle: Doanh số vs Số HĐ */}
        <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto border border-slate-200/60">
          <button
            type="button"
            onClick={() => setMetricMode('revenue')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              metricMode === 'revenue'
                ? 'bg-white text-aia-red shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Doanh Số APE (VNĐ)
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('policies')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              metricMode === 'policies'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Số Hợp Đồng
          </button>
        </div>
      </div>

      {/* SVG Chart Surface */}
      <div className="relative pt-4 min-w-0 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {/* Linear Gradient for AIA Red Fill */}
            <linearGradient id="aiaAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D31145" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#D31145" stopOpacity="0.01" />
            </linearGradient>

            {/* Linear Gradient for Blue/Policies Fill */}
            <linearGradient id="blueAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Y Axis Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = paddingTop + chartHeight * (1 - ratio);
            const valLabel =
              metricMode === 'revenue'
                ? formatShortCurrency(maxVal * ratio)
                : `${Math.round(maxVal * ratio)}`;
            return (
              <g key={ratio}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-numeric font-medium"
                >
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          {areaPath && (
            <path
              d={areaPath}
              fill={metricMode === 'revenue' ? 'url(#aiaAreaGradient)' : 'url(#blueAreaGradient)'}
            />
          )}

          {/* Line Stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={metricMode === 'revenue' ? '#D31145' : '#1E293B'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* X Axis Labels */}
          {points.map((pt, idx) => (
            <text
              key={pt.data.key}
              x={pt.x}
              y={height - 10}
              textAnchor="middle"
              className={`text-[11px] font-numeric transition-colors ${
                hoveredIndex === idx ? 'fill-slate-900 font-bold' : 'fill-slate-500 font-medium'
              }`}
            >
              {pt.data.shortLabel}
            </text>
          ))}

          {/* Interactive Hover Indicators */}
          {activePoint && (
            <g>
              {/* Vertical Crosshair Line */}
              <line
                x1={activePoint.x}
                y1={paddingTop}
                x2={activePoint.x}
                y2={paddingTop + chartHeight}
                stroke={metricMode === 'revenue' ? '#D31145' : '#1E293B'}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />

              {/* Pulse Outer Ring */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="7"
                fill={metricMode === 'revenue' ? '#D31145' : '#1E293B'}
                opacity="0.25"
              />

              {/* Solid Point Dot */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="4.5"
                fill="#FFFFFF"
                stroke={metricMode === 'revenue' ? '#D31145' : '#1E293B'}
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* Transparent Hover Hit Boxes */}
          {points.map((pt, idx) => {
            const step = chartWidth / Math.max(1, points.length - 1);
            const boxX = pt.x - step / 2;
            return (
              <rect
                key={idx}
                x={boxX}
                y={paddingTop}
                width={step}
                height={chartHeight + 20}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              />
            );
          })}
        </svg>

        {/* Floating Tooltip Card */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none transition-all duration-150 transform -translate-x-1/2"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${Math.max(10, (activePoint.y / height) * 100 - 48)}%`,
            }}
          >
            <div className="bg-slate-900/95 text-white p-2.5 rounded-xl shadow-xl border border-slate-700 text-xs backdrop-blur-xs min-w-[150px]">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {activePoint.data.label}
              </p>
              <div className="mt-1 font-numeric">
                <span className="text-sm font-extrabold text-white">
                  {formatCurrencyVND(activePoint.data.premiumAmount)}
                </span>
              </div>
              <div className="mt-1 pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-300">
                <span>Hợp đồng mới:</span>
                <span className="font-bold text-white font-numeric">{activePoint.data.policiesCount} HĐ</span>
              </div>
              {activePoint.data.claimsCount > 0 && (
                <div className="flex items-center justify-between text-[10px] text-amber-300 mt-0.5">
                  <span>Claim phát sinh:</span>
                  <span className="font-bold font-numeric">{activePoint.data.claimsCount} ca</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Micro Legend & Guidance */}
      <div className="pt-3 mt-1 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                metricMode === 'revenue' ? 'bg-aia-red' : 'bg-slate-800'
              }`}
            />
            <span className="font-medium text-slate-600">
              {metricMode === 'revenue' ? 'Doanh số phát hành thực tế' : 'Số lượng hợp đồng phát hành'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <HelpCircle className="w-3 h-3" />
          <span>Rê chuột trên biểu đồ để xem chi tiết từng tháng</span>
        </div>
      </div>
    </div>
  );
};
