import React, { useMemo } from 'react';
import { Coins, AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { Policy } from '../../../types/crm';
import { AggregatedKPIs } from '../types';
import { DonutChart } from '../charts/DonutChart';
import { formatCurrencyVND } from '../../../utils/formatters';

interface PortfolioTabProps {
  policies: Policy[];
  kpis: AggregatedKPIs;
  onSelectCustomer?: (customerId: string) => void;
}

export const PortfolioTab: React.FC<PortfolioTabProps> = ({
  policies,
  kpis,
  onSelectCustomer,
}) => {
  // Extract policies that need premium collection attention (pending_payment or due soon)
  const urgentCollectionPolicies = useMemo(() => {
    return policies.filter(
      (p) => p.status === 'pending_payment' || (p.nextDueDate && p.nextDueDate <= '2026-11-30')
    );
  }, [policies]);

  return (
    <div className="space-y-6">
      {/* Row 1: Donut Chart & Cash Flow Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        {/* Donut Chart (6 cols) */}
        <div className="lg:col-span-6 min-w-0">
          <DonutChart policies={policies} />
        </div>

        {/* Cash Flow Analysis Grid (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4 min-w-0">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Cơ Cấu Dòng Phí & Doanh Số Bảo Hiểm (VND)
                </h4>
                <p className="text-xs text-slate-500">
                  Phân rã phí năm đầu (FYP), phí tái tục (RYP) và nợ phí cần thu
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Tỷ lệ duy trì K1
              </span>
              <span className="text-sm font-black text-slate-900 font-numeric">
                {kpis.k1PersistencyRate}%
              </span>
            </div>
          </div>

          {/* 3 Cash Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* FYP */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-slate-500 text-[11px] block font-semibold">
                  Phí Năm Đầu (FYP)
                </span>
                <span className="text-base font-extrabold text-blue-700 font-numeric mt-1 block">
                  {formatCurrencyVND(kpis.fypAmount)}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Hợp đồng mới phát hành năm 1
              </span>
            </div>

            {/* RYP */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-slate-500 text-[11px] block font-semibold">
                  Phí Tái Tục (RYP)
                </span>
                <span className="text-base font-extrabold text-slate-900 font-numeric mt-1 block">
                  {formatCurrencyVND(kpis.rypAmount)}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                HĐ năm 2+ đóng phí định kỳ
              </span>
            </div>

            {/* Pending Premium */}
            <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200 flex flex-col justify-between">
              <div>
                <span className="text-aia-red text-[11px] block font-semibold">
                  Phí Chờ Thu (Ân hạn)
                </span>
                <span className="text-base font-extrabold text-aia-red font-numeric mt-1 block">
                  {formatCurrencyVND(kpis.pendingAmount)}
                </span>
              </div>
              <span className="text-[10px] text-aia-red/80 font-medium mt-2 block">
                Cần thu trong 60 ngày ân hạn
              </span>
            </div>
          </div>

          {/* Total APE Highlight Strip */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-bold text-white block">
                Tổng phí thường niên quản lý (APE):
              </span>
              <span className="text-[11px] text-slate-300">
                Bao gồm {kpis.inForceCount} hợp đồng đang có hiệu lực bảo vệ
              </span>
            </div>
            <span className="font-numeric text-lg sm:text-xl font-black text-white shrink-0">
              {formatCurrencyVND(kpis.totalAnnualPremium)}
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Collection Alerts & Follow-up Action Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/60">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Danh Sách Cảnh Báo Thu Phí & Bảo Vệ Tỷ Lệ K1
              </h4>
              <p className="text-xs text-slate-500">
                Các hợp đồng cần hoàn tất thu phí để tránh mất hiệu lực và bảo đảm quyền lợi khách hàng
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full self-start sm:self-auto font-numeric">
            {urgentCollectionPolicies.length} Hợp đồng cần theo dõi
          </span>
        </div>

        {/* Action Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full min-w-[760px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3.5">Hợp đồng & Khách hàng</th>
                <th className="py-3 px-3.5">Sản phẩm bảo hiểm</th>
                <th className="py-3 px-3.5 text-right">Phí định kỳ</th>
                <th className="py-3 px-3.5">Ngày đến hạn</th>
                <th className="py-3 px-3.5">Tình trạng</th>
                <th className="py-3 px-3.5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {urgentCollectionPolicies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    Hiện không có hợp đồng nào nợ phí hoặc sắp đến hạn!
                  </td>
                </tr>
              ) : (
                urgentCollectionPolicies.map((pol) => {
                  const isPending = pol.status === 'pending_payment';
                  return (
                    <tr key={pol.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Customer & Policy ID */}
                      <td className="py-3 px-3.5">
                        <div
                          onClick={() => onSelectCustomer?.(pol.customerId)}
                          className="font-bold text-slate-900 hover:text-aia-red cursor-pointer transition-colors"
                        >
                          {pol.customerName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-numeric">{pol.id}</div>
                      </td>

                      {/* Product */}
                      <td className="py-3 px-3.5">
                        <span className="font-semibold text-slate-800">{pol.productName}</span>
                      </td>

                      {/* Premium Amount */}
                      <td className="py-3 px-3.5 text-right font-numeric font-bold text-slate-900">
                        {formatCurrencyVND(pol.premiumAmount)}
                      </td>

                      {/* Due Date */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-1.5 text-slate-700 font-numeric">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{pol.nextDueDate || 'Chưa cập nhật'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3.5">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-aia-red border border-rose-200">
                            <AlertTriangle className="w-3 h-3 text-aia-red" />
                            <span>Trong 60 ngày ân hạn</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Sắp đến hạn</span>
                          </span>
                        )}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3 px-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onSelectCustomer?.(pol.customerId)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Mở hồ sơ khách hàng"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
