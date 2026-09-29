import React from 'react';
import {
  Phone,
  ShieldCheck,
  ChevronRight,
  HeartPulse,
} from 'lucide-react';
import { Customer, Policy, POLICY_STATUS_CONFIG } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { formatCurrencyVND } from '../utils/formatters';

interface CustomerTableViewProps {
  customers: Customer[];
  policies: Policy[];
  claims: ClaimItem[];
  onSelect: (customer: Customer) => void;
}

export const CustomerTableView: React.FC<CustomerTableViewProps> = ({
  customers,
  policies,
  claims,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Khách hàng</th>
              <th className="py-3.5 px-4">Số điện thoại / Địa chỉ</th>
              <th className="py-3.5 px-4">Hợp đồng & Sản phẩm</th>
              <th className="py-3.5 px-4">Trạng thái HĐ</th>
              <th className="py-3.5 px-4 text-right">Phí định kỳ</th>
              <th className="py-3.5 px-4">Hạn mức Thẻ SK</th>
              <th className="py-3.5 px-4 text-center">Claim</th>
              <th className="py-3.5 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((cust) => {
              const custPolicies = policies.filter((p) => p.customerId === cust.id);
              const custClaims = claims.filter((c) => c.customerId === cust.id || c.customerName === cust.name);
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
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {cust.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-aia-red transition-colors flex items-center gap-1.5">
                          <span>{cust.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({cust.gender})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate max-w-[140px]">
                          CCCD: {cust.cccd}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SĐT / Địa chỉ */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-slate-700 font-mono font-medium">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{cust.phone}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]" title={cust.address}>
                      {cust.address}
                    </div>
                  </td>

                  {/* HĐ & Sản phẩm */}
                  <td className="py-3.5 px-4">
                    {primaryPol ? (
                      <div>
                        <div className="font-semibold text-slate-800 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-aia-red shrink-0" />
                          <span className="font-mono">{primaryPol.id}</span>
                          {custPolicies.length > 1 && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1 rounded font-bold">
                              +{custPolicies.length - 1}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[170px]" title={primaryPol.productName}>
                          {primaryPol.productName}
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Chưa có HĐ</span>
                    )}
                  </td>

                  {/* Trạng thái HĐ */}
                  <td className="py-3.5 px-4">
                    {primaryPol && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full text-[11px] font-semibold border ${
                          POLICY_STATUS_CONFIG[primaryPol.status]?.badgeClass || 'bg-slate-100'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            POLICY_STATUS_CONFIG[primaryPol.status]?.dotColor || 'bg-slate-400'
                          }`}
                        />
                        <span>{POLICY_STATUS_CONFIG[primaryPol.status]?.label || primaryPol.status}</span>
                      </span>
                    )}
                  </td>

                  {/* Phí định kỳ */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    {formatCurrencyVND(totalPremium)}
                  </td>

                  {/* Hạn mức thẻ SK */}
                  <td className="py-3.5 px-4 min-w-[160px]">
                    {medicalBenefit ? (
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <HeartPulse className="w-3 h-3 text-rose-500" />
                            <span>{pct}% đã dùng</span>
                          </span>
                          <span className="font-mono text-slate-700 font-bold">
                            Còn {formatCurrencyVND(remaining)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pct > 80 ? 'bg-rose-500' : pct > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">Không có thẻ SK</span>
                    )}
                  </td>

                  {/* Claim count */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                        custClaims.length > 0 ? 'bg-rose-50 text-aia-red border border-rose-200' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {custClaims.length} ca
                    </span>
                  </td>

                  {/* Thao tác */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(cust);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-aia-red hover:bg-rose-50 rounded-lg transition-colors"
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
