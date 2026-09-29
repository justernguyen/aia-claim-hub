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
import { formatCurrencyVND } from '../utils/formatters';

interface CustomerCardProps {
  customer: Customer;
  policies: Policy[];
  claims: ClaimItem[];
  onSelect: (customer: Customer) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  policies,
  claims,
  onSelect,
}) => {
  const customerPolicies = policies.filter((p) => p.customerId === customer.id);
  const customerClaims = claims.filter((c) => c.customerId === customer.id || c.customerName === customer.name);

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
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 text-white font-bold flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
              {customer.name.split(' ').slice(-1)[0][0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-aia-red transition-colors">
                  {customer.name}
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {customer.gender}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                {customer.occupation || 'Khách hàng cá nhân'}
              </p>
            </div>
          </div>

          {primaryPolicy && (
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                POLICY_STATUS_CONFIG[primaryPolicy.status]?.badgeClass || 'bg-slate-100 text-slate-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
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
            <span className="font-mono">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-mono truncate">{customer.cccd}</span>
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
          <div className="font-bold text-slate-900 font-mono">
            {formatCurrencyVND(totalPremium)}/năm
          </div>
        </div>

        {/* Medical Card Benefit Quota Progress */}
        {medicalBenefit && (
          <div className="mt-4 pt-3.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                <span className="truncate max-w-[170px]" title={medicalBenefit.name}>
                  {medicalBenefit.name}
                </span>
              </span>
              <span className="font-bold font-mono text-[11px] text-slate-700">
                {usedPercentage}% đã dùng
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  usedPercentage > 80
                    ? 'bg-rose-500'
                    : usedPercentage > 40
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${usedPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>Đã bồi thường: {formatCurrencyVND(usedAmount)}</span>
              <span className="font-semibold text-slate-700">
                Còn: {formatCurrencyVND(remainingLimit)}
              </span>
            </div>
          </div>
        )}

        {/* Warning if pending payment or grace period */}
        {primaryPolicy?.status === 'pending_payment' && primaryPolicy.gracePeriodEnd && (
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">
              Gia hạn nộp phí đến {primaryPolicy.gracePeriodEnd}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Claim count + Action link */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Receipt className="w-3.5 h-3.5 text-slate-400" />
          <span>{customerClaims.length} hồ sơ claim</span>
        </div>
        <div className="flex items-center gap-1 text-aia-red font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>Xem chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
