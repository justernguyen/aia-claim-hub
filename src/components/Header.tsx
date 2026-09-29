import React, { useRef, useState } from 'react';
import {
  Plus,
  Upload,
  RefreshCw,
  FileSpreadsheet,
  FileCode,
  ShieldCheck,
  Building,
  Users,
  ShieldAlert,
  CalendarCheck,
  BarChart3,
  UserPlus,
  FilePlus,
  CalendarPlus,
  ChevronDown,
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
  onExportJSON: () => void;
  onExportCSV: () => void;
  onImportJSON: (jsonStr: string) => { success: boolean; error?: string };
  onResetDefault: () => void;
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
  onExportJSON,
  onExportCSV,
  onImportJSON,
  onResetDefault,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = onImportJSON(content);
        if (result.success) {
          alert('Khôi phục dữ liệu hệ thống CRM & Claim thành công!');
        } else {
          alert(`Lỗi nhập file: ${result.error || 'Dữ liệu không hợp lệ'}`);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const navTabs: { id: AppTab; label: string; icon: React.FC<{ className?: string }>; badge?: number; badgeColor?: string }[] = [
    {
      id: 'customers',
      label: 'Khách hàng & HĐ',
      icon: Users,
    },
    {
      id: 'claims',
      label: 'Hồ sơ Bồi thường',
      icon: ShieldAlert,
      badge: pendingClaimsCount > 0 ? pendingClaimsCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'care',
      label: 'Lịch chăm sóc & Sự kiện',
      icon: CalendarCheck,
      badge: urgentAlertsCount > 0 ? urgentAlertsCount : undefined,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'analytics',
      label: 'Thống kê & Báo cáo',
      icon: BarChart3,
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Brand + Consultant Info + Quick Actions */}
        <div className="flex items-center justify-between h-18 border-b border-slate-100">
          {/* Left: AIA Brand & System Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <AiaLogo variant="full" size="md" className="h-9 sm:h-10" />
            <div className="border-l border-slate-200 pl-3 sm:pl-3.5">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  AIA Agent CRM & Claim Hub
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-aia-red border border-rose-200/80 uppercase tracking-wide hidden xs:inline-block">
                  MDRT Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block mt-0.5">
                Quản lý Khách hàng, Hợp đồng, Bồi thường & Chăm sóc Khách hàng
              </p>
            </div>
          </div>

          {/* Center: Consultant Profile Card */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-50/90 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-2xs hover:bg-slate-50 transition-colors">
            <div className="relative flex-shrink-0">
              {consultant.avatarUrl && !avatarError ? (
                <img
                  src={consultant.avatarUrl}
                  alt={consultant.name}
                  onError={() => setAvatarError(true)}
                  className="w-10 h-10 rounded-full object-cover shadow-xs border-2 border-white ring-1 ring-slate-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-aia-red to-rose-400 text-white font-bold flex items-center justify-center text-sm shadow-xs border-2 border-white">
                  Ý
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" title="Đang trực tuyến" />
            </div>
            <div className="text-left text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <span>{consultant.name}</span>
                <span className="text-[9px] bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.2 rounded">MDRT</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5">
                <span className="flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-aia-red" />
                  {consultant.code}
                </span>
                <span>•</span>
                <span className="flex items-center gap-0.5" title={consultant.office}>
                  <Building className="w-3 h-3 text-slate-400" />
                  {consultant.agency}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Data Tools + Primary Action Dropdown */}
          <div className="flex items-center gap-2">
            {/* Mobile Consultant Avatar */}
            <div
              className="relative flex lg:hidden items-center flex-shrink-0 mr-1"
              title={`${consultant.name} (${consultant.code}) - ${consultant.agency}`}
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
                  Ý
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />

            {/* Quick backup tools */}
            <div className="hidden md:flex items-center gap-1 border-r border-slate-200 pr-2 mr-1">
              <button
                type="button"
                onClick={onExportJSON}
                title="Sao lưu toàn bộ dữ liệu ra file JSON"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <FileCode className="w-4 h-4 text-slate-500" />
                <span className="hidden xl:inline">Xuất JSON</span>
              </button>
              <button
                type="button"
                onClick={onExportCSV}
                title="Xuất danh bạ và hợp đồng ra file Excel CSV"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span className="hidden xl:inline">Xuất Excel</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Khôi phục dữ liệu từ file backup JSON"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <Upload className="w-4 h-4 text-blue-600" />
                <span className="hidden xl:inline">Nhập file</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Khôi phục toàn bộ hệ thống về dữ liệu mẫu mặc định ban đầu?')) {
                    onResetDefault();
                  }
                }}
                title="Khôi phục dữ liệu mẫu ban đầu"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Add Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAddMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-aia-red hover:bg-aia-red-dark text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Thêm mới</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAddMenuOpen ? 'rotate-180' : ''}`} />
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
                        <p className="font-semibold">Khách hàng & HĐ mới</p>
                        <p className="text-[10px] text-slate-400">Thêm hồ sơ cá nhân và gói bảo hiểm</p>
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
                        <p className="font-semibold">Hồ sơ Bồi thường (Claim)</p>
                        <p className="text-[10px] text-slate-400">Tiếp nhận viện phí / phẫu thuật mới</p>
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
                        <p className="font-semibold">Ghi chú Chăm sóc / Lịch hẹn</p>
                        <p className="text-[10px] text-slate-400">Gặp cafe, gọi điện, nhắc kỳ phí</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar: 4 Main Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-aia-red text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
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
