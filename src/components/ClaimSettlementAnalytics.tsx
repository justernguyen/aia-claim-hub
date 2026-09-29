import React from 'react';
import { ShieldAlert, CheckCircle2, AlertCircle, HeartPulse, Receipt } from 'lucide-react';
import { ClaimItem, CLAIM_TYPE_LABELS, ClaimType } from '../types/claim';
import { formatCurrencyVND } from '../utils/formatters';

interface ClaimSettlementAnalyticsProps {
  claims: ClaimItem[];
}

export const ClaimSettlementAnalytics: React.FC<ClaimSettlementAnalyticsProps> = ({ claims }) => {
  const totalClaims = claims.length;
  const approvedClaims = claims.filter((c) => c.status === 'approved' || c.status === 'paid');
  const rejectedClaims = claims.filter((c) => c.status === 'rejected');
  const pendingClaims = claims.filter(
    (c) => c.status === 'intake' || c.status === 'pending_docs' || c.status === 'underwriting'
  );

  const totalClaimed = claims.reduce((sum, c) => sum + (c.claimedAmount || 0), 0);
  const totalApproved = claims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0);
  const totalDeducted = claims.reduce((sum, c) => sum + (c.deductedAmount || 0), 0);

  const approvalRate = totalClaims > 0 ? Math.round((approvedClaims.length / totalClaims) * 100) : 0;
  const payoutRatio = totalClaimed > 0 ? Math.round((totalApproved / totalClaimed) * 100) : 0;

  // Breakdown by claim type
  const typeMap: Partial<Record<ClaimType, { count: number; approvedSum: number }>> = {};
  claims.forEach((c) => {
    if (!typeMap[c.claimType]) {
      typeMap[c.claimType] = { count: 0, approvedSum: 0 };
    }
    typeMap[c.claimType]!.count += 1;
    typeMap[c.claimType]!.approvedSum += c.approvedAmount || 0;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Thống Kê Bồi Thường & Tỷ Lệ Duyệt Chi Trả
            </h4>
            <p className="text-xs text-slate-500">
              Đối chiếu số tiền yêu cầu vs thực tế AIA chi trả và tỷ lệ giải quyết thành công
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Tỷ lệ duyệt: <strong className="font-numeric">{approvalRate}%</strong></span>
          </span>
          {pendingClaims.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Đang xử lý: <strong className="font-numeric">{pendingClaims.length}</strong></span>
            </span>
          )}
          {rejectedClaims.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Từ chối: <strong className="font-numeric">{rejectedClaims.length}</strong></span>
            </span>
          )}
        </div>
      </div>

      {/* Comparison Strip: Yêu cầu vs Duyệt chi trả */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-slate-600 text-xs block font-semibold">Tổng tiền khách yêu cầu bồi thường:</span>
          <span className="text-lg font-extrabold text-slate-900 font-numeric mt-0.5 block">
            {formatCurrencyVND(totalClaimed)}
          </span>
          <span className="text-xs text-slate-500 font-numeric font-medium">Trên {totalClaims} ca yêu cầu</span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="text-emerald-800 text-xs block font-bold">
            Tổng tiền AIA thực duyệt chi trả:
          </span>
          <span className="text-lg font-extrabold text-emerald-800 font-numeric mt-0.5 block">
            {formatCurrencyVND(totalApproved)}
          </span>
          <span className="text-xs text-emerald-700 font-bold font-numeric">
            Đạt {payoutRatio}% giá trị yêu cầu
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
          <span className="text-amber-900 text-xs block font-bold">
            Tổng tiền giảm trừ hợp lý:
          </span>
          <span className="text-lg font-extrabold text-amber-800 font-numeric mt-0.5 block">
            {formatCurrencyVND(totalDeducted)}
          </span>
          <span className="text-xs text-amber-800 font-medium">Nâng hạng phòng / ngoài danh mục</span>
        </div>
      </div>

      {/* Breakdown by Benefit Category */}
      <div className="pt-3 border-t border-slate-100">
        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <HeartPulse className="w-3.5 h-3.5 text-aia-red" />
          <span>Chi Trả Theo Loại Quyền Lợi Bảo Hiểm</span>
        </h5>

        <div className="space-y-2.5">
          {(Object.keys(typeMap) as ClaimType[]).map((type) => {
            const item = typeMap[type]!;
            const sharePct = totalApproved > 0 ? Math.round((item.approvedSum / totalApproved) * 100) : 0;
            return (
              <div key={type} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{CLAIM_TYPE_LABELS[type]}</span>
                    <span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-numeric font-bold">
                      {item.count} ca
                    </span>
                  </div>
                  <span className="font-numeric font-extrabold text-slate-900">
                    {formatCurrencyVND(item.approvedSum)}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-aia-red rounded-full transition-all duration-500"
                    style={{ width: `${sharePct}%` }}
                  />
                </div>

                <div className="text-right text-xs text-slate-500 mt-1 font-numeric">
                  Chiếm {sharePct}% tổng ngân sách bồi thường
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
