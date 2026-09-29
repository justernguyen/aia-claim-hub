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
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-aia-red transition-colors truncate leading-tight" title={customer.name}>
                {customer.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium truncate mt-1 flex items-center gap-1.5" title={`${customer.gender ? customer.gender + ' • ' : ''}${customer.occupation || 'Khách hàng cá nhân'}`}>
                {customer.gender && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                    {customer.gender}
                  </span>
                )}
                <span className="truncate">{customer.occupation || 'Khách hàng cá nhân'}</span>
              </p>
            </div>
          </div>

          {primaryPolicy && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
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

        {/* Contact & Location Info - Clean Flat Luxury */}
        {/* Contact & Location Info - High-Contrast Pro Legibility */}
        <div className="mt-3.5 space-y-1.5 text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-numeric font-bold text-slate-900 min-w-0 text-xs sm:text-sm">
              <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{formatPhone(customer.phone)}</span>
            </div>
            <div className="flex items-center gap-1 font-numeric text-xs font-bold text-slate-800 shrink-0">
              <CreditCard className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{formatCCCD(customer.cccd)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate" title={customer.address}>{customer.address}</span>
          </div>
        </div>

        {/* Policies Overview */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-aia-red shrink-0" />
            <span className="font-bold text-slate-900">{customerPolicies.length} Hợp đồng</span>
            {primaryPolicy && (
              <span className="text-xs font-numeric font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                {primaryPolicy.id}
              </span>
            )}
          </div>
          <div className="font-numeric flex items-baseline gap-1 text-right">
            <span className="font-extrabold text-slate-900 text-sm sm:text-base">
              {formatCurrencyVND(totalPremium).replace(/\s*₫$/, '')}
            </span>
            <span className="text-xs font-bold text-slate-600">₫/năm</span>
          </div>
        </div>

        {/* Medical Card Benefit Quota Progress */}
        {medicalBenefit && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium min-w-0 flex-1 mr-2">
                <HeartPulse className="w-3.5 h-3.5 text-aia-red shrink-0" />
                <span className="truncate text-xs font-semibold text-slate-800" title={medicalBenefit.name}>
                  {medicalBenefit.name}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {primaryPolicy && primaryPolicy.benefits && primaryPolicy.benefits.length > 1 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-aia-red border border-rose-200/80">
                    +{primaryPolicy.benefits.length - 1} bổ trợ
                  </span>
                )}
                <span className={`font-bold font-numeric text-xs px-2.5 py-0.5 rounded-full shrink-0 border ${
                  usedPercentage > 80
                    ? 'bg-rose-100 text-rose-900 border-rose-300 font-extrabold'
                    : usedPercentage > 0
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                }`}>
                  {usedPercentage}% đã dùng
                </span>
              </div>
            </div>

            {/* Slim elegant progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  usedPercentage > 80 ? 'bg-aia-red' : usedPercentage > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.max(usedPercentage > 0 ? 3 : 0, usedPercentage)}%` }}
              />
            </div>

            {/* Flat clean stats row - NO heavy gray box */}
            {/* High Contrast Quota numbers */}
            <div className="mt-2 flex items-center justify-between text-xs leading-tight">
              <div>
                <span className="text-slate-600 text-xs font-medium">Đã chi: </span>
                <span className="font-bold font-numeric text-slate-900 text-xs sm:text-[13px]">
                  {formatCurrencyVND(usedAmount)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-600 text-xs font-medium">Còn lại: </span>
                <span className="font-bold font-numeric text-emerald-800 text-xs sm:text-[13px]">
                  {formatCurrencyVND(remainingLimit)}
                </span>
                <span className="text-slate-600 text-xs font-semibold"> / {formatCompactVND(maxLimit)}</span>
              </div>
            </div>
          </div>
        )}
        {/* Warning if pending payment or grace period */}
        {primaryPolicy?.status === 'pending_payment' && primaryPolicy.gracePeriodEnd && (
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200/80 text-xs text-aia-red flex items-center gap-1.5 font-semibold">
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
          <Receipt className="w-3.5 h-3.5 text-slate-500" />
          <span className={customerClaims.length > 0 ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}>
            {customerClaims.length} hồ sơ claim
          </span>
        </div>
        <div className="flex items-center gap-1 text-aia-red font-bold group-hover:translate-x-0.5 transition-transform">
          <span>Xem chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
