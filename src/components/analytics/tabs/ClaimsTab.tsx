import React, { useMemo } from 'react';
import {
  Receipt,
  CheckCircle2,
  AlertCircle,
  Clock,
  HeartPulse,
} from 'lucide-react';
import { ClaimItem, ClaimType, CLAIM_TYPE_LABELS } from '../../../types/claim';
import { AggregatedKPIs } from '../types';
import { formatCurrencyVND } from '../../../utils/formatters';

interface ClaimsTabProps {
  claims: ClaimItem[];
  kpis: AggregatedKPIs;
}

export const ClaimsTab: React.FC<ClaimsTabProps> = ({ claims, kpis }) => {
  const totalClaims = claims.length;
  const approvedClaims = claims.filter((c) => c.status === 'approved' || c.status === 'paid');
  const rejectedClaims = claims.filter((c) => c.status === 'rejected');
  const pendingClaims = claims.filter(
    (c) => c.status === 'intake' || c.status === 'pending_docs' || c.status === 'underwriting'
  );

  // Breakdown by claim type
  const typeBreakdown = useMemo(() => {
    const map: Partial<Record<ClaimType, { count: number; approvedSum: number; claimedSum: number }>> = {};
    claims.forEach((c) => {
      const t = c.claimType || 'medical_expense';
      if (!map[t]) {
        map[t] = { count: 0, approvedSum: 0, claimedSum: 0 };
      }
      map[t]!.count += 1;
      map[t]!.approvedSum += c.approvedAmount || 0;
      map[t]!.claimedSum += c.claimedAmount || 0;
    });

    const totalApproved = kpis.totalApprovedAmount || 1;

    return (Object.keys(map) as ClaimType[])
      .map((type) => {
        const item = map[type]!;
        const sharePct = Math.round((item.approvedSum / totalApproved) * 100);
        return {
          type,
          label: CLAIM_TYPE_LABELS[type] || type,
          count: item.count,
          approvedSum: item.approvedSum,
          claimedSum: item.claimedSum,
          sharePct,
        };
      })
      .sort((a, b) => b.approvedSum - a.approvedSum);
  }, [claims, kpis.totalApprovedAmount]);

  return (
    <div className="space-y-6">
      {/* Zone 1: Main Header & Quick Badges */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Vận Hành Quyền Lợi & Báo Cáo Đối Soát Bồi Thường
            </h4>
            <p className="text-xs text-slate-500">
              Đối chiếu số tiền yêu cầu vs thực tế AIA chi trả và tỷ lệ giải quyết thành công
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-numeric">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Đã duyệt {approvedClaims.length}/{totalClaims} ca ({kpis.approvalRate}%)</span>
          </span>
          {pendingClaims.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 font-numeric">
              <Clock className="w-3.5 h-3.5" />
              <span>Đang xử lý: {pendingClaims.length} ca</span>
            </span>
          )}
          {rejectedClaims.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 font-numeric">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Từ chối: {rejectedClaims.length}</span>
            </span>
          )}
        </div>
      </div>

      {/* Zone 2: 3-Way Reconciliation Strip (Claimed vs Approved vs Deducted) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Claimed */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">
              Tổng Tiền Khách Yêu Cầu
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-numeric mt-1 block tracking-tight">
              {formatCurrencyVND(kpis.totalClaimedAmount)}
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400">
            Ghi nhận từ {totalClaims} hồ sơ tiếp nhận
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 shadow-xs flex flex-col justify-between bg-gradient-to-br from-white to-emerald-50/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider block">
                AIA Thực Duyệt Chi Trả
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Đạt {kpis.payoutRatio}%
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-black text-emerald-700 font-numeric mt-1 block tracking-tight">
              {formatCurrencyVND(kpis.totalApprovedAmount)}
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-emerald-100 text-[11px] text-emerald-700 font-medium">
            Quyền lợi tài chính về tay khách hàng
          </div>
        </div>

        {/* Deducted */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-amber-800 text-xs font-bold uppercase tracking-wider block">
                Tổng Giảm Trừ Hợp Lý
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Chi phí cá nhân
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-black text-amber-700 font-numeric mt-1 block tracking-tight">
              {formatCurrencyVND(kpis.totalDeductedAmount)}
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
            Nâng hạng phòng / ngoài danh mục BHYT
          </div>
        </div>
      </div>

      {/* Zone 3: SLA Performance Metrics & 11 AIA Benefit Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        {/* SLA Operational Indicators (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Chỉ Số SLA Bồi Thường</h4>
              <p className="text-xs text-slate-500">Hiệu quả và tốc độ giải quyết quyền lợi</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* SLA 1: Turnaround Time */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Thời gian xử lý trung bình (TAT):
              </div>
              <div className="text-lg font-black text-slate-900 font-numeric mt-0.5">
                3.2 <span className="text-xs font-normal text-slate-500">ngày làm việc</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                Nhanh hơn 36% so với SLA chuẩn 5 ngày
              </div>
            </div>

            {/* SLA 2: Digital Submission Rate */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Tỷ lệ nộp hồ sơ eClaim điện tử:
              </div>
              <div className="text-lg font-black text-slate-900 font-numeric mt-0.5">
                100% <span className="text-xs font-normal text-slate-500">qua AIA iClaim</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Không phát sinh thất lạc chứng từ gốc
              </div>
            </div>

            {/* SLA 3: Rejection rate */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Tỷ lệ từ chối chi trả:
              </div>
              <div className="text-lg font-black text-slate-900 font-numeric mt-0.5">
                {totalClaims > 0 ? Math.round((rejectedClaims.length / totalClaims) * 100) : 0}%{' '}
                <span className="text-xs font-normal text-slate-500">({rejectedClaims.length} ca)</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Chủ yếu do bệnh tồn tại trước hoặc thời gian chờ
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Đồng bộ tiêu chuẩn Dịch vụ Khách hàng AIA
          </div>
        </div>

        {/* 11 Benefit Categories Breakdown (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Phân Bổ Chi Trả Theo Quyền Lợi Bảo Hiểm
                </h4>
                <p className="text-xs text-slate-500">
                  Số tiền đã bồi thường trên các nhóm quyền lợi chuẩn của AIA
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-numeric">
              {typeBreakdown.length} Nhóm quyền lợi
            </span>
          </div>

          {/* Benefit Items */}
          <div className="space-y-3">
            {typeBreakdown.map((item) => (
              <div key={item.type} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-slate-800 truncate">{item.label}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-numeric shrink-0">
                      {item.count} ca
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-numeric">
                    <span className="font-extrabold text-slate-900">
                      {formatCurrencyVND(item.approvedSum)}
                    </span>
                    <span className="text-slate-400 text-[11px]">({item.sharePct}%)</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-aia-red to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.sharePct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Đối soát quyền lợi bồi thường</span>
            <span className="font-numeric font-semibold text-slate-700">
              Tổng cộng {formatCurrencyVND(kpis.totalApprovedAmount)} đã chi trả
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
