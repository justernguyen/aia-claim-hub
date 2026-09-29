import React, { useState, useMemo } from 'react';
import { useCRMStore } from './hooks/useCRMStore';
import { Header } from './components/Header';
import { AppTab } from './types/navigation';
import { CustomerManagementView } from './components/CustomerManagementView';
import { CareScheduleView } from './components/CareScheduleView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { MetricsOverview } from './components/MetricsOverview';
import { FilterBar } from './components/FilterBar';
import { ClaimTableView } from './components/ClaimTableView';
import { ClaimKanbanView } from './components/ClaimKanbanView';
import { ClaimDetailDrawer } from './components/ClaimDetailDrawer';
import { NewClaimModal } from './components/NewClaimModal';
import { NewCustomerModal } from './components/NewCustomerModal';
import { NewCareActivityModal } from './components/NewCareActivityModal';
import { ClaimStatus, ClaimType } from './types/claim';
import { SortOption, ViewMode } from './hooks/useClaims';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  const store = useCRMStore();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<AppTab>('customers');

  // Modals state
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [isNewCareModalOpen, setIsNewCareModalOpen] = useState(false);

  // Claim Drawer state
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [isClaimDrawerOpen, setIsClaimDrawerOpen] = useState(false);

  // Claim filtering and sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ClaimType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Toast notification
  const [notification, setNotification] = useState<string | null>(null);
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Filtered claims for Tab 2
  const filteredClaims = useMemo(() => {
    return store.claims
      .filter((claim) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            claim.customerName.toLowerCase().includes(q) ||
            claim.policyNumber.toLowerCase().includes(q) ||
            claim.id.toLowerCase().includes(q) ||
            claim.hospitalName.toLowerCase().includes(q) ||
            claim.diagnosis.toLowerCase().includes(q) ||
            claim.customerPhone.includes(q);
          if (!matches) return false;
        }

        if (statusFilter !== 'all' && claim.status !== statusFilter) return false;
        if (typeFilter !== 'all' && claim.claimType !== typeFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') return b.intakeDate.localeCompare(a.intakeDate);
        if (sortBy === 'date_asc') return a.intakeDate.localeCompare(b.intakeDate);
        if (sortBy === 'amount_desc') return b.claimedAmount - a.claimedAmount;
        if (sortBy === 'amount_asc') return a.claimedAmount - b.claimedAmount;
        return 0;
      });
  }, [store.claims, searchQuery, statusFilter, typeFilter, sortBy]);

  const selectedClaim = useMemo(() => {
    if (!selectedClaimId) return null;
    return store.claims.find((c) => c.id === selectedClaimId) || null;
  }, [store.claims, selectedClaimId]);

  // Status counts for filter pills in Claims tab
  const statusCounts = {
    total: store.claims.length,
    intake: store.claims.filter((c) => c.status === 'intake').length,
    pending_docs: store.claims.filter((c) => c.status === 'pending_docs').length,
    underwriting: store.claims.filter((c) => c.status === 'underwriting').length,
    approved: store.claims.filter((c) => c.status === 'approved').length,
    paid: store.claims.filter((c) => c.status === 'paid').length,
    rejected: store.claims.filter((c) => c.status === 'rejected').length,
  };

  // Claim KPI stats for MetricsOverview
  const claimStats = {
    totalCases: store.claims.length,
    intakeCount: store.claims.filter((c) => c.status === 'intake').length,
    pendingDocsCount: store.claims.filter((c) => c.status === 'pending_docs').length,
    underwritingCount: store.claims.filter((c) => c.status === 'underwriting').length,
    approvedCount: store.claims.filter((c) => c.status === 'approved').length,
    paidCount: store.claims.filter((c) => c.status === 'paid').length,
    rejectedCount: store.claims.filter((c) => c.status === 'rejected').length,
    totalClaimed: store.stats.totalClaimedAmount,
    totalApproved: store.stats.totalApprovedAmount,
    overdueSlaCount: store.claims.filter((c) => c.status === 'underwriting').length > 1 ? 1 : 0,
    approvalRate: store.stats.approvalRate,
  };

  const handleOpenClaimDetail = (claimId: string) => {
    setSelectedClaimId(claimId);
    setIsClaimDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header with 4-Tab Navigation Shell */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        consultant={store.consultant}
        pendingClaimsCount={store.stats.pendingClaims}
        urgentAlertsCount={store.stats.urgentAlertsCount}
        onOpenNewCustomer={() => setIsNewCustomerModalOpen(true)}
        onOpenNewClaim={() => setIsNewClaimModalOpen(true)}
        onOpenNewCare={() => setIsNewCareModalOpen(true)}
        onExportJSON={store.exportAllJSON}
        onExportCSV={store.exportAllCSV}
        onImportJSON={(str) => {
          const res = store.importAllJSON(str);
          if (res.success) {
            showNotification('Khôi phục toàn bộ cơ sở dữ liệu thành công!');
          }
          return res;
        }}
        onResetDefault={() => {
          store.resetCRMDefault();
          showNotification('Đã khôi phục dữ liệu hệ thống về mặc định!');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: KHÁCH HÀNG & HỢP ĐỒNG */}
        {activeTab === 'customers' && (
          <CustomerManagementView
            customers={store.customers}
            policies={store.policies}
            claims={store.claims}
            careActivities={store.careActivities}
            onAddCustomer={(custData, initialPol) => {
              const newCust = store.addCustomer(custData);
              if (initialPol) {
                store.addPolicy({
                  ...initialPol,
                  customerId: newCust.id,
                  customerName: newCust.name,
                });
              }
              showNotification(`Đã thêm khách hàng ${newCust.name} thành công!`);
            }}
            onDeleteCustomer={(id) => {
              store.deleteCustomer(id);
              showNotification('Đã xóa hồ sơ khách hàng.');
            }}
            onAddCareActivity={(act) => {
              store.addCareActivity(act);
              showNotification('Đã ghi nhận nhật ký chăm sóc mới!');
            }}
            onSelectClaim={(claimId) => {
              setActiveTab('claims');
              handleOpenClaimDetail(claimId);
            }}
            onBulkImport={(importedCusts, importedPols) => {
              store.addBulkCustomers(importedCusts, importedPols);
              showNotification(`Đã nạp thành công ${importedCusts.length} khách hàng vào hệ thống!`);
            }}
            isCreateModalOpen={isNewCustomerModalOpen}
            setIsCreateModalOpen={setIsNewCustomerModalOpen}
          />
        )}

        {/* TAB 2: HỒ SƠ BỒI THƯỜNG (CLAIM PIPELINE) */}
        {activeTab === 'claims' && (
          <div className="space-y-6">
            {/* KPI Metrics */}
            <MetricsOverview
              stats={claimStats}
              onFilterStatus={(s) => setStatusFilter(s)}
              activeStatus={statusFilter}
            />

            {/* Filter Bar */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              typeFilter={typeFilter}
              onTypeChange={setTypeFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              statusCounts={statusCounts}
            />

            {/* Table or Kanban View */}
            {viewMode === 'table' ? (
              <ClaimTableView
                claims={filteredClaims}
                onSelectClaim={handleOpenClaimDetail}
                onUpdateStatus={(id, s) => {
                  store.updateClaimStatus(id, s);
                  showNotification(`Đã cập nhật trạng thái hồ sơ ${id}`);
                }}
              />
            ) : (
              <ClaimKanbanView
                claims={filteredClaims}
                onSelectClaim={handleOpenClaimDetail}
                onUpdateStatus={(id, s) => {
                  store.updateClaimStatus(id, s);
                  showNotification(`Đã chuyển trạng thái hồ sơ ${id}`);
                }}
              />
            )}
          </div>
        )}

        {/* TAB 3: LỊCH CHĂM SÓC & SỰ KIỆN */}
        {activeTab === 'care' && (
          <CareScheduleView
            activities={store.careActivities}
            alerts={store.alerts}
            customers={store.customers}
            policies={store.policies}
            onToggleActivityStatus={(id) => {
              store.toggleActivityStatus(id);
              showNotification('Đã cập nhật trạng thái tương tác!');
            }}
            onDeleteActivity={(id) => {
              store.deleteCareActivity(id);
              showNotification('Đã xóa ghi chú tương tác.');
            }}
            onAddActivity={(act) => {
              store.addCareActivity(act);
              showNotification('Đã thêm ghi chú chăm sóc mới!');
            }}
            onSelectCustomer={(custId) => {
              setActiveTab('customers');
            }}
            isCreateModalOpen={isNewCareModalOpen}
            setIsCreateModalOpen={setIsNewCareModalOpen}
          />
        )}

        {/* TAB 4: THỐNG KÊ & BÁO CÁO KPI */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboardView
            customers={store.customers}
            policies={store.policies}
            claims={store.claims}
            onExportCSV={store.exportAllCSV}
            onSelectCustomer={(custId) => {
              setActiveTab('customers');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-aia-red text-sm tracking-tight">AIA</span>
            <span>•</span>
            <span>Hệ thống Quản lý Khách hàng, Bồi thường & Chăm sóc Khách hàng</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Tư vấn viên: <strong className="text-slate-700">Dương Như Ý</strong> ({store.consultant.code})</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-aia-red" />
              <span>AIA Exchange Bitexco</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <ClaimDetailDrawer
        claim={selectedClaim}
        policies={store.policies}
        isOpen={isClaimDrawerOpen}
        onClose={() => {
          setIsClaimDrawerOpen(false);
          setSelectedClaimId(null);
        }}
        onUpdateStatus={(id, s, approvedAmount, note) => {
          store.updateClaimStatus(id, s, approvedAmount, note);
          showNotification(`Đã chuyển trạng thái hồ sơ ${id}`);
        }}
        onUpdateDocStatus={(claimId, docId, docStatus, note) => {
          store.updateDocumentStatus(claimId, docId, docStatus, note);
          showNotification('Đã cập nhật tình trạng chứng từ y tế!');
        }}
        onAttachDocImage={(claimId, docId, fileUrl, fileName, fileSize) => {
          store.attachDocumentImage(claimId, docId, fileUrl, fileName, fileSize);
          showNotification(`Đã lưu trữ ảnh chứng từ: ${fileName}!`);
        }}
        onAddDocument={(claimId, docName, fileUrl, fileName, fileSize) => {
          store.addClaimDocument(claimId, docName, fileUrl, fileName, fileSize);
          showNotification(`Đã thêm chứng từ mới: ${docName}!`);
        }}
        onAddNote={(claimId, title, content) => {
          store.addTimelineNote(claimId, title, content);
          showNotification('Đã ghi nhận nhật ký xử lý mới!');
        }}
        onDeleteClaim={(id) => {
          store.deleteClaim(id);
          setIsClaimDrawerOpen(false);
          setSelectedClaimId(null);
          showNotification(`Đã xóa hồ sơ ${id}`);
        }}
      />

      {/* New Claim Modal */}
      <NewClaimModal
        isOpen={isNewClaimModalOpen}
        onClose={() => setIsNewClaimModalOpen(false)}
        customers={store.customers}
        policies={store.policies}
        onSubmit={(newClaimData) => {
          const created = store.addClaim(newClaimData);
          showNotification(`Đã tiếp nhận hồ sơ ${created.id} cho khách hàng ${created.customerName}!`);
        }}
      />

      {/* New Customer Modal */}
      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        onClose={() => setIsNewCustomerModalOpen(false)}
        onSubmit={(custData, initialPol) => {
          const newCust = store.addCustomer(custData);
          if (initialPol) {
            store.addPolicy({
              ...initialPol,
              customerId: newCust.id,
              customerName: newCust.name,
            });
          }
          showNotification(`Đã thêm khách hàng ${newCust.name} thành công!`);
        }}
      />

      {/* New Care Activity Modal */}
      <NewCareActivityModal
        isOpen={isNewCareModalOpen}
        onClose={() => setIsNewCareModalOpen(false)}
        customers={store.customers}
        policies={store.policies}
        onSubmit={(act) => {
          store.addCareActivity(act);
          showNotification('Đã thêm ghi chú chăm sóc mới!');
        }}
      />
    </div>
  );
}
