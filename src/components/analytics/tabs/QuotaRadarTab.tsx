import React, { useState, useMemo } from 'react';
import { HeartPulse, AlertTriangle, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { Policy } from '../../../types/crm';
import { formatCurrencyVND } from '../../../utils/formatters';

interface QuotaRadarTabProps {
  policies: Policy[];
  onSelectCustomer?: (customerId: string) => void;
}

type QuotaRiskLevel = 'all' | 'danger' | 'warning' | 'safe';

interface QuotaRow {
  policyId: string;
  customerId: string;
  customerName: string;
  productName: string;
  benefitName: string;
  unit: 'VND' | 'days';
  maxLimit: number;
  usedAmount: number;
  remainingLimit: number;
  usedPercentage: number;
  status: 'danger' | 'warning' | 'safe';
  recommendation: string;
}

export const QuotaRadarTab: React.FC<QuotaRadarTabProps> = ({
  policies,
  onSelectCustomer,
}) => {
  const [riskFilter, setRiskFilter] = useState<QuotaRiskLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all benefit quotas across all policies
  const allRows: QuotaRow[] = useMemo(() => {
    return policies.flatMap((pol) => {
      return (pol.benefits || []).map((b) => {
        const pct = b.maxLimit > 0 ? Math.min(100, Math.round((b.usedAmount / b.maxLimit) * 100)) : 0;
        let status: 'safe' | 'warning' | 'danger' = 'safe';
        let recommendation = 'Hạn mức dồi dào, an tâm bảo vệ toàn diện';

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
  }, [policies]);

  // Filtered and sorted rows
  const filteredRows = useMemo(() => {
    return allRows
      .filter((row) => {
        // Risk Filter
        if (riskFilter !== 'all' && row.status !== riskFilter) {
          return false;
        }

        // Search Query
        if (searchQuery.trim().length > 0) {
          const q = searchQuery.toLowerCase();
          const matchCustomer = row.customerName.toLowerCase().includes(q);
          const matchPolicy = row.policyId.toLowerCase().includes(q);
          const matchBenefit = row.benefitName.toLowerCase().includes(q);
          return matchCustomer || matchPolicy || matchBenefit;
        }

        return true;
      })
      .sort((a, b) => b.usedPercentage - a.usedPercentage);
  }, [allRows, riskFilter, searchQuery]);

  // Aggregate stats
  const dangerCount = allRows.filter((r) => r.status === 'danger').length;
  const warningCount = allRows.filter((r) => r.status === 'warning').length;
  const safeCount = allRows.filter((r) => r.status === 'safe').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200/60">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Radar Khai Thác Hạn Mức Thẻ Sức Khỏe & Quyền Lợi
            </h4>
            <p className="text-xs text-slate-500">
              Chủ động nhận diện khách hàng có hạn mức sắp cạn để tư vấn nâng cấp gói bảo vệ
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-numeric self-start sm:self-auto">
          Tổng {allRows.length} gói quyền lợi
        </div>
      </div>

      {/* Filter Strip & Quick Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Risk Pills */}
        <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/70 text-xs font-semibold overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setRiskFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              riskFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất Cả ({allRows.length})
          </button>

          <button
            type="button"
            onClick={() => setRiskFilter('danger')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              riskFilter === 'danger'
                ? 'bg-white text-rose-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Cận Hạn Mức &gt;80% ({dangerCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setRiskFilter('warning')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              riskFilter === 'warning'
                ? 'bg-white text-amber-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-amber-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Theo Dõi 40-80% ({warningCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setRiskFilter('safe')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              riskFilter === 'safe'
                ? 'bg-white text-emerald-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>An Toàn &lt;40% ({safeCount})</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên khách hàng, số HĐ..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-aia-red focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full min-w-[960px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3 min-w-[160px] whitespace-nowrap">Khách hàng & HĐ</th>
              <th className="py-3 px-3 min-w-[180px] whitespace-nowrap">Quyền lợi bảo hiểm</th>
              <th className="py-3 px-3 min-w-[130px] text-right whitespace-nowrap">Hạn mức năm</th>
              <th className="py-3 px-3 min-w-[130px] text-right whitespace-nowrap">Đã bồi thường</th>
              <th className="py-3 px-3 min-w-[140px] whitespace-nowrap">Tỷ lệ sử dụng</th>
              <th className="py-3 px-3 min-w-[130px] text-right whitespace-nowrap">Còn lại</th>
              <th className="py-3 px-3 min-w-[220px]">Đánh giá & Khuyến nghị</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  Không tìm thấy quyền lợi nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              filteredRows.map((row, idx) => (
                <tr key={`${row.policyId}-${idx}`} className="hover:bg-slate-50/80 transition-colors">
                  {/* Khách hàng & HĐ */}
                  <td className="py-3 px-3">
                    <div
                      onClick={() => onSelectCustomer?.(row.customerId)}
                      className="font-bold text-slate-900 hover:text-aia-red cursor-pointer transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{row.customerName}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[10px] text-slate-400 font-numeric">{row.policyId}</div>
                  </td>

                  {/* Quyền lợi */}
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-800">{row.benefitName}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{row.productName}</span>
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
                    <div className="flex items-center justify-between text-[11px] mb-1 font-numeric">
                      <span className="text-slate-700 font-bold">{row.usedPercentage}%</span>
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
                      className={`p-2 rounded-lg text-[11px] flex items-start gap-1.5 ${
                        row.status === 'danger'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : row.status === 'warning'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
