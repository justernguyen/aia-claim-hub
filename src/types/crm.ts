import { ClaimType } from './claim';

export type PolicyStatus = 'in_force' | 'pending_payment' | 'lapsed' | 'surrendered';

export const POLICY_STATUS_CONFIG: Record<
  PolicyStatus,
  { label: string; badgeClass: string; dotColor: string }
> = {
  in_force: {
    label: 'Đang hiệu lực',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    dotColor: 'bg-slate-700',
  },
  pending_payment: {
    label: 'Chờ nộp phí',
    badgeClass: 'bg-rose-50 text-aia-red border-rose-200 font-semibold',
    dotColor: 'bg-aia-red',
  },
  lapsed: {
    label: 'Mất hiệu lực',
    badgeClass: 'bg-slate-100 text-slate-500 border-slate-200',
    dotColor: 'bg-slate-400',
  },
  surrendered: {
    label: 'Đã hủy/Đáo hạn',
    badgeClass: 'bg-slate-100 text-slate-500 border-slate-200',
    dotColor: 'bg-slate-400',
  },
};

export type BillingFrequency = 'annual' | 'semi_annual' | 'quarterly';

export const BILLING_FREQ_LABELS: Record<BillingFrequency, string> = {
  annual: 'Đóng theo Năm',
  semi_annual: 'Đóng Nửa năm',
  quarterly: 'Đóng Quý',
};

export interface BenefitQuota {
  type: ClaimType;
  name: string;
  maxLimit: number; // Hạn mức tối đa/năm (VND hoặc ngày)
  usedAmount: number; // Đã chi trả trong năm
  remainingLimit: number; // Hạn mức còn lại
  unit: 'VND' | 'days';
}

export interface RiderPreset {
  id: string;
  name: string;
  shortName: string;
  claimType: ClaimType;
  defaultLimit: number;
  unit: 'VND' | 'days';
  defaultEnabled: boolean;
  categoryBadge: string;
  description: string;
  limitPresets?: number[];
}

export interface ConfiguredRiderItem {
  id: string;
  presetId?: string;
  name: string;
  claimType: ClaimType;
  limit: number;
  unit: 'VND' | 'days';
  enabled: boolean;
  isCustom?: boolean;
}

export const AIA_RIDER_PRESETS: RiderPreset[] = [
  {
    id: 'rider-health-card',
    name: 'Thẻ Chăm sóc Sức khỏe Toàn cầu (Nội trú)',
    shortName: 'Thẻ Sức Khỏe CSSK',
    claimType: 'medical_expense',
    defaultLimit: 250000000,
    unit: 'VND',
    defaultEnabled: true,
    categoryBadge: 'Y tế & CSSK',
    description: 'Bảo lãnh viện phí nội trú, phẫu thuật, phòng điều trị tại các bệnh viện liên kết',
    limitPresets: [150000000, 250000000, 500000000, 1000000000],
  },
  {
    id: 'rider-critical-illness',
    name: 'Bảo hiểm Bệnh hiểm nghèo Toàn diện (3 giai đoạn)',
    shortName: 'Bệnh Hiểm Nghèo',
    claimType: 'critical_illness',
    defaultLimit: 300000000,
    unit: 'VND',
    defaultEnabled: false,
    categoryBadge: 'Bệnh nghiêm trọng',
    description: 'Bảo vệ trước ung thư, tim mạch, đột quỵ và các bệnh lý nghiêm trọng qua các giai đoạn',
    limitPresets: [200000000, 300000000, 500000000, 1000000000],
  },
  {
    id: 'rider-accident',
    name: 'Bảo hiểm Tai nạn Toàn diện Nâng cao',
    shortName: 'Tai Nạn Toàn Diện',
    claimType: 'accident_injury',
    defaultLimit: 500000000,
    unit: 'VND',
    defaultEnabled: false,
    categoryBadge: 'Tai nạn & Thương tật',
    description: 'Chi trả quyền lợi tử vong, thương tật toàn bộ/bộ phận và chi phí y tế do tai nạn',
    limitPresets: [200000000, 500000000, 1000000000, 2000000000],
  },
  {
    id: 'rider-hospital-cash',
    name: 'Trợ cấp Nằm viện & Phẫu thuật Tiêu chuẩn',
    shortName: 'Trợ Cấp Nằm Viện',
    claimType: 'hospital_cash',
    defaultLimit: 30000000,
    unit: 'VND',
    defaultEnabled: false,
    categoryBadge: 'Trợ cấp thu nhập',
    description: 'Hỗ trợ bù đắp tài chính khi nằm viện nội trú điều trị (tương đương 500.000đ/ngày)',
    limitPresets: [15000000, 30000000, 50000000, 100000000],
  },
  {
    id: 'rider-waiver',
    name: 'Bảo hiểm Miễn đóng phí khi mắc Bệnh hiểm nghèo',
    shortName: 'Miễn Đóng Phí',
    claimType: 'critical_illness',
    defaultLimit: 100000000,
    unit: 'VND',
    defaultEnabled: false,
    categoryBadge: 'Bảo toàn HĐ',
    description: 'AIA thay mặt đóng toàn bộ phí bảo hiểm còn lại của HĐ khi người được bảo hiểm mắc bệnh hiểm nghèo',
    limitPresets: [50000000, 100000000, 200000000],
  },
];

export function convertRidersToBenefits(riders: ConfiguredRiderItem[]): BenefitQuota[] {
  return riders
    .filter((r) => r.enabled && r.limit > 0 && r.name.trim().length > 0)
    .map((r) => ({
      type: r.claimType,
      name: r.name.trim(),
      maxLimit: r.limit,
      usedAmount: 0,
      remainingLimit: r.limit,
      unit: r.unit || 'VND',
    }));
}

export interface Policy {
  id: string; // Số HĐ: AIA-1108924
  customerId: string;
  customerName: string;
  productName: string;
  mainCoverageAmount: number; // Số tiền bảo hiểm chính (VND)
  issueDate: string; // Ngày phát hành: YYYY-MM-DD
  status: PolicyStatus;
  billingFrequency: BillingFrequency;
  premiumAmount: number; // Phí định kỳ (VND)
  nextDueDate: string; // Ngày đến hạn nộp phí tiếp theo
  gracePeriodEnd?: string; // Ngày hết hạn gia hạn 60 ngày
  insuredPersonName?: string; // Người được bảo hiểm
  segment?: string; // Phân khúc khách hàng: Fansipan, Everest...
  notes?: string;
  benefits: BenefitQuota[];
}

export interface Customer {
  id: string; // CUST-001
  name: string;
  phone: string;
  cccd: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'Nam' | 'Nữ';
  address: string;
  occupation: string;
  email?: string;
  segment?: string; // Phân khúc khách hàng AIA: Fansipan, Everest...
  notes?: string;
  createdAt: string;
  avatar?: string; // Avatar ID or custom identifier
}

export type CareChannel =
  | 'meeting'
  | 'call'
  | 'zalo'
  | 'coffee'
  | 'gift'
  | 'hospital_visit';

export const CARE_CHANNEL_CONFIG: Record<
  CareChannel,
  { label: string; iconName: string; badgeClass: string }
> = {
  meeting: {
    label: 'Gặp trực tiếp',
    iconName: 'Users',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  call: {
    label: 'Gọi điện',
    iconName: 'PhoneCall',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  zalo: {
    label: 'Nhắn Zalo',
    iconName: 'MessageSquare',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  coffee: {
    label: 'Hẹn Cafe',
    iconName: 'Coffee',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  gift: {
    label: 'Gửi thiệp/quà',
    iconName: 'Gift',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  hospital_visit: {
    label: 'Thăm viện',
    iconName: 'HeartPulse',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

export type CareActivityStatus = 'planned' | 'completed' | 'cancelled';

export interface CareActivity {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  policyId?: string;
  date: string; // YYYY-MM-DD
  channel: CareChannel;
  title: string;
  content: string;
  result?: string;
  nextAction?: string;
  nextFollowUpDate?: string;
  status: CareActivityStatus;
  createdAt: string;
}

export type CareAlertType = 'birthday' | 'premium_due' | 'grace_period' | 'post_claim_care';

export interface CareAlert {
  id: string;
  type: CareAlertType;
  customerId: string;
  customerName: string;
  customerPhone: string;
  policyId?: string;
  title: string;
  description: string;
  dueDate: string;
  daysRemaining: number;
  severity: 'urgent' | 'warning' | 'info';
}
