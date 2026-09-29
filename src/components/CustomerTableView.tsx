import React from 'react';
import {
  Phone,
  ShieldCheck,
  ChevronRight,
  HeartPulse,
} from 'lucide-react';
import { Customer, Policy, POLICY_STATUS_CONFIG } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { formatCurrencyVND, formatCCCD, formatPhone } from '../utils/formatters';
import { CustomerAvatar } from './CustomerAvatar';

interface CustomerTableViewProps {
  customers: Customer[];
  policies: Policy[];
  claims: ClaimItem[];
  onSelect: (customer: Customer) => void;
  onChangeAvatar?: (customer: Customer) => void;
}

export const CustomerTableView: React.FC<CustomerTableViewProps> = ({
  customers,
  policies,
  claims,
  onSelect,
  onChangeAvatar,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 min-w-[170px] whitespace-nowrap">Khách hàng</th>
              <th className="py-3.5 px-4 min-w-[160px] whitespace-nowrap">Số điện thoại / Địa chỉ</th>
              <th className="py-3.5 px-4 min-w-[180px] whitespace-nowrap">Hợp đồng & Sản phẩm</th>
              <th className="py-3.5 px-4 min-w-[130px] whitespace-nowrap">Trạng thái HĐ</th>
              <th className="py-3.5 px-4 min-w-[130px] text-right whitespace-nowrap">Phí định kỳ</th>
              <th className="py-3.5 px-4 min-w-[180px] whitespace-nowrap">Hạn mức Thẻ SK</th>
              <th className="py-3.5 px-4 min-w-[90px] text-center whitespace-nowrap">Claim</th>
              <th className="py-3.5 px-4 min-w-[90px] text-right whitespace-nowrap">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((cust) => {
              const custPolicies = policies.filter((p) => p.customerId === cust.id);
              const custClaims = claims.filter(
                (c) =>
                  (c.customerId === cust.id && (!c.customerName || c.customerName === cust.name)) ||
                  c.customerName === cust.name ||
                  (c.customerCccd && c.customerCccd === cust.cccd) ||
                  (c.policyNumber && custPolicies.some((p) => p.id === c.policyNumber))
              );
              const primaryPol = custPolicies[0];
              const medicalBenefit = primaryPol?.benefits.find((b) => b.type === 'medical_expense') || primaryPol?.benefits[0];
              const totalPremium = custPolicies.reduce((sum, p) => sum + p.premiumAmount, 0);

              const used = medicalBenefit ? medicalBenefit.usedAmount : 0;
              const max = medicalBenefit ? medicalBenefit.maxLimit : 0;
              const remaining = medicalBenefit ? medicalBenefit.remainingLimit : 0;
              const pct = max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0;

              return (
                <tr
                  key={cust.id}
                  onClick={() => onSelect(cust)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Khách hàng */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <CustomerAvatar
                        avatarId={cust.avatar}
                        name={cust.name}
                        customerId={cust.id}
                        size="sm"
                        editable={Boolean(onChangeAvatar)}
                        onClick={
                          onChangeAvatar
                            ? (e) => {
                                e.stopPropagation();
                                onChangeAvatar(cust);
                              }
                            : undefined
                        }
                      />
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-aia-red transition-colors flex items-center gap-1.5 whitespace-nowrap">
                          <span>{cust.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({cust.gender})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-numeric whitespace-nowrap">
                          CCCD: {formatCCCD(cust.cccd)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SĐT / Địa chỉ */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-slate-700 font-numeric font-medium whitespace-nowrap">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{formatPhone(cust.phone)}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]" title={cust.address}>
                      {cust.address}
                    </div>
                  </td>

                  {/* HĐ & Sản phẩm */}
                  <td className="py-3.5 px-4">
                    {primaryPol ? (
                      <div>
                        <div className="font-semibold text-slate-800 flex items-center gap-1 whitespace-nowrap">
                          <ShieldCheck className="w-3.5 h-3.5 text-aia-red shrink-0" />
                          <span className="font-numeric font-medium whitespace-nowrap">{primaryPol.id}</span>
                          {custPolicies.length > 1 && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1 rounded font-bold shrink-0">
                              +{custPolicies.length - 1}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] text-slate-500 truncate max-w-[150px]" title={primaryPol.productName}>
                            {primaryPol.productName}
                          </span>
                          {primaryPol.benefits && primaryPol.benefits.length > 1 && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-aia-red border border-rose-200 shrink-0">
                              +{primaryPol.benefits.length - 1} bổ trợ
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic whitespace-nowrap">Chưa có HĐ</span>
                    )}
                  </td>

                  {/* Trạng thái HĐ */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {primaryPol && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full text-[11px] font-semibold border whitespace-nowrap ${
                          POLICY_STATUS_CONFIG[primaryPol.status]?.badgeClass || 'bg-slate-100'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            POLICY_STATUS_CONFIG[primaryPol.status]?.dotColor || 'bg-slate-400'
                          }`}
                        />
                        <span className="whitespace-nowrap">{POLICY_STATUS_CONFIG[primaryPol.status]?.label || primaryPol.status}</span>
                      </span>
                    )}
                  </td>

                  {/* Phí định kỳ */}
                  <td className="py-3.5 px-4 text-right font-numeric font-bold text-slate-900 whitespace-nowrap">
                    {formatCurrencyVND(totalPremium)}
                  </td>

                  {/* Hạn mức thẻ SK */}
                  <td className="py-3.5 px-4 min-w-[180px]">
                    {medicalBenefit ? (
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1 gap-2 whitespace-nowrap">
                          <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0">
                            <HeartPulse className="w-3 h-3 text-aia-red shrink-0" />
                            <span>{pct}% đã dùng</span>
                          </span>
                          <span className="font-numeric text-slate-700 font-bold shrink-0">
                            Còn {formatCurrencyVND(remaining)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pct > 80 ? 'bg-aia-red' : 'bg-slate-700'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic whitespace-nowrap">Không có thẻ SK</span>
                    )}
                  </td>

                  {/* Claim count */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold font-numeric whitespace-nowrap ${
                        custClaims.length > 0 ? 'bg-rose-50 text-aia-red border border-rose-200' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {custClaims.length} ca
                    </span>
                  </td>

                  {/* Thao tác */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(cust);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-aia-red hover:bg-rose-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Chi tiết</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
