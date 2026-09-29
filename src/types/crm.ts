import { ClaimType } from './claim';

export type PolicyStatus = 'in_force' | 'pending_payment' | 'lapsed' | 'surrendered';

export const POLICY_STATUS_CONFIG: Record<
  PolicyStatus,
  { label: string; badgeClass: string; dotColor: string }
> = {
  in_force: {
    label: 'Đang hiệu lực',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500',
  },
  pending_payment: {
    label: 'Chờ nộp phí',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
  },
  lapsed: {
    label: 'Mất hiệu lực',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    dotColor: 'bg-rose-500',
  },
  surrendered: {
    label: 'Đã hủy/Đáo hạn',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
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
  notes?: string;
  createdAt: string;
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
