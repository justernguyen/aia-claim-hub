export type ClaimStatus =
  | 'intake'          // Tiếp nhận hồ sơ
  | 'pending_docs'    // Chờ bổ sung chứng từ
  | 'underwriting'    // AIA đang thẩm định
  | 'approved'        // Đã duyệt chi trả
  | 'paid'            // Đã chuyển khoản
  | 'rejected';       // Từ chối chi trả

export type ClaimType =
  // 11 Quyền lợi bồi thường chuẩn AIA
  | 'inpatient'                  // Điều trị nội trú
  | 'outpatient'                 // Điều trị ngoại trú
  | 'critical_illness'          // Bệnh hiểm nghèo
  | 'pre_admission'              // Điều trị trước nhập viện
  | 'day_treatment'              // Điều trị trong ngày
  | 'maternity'                  // Khám thai
  | 'total_permanent_disability' // Tàn tật toàn bộ và vĩnh viễn
  | 'post_discharge'             // Điều trị sau xuất viện
  | 'dental'                     // Nha khoa
  | 'accident_injury'            // Thương tật do tai nạn
  | 'death'                      // Tử vong
  // Backward compatibility aliases
  | 'hospital_cash'
  | 'surgery'
  | 'medical_expense'
  | 'accident';
// Aliases for compatibility
export type BenefitType = ClaimType;

export type DocumentStatus = 'received' | 'missing' | 'invalid' | 'verified';

export interface DocumentItem {
  id: string;
  name: string;
  status: DocumentStatus;
  required: boolean;
  fileSize?: string;
  fileName?: string;
  fileUrl?: string; // Link ảnh hoặc base64 xem trực tiếp
  previewUrl?: string;
  note?: string;
  updatedAt?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  actor: string;
  type: 'status_change' | 'doc_update' | 'note' | 'payment';
}

export interface ClaimItem {
  id: string; // Mã hồ sơ: CLM-2026-0081
  policyNumber: string; // Số HĐ: AIA-1108924
  customerId?: string; // Liên kết Customer ID (CUST-001)
  policyId?: string; // Liên kết Policy ID
  insurer: 'AIA Việt Nam';
  productName: string; // Tên SP: AIA - Khỏe Trọn Vẹn
  customerName: string; // Tên khách hàng (Bên mua)
  insuredPersonName: string; // Người được bảo hiểm
  relationship: 'Bản thân' | 'Con cái' | 'Vợ/Chồng' | 'Bố/Mẹ';
  customerPhone: string;
  customerCccd: string;
  customerEmail?: string;
  claimType: ClaimType;
  status: ClaimStatus;
  hospitalName: string;
  admissionDate: string;
  dischargeDate?: string;
  diagnosis: string;
  icd10Code?: string;
  totalBillAmount?: number;
  claimedAmount: number;
  approvedAmount: number;
  deductedAmount?: number;
  deductionReason?: string;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  intakeDate: string;
  slaDeadline: string; // SLA 5 ngày xử lý của AIA
  settledDate?: string;
  agentName: string; // Dương Như Ý
  agentCode: string; // AIA-VN-8869
  documents: DocumentItem[];
  timeline: TimelineEvent[];
  notes: string;
  updatedAt: string;
}

// Alias for backward compatibility
export type ClaimRecord = ClaimItem;

export interface ConsultantProfile {
  name: string;
  code: string;
  title: string;
  agency: string;
  phone: string;
  email: string;
  office: string;
  avatarUrl?: string;
}

export interface ClaimFilterState {
  search: string;
  status: ClaimStatus | 'all';
  claimType: ClaimType | 'all';
  sortBy: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';
}

export const STATUS_CONFIG: Record<
  ClaimStatus,
  { label: string; badgeClass: string; dotColor: string; columnBg: string; textClass: string; borderClass: string; bgClass: string }
> = {
  intake: {
    label: 'Tiếp nhận hồ sơ',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    dotColor: '#64748B',
    columnBg: 'bg-slate-50/70 border-slate-200',
    textClass: 'text-slate-700',
    borderClass: 'border-slate-200',
    bgClass: 'bg-slate-50',
  },
  pending_docs: {
    label: 'Cần bổ sung chứng từ',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    dotColor: '#D97706',
    columnBg: 'bg-amber-50/40 border-amber-200',
    textClass: 'text-amber-800',
    borderClass: 'border-amber-200',
    bgClass: 'bg-amber-50',
  },
  underwriting: {
    label: 'AIA Thẩm định',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
    dotColor: '#2563EB',
    columnBg: 'bg-blue-50/40 border-blue-200',
    textClass: 'text-blue-800',
    borderClass: 'border-blue-200',
    bgClass: 'bg-blue-50',
  },
  approved: {
    label: 'Đã duyệt chi trả',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dotColor: '#059669',
    columnBg: 'bg-emerald-50/40 border-emerald-200',
    textClass: 'text-emerald-800',
    borderClass: 'border-emerald-200',
    bgClass: 'bg-emerald-50',
  },
  paid: {
    label: 'Đã chuyển khoản',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
    dotColor: '#0D9488',
    columnBg: 'bg-teal-50/40 border-teal-200',
    textClass: 'text-teal-800',
    borderClass: 'border-teal-200',
    bgClass: 'bg-teal-50',
  },
  rejected: {
    label: 'Từ chối chi trả',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    dotColor: '#E11D48',
    columnBg: 'bg-rose-50/40 border-rose-200',
    textClass: 'text-rose-800',
    borderClass: 'border-rose-200',
    bgClass: 'bg-rose-50',
  },
};

export const CLAIM_TYPE_LABELS: Record<ClaimType, string> = {
  inpatient: 'Điều trị nội trú',
  outpatient: 'Điều trị ngoại trú',
  critical_illness: 'Bệnh hiểm nghèo',
  pre_admission: 'Điều trị trước nhập viện',
  day_treatment: 'Điều trị trong ngày',
  maternity: 'Khám thai',
  total_permanent_disability: 'Tàn tật toàn bộ và vĩnh viễn',
  post_discharge: 'Điều trị sau xuất viện',
  dental: 'Nha khoa',
  accident_injury: 'Thương tật do tai nạn',
  death: 'Tử vong',
  // Aliases
  hospital_cash: 'Trợ cấp nằm viện',
  surgery: 'Chi phí phẫu thuật',
  medical_expense: 'Chi phí y tế',
  accident: 'Thương tật tai nạn',
};

export const isBenefitMatchingClaimType = (
  benefitType: ClaimType,
  claimType: ClaimType
): boolean => {
  if (benefitType === claimType) return true;
  if (benefitType === 'medical_expense') {
    return [
      'inpatient',
      'outpatient',
      'day_treatment',
      'pre_admission',
      'post_discharge',
      'surgery',
      'dental',
      'maternity',
      'medical_expense',
    ].includes(claimType);
  }
  if (benefitType === 'hospital_cash') {
    return ['hospital_cash', 'inpatient', 'day_treatment'].includes(claimType);
  }
  if (benefitType === 'accident' || benefitType === 'accident_injury') {
    return claimType === 'accident' || claimType === 'accident_injury';
  }
  return false;
};

// Alias
export const BENEFIT_LABELS = CLAIM_TYPE_LABELS;
