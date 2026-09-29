import React, { useMemo } from 'react';
import { Package, Zap, Users, ArrowUpRight, Shield } from 'lucide-react';
import { Policy, Customer } from '../../../types/crm';
import { ClaimItem } from '../../../types/claim';
import { AnalyticsPeriod, AggregatedKPIs } from '../types';
import { DynamicAreaChart } from '../charts/DynamicAreaChart';
import { MdrtProgressGauge } from '../charts/MdrtProgressGauge';
import { formatCurrencyVND, formatShortCurrency } from '../../../utils/formatters';

interface OverviewTabProps {
  policies: Policy[];
  claims: ClaimItem[];
  customers: Customer[];
  period: AnalyticsPeriod;
  kpis: AggregatedKPIs;
  onSelectCustomer?: (customerId: string) => void;
}

interface ProductPerformance {
  productName: string;
  count: number;
  totalPremium: number;
  sharePct: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  policies,
  claims,
  customers,
  period,
  kpis,
}) => {
  // Aggregate Top Products
  const topProducts: ProductPerformance[] = useMemo(() => {
    const prodMap: Record<string, { count: number; totalPremium: number }> = {};
    const inForcePolicies = policies.filter((p) => p.status === 'in_force');
    const totalAPE = inForcePolicies.reduce((sum, p) => sum + p.premiumAmount, 0) || 1;

    inForcePolicies.forEach((p) => {
      const name = p.productName || 'Sản phẩm khác';
      if (!prodMap[name]) {
        prodMap[name] = { count: 0, totalPremium: 0 };
      }
      prodMap[name].count += 1;
      prodMap[name].totalPremium += p.premiumAmount;
    });

    return Object.entries(prodMap)
      .map(([name, data]) => ({
        productName: name,
        count: data.count,
        totalPremium: data.totalPremium,
        sharePct: Math.round((data.totalPremium / totalAPE) * 100),
      }))
      .sort((a, b) => b.totalPremium - a.totalPremium)
      .slice(0, 5);
  }, [policies]);

  // Advisor Metrics
  const avgCaseSize = useMemo(() => {
    const inForcePolicies = policies.filter((p) => p.status === 'in_force');
    if (inForcePolicies.length === 0) return 0;
    return Math.round(kpis.totalAnnualPremium / inForcePolicies.length);
  }, [policies, kpis.totalAnnualPremium]);

  const ridersCount = useMemo(() => {
    return policies.reduce((sum, p) => sum + (p.benefits?.length || 0), 0);
  }, [policies]);

  const avgRidersPerPolicy = policies.length > 0 ? (ridersCount / policies.length).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Row 1: Charts (Dynamic Area Chart & MDRT Progress Gauge) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <DynamicAreaChart
          policies={policies}
          claims={claims}
          customers={customers}
          period={period}
        />
        <MdrtProgressGauge totalAnnualPremium={kpis.totalAnnualPremium} />
      </div>

      {/* Row 2: Product Breakdown & Advisor Efficiency Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        {/* Top 5 Products (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Cơ Cấu Sản Phẩm Bảo Hiểm Khai Thác Chủ Lực
                </h4>
                <p className="text-xs text-slate-500">
                  Top các dòng sản phẩm đóng góp doanh số APE cao nhất trong danh mục
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-numeric">
              {topProducts.length} Gói sản phẩm
            </span>
          </div>

          {/* Product Items List */}
          <div className="py-3 space-y-3">
            {topProducts.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Chưa có dữ liệu sản phẩm trong kỳ này</p>
            ) : (
              topProducts.map((prod, idx) => (
                <div key={prod.productName} className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 font-numeric font-bold text-[10px] flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-slate-900 truncate">{prod.productName}</span>
                      <span className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-numeric shrink-0">
                        {prod.count} HĐ
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-numeric">
                      <span className="font-extrabold text-slate-900">
                        {formatCurrencyVND(prod.totalPremium)}
                      </span>
                      <span className="text-slate-400 text-[11px]">({prod.sharePct}%)</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-aia-red to-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${prod.sharePct}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Định vị dòng sản phẩm cốt lõi</span>
            <span className="font-numeric font-semibold text-slate-700">
              Chiếm {topProducts.reduce((sum, p) => sum + p.sharePct, 0)}% tổng doanh số APE
            </span>
          </div>
        </div>

        {/* Advisor Performance Highlights (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Chỉ Số Hiệu Quả Tư Vấn</h4>
                <p className="text-xs text-slate-500">Độ sâu khai thác và giá trị bình quân</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Metric 1: Avg Case Size */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Quy mô HĐ bình quân (Case Size):</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-lg font-black font-numeric text-slate-900 mt-1">
                {formatShortCurrency(avgCaseSize)} <span className="text-xs font-normal text-slate-500">/HĐ</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Phí thường niên trung bình trên 1 hợp đồng</p>
            </div>

            {/* Metric 2: Riders attach rate */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Độ sâu bảo vệ (Riders/HĐ):</span>
                <Shield className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <p className="text-lg font-black font-numeric text-slate-900 mt-1">
                {avgRidersPerPolicy} <span className="text-xs font-normal text-slate-500">quyền lợi kèm theo</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Tổng {ridersCount} gói quyền lợi bổ trợ được gắn</p>
            </div>

            {/* Metric 3: Client base */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Tỷ lệ hợp đồng / khách hàng:</span>
                <Users className="w-3.5 h-3.5 text-aia-red" />
              </div>
              <p className="text-lg font-black font-numeric text-slate-900 mt-1">
                {customers.length > 0 ? (policies.length / customers.length).toFixed(1) : '1.0'}{' '}
                <span className="text-xs font-normal text-slate-500">HĐ / Khách</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Bảo vệ đa thế hệ cho các gia đình</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Dữ liệu tổng hợp đồng bộ cùng CRM Đại lý
          </div>
        </div>
      </div>
    </div>
  );
};
