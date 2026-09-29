import { Customer, Policy } from '../../types/crm';
import { ClaimItem } from '../../types/claim';

export type AnalyticsPeriod = 'all' | '2026' | 'last_6_months' | 'q3_2026';

export const PERIOD_CONFIG: Record<
  AnalyticsPeriod,
  { label: string; shortLabel: string; description: string; dateRange: { from?: string; to?: string } }
> = {
  all: {
    label: 'Toàn bộ thời gian',
    shortLabel: 'Tất cả',
    description: 'Toàn bộ dữ liệu khai thác và bồi thường từ trước đến nay',
    dateRange: {},
  },
  '2026': {
    label: 'Năm 2026',
    shortLabel: 'Năm 2026',
    description: 'Số liệu ghi nhận trong năm tài chính 2026 (01/01/2026 - 31/12/2026)',
    dateRange: { from: '2026-01-01', to: '2026-12-31' },
  },
  last_6_months: {
    label: '6 Tháng Gần Nhất',
    shortLabel: '6 Tháng',
    description: 'Từ tháng 04/2026 đến tháng 09/2026',
    dateRange: { from: '2026-04-01', to: '2026-09-30' },
  },
  q3_2026: {
    label: 'Quý 3/2026',
    shortLabel: 'Quý 3/2026',
    description: 'Từ tháng 07/2026 đến tháng 09/2026',
    dateRange: { from: '2026-07-01', to: '2026-09-30' },
  },
};

export type AnalyticsSubTab = 'overview' | 'portfolio' | 'claims' | 'quotas';

export const SUB_TAB_CONFIG: Record<
  AnalyticsSubTab,
  { label: string; shortLabel: string; iconName: string; badge?: string }
> = {
  overview: {
    label: 'Tổng Quan Doanh Số & MDRT',
    shortLabel: 'Tổng quan & MDRT',
    iconName: 'TrendingUp',
  },
  portfolio: {
    label: 'Cơ Cấu Hợp Đồng & Dòng Phí',
    shortLabel: 'Hợp đồng & Dòng phí',
    iconName: 'PieChart',
  },
  claims: {
    label: 'Vận Hành Quyền Lợi & Bồi Thường',
    shortLabel: 'Bồi thường & SLA',
    iconName: 'Receipt',
  },
  quotas: {
    label: 'Radar Hạn Mức Thẻ Sức Khỏe',
    shortLabel: 'Radar Hạn mức',
    iconName: 'HeartPulse',
  },
};

export interface AggregatedKPIs {
  totalAnnualPremium: number; // APE: Phí thường niên quản lý
  mdrtTarget: number; // Mục tiêu MDRT chuẩn 750,000,000 VND
  mdrtProgressPct: number; // % đạt được
  mdrtRemaining: number; // Còn thiếu để đạt MDRT
  totalClaimsCount: number;
  approvedClaimsCount: number;
  approvalRate: number; // Tỷ lệ duyệt chi trả (%)
  totalClaimedAmount: number;
  totalApprovedAmount: number;
  totalDeductedAmount: number;
  payoutRatio: number; // Tỷ lệ bồi hoàn thực tế (%)
  totalPoliciesCount: number;
  inForceCount: number;
  pendingCount: number;
  lapsedCount: number;
  k1PersistencyRate: number; // Tỷ lệ duy trì K1 (%)
  fypAmount: number; // Phí năm đầu
  rypAmount: number; // Phí tái tục
  pendingAmount: number; // Phí chờ thu
  criticalQuotaCount: number; // Số quyền lợi cạn hạn mức > 80%
  totalCustomersCount: number;
}

export interface MonthlyTrendDataPoint {
  key: string; // '2026-01'
  label: string; // 'T01/26'
  shortLabel: string; // 'T1'
  premiumAmount: number; // Doanh số phí phát hành
  policiesCount: number; // Số hợp đồng mới
  claimsCount: number; // Số ca bồi thường phát sinh
  claimsAmount: number; // Tiền bồi thường phát sinh
}

// Helper to filter data based on selected period
export function filterDataByPeriod(
  period: AnalyticsPeriod,
  customers: Customer[],
  policies: Policy[],
  claims: ClaimItem[]
): {
  filteredCustomers: Customer[];
  filteredPolicies: Policy[];
  filteredClaims: ClaimItem[];
} {
  if (period === 'all') {
    return {
      filteredCustomers: customers,
      filteredPolicies: policies,
      filteredClaims: claims,
    };
  }

  const { from, to } = PERIOD_CONFIG[period].dateRange;

  const isDateInRange = (dateStr?: string): boolean => {
    if (!dateStr) return false;
    if (from && dateStr < from) return false;
    if (to && dateStr > to) return false;
    return true;
  };

  const filteredPolicies = policies.filter((p) => isDateInRange(p.issueDate));
  const filteredClaims = claims.filter((c) => isDateInRange(c.intakeDate || c.admissionDate));
  const filteredCustomers = customers.filter((c) => isDateInRange(c.createdAt));

  return {
    filteredCustomers,
    filteredPolicies,
    filteredClaims,
  };
}

// Compute comprehensive financial KPIs
export function computeFinancialKPIs(
  allPolicies: Policy[],
  activePolicies: Policy[],
  allClaims: ClaimItem[],
  allCustomers: Customer[]
): AggregatedKPIs {
  const MDRT_TARGET = 750000000; // 750M APE chuẩn MDRT AIA

  // Total in-force policies across the active scope (or whole database if active is empty)
  const policiesPool = activePolicies.length > 0 ? activePolicies : allPolicies;
  const inForcePolicies = policiesPool.filter((p) => p.status === 'in_force');
  const pendingPolicies = policiesPool.filter((p) => p.status === 'pending_payment');
  const lapsedPolicies = policiesPool.filter((p) => p.status === 'lapsed');

  const totalAnnualPremium = inForcePolicies.reduce((sum, p) => sum + p.premiumAmount, 0);

  const mdrtProgressPct = Math.min(100, Math.round((totalAnnualPremium / MDRT_TARGET) * 100));
  const mdrtRemaining = Math.max(0, MDRT_TARGET - totalAnnualPremium);

  // Claims calculations
  const totalClaimsCount = allClaims.length;
  const approvedClaims = allClaims.filter((c) => c.status === 'approved' || c.status === 'paid');
  const approvedClaimsCount = approvedClaims.length;
  const approvalRate = totalClaimsCount > 0 ? Math.round((approvedClaimsCount / totalClaimsCount) * 100) : 0;

  const totalClaimedAmount = allClaims.reduce((sum, c) => sum + (c.claimedAmount || 0), 0);
  const totalApprovedAmount = allClaims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0);
  const totalDeductedAmount = allClaims.reduce((sum, c) => sum + (c.deductedAmount || 0), 0);
  const payoutRatio = totalClaimedAmount > 0 ? Math.round((totalApprovedAmount / totalClaimedAmount) * 100) : 0;

  // Persistency & Status
  const totalPoliciesCount = policiesPool.length;
  const inForceCount = inForcePolicies.length;
  const pendingCount = pendingPolicies.length;
  const lapsedCount = lapsedPolicies.length;
  const k1PersistencyRate = totalPoliciesCount > 0 ? Math.round((inForceCount / totalPoliciesCount) * 1000) / 10 : 0;

  // FYP & RYP
  // FYP: HĐ phát hành sau 2025-09-01 (năm đầu)
  const fypAmount = inForcePolicies
    .filter((p) => p.issueDate >= '2025-09-01')
    .reduce((sum, p) => sum + p.premiumAmount, 0);

  const rypAmount = inForcePolicies
    .filter((p) => p.issueDate < '2025-09-01')
    .reduce((sum, p) => sum + p.premiumAmount, 0);

  const pendingAmount = pendingPolicies.reduce((sum, p) => sum + p.premiumAmount, 0);

  // Critical Quota calculation: Count of benefits with usedPct >= 80%
  let criticalQuotaCount = 0;
  policiesPool.forEach((pol) => {
    pol.benefits.forEach((b) => {
      if (b.maxLimit > 0) {
        const pct = (b.usedAmount / b.maxLimit) * 100;
        if (pct >= 80) criticalQuotaCount += 1;
      }
    });
  });

  return {
    totalAnnualPremium,
    mdrtTarget: MDRT_TARGET,
    mdrtProgressPct,
    mdrtRemaining,
    totalClaimsCount,
    approvedClaimsCount,
    approvalRate,
    totalClaimedAmount,
    totalApprovedAmount,
    totalDeductedAmount,
    payoutRatio,
    totalPoliciesCount,
    inForceCount,
    pendingCount,
    lapsedCount,
    k1PersistencyRate,
    fypAmount,
    rypAmount,
    pendingAmount,
    criticalQuotaCount,
    totalCustomersCount: allCustomers.length,
  };
}
