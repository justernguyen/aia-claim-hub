import React, { useState, useMemo } from 'react';
import {
  Users,
  ShieldCheck,
  Search,
  LayoutGrid,
  List,
  UserPlus,
  Coins,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import { CustomerImportModal } from './CustomerImportModal';
import { Customer, Policy, CareActivity, PolicyStatus } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { CustomerCard } from './CustomerCard';
import { CustomerTableView } from './CustomerTableView';
import { CustomerDetailDrawer } from './CustomerDetailDrawer';
import { formatCurrencyVND, formatShortCurrency } from '../utils/formatters';
import { AvatarPickerModal } from './AvatarPickerModal';

interface CustomerManagementViewProps {
  customers: Customer[];
  policies: Policy[];
  claims: ClaimItem[];
  careActivities: CareActivity[];
  onAddCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>, initialPolicy?: Policy) => void;
  onUpdateCustomer?: (id: string, updates: Partial<Customer>) => void;
  onDeleteCustomer: (id: string) => void;
  onAddCareActivity: (activity: Omit<CareActivity, 'id' | 'createdAt'>) => void;
  onSelectClaim?: (claimId: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  onBulkImport?: (customers: Omit<Customer, 'id' | 'createdAt'>[], policies: Policy[]) => void;
  selectedCustomerId?: string | null;
  onSelectCustomerId?: (id: string | null) => void;
}

export const CustomerManagementView: React.FC<CustomerManagementViewProps> = ({
  customers,
  policies,
  claims,
  careActivities,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  onAddCareActivity,
  onSelectClaim,
  isCreateModalOpen,
  setIsCreateModalOpen,
  onBulkImport,
  selectedCustomerId: externalSelectedCustomerId,
  onSelectCustomerId,
}) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PolicyStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Selected customer for detail drawer (controlled or internal)
  const [internalSelectedCustomerId, setInternalSelectedCustomerId] = useState<string | null>(null);
  const selectedCustomerId = externalSelectedCustomerId !== undefined ? externalSelectedCustomerId : internalSelectedCustomerId;
  const setSelectedCustomerId = (id: string | null) => {
    if (onSelectCustomerId) onSelectCustomerId(id);
    else setInternalSelectedCustomerId(id);
  };

  // Customer currently being edited for avatar
  const [editingAvatarCustomer, setEditingAvatarCustomer] = useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const custPolicies = policies.filter((p) => p.customerId === cust.id);
        const policyNumbers = custPolicies.map((p) => p.id.toLowerCase()).join(' ');
        const productNames = custPolicies.map((p) => p.productName.toLowerCase()).join(' ');

        const matches =
          cust.name.toLowerCase().includes(q) ||
          cust.phone.includes(q) ||
          cust.cccd.includes(q) ||
          cust.address.toLowerCase().includes(q) ||
          policyNumbers.includes(q) ||
          productNames.includes(q);

        if (!matches) return false;
      }

      // 2. Status filter
      if (statusFilter !== 'all') {
        const custPolicies = policies.filter((p) => p.customerId === cust.id);
        const hasMatchingPolicy = custPolicies.some((p) => p.status === statusFilter);
        if (!hasMatchingPolicy) return false;
      }

      return true;
    });
  }, [customers, policies, searchQuery, statusFilter]);

  // Statistics for KPI strip
  const inForceCount = policies.filter((p) => p.status === 'in_force').length;
  const pendingCount = policies.filter((p) => p.status === 'pending_payment').length;
  const totalAnnualPremium = policies
    .filter((p) => p.status === 'in_force')
    .reduce((sum, p) => sum + p.premiumAmount, 0);

  const selectedCustomer = useMemo(() => {
    return customers.find((c) => c.id === selectedCustomerId) || null;
  }, [customers, selectedCustomerId]);

  return (
    <div className="space-y-6">
      {/* Top KPI Cards Strip - Standardized 4-Zone Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Tổng khách hàng */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">Tổng Khách hàng</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-numeric">{customers.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">Khách hàng được phân công</p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-aia-red hidden sm:flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Hợp đồng hiệu lực */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">HĐ Đang Hiệu Lực</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-numeric">{inForceCount}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">Trên tổng số {policies.length} HĐ</p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-700 hidden sm:flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Hợp đồng chờ nộp phí */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">Chờ nộp phí (Gia hạn)</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-numeric">{pendingCount}</p>
            <p className="text-[11px] text-aia-red font-medium mt-0.5 truncate">Cần nhắc phí gia hạn</p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-aia-red hidden sm:flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Doanh số phí thường niên - Smart Non-Truncated Formatting */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">Tổng Phí Quản Lý</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-numeric truncate" title={formatCurrencyVND(totalAnnualPremium)}>
              {formatShortCurrency(totalAnnualPremium)}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">Phí bảo hiểm thường niên</p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-700 hidden sm:flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search, Filter & View Controls - Aligned with AIA Design System */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo Tên KH, Số điện thoại, CCCD, Số HĐ (AIA-...), Địa chỉ..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red transition-all"
          />
        </div>

        {/* Status Filter Pills - Matching Tab 2 Standard */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
              statusFilter === 'all'
                ? 'bg-aia-red text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70'
            }`}
          >
            <span>Tất cả</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                statusFilter === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200/80 text-slate-700'
              }`}
            >
              {customers.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('in_force')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
              statusFilter === 'in_force'
                ? 'bg-aia-red text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70'
            }`}
          >
            <span>Đang hiệu lực</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                statusFilter === 'in_force'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200/80 text-slate-700'
              }`}
            >
              {inForceCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('pending_payment')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
              statusFilter === 'pending_payment'
                ? 'bg-aia-red text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70'
            }`}
          >
            <span>Chờ nộp phí</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                statusFilter === 'pending_payment'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200/80 text-slate-700'
              }`}
            >
              {pendingCount}
            </span>
          </button>
        </div>

        {/* View Mode Toggle & Primary Actions */}
        <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-3 shrink-0">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-aia-red' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Chế độ xem lưới thẻ"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white shadow-xs text-aia-red' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Chế độ xem bảng dữ liệu"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
            title="Nhập hàng loạt khách hàng từ Excel hoặc file CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nhập Excel</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-aia-red hover:bg-aia-red-dark text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Thêm KH</span>
          </button>
        </div>
      </div>

      {/* Main List Area - Robust Responsive Grid Preventing Card Breakage */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">Không tìm thấy khách hàng nào</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Không có kết quả nào phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;. Hãy thử tìm kiếm bằng thông tin khác.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredCustomers.map((cust) => (
            <CustomerCard
              key={cust.id}
              customer={cust}
              policies={policies}
              claims={claims}
              onSelect={(c) => setSelectedCustomerId(c.id)}
              onChangeAvatar={(c) => setEditingAvatarCustomer(c)}
            />
          ))}
        </div>
      ) : (
        <CustomerTableView
          customers={filteredCustomers}
          policies={policies}
          claims={claims}
          onSelect={(c) => setSelectedCustomerId(c.id)}
          onChangeAvatar={(c) => setEditingAvatarCustomer(c)}
        />
      )}

      {/* Customer Detail Drawer */}
      <CustomerDetailDrawer
        customer={selectedCustomer}
        policies={policies}
        claims={claims}
        careActivities={careActivities}
        isOpen={Boolean(selectedCustomerId)}
        onClose={() => setSelectedCustomerId(null)}
        onSelectClaim={onSelectClaim}
        onAddCareActivity={onAddCareActivity}
        onDeleteCustomer={onDeleteCustomer}
        onChangeAvatar={(c) => setEditingAvatarCustomer(c)}
      />

      {/* Customer Import Modal */}
      <CustomerImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(importedCusts, importedPols) => onBulkImport?.(importedCusts, importedPols)}
      />

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={Boolean(editingAvatarCustomer)}
        onClose={() => setEditingAvatarCustomer(null)}
        customer={editingAvatarCustomer}
        currentAvatarId={editingAvatarCustomer?.avatar}
        onSelectAvatar={(avatarId) => {
          if (editingAvatarCustomer && onUpdateCustomer) {
            onUpdateCustomer(editingAvatarCustomer.id, { avatar: avatarId });
            setEditingAvatarCustomer((prev) =>
              prev ? { ...prev, avatar: avatarId } : null
            );
          }
        }}
      />
    </div>
  );
};
