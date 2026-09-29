import React from 'react';
import { ClaimItem, STATUS_CONFIG, CLAIM_TYPE_LABELS } from '../../types/claim';
import { formatCurrencyVND, formatDate, getRemainingDays } from '../../utils/formatters';
import { Clock, AlertCircle } from 'lucide-react';

interface ClaimCardProps {
  claim: ClaimItem;
  onClick: () => void;
  isSelected?: boolean;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim, onClick, isSelected = false }) => {
  const statusMeta = STATUS_CONFIG[claim.status] || STATUS_CONFIG.intake;
  const benefitLabel = CLAIM_TYPE_LABELS[claim.claimType] || claim.claimType;
  const remainingDays = getRemainingDays(claim.slaDeadline);

  // Determine amount to display on card header
  const displayAmount =
    claim.status === 'paid' && claim.approvedAmount > 0
      ? claim.approvedAmount
      : claim.claimedAmount;

  // Left border color according to status
  const borderLeftColorMap: Record<string, string> = {
    intake: 'border-l-slate-400',
    pending_docs: 'border-l-rose-500',
    underwriting: 'border-l-amber-500',
    approved: 'border-l-emerald-500',
    paid: 'border-l-emerald-500',
    rejected: 'border-l-red-600',
  };

  const borderLeftClass = borderLeftColorMap[claim.status] || 'border-l-slate-300';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg p-4 border border-slate-200 border-l-4 ${borderLeftClass} hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer relative group flex flex-col justify-between ${
        isSelected ? 'ring-2 ring-rose-500 bg-rose-50/10' : ''
      }`}
    >
      {/* Top Row: Date & Status Badge with Amount */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-slate-500 tabular-nums">
          {formatDate(claim.admissionDate)}
        </span>

        {/* Semantic Status Badge with Dot & Amount */}
        <div
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-nums border ${statusMeta.badgeClass}`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
            style={{ backgroundColor: statusMeta.dotColor }}
          />
          <span className="mr-1.5">{statusMeta.label}</span>
          <span className="font-bold">{formatCurrencyVND(displayAmount)}</span>
        </div>
      </div>

      {/* Middle: Insured person name */}
      <div className="mb-2">
        <div className="text-base font-semibold text-slate-900 group-hover:text-rose-700 transition-colors truncate">
          {claim.insuredPersonName || claim.customerName}
        </div>
        <div className="text-xs text-slate-500 truncate mt-0.5">
          {claim.hospitalName}
        </div>
      </div>

      {/* Bottom Row: Benefit Type, Policy Number & SLA Warning */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-2 truncate">
          <span className="font-medium text-slate-700">{benefitLabel}</span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-slate-400 truncate">{claim.policyNumber}</span>
        </div>

        {/* SLA warning chip if action is required */}
        {claim.status === 'pending_docs' && remainingDays !== null && (
          <div className="inline-flex items-center text-[11px] font-medium text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded shrink-0">
            <AlertCircle className="w-3 h-3 mr-1" />
            <span>Còn {remainingDays > 0 ? `${remainingDays} ngày` : 'Quá hạn'}</span>
          </div>
        )}

        {/* SLA for underwriting */}
        {claim.status === 'underwriting' && remainingDays !== null && remainingDays <= 2 && (
          <div className="inline-flex items-center text-[11px] text-amber-600 shrink-0">
            <Clock className="w-3 h-3 mr-0.5" />
            <span>SLA: {remainingDays} ngày</span>
          </div>
        )}
      </div>
    </div>
  );
};
