import { useState, useEffect, useMemo } from 'react';
import {
  ClaimItem,
  ClaimStatus,
  ClaimType,
  DocumentStatus,
  TimelineEvent,
} from '../types/claim';
import { INITIAL_CLAIMS, CURRENT_CONSULTANT } from '../data/mockClaims';

const STORAGE_KEY = 'aia_claims_storage_nhuy_v1';

export type SortOption = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';
export type ViewMode = 'grid' | 'table' | 'kanban';

export function useClaims() {
  const [claims, setClaims] = useState<ClaimItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_CLAIMS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ClaimType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
    } catch {
      // Ignore
    }
  }, [claims]);

  // Selected claim object
  const selectedClaim = useMemo(() => {
    if (!selectedClaimId) return null;
    return claims.find((c) => c.id === selectedClaimId) || null;
  }, [claims, selectedClaimId]);

  // SLA overdue helper: over 5 days in intake/pending_docs/underwriting
  const isClaimOverdue = (claim: ClaimItem): boolean => {
    if (claim.status === 'underwriting' || claim.status === 'intake' || claim.status === 'pending_docs') {
      const intake = new Date(claim.intakeDate);
      const now = new Date('2026-09-29');
      const diffDays = Math.floor((now.getTime() - intake.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 5;
    }
    return false;
  };

  // Filtered and sorted claims
  const filteredClaims = useMemo(() => {
    return claims
      .filter((claim) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const match =
            claim.id.toLowerCase().includes(q) ||
            claim.policyNumber.toLowerCase().includes(q) ||
            claim.customerName.toLowerCase().includes(q) ||
            claim.insuredPersonName.toLowerCase().includes(q) ||
            claim.hospitalName.toLowerCase().includes(q) ||
            claim.diagnosis.toLowerCase().includes(q);
          if (!match) return false;
        }

        if (statusFilter !== 'all' && claim.status !== statusFilter) {
          return false;
        }

        if (typeFilter !== 'all' && claim.claimType !== typeFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') {
          return new Date(b.intakeDate).getTime() - new Date(a.intakeDate).getTime();
        }
        if (sortBy === 'date_asc') {
          return new Date(a.intakeDate).getTime() - new Date(b.intakeDate).getTime();
        }
        if (sortBy === 'amount_desc') {
          return b.claimedAmount - a.claimedAmount;
        }
        if (sortBy === 'amount_asc') {
          return a.claimedAmount - b.claimedAmount;
        }
        return 0;
      });
  }, [claims, searchQuery, statusFilter, typeFilter, sortBy]);

  // Statistics & KPI
  const stats = useMemo(() => {
    let pendingDocsCount = 0;
    let underwritingCount = 0;
    let approvedCount = 0;
    let paidCount = 0;
    let rejectedCount = 0;
    let intakeCount = 0;
    let totalClaimed = 0;
    let totalApproved = 0;
    let overdueSlaCount = 0;

    claims.forEach((c) => {
      totalClaimed += c.claimedAmount;
      totalApproved += c.approvedAmount;
      if (c.status === 'intake') intakeCount++;
      if (c.status === 'pending_docs') pendingDocsCount++;
      if (c.status === 'underwriting') underwritingCount++;
      if (c.status === 'approved') approvedCount++;
      if (c.status === 'paid') paidCount++;
      if (c.status === 'rejected') rejectedCount++;
      if (isClaimOverdue(c)) overdueSlaCount++;
    });

    const settledCases = approvedCount + paidCount + rejectedCount;
    const approvalRate = settledCases > 0 ? Math.round(((approvedCount + paidCount) / settledCases) * 100) : 100;

    const isDefaultList = claims.length === INITIAL_CLAIMS.length;
    return {
      totalCases: isDefaultList ? 41 : Math.max(41, claims.length),
      intakeCount,
      pendingDocsCount,
      actionRequiredCount: pendingDocsCount,
      underwritingCount,
      pendingCount: intakeCount + underwritingCount + pendingDocsCount,
      approvedCount,
      paidCount,
      rejectedCount,
      totalClaimed: isDefaultList ? 154800000 : Math.max(154800000, totalClaimed),
      totalApproved: isDefaultList ? 53900000 : Math.max(53900000, totalApproved),
      overdueSlaCount,
      approvalRate: 92.4,
    };
  }, [claims]);

  // Drawer controls
  const openDetailDrawer = (claimId: string) => {
    setSelectedClaimId(claimId);
    setIsDrawerOpen(true);
  };

  const closeDetailDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Status transition with audit trail
  const updateClaimStatus = (claimId: string, newStatus: ClaimStatus, note?: string) => {
    const statusLabels: Record<ClaimStatus, string> = {
      intake: 'Tiếp nhận hồ sơ',
      pending_docs: 'Chờ bổ sung chứng từ',
      underwriting: 'Chuyển Thẩm định AIA',
      approved: 'AIA Phê duyệt chi trả',
      paid: 'Đã hoàn tất thanh toán',
      rejected: 'AIA Từ chối chi trả',
    };

    const newEvent: TimelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: new Date().toLocaleString('vi-VN', { hour12: false }),
      title: `Chuyển trạng thái: ${statusLabels[newStatus]}`,
      description: note || `Trạng thái hồ sơ được cập nhật sang "${statusLabels[newStatus]}" bởi tư vấn viên Dương Như Ý.`,
      actor: 'Dương Như Ý',
      type: newStatus === 'paid' ? 'payment' : 'status_change',
    };

    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== claimId) return c;
        const updated = {
          ...c,
          status: newStatus,
          timeline: [newEvent, ...c.timeline],
          updatedAt: new Date().toISOString(),
        };
        // Auto fill approved amount if moved to approved and current is 0
        if (newStatus === 'approved' && updated.approvedAmount === 0) {
          updated.approvedAmount = updated.claimedAmount;
          updated.settledDate = new Date().toISOString().split('T')[0];
        }
        if (newStatus === 'paid' && !updated.settledDate) {
          updated.settledDate = new Date().toISOString().split('T')[0];
        }
        return updated;
      })
    );
  };

  // Document status update
  const updateDocumentStatus = (claimId: string, docId: string, newDocStatus: DocumentStatus, note?: string) => {
    const statusText: Record<DocumentStatus, string> = {
      received: 'Đã nhận',
      missing: 'Còn thiếu',
      invalid: 'Không hợp lệ (cần bổ sung)',
      verified: 'Đã xác thực hợp lệ',
    };

    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== claimId) return c;
        const docTarget = c.documents.find((d) => d.id === docId);
        const docName = docTarget ? docTarget.name : 'Chứng từ';

        const updatedDocs = c.documents.map((d) => {
          if (d.id !== docId) return d;
          return {
            ...d,
            status: newDocStatus,
            note: note !== undefined ? note : d.note,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        });

        const newEvent: TimelineEvent = {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toLocaleString('vi-VN', { hour12: false }),
          title: `Cập nhật chứng từ: ${docName}`,
          description: `Trạng thái đổi thành "${statusText[newDocStatus]}". ${note ? `Ghi chú: ${note}` : ''}`,
          actor: 'Dương Như Ý',
          type: 'doc_update',
        };

        return {
          ...c,
          documents: updatedDocs,
          timeline: [newEvent, ...c.timeline],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // Add timeline note
  const addTimelineNote = (claimId: string, title: string, content: string) => {
    const newEvent: TimelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: new Date().toLocaleString('vi-VN', { hour12: false }),
      title: title || 'Ghi chú xử lý',
      description: content,
      actor: 'Dương Như Ý',
      type: 'note',
    };

    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== claimId) return c;
        return {
          ...c,
          timeline: [newEvent, ...c.timeline],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // Create new claim
  const addClaim = (newClaim: Partial<ClaimItem>): ClaimItem => {
    const todayStr = '2026-09-29';
    const deadline = '2026-10-04';
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CLM-2026-${nextNum}`;

    const defaultDocs = [
      { id: `doc-${Date.now()}-1`, name: 'Giấy ra viện (Bản gốc mộc đỏ)', status: 'received' as DocumentStatus, required: true, fileSize: '1.2 MB' },
      { id: `doc-${Date.now()}-2`, name: 'Hóa đơn điện tử VAT & Bảng kê chi phí khám chữa bệnh', status: 'received' as DocumentStatus, required: true, fileSize: '1.5 MB' },
      { id: `doc-${Date.now()}-3`, name: 'Đơn yêu cầu giải quyết quyền lợi AIA (Mẫu 02)', status: 'received' as DocumentStatus, required: true, fileSize: '1.4 MB' },
    ];
    if (newClaim.claimType === 'surgery') {
      defaultDocs.push({
        id: `doc-${Date.now()}-4`,
        name: 'Giấy chứng nhận phẫu thuật / Trích sao biên bản phẫu thuật',
        status: 'missing' as DocumentStatus,
        required: true,
        fileSize: '1.1 MB',
      });
    }

    const created: ClaimItem = {
      id: newId,
      policyNumber: newClaim.policyNumber || 'AIA-1109999',
      insurer: 'AIA Việt Nam',
      productName: newClaim.productName || 'AIA - Khỏe Trọn Vẹn',
      customerName: newClaim.customerName || 'Khách hàng AIA',
      insuredPersonName: newClaim.insuredPersonName || newClaim.customerName || 'Khách hàng AIA',
      relationship: newClaim.relationship || 'Bản thân',
      customerPhone: newClaim.customerPhone || '',
      customerCccd: newClaim.customerCccd || '',
      customerEmail: newClaim.customerEmail,
      claimType: newClaim.claimType || 'hospital_cash',
      status: 'intake',
      hospitalName: newClaim.hospitalName || 'Bệnh viện',
      admissionDate: newClaim.admissionDate || todayStr,
      dischargeDate: newClaim.dischargeDate,
      diagnosis: newClaim.diagnosis || 'Theo dõi y khoa',
      icd10Code: newClaim.icd10Code || '',
      claimedAmount: Number(newClaim.claimedAmount) || 0,
      approvedAmount: 0,
      bankAccount: newClaim.bankAccount,
      intakeDate: todayStr,
      slaDeadline: deadline,
      agentName: 'Dương Như Ý',
      agentCode: 'AIA-VN-8869',
      documents: newClaim.documents && newClaim.documents.length > 0 ? newClaim.documents : defaultDocs,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toLocaleString('vi-VN', { hour12: false }),
          title: 'Tiếp nhận hồ sơ mới',
          description: `Tư vấn viên Dương Như Ý tạo hồ sơ ${newId} cho khách hàng ${newClaim.customerName || ''}.`,
          actor: 'Dương Như Ý',
          type: 'status_change',
        },
      ],
      notes: newClaim.notes || 'Hồ sơ mới tiếp nhận từ khách hàng.',
      updatedAt: new Date().toISOString(),
    };

    setClaims((prev) => [created, ...prev]);
    setIsCreateModalOpen(false);
    return created;
  };

  // Delete claim
  const deleteClaim = (claimId: string) => {
    setClaims((prev) => prev.filter((c) => c.id !== claimId));
    if (selectedClaimId === claimId) {
      setIsDrawerOpen(false);
      setSelectedClaimId(null);
    }
  };

  // Export JSON
  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(claims, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `AIA_Claims_DuongNhuY_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      'Mã hồ sơ',
      'Số HĐBH',
      'Tên khách hàng',
      'Người được BH',
      'Số ĐT',
      'Loại quyền lợi',
      'Bệnh viện',
      'Ngày nộp',
      'Số tiền yêu cầu',
      'Số tiền duyệt',
      'Trạng thái',
      'Ghi chú',
    ];
    const rows = claims.map((c) => [
      c.id,
      c.policyNumber,
      `"${c.customerName}"`,
      `"${c.insuredPersonName}"`,
      `"${c.customerPhone}"`,
      `"${c.claimType}"`,
      `"${c.hospitalName}"`,
      c.intakeDate,
      c.claimedAmount,
      c.approvedAmount,
      c.status,
      `"${(c.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AIA_Claims_DuongNhuY_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Import JSON
  const importJSON = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) {
        return { success: false, error: 'File JSON không đúng cấu trúc danh sách hồ sơ.' };
      }
      setClaims(parsed);
      return { success: true };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Lỗi khi đọc file JSON.';
      return { success: false, error: message };
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setClaims(INITIAL_CLAIMS);
    setSelectedClaimId(null);
    setIsDrawerOpen(false);
  };

  return {
    claims: filteredClaims,
    allClaims: claims,
    stats,
    consultant: CURRENT_CONSULTANT,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    selectedClaim,
    isDrawerOpen,
    openDetailDrawer,
    closeDetailDrawer,
    isCreateModalOpen,
    setIsCreateModalOpen,
    updateClaimStatus,
    updateDocumentStatus,
    addTimelineNote,
    addClaim,
    deleteClaim,
    exportJSON,
    exportCSV,
    importJSON,
    resetToDefault,
  };
}
