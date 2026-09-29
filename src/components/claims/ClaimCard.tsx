import React from 'react';
import { ClaimItem, STATUS_CONFIG, CLAIM_TYPE_LABELS } from '../../types/claim';
import { formatCurrencyVND, formatDate, getRemainingDays } from '../../utils/formatters';
import { AlertCircle } from 'lucide-react';

interface ClaimCardProps {
  claim: ClaimItem;
  onClick: () => void;
  isSelected?: boolean;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim, onClick, isSelected = false }) => {
  const statusMeta = STATUS_CONFIG[claim.status] || STATUS_CONFIG.intake;
  const benefitLabel = CLAIM_TYPE_LABELS[claim.claimType] || claim.claimType;
  const remainingDays = getRemainingDays(claim.slaDeadline);

  // Số tiền hiển thị nổi bật trên thẻ
  const displayAmount =
    claim.status === 'paid' && claim.approvedAmount > 0
      ? claim.approvedAmount
      : claim.claimedAmount;

  // Dải màu viền trái theo tiến trình
  const borderLeftColorMap: Record<string, string> = {
    intake: 'border-l-slate-300',
    pending_docs: 'border-l-rose-500',
    underwriting: 'border-l-amber-500',
    approved: 'border-l-emerald-500',
    paid: 'border-l-emerald-500',
    rejected: 'border-l-red-500',
  };

  const borderLeftClass = borderLeftColorMap[claim.status] || 'border-l-slate-300';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg p-3.5 border border-slate-200 border-l-4 ${borderLeftClass} hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer relative group flex flex-col justify-between ${
        isSelected ? 'ring-2 ring-rose-500 bg-rose-50/15' : ''
      }`}
    >
      {/* Hàng 1: Ngày (trái) và Badge Trạng Thái + Tiền (phải) */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-500 font-number">
          {formatDate(claim.admissionDate)}
        </span>

        {/* Badge trạng thái với chấm tròn màu & số tiền rõ nét */}
        <div
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusMeta.badgeClass}`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
            style={{ backgroundColor: statusMeta.dotColor }}
          />
          <span className="mr-1.5">{statusMeta.label}</span>
          <span className="font-number font-bold text-slate-900 tracking-tight">
            {formatCurrencyVND(displayAmount)}
          </span>
        </div>
      </div>

      {/* Hàng 2: Tên Người Được Bảo Hiểm (Font to, đậm, rõ ràng) */}
      <div className="mb-2.5">
        <div className="text-[15px] font-bold text-slate-900 group-hover:text-rose-700 transition-colors truncate">
          {claim.insuredPersonName || claim.customerName}
        </div>
      </div>

      {/* Hàng 3: Loại Quyền Lợi & Số Hợp Đồng (kèm cảnh báo nếu cần bổ sung hồ sơ) */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-1.5 truncate">
          <span className="font-semibold text-slate-700">{benefitLabel}</span>
          <span className="text-slate-300">•</span>
          <span className="font-number text-slate-400 font-medium truncate">{claim.policyNumber}</span>
        </div>

        {/* Cảnh báo SLA chỉ hiển thị khi ca ĐANG CẦN BỔ SUNG CHỨNG TỪ */}
        {claim.status === 'pending_docs' && remainingDays !== null && remainingDays > 0 && remainingDays <= 30 && (
          <div className="inline-flex items-center text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 shrink-0 font-number">
            <AlertCircle className="w-3 h-3 mr-1 text-rose-600" />
            <span>Còn {remainingDays} ngày</span>
          </div>
        )}
      </div>
    </div>
  );
};
