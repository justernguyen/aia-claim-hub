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
} from 'lucide-react';
import { Customer, Policy, CareActivity, PolicyStatus } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { CustomerCard } from './CustomerCard';
import { CustomerTableView } from './CustomerTableView';
import { CustomerDetailDrawer } from './CustomerDetailDrawer';
import { NewCustomerModal } from './NewCustomerModal';
import { formatCurrencyVND } from '../utils/formatters';

interface CustomerManagementViewProps {
  customers: Customer[];
  policies: Policy[];
  claims: ClaimItem[];
  careActivities: CareActivity[];
  onAddCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>, initialPolicy?: Policy) => void;
  onDeleteCustomer: (id: string) => void;
  onAddCareActivity: (activity: Omit<CareActivity, 'id' | 'createdAt'>) => void;
  onSelectClaim?: (claimId: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export const CustomerManagementView: React.FC<CustomerManagementViewProps> = ({
  customers,
  policies,
  claims,
  careActivities,
  onAddCustomer,
  onDeleteCustomer,
  onAddCareActivity,
  onSelectClaim,
  isCreateModalOpen,
  setIsCreateModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PolicyStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Selected customer for detail drawer
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Derived filtered customers
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
      {/* Top KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Tổng khách hàng */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng Khách hàng</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{customers.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Khách hàng được phân công</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Hợp đồng hiệu lực */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">HĐ Đang Hiệu Lực</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">{inForceCount}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Trên tổng số {policies.length} HĐ</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Hợp đồng chờ nộp phí */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chờ nộp phí (Gia hạn)</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1 font-mono">{pendingCount}</p>
            <p className="text-[11px] text-amber-600/90 font-medium mt-0.5">Cần nhắc phí tránh mất hiệu lực</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Doanh số phí thường niên */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng Phí Quản Lý</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1 font-mono truncate max-w-[150px]" title={formatCurrencyVND(totalAnnualPremium)}>
              {formatCurrencyVND(totalAnnualPremium)}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Phí bảo hiểm thường niên</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo Tên KH, Số điện thoại, CCCD, Số HĐ (AIA-...), Địa chỉ..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-aia-red focus:bg-white transition-all"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả ({customers.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('in_force')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'in_force'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Đang hiệu lực
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('pending_payment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'pending_payment'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Chờ nộp phí
          </button>
        </div>

        {/* View Mode Toggle & Add Button */}
        <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-3">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-aia-red' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Chế độ xem lưới"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-xs text-aia-red' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Chế độ xem bảng"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-aia-red hover:bg-aia-red-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Thêm KH</span>
          </button>
        </div>
      </div>

      {/* Main List Area */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">Không tìm thấy khách hàng nào</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Không có kết quả nào phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;. Hãy thử tìm kiếm bằng thông tin khác.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCustomers.map((cust) => (
            <CustomerCard
              key={cust.id}
              customer={cust}
              policies={policies}
              claims={claims}
              onSelect={(c) => setSelectedCustomerId(c.id)}
            />
          ))}
        </div>
      ) : (
        <CustomerTableView
          customers={filteredCustomers}
          policies={policies}
          claims={claims}
          onSelect={(c) => setSelectedCustomerId(c.id)}
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
      />

      {/* New Customer Modal */}
      <NewCustomerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={onAddCustomer}
      />
    </div>
  );
};
