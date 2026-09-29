import React from 'react';
import { HeartPulse, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Policy } from '../types/crm';
import { formatCurrencyVND } from '../utils/formatters';

interface BenefitUtilizationReportProps {
  policies: Policy[];
  onSelectCustomer?: (customerId: string) => void;
}

export const BenefitUtilizationReport: React.FC<BenefitUtilizationReportProps> = ({
  policies,
  onSelectCustomer,
}) => {
  // Extract all medical and hospital benefits across all policies
  const utilizationRows = policies.flatMap((pol) => {
    return pol.benefits.map((b) => {
      const pct = b.maxLimit > 0 ? Math.min(100, Math.round((b.usedAmount / b.maxLimit) * 100)) : 0;
      let status: 'safe' | 'warning' | 'danger' = 'safe';
      let recommendation = 'Hạn mức dồi dào, an tâm bảo vệ';

      if (pct >= 80) {
        status = 'danger';
        recommendation = 'Hạn mức gần cạn! Cần lưu ý tư vấn thêm quyền lợi ngoại trú hoặc nâng hạn mức thẻ.';
      } else if (pct >= 40) {
        status = 'warning';
        recommendation = 'Đã dùng trên 40% hạn mức năm. Cần theo dõi các lần điều trị tiếp theo.';
      }

      return {
        policyId: pol.id,
        customerId: pol.customerId,
        customerName: pol.customerName,
        productName: pol.productName,
        benefitName: b.name,
        unit: b.unit,
        maxLimit: b.maxLimit,
        usedAmount: b.usedAmount,
        remainingLimit: b.remainingLimit,
        usedPercentage: pct,
        status,
        recommendation,
      };
    });
  });

  // Sort by highest percentage used
  utilizationRows.sort((a, b) => b.usedPercentage - a.usedPercentage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Bảng Đối Chiếu Khai Thác Hạn Mức Quyền Lợi Bảo Hiểm
            </h4>
            <p className="text-xs text-slate-500">
              Theo dõi hạn mức đã dùng và số dư còn lại của từng khách hàng để chủ động chăm sóc
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-mono">
          {utilizationRows.length} gói quyền lợi
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full min-w-[960px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs">
              <th className="py-3 px-3 min-w-[150px] whitespace-nowrap">Khách hàng & HĐ</th>
              <th className="py-3 px-3 min-w-[170px] whitespace-nowrap">Quyền lợi bảo hiểm</th>
              <th className="py-3 px-3 min-w-[130px] text-right whitespace-nowrap">Hạn mức năm</th>
              <th className="py-3 px-3 min-w-[130px] text-right whitespace-nowrap">Đã bồi thường</th>
              <th className="py-3 px-3 min-w-[140px] whitespace-nowrap">Tỷ lệ sử dụng</th>
              <th className="py-3 px-3 min-w-[130px] text-right whitespace-nowrap">Còn lại</th>
              <th className="py-3 px-3 min-w-[200px]">Đánh giá & Khuyến nghị</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {utilizationRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                {/* Khách hàng */}
                <td className="py-3 px-3">
                  <div
                    onClick={() => onSelectCustomer?.(row.customerId)}
                    className="font-bold text-slate-900 hover:text-aia-red cursor-pointer transition-colors"
                  >
                    {row.customerName}
                  </div>
                  <div className="text-xs text-slate-500 font-numeric font-medium">
                    {row.policyId}
                  </div>
                </td>

                {/* Quyền lợi */}
                <td className="py-3 px-3">
                  <span className="font-semibold text-slate-800">{row.benefitName}</span>
                </td>

                {/* Hạn mức năm */}
                <td className="py-3 px-3 text-right font-numeric text-slate-600 whitespace-nowrap">
                  {row.unit === 'days' ? `${row.maxLimit} ngày` : formatCurrencyVND(row.maxLimit)}
                </td>

                {/* Đã bồi thường */}
                <td className="py-3 px-3 text-right font-numeric font-bold text-slate-900 whitespace-nowrap">
                  {row.unit === 'days' ? `${row.usedAmount} ngày` : formatCurrencyVND(row.usedAmount)}
                </td>

                {/* Tỷ lệ sử dụng */}
                <td className="py-3 px-3">
                  <div className="flex items-center justify-between text-xs mb-1 font-numeric">
                    <span className="text-slate-800 font-bold">{row.usedPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        row.status === 'danger'
                          ? 'bg-rose-500'
                          : row.status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${row.usedPercentage}%` }}
                    />
                  </div>
                </td>

                {/* Hạn mức còn lại */}
                <td className="py-3 px-3 text-right font-numeric font-bold text-emerald-700 whitespace-nowrap">
                  {row.unit === 'days' ? `${row.remainingLimit} ngày` : formatCurrencyVND(row.remainingLimit)}
                </td>

                {/* Đánh giá & Khuyến nghị */}
                <td className="py-3 px-3">
                  <div
                    className={`p-2.5 rounded-lg text-xs flex items-start gap-1.5 ${
                      row.status === 'danger'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200 font-medium'
                        : row.status === 'warning'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200 font-medium'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium'
                    }`}
                  >
                    {row.status === 'danger' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <span>{row.recommendation}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
