import React from 'react';
import {
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  HeartPulse,
  Receipt,
  AlertTriangle,
} from 'lucide-react';
import { Customer, Policy, POLICY_STATUS_CONFIG } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { formatCurrencyVND, formatCCCD, formatCompactVND, formatPhone } from '../utils/formatters';
import { CustomerAvatar } from './CustomerAvatar';

interface CustomerCardProps {
  customer: Customer;
  policies: Policy[];
  claims: ClaimItem[];
  onSelect: (customer: Customer) => void;
  onChangeAvatar?: (customer: Customer) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  policies,
  claims,
  onSelect,
  onChangeAvatar,
}) => {
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
  const medicalBenefit = primaryPolicy?.benefits.find((b) => b.type === 'medical_expense') || primaryPolicy?.benefits[0];

  const totalPremium = customerPolicies.reduce((sum, p) => sum + p.premiumAmount, 0);

  // Benefit utilization calculation
  const usedAmount = medicalBenefit ? medicalBenefit.usedAmount : 0;
  const maxLimit = medicalBenefit ? medicalBenefit.maxLimit : 0;
  const remainingLimit = medicalBenefit ? medicalBenefit.remainingLimit : 0;
  const usedPercentage = maxLimit > 0 ? Math.min(100, Math.round((usedAmount / maxLimit) * 100)) : 0;

  return (
    <div
      onClick={() => onSelect(customer)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between cursor-pointer group"
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
              <div className="flex items-center gap-1.5 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-aia-red transition-colors truncate">
                  {customer.name}
                </h3>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                  {customer.gender}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate">
                {customer.occupation || 'Khách hàng cá nhân'}
              </p>
            </div>
          </div>

          {primaryPolicy && (
            <span
              className={`text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border flex items-center gap-1 whitespace-nowrap shrink-0 ${
                POLICY_STATUS_CONFIG[primaryPolicy.status]?.badgeClass || 'bg-slate-100 text-slate-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  POLICY_STATUS_CONFIG[primaryPolicy.status]?.dotColor || 'bg-slate-400'
                }`}
              />
              <span>{POLICY_STATUS_CONFIG[primaryPolicy.status]?.label || primaryPolicy.status}</span>
            </span>
          )}
        </div>

        {/* Contact Info Pills */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-numeric font-medium text-slate-700">{formatPhone(customer.phone)}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-numeric font-medium text-slate-700 tracking-tight truncate">{formatCCCD(customer.cccd)}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{customer.address}</span>
          </div>
        </div>

        {/* Policies Overview */}
        <div className="mt-3.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-aia-red" />
            <span className="font-semibold text-slate-700">{customerPolicies.length} Hợp đồng</span>
            {primaryPolicy && (
              <span className="text-[11px] text-slate-400">({primaryPolicy.id})</span>
            )}
          </div>
          <div className="font-numeric flex items-baseline gap-1">
            <span className="font-bold text-slate-900 text-sm">{formatCurrencyVND(totalPremium).replace(/\s*₫$/, '')}</span>
            <span className="text-[11px] font-medium text-slate-500">₫/năm</span>
          </div>
        </div>

        {/* Medical Card Benefit Quota Progress */}
        {medicalBenefit && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium truncate max-w-[190px]">
                <HeartPulse className="w-3.5 h-3.5 text-aia-red shrink-0" />
                <span className="truncate" title={medicalBenefit.name}>
                  {medicalBenefit.name}
                </span>
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {primaryPolicy && primaryPolicy.benefits && primaryPolicy.benefits.length > 1 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-aia-red border border-rose-200">
                    +{primaryPolicy.benefits.length - 1} bổ trợ
                  </span>
                )}
                <span className={`font-bold font-numeric text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                  usedPercentage > 80
                    ? 'bg-rose-50 text-aia-red border border-rose-200'
                    : usedPercentage > 0
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {usedPercentage}% đã dùng
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  usedPercentage > 80 ? 'bg-aia-red' : usedPercentage > 40 ? 'bg-amber-500' : 'bg-emerald-600'
                }`}
                style={{ width: `${usedPercentage}%` }}
              />
            </div>

            {/* Benefit numbers breakdown: Đã dùng, Còn lại & Hạn mức */}
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-500 block text-[10px] font-medium leading-none mb-1">Đã bồi thường</span>
                <span className="font-bold font-numeric text-slate-800 text-xs">
                  {formatCurrencyVND(usedAmount)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px] font-medium leading-none mb-1">
                  Còn lại <span className="text-slate-400 font-normal">/ {formatCompactVND(maxLimit)}</span>
                </span>
                <span className="font-bold font-numeric text-emerald-700 text-xs">
                  {formatCurrencyVND(remainingLimit)}
                </span>
              </div>
            </div>
          </div>
        )}
        {/* Warning if pending payment or grace period */}
        {primaryPolicy?.status === 'pending_payment' && primaryPolicy.gracePeriodEnd && (
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200/80 text-[11px] text-aia-red flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-aia-red shrink-0" />
            <span className="truncate">
              Gia hạn nộp phí đến {primaryPolicy.gracePeriodEnd}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Claim count + Action link */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <Receipt className="w-3.5 h-3.5 text-slate-400" />
          <span className={customerClaims.length > 0 ? 'text-slate-700 font-medium' : 'text-slate-400'}>
            {customerClaims.length} hồ sơ claim
          </span>
        </div>
        <div className="flex items-center gap-1 text-aia-red font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>Xem chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
