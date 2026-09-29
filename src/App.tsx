import React, { useState } from 'react';
import { useClaims } from './hooks/useClaims';
import { TopNavBar } from './components/dashboard/TopNavBar';
import { NavigationTabs, TabId } from './components/dashboard/NavigationTabs';
import { MetricStrip } from './components/dashboard/MetricStrip';
import { ClaimsView } from './components/claims/ClaimsView';
import { SlideOverDrawer } from './components/drawer/SlideOverDrawer';
import { CreateClaimModal } from './components/claims/CreateClaimModal';
import { ClaimStatus } from './types/claim';
import { Check } from 'lucide-react';

export default function App() {
  const {
    claims,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    viewMode,
    setViewMode,
    selectedClaim,
    isDrawerOpen,
    openDetailDrawer,
    closeDetailDrawer,
    isCreateModalOpen,
    setIsCreateModalOpen,
    updateClaimStatus,
    addClaim,
    deleteClaim,
  } = useClaims();

  const [activeTab, setActiveTab] = useState<TabId>('claims');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCreateClaim = (newClaimData: Parameters<typeof addClaim>[0]) => {
    addClaim(newClaimData);
    showToast(`Đã thêm mới hồ sơ yêu cầu bồi thường cho ${newClaimData.insuredPersonName || newClaimData.customerName}!`);
  };

  const handleUpdateStatus = (claimId: string, status: ClaimStatus, note?: string) => {
    updateClaimStatus(claimId, status, note);
    showToast(`Đã cập nhật trạng thái hồ sơ ${claimId}`);
  };

  const handleDeleteClaim = (claimId: string) => {
    deleteClaim(claimId);
    showToast(`Đã xóa hồ sơ ${claimId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 text-xs font-semibold flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Bar: Breadcrumb Khách hàng & Liên kết Sheets */}
      <TopNavBar customerName="Nguyễn Thị Hạnh Dung" />

      {/* 2. Navigation Tabs (Hợp đồng, Khách hàng, Sự kiện, Lịch sử claim, Thống kê) */}
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        claimCount={stats.totalCases}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {activeTab === 'claims' ? (
          <>
            {/* 3. Dải Metric KPI 3 thẻ lớn, cân đối, đúng số liệu ảnh gốc */}
            <MetricStrip stats={stats} />

            {/* 4. Toolbar 1 hàng & Chế độ xem kép (Thẻ / Bảng) */}
            <ClaimsView
              claims={claims}
              selectedClaimId={selectedClaim?.id || null}
              onSelectClaim={openDetailDrawer}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />
          </>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center my-6">
            <h3 className="text-base font-bold text-slate-800">
              Phân hệ:{' '}
              {activeTab === 'contracts'
                ? 'Hợp đồng bảo hiểm'
                : activeTab === 'customer'
                ? 'Hồ sơ khách hàng'
                : activeTab === 'events'
                ? 'Lịch sự kiện & Tái tục'
                : 'Báo cáo & Thống kê'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Vui lòng chọn tab <strong>Lịch sử claim</strong> để quản lý toàn bộ hồ sơ bồi thường và theo dõi đối soát chi trả.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('claims')}
              className="mt-4 inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-md text-white bg-rose-700 hover:bg-rose-800 transition-colors cursor-pointer"
            >
              Quay lại Lịch sử claim
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3.5 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-medium text-slate-600">
            Hệ thống Quản lý Bồi thường Bảo hiểm (Claim Tracking System)
          </div>
          <div className="font-number text-[11px] text-slate-400">
            Khách hàng: Nguyễn Thị Hạnh Dung • Đồng bộ Google Sheets
          </div>
        </div>
      </footer>

      {/* 5. Slide-over Detail Drawer */}
      <SlideOverDrawer
        claim={selectedClaim}
        isOpen={isDrawerOpen}
        onClose={closeDetailDrawer}
        onUpdateStatus={handleUpdateStatus}
        onDeleteClaim={handleDeleteClaim}
      />

      {/* 6. Modal Tạo Mới Hồ Sơ Claim */}
      <CreateClaimModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddClaim={handleCreateClaim}
        defaultCustomerName="Nguyễn Thị Hạnh Dung"
      />
    </div>
  );
}
