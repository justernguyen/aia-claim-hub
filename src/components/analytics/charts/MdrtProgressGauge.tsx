import React from 'react';
import { Award, Target, Flame, CheckCircle2 } from 'lucide-react';
import { formatCurrencyVND, formatShortCurrency } from '../../../utils/formatters';

interface MdrtProgressGaugeProps {
  totalAnnualPremium: number;
}

export const MdrtProgressGauge: React.FC<MdrtProgressGaugeProps> = ({
  totalAnnualPremium,
}) => {
  // Financial Milestones (APE VND)
  const MDRT_LIMIT = 750000000; // 750 Triệu
  const COT_LIMIT = 2250000000; // 2.25 Tỷ (3x MDRT)
  const TOT_LIMIT = 4500000000; // 4.5 Tỷ (6x MDRT)

  // Current tier calculation
  let currentTierName = 'Chuyên Viên Hoạch Định Tài Chính';
  let nextTierName = 'MDRT 2026';
  let nextTierTarget = MDRT_LIMIT;
  let tierBadgeColor = 'bg-slate-100 text-slate-800 border-slate-200';

  if (totalAnnualPremium >= TOT_LIMIT) {
    currentTierName = 'TOT 2026 (Top of the Table)';
    nextTierName = 'Hoàn Thành Xuất Sắc';
    nextTierTarget = TOT_LIMIT;
    tierBadgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
  } else if (totalAnnualPremium >= COT_LIMIT) {
    currentTierName = 'COT 2026 (Court of the Table)';
    nextTierName = 'TOT 2026';
    nextTierTarget = TOT_LIMIT;
    tierBadgeColor = 'bg-rose-100 text-aia-red border-rose-300';
  } else if (totalAnnualPremium >= MDRT_LIMIT) {
    currentTierName = 'MDRT 2026 (Đã Đạt Chuẩn)';
    nextTierName = 'COT 2026';
    nextTierTarget = COT_LIMIT;
    tierBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  }

  // Progress relative to next tier target
  const progressPct = Math.min(100, Math.round((totalAnnualPremium / nextTierTarget) * 100));
  const remainingAmount = Math.max(0, nextTierTarget - totalAnnualPremium);

  // Month run-rate projection (assuming 3 months remaining in Q4 2026: Oct, Nov, Dec)
  const monthsRemaining = 3;
  const requiredPacePerMonth = Math.ceil(remainingAmount / monthsRemaining);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/60">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Lộ Trình Chỉ Tiêu Danh Hiệu MDRT 2026</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tierBadgeColor}`}>
                {currentTierName}
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              Định mức danh hiệu quốc tế Hiệp hội Bàn tròn Triệu đô AIA Premier
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 font-medium block">Doanh số APE hiện tại:</span>
          <span className="text-base font-extrabold text-slate-900 font-numeric" title={formatCurrencyVND(totalAnnualPremium)}>
            {formatShortCurrency(totalAnnualPremium)}
          </span>
        </div>
      </div>

      {/* Progress Track with Milestones */}
      <div className="py-5 space-y-3">
        {/* Tier Bar */}
        <div className="relative">
          {/* Main Bar Track */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-aia-red via-rose-500 to-amber-500 rounded-full transition-all duration-700 shadow-xs"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Milestone markers on track */}
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-2 font-numeric">
            <div className="flex flex-col items-start">
              <span>Khởi động</span>
              <span className="text-slate-500 font-normal">0 ₫</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={totalAnnualPremium >= MDRT_LIMIT ? 'text-aia-red font-extrabold' : 'text-slate-600'}>
                MDRT (100%)
              </span>
              <span className="text-slate-500 font-normal">750 Tr ₫</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={totalAnnualPremium >= COT_LIMIT ? 'text-amber-700 font-extrabold' : 'text-slate-600'}>
                COT (3x)
              </span>
              <span className="text-slate-500 font-normal">2.25 Tỷ ₫</span>
            </div>
            <div className="flex flex-col items-end">
              <span className={totalAnnualPremium >= TOT_LIMIT ? 'text-amber-800 font-extrabold' : 'text-slate-600'}>
                TOT (6x)
              </span>
              <span className="text-slate-500 font-normal">4.5 Tỷ ₫</span>
            </div>
          </div>
        </div>

        {/* Milestone Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {/* Cấp 1: MDRT */}
          <div
            className={`p-3 rounded-xl border transition-colors ${
              totalAnnualPremium >= MDRT_LIMIT
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Target className="w-3.5 h-3.5 text-aia-red" />
                <span>MDRT 2026</span>
              </div>
              {totalAnnualPremium >= MDRT_LIMIT ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã đạt</span>
                </span>
              ) : (
                <span className="text-[11px] font-numeric font-bold text-slate-700">
                  {Math.round((totalAnnualPremium / MDRT_LIMIT) * 100)}%
                </span>
              )}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Chỉ tiêu: <strong className="font-numeric text-slate-800">750 Tr ₫</strong>
            </div>
          </div>

          {/* Cấp 2: COT */}
          <div
            className={`p-3 rounded-xl border transition-colors ${
              totalAnnualPremium >= COT_LIMIT
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>COT 2026</span>
              </div>
              {totalAnnualPremium >= COT_LIMIT ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã đạt</span>
                </span>
              ) : (
                <span className="text-[11px] font-numeric font-bold text-slate-700">
                  {Math.round((totalAnnualPremium / COT_LIMIT) * 100)}%
                </span>
              )}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Chỉ tiêu: <strong className="font-numeric text-slate-800">2.25 Tỷ ₫</strong>
            </div>
          </div>

          {/* Cấp 3: TOT */}
          <div
            className={`p-3 rounded-xl border transition-colors ${
              totalAnnualPremium >= TOT_LIMIT
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>TOT 2026</span>
              </div>
              {totalAnnualPremium >= TOT_LIMIT ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã đạt</span>
                </span>
              ) : (
                <span className="text-[11px] font-numeric font-bold text-slate-700">
                  {Math.round((totalAnnualPremium / TOT_LIMIT) * 100)}%
                </span>
              )}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Chỉ tiêu: <strong className="font-numeric text-slate-800">4.50 Tỷ ₫</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pace Calculation */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Mục tiêu tiếp theo ({nextTierName}):</span>
          {remainingAmount === 0 ? (
            <span className="text-emerald-700 font-bold">Đã hoàn thành xuất sắc cột mốc danh hiệu!</span>
          ) : (
            <span className="text-aia-red font-bold font-numeric">
              Còn thiếu {formatCurrencyVND(remainingAmount)} ({100 - progressPct}%)
            </span>
          )}
        </div>

        {remainingAmount > 0 && (
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <span>Nhịp độ cần duy trì:</span>
            <strong className="text-slate-900 font-numeric font-bold">
              ~{formatShortCurrency(requiredPacePerMonth)}/tháng
            </strong>
            <span className="text-slate-400">({monthsRemaining} tháng còn lại)</span>
          </div>
        )}
      </div>
    </div>
  );
};
