import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  ShieldCheck,
  ChevronRight,
  HeartPulse,
  Receipt,
  AlertTriangle,
  Pencil,
  Copy,
  Check,
} from 'lucide-react';
import { Customer, Policy, POLICY_STATUS_CONFIG } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { formatCurrencyVND, formatCompactVND, formatPhone } from '../utils/formatters';
import { CustomerAvatar } from './CustomerAvatar';

interface CustomerCardProps {
  customer: Customer;
  policies: Policy[];
  claims: ClaimItem[];
  onSelect: (customer: Customer) => void;
  onChangeAvatar?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  isPrivacyMode?: boolean;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  policies,
  claims,
  onSelect,
  onChangeAvatar,
  onEdit,
  isPrivacyMode = true,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const customerPolicies = policies.filter((p) => p.customerId === customer.id);
  const customerClaims = claims.filter(
    (c) =>
      (c.customerId === customer.id && (!c.customerName || c.customerName === customer.name)) ||
      c.customerName === customer.name ||
      (c.customerCccd && c.customerCccd === customer.cccd) ||
      (c.policyNumber && customerPolicies.some((p) => p.id === c.policyNumber))
  );

  // Main policy & primary medical benefit
  const primaryPolicy = customerPolicies[0];
  const medicalBenefit =
    primaryPolicy?.benefits.find((b) => b.type === 'medical_expense') ||
    primaryPolicy?.benefits[0];

  const totalPremium = customerPolicies.reduce((sum, p) => sum + p.premiumAmount, 0);

  // Benefit utilization calculation
  const usedAmount = medicalBenefit ? medicalBenefit.usedAmount : 0;
  const maxLimit = medicalBenefit ? medicalBenefit.maxLimit : 0;
  const remainingLimit = medicalBenefit ? medicalBenefit.remainingLimit : 0;
  const usedPercentage =
    maxLimit > 0 ? Math.min(100, Math.round((usedAmount / maxLimit) * 100)) : 0;

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!customer.phone) return;
    navigator.clipboard.writeText(customer.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 1500);
  };

  // Status configuration with clean SaaS styling
  const statusConfig = primaryPolicy ? POLICY_STATUS_CONFIG[primaryPolicy.status] : null;

  return (
    <div
      onClick={() => onSelect(customer)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all p-4.5 sm:p-5 flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        {/* Top Header: Avatar + Name + Status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <CustomerAvatar
              avatarId={customer.avatar}
              name={customer.name}
              customerId={customer.id}
              size="md"
              editable={Boolean(onChangeAvatar)}
              onClick={
                onChangeAvatar
                  ? (e) => {
                      e.stopPropagation();
                      onChangeAvatar(customer);
                    }
                  : undefined
              }
            />
            <div className="min-w-0 flex-1">
              <h3
                className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-aia-red transition-colors truncate leading-tight"
                title={customer.name}
              >
                {customer.name}
              </h3>
              <p
                className="text-xs text-slate-500 font-normal truncate mt-0.5 flex items-center gap-1.5"
                title={`${customer.gender ? customer.gender + ' • ' : ''}${
                  customer.occupation || 'Khách hàng cá nhân'
                }`}
              >
                {customer.gender && (
                  <span className="text-[11px] font-medium text-slate-500">
                    {customer.gender}
                  </span>
                )}
                {customer.gender && <span>•</span>}
                <span className="truncate">{customer.occupation || 'Khách hàng cá nhân'}</span>
              </p>
            </div>
          </div>

          {primaryPolicy && statusConfig && (
            <span
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                primaryPolicy.status === 'in_force'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                  : primaryPolicy.status === 'pending_payment'
                  ? 'bg-rose-50 text-aia-red border-rose-200/80 font-semibold'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  primaryPolicy.status === 'in_force'
                    ? 'bg-emerald-600'
                    : primaryPolicy.status === 'pending_payment'
                    ? 'bg-aia-red'
                    : 'bg-slate-400'
                }`}
              />
              <span>{statusConfig.label}</span>
            </span>
          )}
        </div>
        {/* Contact & Location Info - Clean SaaS Standard */}
        <div className="mt-3.5 space-y-1.5 text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-numeric font-bold text-slate-800 min-w-0 text-xs sm:text-sm">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{formatPhone(customer.phone, isPrivacyMode)}</span>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors ml-0.5"
                title={copiedPhone ? 'Đã sao chép' : 'Sao chép SĐT'}
              >
                {copiedPhone ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>

            {customer.segment && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                {customer.segment}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate" title={customer.address}>
              {customer.address}
            </span>
          </div>
        </div>

        {/* Policies Overview */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-aia-red shrink-0" />
            <span className="font-medium text-slate-700">{customerPolicies.length} Hợp đồng</span>
            {primaryPolicy && (
              <span className="text-[11px] font-numeric font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60">
                {primaryPolicy.id}
              </span>
            )}
          </div>
          <div className="font-numeric flex items-baseline gap-1 text-right">
            <span className="font-semibold text-slate-900 text-sm">
              {formatCurrencyVND(totalPremium).replace(/\s*₫$/, '')}
            </span>
            <span className="text-[11px] text-slate-500">₫/năm</span>
          </div>
        </div>

        {/* Medical Card Benefit Quota Progress - Sleek Micro SaaS Widget */}
        {medicalBenefit && (
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium min-w-0 flex-1 mr-2">
                <HeartPulse className="w-3.5 h-3.5 text-aia-red shrink-0" />
                <span
                  className="truncate text-xs font-semibold text-slate-800"
                  title={medicalBenefit.name}
                >
                  {medicalBenefit.name}
                </span>
              </div>
              <div className="shrink-0 text-right">
                {usedAmount > 0 ? (
                  <span className="font-numeric font-bold text-xs text-amber-700">
                    Đã dùng {formatCompactVND(usedAmount)} ({usedPercentage}%)
                  </span>
                ) : (
                  <span className="font-numeric font-bold text-xs text-emerald-700">
                    Còn {formatCompactVND(remainingLimit)} / {formatCompactVND(maxLimit)}
                  </span>
                )}
              </div>
            </div>

            {/* Slim elegant progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  usedPercentage > 80
                    ? 'bg-aia-red'
                    : usedPercentage > 40
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.max(usedPercentage > 0 ? 3 : 0, usedPercentage)}%` }}
              />
            </div>
          </div>
        )}

        {/* Warning if pending payment or grace period */}
        {primaryPolicy?.status === 'pending_payment' && primaryPolicy.gracePeriodEnd && (
          <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200/80 text-xs text-aia-red flex items-center gap-1.5 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-aia-red shrink-0" />
            <span className="truncate">
              Gia hạn nộp phí đến {primaryPolicy.gracePeriodEnd}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Claim count + Action Buttons (SaaS Toolbar) */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {customerClaims.length > 0 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-aia-red border border-rose-200/80">
              <Receipt className="w-3.5 h-3.5" />
              <span>{customerClaims.length} hồ sơ claim</span>
            </span>
          ) : (
            <span className="text-slate-400 font-medium text-xs">
              0 claim phát sinh
            </span>
          )}
        </div>

        {/* Dual Actions: Sửa & Chi tiết */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(customer);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200/70"
            title="Chỉnh sửa thông tin khách hàng"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-500" />
            <span>Sửa</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(customer);
            }}
            className="inline-flex items-center gap-0.5 px-2.5 py-1.5 text-xs font-bold text-aia-red hover:bg-rose-50 rounded-lg transition-colors"
          >
            <span>Chi tiết</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
