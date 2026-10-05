import React, { useState } from 'react';
import {
  Plus,
  Users,
  ShieldAlert,
  CalendarCheck,
  BarChart3,
  UserPlus,
  FilePlus,
  CalendarPlus,
  ChevronDown,
  Database,
  UserCog,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ConsultantProfile } from '../types/claim';
import { AppTab } from '../types/navigation';
import { AiaLogo } from './AiaLogo';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  consultant: ConsultantProfile;
  pendingClaimsCount: number;
  urgentAlertsCount: number;
  onOpenNewCustomer: () => void;
  onOpenNewClaim: () => void;
  onOpenNewCare: () => void;
  onExportJSON?: () => void;
  onExportCSV?: () => void;
  onImportJSON?: (jsonStr: string) => { success: boolean; error?: string };
  onResetDefault?: () => void;
  onOpenProfile?: () => void;
  onOpenBackupModal?: () => void;
  isPrivacyMode?: boolean;
  onTogglePrivacyMode?: () => void;
}
export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  consultant,
  pendingClaimsCount,
  urgentAlertsCount,
  onOpenNewCustomer,
  onOpenNewClaim,
  onOpenNewCare,
  onOpenProfile,
  onOpenBackupModal,
  isPrivacyMode = true,
  onTogglePrivacyMode,
}) => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const navTabs: {
    id: AppTab;
    label: string;
    shortLabel?: string;
    icon: React.FC<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
  }[] = [
    {
      id: 'customers',
      label: 'Khách hàng & HĐ',
      icon: Users,
    },
    {
      id: 'claims',
      label: 'Hồ sơ Bồi thường',
      shortLabel: 'Bồi thường',
      icon: ShieldAlert,
      badge: pendingClaimsCount > 0 ? pendingClaimsCount : undefined,
      badgeColor: 'bg-aia-red text-white',
    },
    {
      id: 'care',
      label: 'Lịch chăm sóc & Sự kiện',
      shortLabel: 'Lịch chăm sóc',
      icon: CalendarCheck,
      badge: urgentAlertsCount > 0 ? urgentAlertsCount : undefined,
      badgeColor: 'bg-slate-800 text-white',
    },
    {
      id: 'analytics',
      label: 'Thống kê & Báo cáo',
      shortLabel: 'Thống kê',
      icon: BarChart3,
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Brand + Consultant Info + Quick Actions */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-14 sm:h-16 border-b border-slate-100">
          {/* Left: AIA Brand & System Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <AiaLogo variant="full" size="md" className="h-6 sm:h-8 shrink-0" />
            <div className="h-5 sm:h-6 w-px bg-slate-200 shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
              <h1 className="text-xs sm:text-base font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                <span className="sm:hidden">Agent CRM</span>
                <span className="hidden sm:inline">Agent CRM & Claim Hub</span>
              </h1>
            </div>
          </div>

          {/* Center: Consultant Profile Card (Clickable to Edit) */}
          <button
            type="button"
            onClick={onOpenProfile}
            title="Nhấp để cập nhật thông tin cá nhân tư vấn viên"
            className="hidden lg:flex items-center gap-2.5 bg-slate-50 hover:bg-rose-50/50 border border-slate-200/80 hover:border-aia-red/30 rounded-xl px-3 py-1.5 shadow-2xs hover:shadow-xs transition-all shrink-0 whitespace-nowrap cursor-pointer text-left group"
          >
            <div className="relative flex-shrink-0">
              {consultant.avatarUrl && !avatarError ? (
                <img
                  src={consultant.avatarUrl}
                  alt={consultant.name}
                  onError={() => setAvatarError(true)}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 group-hover:ring-2 group-hover:ring-aia-red/20 transition-all"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-aia-red to-rose-400 text-white font-bold flex items-center justify-center text-xs border border-slate-200 shrink-0">
                  {consultant.name ? consultant.name.trim().charAt(consultant.name.trim().length - 1).toUpperCase() : 'Ý'}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full" title="Đang trực tuyến" />
            </div>
            <div className="text-left whitespace-nowrap shrink-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-aia-red transition-colors whitespace-nowrap">{consultant.name}</span>
                <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-bold px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap shrink-0">
                  {consultant.title.includes('MDRT') ? 'MDRT' : consultant.title.includes('COT') ? 'COT' : 'AGENT'}
                </span>
                <UserCog className="w-3.5 h-3.5 text-slate-400 group-hover:text-aia-red transition-colors ml-0.5 shrink-0" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1 whitespace-nowrap shrink-0 leading-none">
                <span className="font-numeric font-medium text-slate-600 whitespace-nowrap shrink-0">
                  {consultant.code.replace(/-/g, '\u2011')}
                </span>
                <span className="text-slate-300">•</span>
                <span className="whitespace-nowrap shrink-0" title={consultant.office || consultant.agency}>
                  {consultant.agency}
                </span>
              </div>
            </div>
          </button>

          {/* Right: Data Tools + Primary Action Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Consultant Avatar */}
            <button
              type="button"
              onClick={onOpenProfile}
              className="relative flex lg:hidden items-center flex-shrink-0 cursor-pointer active:scale-95"
              title={`Nhấp để sửa hồ sơ: ${consultant.name} (${consultant.code})`}
            >
              {consultant.avatarUrl && !avatarError ? (
                <img
                  src={consultant.avatarUrl}
                  alt={consultant.name}
                  onError={() => setAvatarError(true)}
                  className="w-8 h-8 rounded-full object-cover shadow-xs border-2 border-white ring-1 ring-slate-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-aia-red to-rose-400 text-white font-bold flex items-center justify-center text-xs shadow-xs border-2 border-white">
                  {consultant.name ? consultant.name.trim().charAt(consultant.name.trim().length - 1).toUpperCase() : 'Ý'}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full" />
            </button>

            {/* Consolidated Backup & Data Center Button */}
            {/* Privacy Mode Toggle Button */}
            <button
              type="button"
              onClick={onTogglePrivacyMode}
              title={
                isPrivacyMode
                  ? 'Chế độ riêng tư: Đang BẬT (ẩn bớt CCCD & SĐT để chống nhìn trộm). Bấm để xem đầy đủ (hoặc Alt+P)'
                  : 'Chế độ riêng tư: Đang TẮT (hiển thị đầy đủ thông tin). Bấm để bật che mờ (hoặc Alt+P)'
              }
              className={`px-2.5 sm:px-3 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer shrink-0 ${
                isPrivacyMode
                  ? 'bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {isPrivacyMode ? (
                <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
              ) : (
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 shrink-0" />
              )}
              <span className="hidden sm:inline whitespace-nowrap">
                {isPrivacyMode ? 'Riêng tư: BẬT' : 'Riêng tư: TẮT'}
              </span>
            </button>

            {/* Consolidated Backup & Data Center Button */}
            <button
              type="button"
              onClick={onOpenBackupModal}
              title="Trung tâm Dữ liệu: Sao lưu, Khôi phục, Xuất/Nhập JSON & Excel"
              className="px-3 py-2 text-slate-700 hover:text-aia-red hover:bg-rose-50/70 border border-slate-200/90 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer shrink-0"
            >
              <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aia-red shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">Sao lưu & Dữ liệu</span>
            </button>
            {/* Quick Add Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsAddMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-aia-red hover:bg-aia-red-dark text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer select-none"
              >
                <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="whitespace-nowrap">Thêm mới</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isAddMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAddMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsAddMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddMenuOpen(false);
                        onOpenNewCustomer();
                      }}
                      className="w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <UserPlus className="w-4 h-4 text-aia-red" />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">Khách hàng & HĐ mới</p>
                        <p className="text-xs text-slate-500">Thêm hồ sơ cá nhân và gói bảo hiểm</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddMenuOpen(false);
                        onOpenNewClaim();
                      }}
                      className="w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors border-t border-slate-100"
                    >
                      <FilePlus className="w-4 h-4 text-rose-600" />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">Hồ sơ Bồi thường (Claim)</p>
                        <p className="text-xs text-slate-500">Tiếp nhận viện phí / phẫu thuật mới</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddMenuOpen(false);
                        onOpenNewCare();
                      }}
                      className="w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors border-t border-slate-100"
                    >
                      <CalendarPlus className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">Ghi chú Chăm sóc / Lịch hẹn</p>
                        <p className="text-xs text-slate-500">Gặp cafe, gọi điện, nhắc kỳ phí</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar: 4 Main Navigation Tabs */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 py-2 sm:py-2.5">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-aia-red text-white shadow-xs'
                    : 'bg-slate-50 sm:bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">
                  {tab.shortLabel ? (
                    <>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </>
                  ) : (
                    tab.label
                  )}
                </span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-0.5 px-2 py-0.5 rounded-full text-xs font-bold font-numeric shrink-0 ${
                      isActive ? 'bg-white text-aia-red' : tab.badgeColor || 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
