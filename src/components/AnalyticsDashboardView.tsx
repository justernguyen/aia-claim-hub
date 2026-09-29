import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  PieChart,
  Receipt,
  HeartPulse,
} from 'lucide-react';
import { Customer, Policy } from '../types/crm';
import { ClaimItem } from '../types/claim';
import {
  AnalyticsPeriod,
  AnalyticsSubTab,
  SUB_TAB_CONFIG,
  filterDataByPeriod,
  computeFinancialKPIs,
} from './analytics/types';
import { ExecutiveToolbar } from './analytics/ExecutiveToolbar';
import { ExecutiveCommandStrip } from './analytics/ExecutiveCommandStrip';
import { OverviewTab } from './analytics/tabs/OverviewTab';
import { PortfolioTab } from './analytics/tabs/PortfolioTab';
import { ClaimsTab } from './analytics/tabs/ClaimsTab';
import { QuotaRadarTab } from './analytics/tabs/QuotaRadarTab';

interface AnalyticsDashboardViewProps {
  customers: Customer[];
  policies: Policy[];
  claims: ClaimItem[];
  onSelectCustomer?: (customerId: string) => void;
  onExportCSV?: () => void;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  customers,
  policies,
  claims,
  onSelectCustomer,
  onExportCSV,
}) => {
  // State: Selected period filter & active specialized tab
  const [activePeriod, setActivePeriod] = useState<AnalyticsPeriod>('2026');
  const [activeSubTab, setActiveSubTab] = useState<AnalyticsSubTab>('overview');

  // Filter datasets according to activePeriod
  const { filteredCustomers, filteredPolicies, filteredClaims } = useMemo(() => {
    return filterDataByPeriod(activePeriod, customers, policies, claims);
  }, [activePeriod, customers, policies, claims]);

  // Compute comprehensive KPIs
  const kpis = useMemo(() => {
    return computeFinancialKPIs(policies, filteredPolicies, filteredClaims, filteredCustomers);
  }, [policies, filteredPolicies, filteredClaims, filteredCustomers]);

  // Counts for tab badges
  const pendingClaimsCount = useMemo(() => {
    return filteredClaims.filter(
      (c) => c.status === 'intake' || c.status === 'pending_docs' || c.status === 'underwriting'
    ).length;
  }, [filteredClaims]);

  return (
    <div className="space-y-6">
      {/* Zone 1: Executive Toolbar & Period Filter */}
      <ExecutiveToolbar
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
        onExportCSV={onExportCSV}
      />

      {/* Zone 2: Standardized 4-Zone Financial Command Strip */}
      <ExecutiveCommandStrip
        kpis={kpis}
        onNavigateTab={(tab) => setActiveSubTab(tab)}
      />

      {/* Zone 3: Specialized 4-Sub-Tab Navigation Bar */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-start gap-1 overflow-x-auto max-w-full">
        {/* Tab 1: Tổng Quan & MDRT */}
        <button
          type="button"
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'overview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <TrendingUp className={`w-4 h-4 ${activeSubTab === 'overview' ? 'text-rose-400' : 'text-slate-400'}`} />
          <span>{SUB_TAB_CONFIG.overview.label}</span>
        </button>

        {/* Tab 2: Cơ Cấu Hợp Đồng & Dòng Phí */}
        <button
          type="button"
          onClick={() => setActiveSubTab('portfolio')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'portfolio'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <PieChart className={`w-4 h-4 ${activeSubTab === 'portfolio' ? 'text-amber-400' : 'text-slate-400'}`} />
          <span>{SUB_TAB_CONFIG.portfolio.label}</span>
          {kpis.pendingCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500 text-white font-numeric">
              {kpis.pendingCount}
            </span>
          )}
        </button>

        {/* Tab 3: Vận Hành Bồi Thường & SLA */}
        <button
          type="button"
          onClick={() => setActiveSubTab('claims')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'claims'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Receipt className={`w-4 h-4 ${activeSubTab === 'claims' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>{SUB_TAB_CONFIG.claims.label}</span>
          {pendingClaimsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white font-numeric">
              {pendingClaimsCount}
            </span>
          )}
        </button>

        {/* Tab 4: Radar Hạn Mức Thẻ Sức Khỏe */}
        <button
          type="button"
          onClick={() => setActiveSubTab('quotas')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'quotas'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <HeartPulse className={`w-4 h-4 ${activeSubTab === 'quotas' ? 'text-purple-400' : 'text-slate-400'}`} />
          <span>{SUB_TAB_CONFIG.quotas.label}</span>
          {kpis.criticalQuotaCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500 text-white font-numeric animate-pulse">
              {kpis.criticalQuotaCount}
            </span>
          )}
        </button>
      </div>

      {/* Zone 4: Tab Content Rendering */}
      <div className="min-w-0 transition-all duration-200">
        {activeSubTab === 'overview' && (
          <OverviewTab
            policies={filteredPolicies}
            claims={filteredClaims}
            customers={filteredCustomers}
            period={activePeriod}
            kpis={kpis}
            onSelectCustomer={onSelectCustomer}
          />
        )}

        {activeSubTab === 'portfolio' && (
          <PortfolioTab
            policies={filteredPolicies}
            kpis={kpis}
            onSelectCustomer={onSelectCustomer}
          />
        )}

        {activeSubTab === 'claims' && (
          <ClaimsTab
            claims={filteredClaims}
            kpis={kpis}
          />
        )}

        {activeSubTab === 'quotas' && (
          <QuotaRadarTab
            policies={filteredPolicies}
            onSelectCustomer={onSelectCustomer}
          />
        )}
      </div>
    </div>
  );
};
