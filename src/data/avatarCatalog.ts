import React from 'react';

export type AvatarCategory = 'all' | 'corporate_exec' | 'monogram_luxury' | 'insurance_patron';

export interface AvatarCategoryMeta {
  key: AvatarCategory;
  label: string;
  icon: string;
}

export const AVATAR_CATEGORIES: AvatarCategoryMeta[] = [
  { key: 'all', label: 'Tất cả (36)', icon: '⭐' },
  { key: 'corporate_exec', label: 'Doanh nhân & Chuyên gia', icon: '👔' },
  { key: 'monogram_luxury', label: 'Ký tự Monogram VIP', icon: '💎' },
  { key: 'insurance_patron', label: 'Biểu trưng Bảo vệ & Tài chính', icon: '🛡️' },
];

export interface AvatarItem {
  id: string;
  name: string;
  category: 'corporate_exec' | 'monogram_luxury' | 'insurance_patron';
  bgGradient: string;
  SvgComponent: React.FC<{ className?: string; initials?: string }>;
}

/**
 * Trích xuất 2 chữ cái viết tắt trang trọng chuẩn phong cách Việt Nam
 * Ví dụ: "Nguyễn Thị Mai Anh" -> "MA", "Trần Hoàng Nam" -> "HN", "Lê Văn Hùng" -> "VH"
 */
export function getCustomerInitials(name?: string): string {
  if (!name || !name.trim()) return 'KH';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  const last = parts[parts.length - 1];
  const secondLast = parts[parts.length - 2];
  return (secondLast[0] + last[0]).toUpperCase();
}

import {
  ExecManNavy,
  ExecWomanBlazer,
  CorporateDirector,
  ExecWomanGlasses,
  DoctorSurgeon,
  MedicalSpecialist,
  LegalCounsel,
  FinanceAnalyst,
  BusinessOwner,
  AcademicScholar,
  TradeExecutive,
  ConsultantExpert,
  MonoCrimson,
  MonoNavy,
  MonoEmerald,
  MonoGold,
  MonoTitanium,
  MonoObsidian,
  MonoAmethyst,
  MonoBronze,
  MonoCobalt,
  MonoForest,
  MonoBurgundy,
  MonoSteel,
  ShieldPremier,
  CrownVip,
  StarExcellence,
  TreeWealth,
  UmbrellaCare,
  SealPolicy,
  HeartHealth,
  HomeHaven,
  FamilyShield,
  DiamondSecurity,
  EducationFuture,
  RetirementSun
} from '../components/AvatarVectors';

export const AVATAR_CATALOG: AvatarItem[] = [
  // 1. Doanh nhân & Chuyên gia (12)
  {
    id: 'exec-man-navy',
    name: 'Nam Lãnh Đạo Cấp Cao',
    category: 'corporate_exec',
    bgGradient: 'from-blue-900 via-slate-900 to-slate-950',
    SvgComponent: ExecManNavy,
  },
  {
    id: 'exec-woman-blazer',
    name: 'Nữ Quản Lý Tài Chính',
    category: 'corporate_exec',
    bgGradient: 'from-slate-800 via-slate-900 to-zinc-950',
    SvgComponent: ExecWomanBlazer,
  },
  {
    id: 'corporate-director',
    name: 'Giám Đốc Điều Hành',
    category: 'corporate_exec',
    bgGradient: 'from-zinc-800 via-neutral-900 to-black',
    SvgComponent: CorporateDirector,
  },
  {
    id: 'exec-woman-glasses',
    name: 'Nữ Giám Đốc Công Nghệ',
    category: 'corporate_exec',
    bgGradient: 'from-sky-900 via-blue-950 to-slate-950',
    SvgComponent: ExecWomanGlasses,
  },
  {
    id: 'doctor-surgeon',
    name: 'Bác Sĩ Chuyên Khoa',
    category: 'corporate_exec',
    bgGradient: 'from-emerald-900 via-teal-950 to-slate-950',
    SvgComponent: DoctorSurgeon,
  },
  {
    id: 'medical-specialist',
    name: 'Chuyên Gia Y Dược',
    category: 'corporate_exec',
    bgGradient: 'from-teal-900 via-emerald-950 to-slate-950',
    SvgComponent: MedicalSpecialist,
  },
  {
    id: 'legal-counsel',
    name: 'Luật Sư / Cố Vấn Pháp Lý',
    category: 'corporate_exec',
    bgGradient: 'from-indigo-950 via-slate-900 to-zinc-950',
    SvgComponent: LegalCounsel,
  },
  {
    id: 'finance-analyst',
    name: 'Chuyên Viên Tài Chính',
    category: 'corporate_exec',
    bgGradient: 'from-blue-800 via-slate-900 to-indigo-950',
    SvgComponent: FinanceAnalyst,
  },
  {
    id: 'business-owner',
    name: 'Chủ Doanh Nghiệp',
    category: 'corporate_exec',
    bgGradient: 'from-slate-700 via-zinc-800 to-zinc-950',
    SvgComponent: BusinessOwner,
  },
  {
    id: 'academic-scholar',
    name: 'Giảng Viên / Chuyên Gia',
    category: 'corporate_exec',
    bgGradient: 'from-amber-950 via-stone-900 to-neutral-950',
    SvgComponent: AcademicScholar,
  },
  {
    id: 'trade-executive',
    name: 'Giám Đốc Thương Mại',
    category: 'corporate_exec',
    bgGradient: 'from-teal-950 via-cyan-950 to-slate-950',
    SvgComponent: TradeExecutive,
  },
  {
    id: 'consultant-expert',
    name: 'Chuyên Viên MDRT Cấp Cao',
    category: 'corporate_exec',
    bgGradient: 'from-rose-950 via-red-950 to-stone-950',
    SvgComponent: ConsultantExpert,
  },

  // 2. Monogram Ký Tự VIP (12)
  {
    id: 'mono-crimson',
    name: 'AIA Crimson Elite',
    category: 'monogram_luxury',
    bgGradient: 'from-rose-800 via-red-900 to-rose-950',
    SvgComponent: MonoCrimson,
  },
  {
    id: 'mono-navy',
    name: 'Executive Sapphire Navy',
    category: 'monogram_luxury',
    bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
    SvgComponent: MonoNavy,
  },
  {
    id: 'mono-emerald',
    name: 'Private Wealth Emerald',
    category: 'monogram_luxury',
    bgGradient: 'from-emerald-800 via-teal-900 to-slate-900',
    SvgComponent: MonoEmerald,
  },
  {
    id: 'mono-gold',
    name: 'Royal MDRT Gold',
    category: 'monogram_luxury',
    bgGradient: 'from-amber-700 via-yellow-800 to-amber-950',
    SvgComponent: MonoGold,
  },
  {
    id: 'mono-titanium',
    name: 'Platinum Titanium',
    category: 'monogram_luxury',
    bgGradient: 'from-slate-700 via-slate-800 to-zinc-900',
    SvgComponent: MonoTitanium,
  },
  {
    id: 'mono-obsidian',
    name: 'Midnight Obsidian VIP',
    category: 'monogram_luxury',
    bgGradient: 'from-zinc-900 via-neutral-900 to-black',
    SvgComponent: MonoObsidian,
  },
  {
    id: 'mono-amethyst',
    name: 'Imperial Amethyst',
    category: 'monogram_luxury',
    bgGradient: 'from-purple-900 via-indigo-950 to-slate-900',
    SvgComponent: MonoAmethyst,
  },
  {
    id: 'mono-bronze',
    name: 'Heritage Bronze',
    category: 'monogram_luxury',
    bgGradient: 'from-amber-900 via-stone-900 to-stone-950',
    SvgComponent: MonoBronze,
  },
  {
    id: 'mono-cobalt',
    name: 'Deep Cobalt Blue',
    category: 'monogram_luxury',
    bgGradient: 'from-blue-800 via-cyan-950 to-slate-900',
    SvgComponent: MonoCobalt,
  },
  {
    id: 'mono-forest',
    name: 'Alpine Forest Green',
    category: 'monogram_luxury',
    bgGradient: 'from-teal-900 via-emerald-950 to-slate-950',
    SvgComponent: MonoForest,
  },
  {
    id: 'mono-burgundy',
    name: 'Royal Burgundy',
    category: 'monogram_luxury',
    bgGradient: 'from-red-900 via-rose-950 to-zinc-900',
    SvgComponent: MonoBurgundy,
  },
  {
    id: 'mono-steel',
    name: 'Modern Cyber Steel',
    category: 'monogram_luxury',
    bgGradient: 'from-cyan-950 via-slate-800 to-slate-900',
    SvgComponent: MonoSteel,
  },

  // 3. Biểu trưng Bảo vệ & Tài chính (12)
  {
    id: 'shield-premier',
    name: 'Khiên An Tâm Premier',
    category: 'insurance_patron',
    bgGradient: 'from-rose-950 via-slate-900 to-slate-950',
    SvgComponent: ShieldPremier,
  },
  {
    id: 'crown-vip',
    name: 'Vương Miện Khách Hàng VIP',
    category: 'insurance_patron',
    bgGradient: 'from-amber-950 via-zinc-900 to-black',
    SvgComponent: CrownVip,
  },
  {
    id: 'star-excellence',
    name: 'Ngôi Sao Hưng Thịnh',
    category: 'insurance_patron',
    bgGradient: 'from-sky-950 via-blue-950 to-slate-950',
    SvgComponent: StarExcellence,
  },
  {
    id: 'tree-wealth',
    name: 'Cây Tài Chính Bền Vững',
    category: 'insurance_patron',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    SvgComponent: TreeWealth,
  },
  {
    id: 'umbrella-care',
    name: 'Chiếc Ô Bảo An AIA',
    category: 'insurance_patron',
    bgGradient: 'from-red-950 via-rose-950 to-slate-950',
    SvgComponent: UmbrellaCare,
  },
  {
    id: 'seal-policy',
    name: 'Dấu Triện Hợp Đồng Vàng',
    category: 'insurance_patron',
    bgGradient: 'from-stone-900 via-amber-950 to-black',
    SvgComponent: SealPolicy,
  },
  {
    id: 'heart-health',
    name: 'Sức Khỏe Toàn Diện',
    category: 'insurance_patron',
    bgGradient: 'from-rose-900 via-red-950 to-slate-950',
    SvgComponent: HeartHealth,
  },
  {
    id: 'home-haven',
    name: 'Tổ Ấm An Yên',
    category: 'insurance_patron',
    bgGradient: 'from-teal-950 via-emerald-950 to-slate-950',
    SvgComponent: HomeHaven,
  },
  {
    id: 'family-shield',
    name: 'Bảo An Gia Đình 3 Thế Hệ',
    category: 'insurance_patron',
    bgGradient: 'from-indigo-950 via-purple-950 to-slate-950',
    SvgComponent: FamilyShield,
  },
  {
    id: 'diamond-security',
    name: 'Kim Cương Bền Vững',
    category: 'insurance_patron',
    bgGradient: 'from-teal-950 via-cyan-950 to-black',
    SvgComponent: DiamondSecurity,
  },
  {
    id: 'education-future',
    name: 'Tương Lai Học Vấn Cho Con',
    category: 'insurance_patron',
    bgGradient: 'from-blue-950 via-indigo-950 to-slate-950',
    SvgComponent: EducationFuture,
  },
  {
    id: 'retirement-sun',
    name: 'Hưu Trí An Nhàn Tuổi Vàng',
    category: 'insurance_patron',
    bgGradient: 'from-orange-950 via-amber-950 to-stone-950',
    SvgComponent: RetirementSun,
  },
];

/**
 * Bản đồ tương thích ngược chuyển đổi các mã avatar cũ (hoạt hình/vui nhộn)
 * sang các mẫu avatar doanh nghiệp nghiêm túc và đẳng cấp.
 */
export const LEGACY_AVATAR_MAP: Record<string, string> = {
  // Legacy goofy emoji mappings
  'cool-glasses': 'business-owner',
  'star-struck': 'exec-woman-glasses',
  'party-popper': 'exec-man-navy',
  'wink-tongue': 'corporate-director',
  'angel-glow': 'consultant-expert',
  'smart-thinker': 'finance-analyst',
  'cute-kitty': 'academic-scholar',
  'lucky-puppy': 'medical-specialist',
  'lucky-cat': 'trade-executive',
  'super-zen': 'legal-counsel',
  'gaming-pad': 'exec-woman-blazer',
  'friendly-bot': 'doctor-surgeon',
  'lucky-clover': 'tree-wealth',
  // Role string mappings
  'ceo-boss': 'corporate-director',
  'tech-ninja': 'finance-analyst',
  'architect': 'exec-man-navy',
  'investor': 'consultant-expert',
  'designer': 'exec-woman-blazer',
  'doc-care': 'doctor-surgeon',
};

// Tra cứu avatar theo ID (tự động chuyển đổi mã cũ)
export const getAvatarById = (id?: string): AvatarItem | undefined => {
  if (!id) return undefined;
  const resolvedId = LEGACY_AVATAR_MAP[id] || id;
  return AVATAR_CATALOG.find((a) => a.id === resolvedId);
};

// Tự động phân bổ avatar nghiêm túc mặc định theo tên và mã khách hàng
export const getDefaultAvatarForCustomer = (customerId: string, name: string): AvatarItem => {
  let hash = 0;
  const str = (customerId || '') + (name || '');
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_CATALOG.length;
  return AVATAR_CATALOG[index];
};
