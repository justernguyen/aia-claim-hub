import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Customer,
  Policy,
  CareActivity,
  CareAlert,
  PolicyStatus,
} from '../types/crm';
import {
  ClaimItem,
  ClaimStatus,
  ClaimType,
  ConsultantProfile,
  DocumentStatus,
  isBenefitMatchingClaimType,
} from '../types/claim';
import {
  INITIAL_CUSTOMERS,
  INITIAL_POLICIES,
  INITIAL_CARE_ACTIVITIES,
} from '../data/mockCRM';
import { INITIAL_CLAIMS, CURRENT_CONSULTANT } from '../data/mockClaims';
import { LEGACY_AVATAR_MAP } from '../data/avatarCatalog';

const STORAGE_KEY = 'aia_agent_crm_store_v2';

interface StoredCRMData {
  customers: Customer[];
  policies: Policy[];
  claims: ClaimItem[];
  careActivities: CareActivity[];
  consultant: ConsultantProfile;
}

// Initial hydration linking claims with customer IDs & policy IDs
const prepareInitialClaims = (): ClaimItem[] => {
  return INITIAL_CLAIMS.map((c) => {
    const matchedPolicy = INITIAL_POLICIES.find((p) => p.id === c.policyNumber);
    const matchedCust = matchedPolicy
      ? INITIAL_CUSTOMERS.find((cust) => cust.id === matchedPolicy.customerId)
      : INITIAL_CUSTOMERS.find((cust) => cust.name === c.customerName || cust.cccd === c.customerCccd);
    return {
      ...c,
      customerId: matchedCust ? matchedCust.id : undefined,
      policyId: matchedPolicy ? matchedPolicy.id : c.policyNumber,
    };
  });
};

export const useCRMStore = () => {
  // Load data from localStorage or fallback to initial mocks
  const [data, setData] = useState<StoredCRMData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.customers && parsed.policies && parsed.claims && parsed.careActivities) {
          const customers = parsed.customers.map((c: Customer) => {
            let avatar = c.avatar ? (LEGACY_AVATAR_MAP[c.avatar] || c.avatar) : undefined;
            if (!avatar) {
              const initialMatch = INITIAL_CUSTOMERS.find((init) => init.id === c.id);
              if (initialMatch?.avatar) {
                avatar = initialMatch.avatar;
              }
            }
            return { ...c, avatar };
          });
          // Sanitize claims: clean up any legacy claims mistakenly defaulted to CUST-001
          const policies = parsed.policies as Policy[];
          const claims = (parsed.claims as ClaimItem[]).map((c) => {
            if (c.customerId === 'CUST-001') {
              const belongsToMaiAnh =
                c.customerName === 'Nguyễn Thị Mai Anh' ||
                c.customerCccd === '079198002341' ||
                policies.some((p) => p.customerId === 'CUST-001' && p.id === c.policyNumber);
              if (!belongsToMaiAnh) {
                const actualPolicy = policies.find((p) => p.id === c.policyNumber);
                const actualCust = actualPolicy
                  ? customers.find((cust: Customer) => cust.id === actualPolicy.customerId)
                  : customers.find((cust: Customer) => cust.name === c.customerName || cust.cccd === c.customerCccd);
              }
            }
            return c;
          });
          const consultant = {
            ...CURRENT_CONSULTANT,
            ...(parsed.consultant || {}),
            name: CURRENT_CONSULTANT.name,
            code: CURRENT_CONSULTANT.code,
            agency: CURRENT_CONSULTANT.agency,
            avatarUrl:
              parsed.consultant?.avatarUrl && !parsed.consultant.avatarUrl.includes('unsplash.com')
                ? parsed.consultant.avatarUrl
                : CURRENT_CONSULTANT.avatarUrl,
          };
          return { ...parsed, customers, policies, claims, consultant };
        }
      }
    } catch (e) {
      console.error('Failed to load CRM data from localStorage:', e);
    }
    return {
      customers: INITIAL_CUSTOMERS,
      policies: INITIAL_POLICIES,
      claims: prepareInitialClaims(),
      careActivities: INITIAL_CARE_ACTIVITIES,
      consultant: CURRENT_CONSULTANT,
    };
  });

  // Save to localStorage on data change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CRM data to localStorage:', e);
    }
  }, [data]);

  // ==========================================
  // ALERTS ENGINE (Sinh nhật, Hạn đóng phí, Chăm sóc sau claim)
  // ==========================================
  const alerts = useMemo<CareAlert[]>(() => {
    const alertList: CareAlert[] = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 1-12
    const currentDay = today.getDate();
    // 1. Sinh nhật khách hàng trong 7 ngày tới hoặc trong tháng
    data.customers.forEach((cust) => {
      if (!cust.birthDate) return;
      const [, bMonthStr, bDayStr] = cust.birthDate.split('-');
      const bMonth = parseInt(bMonthStr, 10);
      const bDay = parseInt(bDayStr, 10);

      // Check if birthday is coming up in next 15 days
      let daysDiff = 0;
      if (bMonth === currentMonth) {
        daysDiff = bDay - currentDay;
      } else if (bMonth === currentMonth + 1) {
        daysDiff = (30 - currentDay) + bDay;
      } else {
        return; // Not in near horizon
      }

      if (daysDiff >= 0 && daysDiff <= 15) {
        alertList.push({
          id: `alert-bday-${cust.id}`,
          type: 'birthday',
          customerId: cust.id,
          customerName: cust.name,
          customerPhone: cust.phone,
          title: `Sinh nhật ${cust.name} (Ngày ${bDay}/${bMonth})`,
          description: daysDiff === 0
            ? 'Hôm nay là sinh nhật khách hàng! Hãy gọi điện hoặc gửi quà chúc mừng.'
            : `Còn ${daysDiff} ngày nữa là đến sinh nhật. Chuẩn bị thiệp và quà chúc mừng.`,
          dueDate: `${currentYear}-${String(bMonth).padStart(2, '0')}-${String(bDay).padStart(2, '0')}`,
          daysRemaining: daysDiff,
          severity: daysDiff <= 3 ? 'urgent' : 'warning',
        });
      }
    });

    // 2. Hợp đồng trong thời gian gia hạn 60 ngày (Grace Period)
    data.policies.forEach((pol) => {
      if (pol.status === 'pending_payment' && pol.gracePeriodEnd) {
        const graceDate = new Date(pol.gracePeriodEnd);
        const diffTime = graceDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        alertList.push({
          id: `alert-grace-${pol.id}`,
          type: 'grace_period',
          customerId: pol.customerId,
          customerName: pol.customerName,
          customerPhone: data.customers.find((c) => c.id === pol.customerId)?.phone || '',
          policyId: pol.id,
          title: `HĐ ${pol.id} sắp hết hạn gia hạn nộp phí!`,
          description: diffDays > 0
            ? `Còn ${diffDays} ngày trong thời gian gia hạn 60 ngày. Nguy cơ mất hiệu lực nếu không nộp phí.`
            : 'Đã hết thời gian gia hạn 60 ngày! Cần liên hệ khẩn cấp làm thủ tục khôi phục HĐ.',
          dueDate: pol.gracePeriodEnd,
          daysRemaining: diffDays,
          severity: diffDays <= 15 ? 'urgent' : 'warning',
        });
      }

      // Hợp đồng sắp đến hạn đóng phí định kỳ trong 20 ngày tới
      if (pol.status === 'in_force' && pol.nextDueDate) {
        const dueDate = new Date(pol.nextDueDate);
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays <= 20) {
          alertList.push({
            id: `alert-due-${pol.id}`,
            type: 'premium_due',
            customerId: pol.customerId,
            customerName: pol.customerName,
            customerPhone: data.customers.find((c) => c.id === pol.customerId)?.phone || '',
            policyId: pol.id,
            title: `HĐ ${pol.id} đến hạn đóng phí định kỳ`,
            description: `Phí định kỳ ${new Intl.NumberFormat('vi-VN').format(pol.premiumAmount)}đ đến hạn ngày ${pol.nextDueDate}.`,
            dueDate: pol.nextDueDate,
            daysRemaining: diffDays,
            severity: diffDays <= 7 ? 'urgent' : 'info',
          });
        }
      }
    });

    // 3. Chăm sóc sau bồi thường (Post-claim care): Các claim vừa được duyệt/chuyển khoản
    data.claims.forEach((cl) => {
      if (cl.status === 'paid' || cl.status === 'approved') {
        const hasCareActivity = data.careActivities.some(
          (act) => act.policyId === cl.policyNumber && act.channel === 'call' && act.status === 'completed'
        );
        if (!hasCareActivity) {
          alertList.push({
            id: `alert-postclaim-${cl.id}`,
            type: 'post_claim_care',
            customerId: cl.customerId || 'CUST-001',
            customerName: cl.customerName,
            customerPhone: cl.customerPhone,
            policyId: cl.policyNumber,
            title: `Hỏi thăm khách hàng sau bồi thường ca ${cl.id}`,
            description: `AIA đã chi trả ${new Intl.NumberFormat('vi-VN').format(cl.approvedAmount)}đ. Cần gọi điện hỏi thăm sự hài lòng của khách hàng.`,
            dueDate: cl.intakeDate,
            daysRemaining: 1,
            severity: 'info',
          });
        }
      }
    });

    // Sắp xếp: urgent lên đầu, ngày ít nhất lên đầu
    return alertList.sort((a, b) => {
      const priorityOrder = { urgent: 0, warning: 1, info: 2 };
      if (priorityOrder[a.severity] !== priorityOrder[b.severity]) {
        return priorityOrder[a.severity] - priorityOrder[b.severity];
      }
      return a.daysRemaining - b.daysRemaining;
    });
  }, [data.customers, data.policies, data.claims, data.careActivities]);

  // ==========================================
  // STATS & KPI METRICS
  // ==========================================
  const stats = useMemo(() => {
    const { customers, policies, claims, careActivities } = data;

    // Customer metrics
    const totalCustomers = customers.length;
    const newCustomersThisMonth = customers.filter(
      (c) => c.createdAt && c.createdAt.startsWith('2026-09')
    ).length;

    // Policy & Premium metrics
    const inForcePolicies = policies.filter((p) => p.status === 'in_force').length;
    const pendingPaymentPolicies = policies.filter((p) => p.status === 'pending_payment').length;
    const lapsedPolicies = policies.filter((p) => p.status === 'lapsed').length;

    // Phí Năm Đầu (FYP): các HĐ phát hành trong 1 năm gần nhất (sau 2025-09-01)
    const fypTotal = policies
      .filter((p) => p.status === 'in_force' && p.issueDate >= '2025-09-01')
      .reduce((sum, p) => sum + p.premiumAmount, 0);

    // Phí Tái Tục (RYP): các HĐ phát hành trước 2025-09-01
    const rypTotal = policies
      .filter((p) => p.status === 'in_force' && p.issueDate < '2025-09-01')
      .reduce((sum, p) => sum + p.premiumAmount, 0);

    const pendingPremiumTotal = policies
      .filter((p) => p.status === 'pending_payment')
      .reduce((sum, p) => sum + p.premiumAmount, 0);

    const totalAnnualPremium = policies
      .filter((p) => p.status === 'in_force')
      .reduce((sum, p) => sum + p.premiumAmount, 0);

    // Claim metrics
    const totalClaims = claims.length;
    const pendingClaims = claims.filter(
      (c) => c.status === 'intake' || c.status === 'pending_docs' || c.status === 'underwriting'
    ).length;
    const approvedClaims = claims.filter((c) => c.status === 'approved' || c.status === 'paid').length;
    const rejectedClaims = claims.filter((c) => c.status === 'rejected').length;

    const totalClaimedAmount = claims.reduce((sum, c) => sum + (c.claimedAmount || 0), 0);
    const totalApprovedAmount = claims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0);
    const approvalRate = totalClaims > 0 ? Math.round((approvedClaims / totalClaims) * 100) : 0;

    // Care metrics
    const plannedActivities = careActivities.filter((a) => a.status === 'planned').length;
    const urgentAlertsCount = alerts.filter((a) => a.severity === 'urgent').length;

    return {
      totalCustomers,
      newCustomersThisMonth,
      totalPolicies: policies.length,
      inForcePolicies,
      pendingPaymentPolicies,
      lapsedPolicies,
      fypTotal,
      rypTotal,
      pendingPremiumTotal,
      totalAnnualPremium,
      totalClaims,
      pendingClaims,
      approvedClaims,
      rejectedClaims,
      totalClaimedAmount,
      totalApprovedAmount,
      approvalRate,
      plannedActivities,
      urgentAlertsCount,
    };
  }, [data, alerts]);

  // ==========================================
  // CUSTOMER MUTATIONS
  // ==========================================
  const addCustomer = useCallback((customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newId = `CUST-${String(data.customers.length + 1).padStart(3, '0')}`;
    const newCustomer: Customer = {
      ...customerData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setData((prev) => ({
      ...prev,
      customers: [newCustomer, ...prev.customers],
    }));
    return newCustomer;
  }, [data.customers.length]);
  const addBulkCustomers = useCallback((
    newCustomers: Omit<Customer, 'id' | 'createdAt'>[],
    newPolicies: Policy[]
  ) => {
    setData((prev) => {
      let currentCount = prev.customers.length;
      const createdCusts: Customer[] = [];
      const createdPols: Policy[] = [];
      const todayStr = new Date().toISOString().split('T')[0];

      newCustomers.forEach((c, idx) => {
        currentCount += 1;
        const newId = `CUST-${String(currentCount).padStart(3, '0')}`;
        const fullCust: Customer = {
          ...c,
          id: newId,
          createdAt: todayStr,
        };
        createdCusts.push(fullCust);

        const matchingPol = newPolicies[idx];
        if (matchingPol) {
          createdPols.push({
            ...matchingPol,
            customerId: newId,
            customerName: fullCust.name,
          });
        }
      });

      return {
        ...prev,
        customers: [...createdCusts, ...prev.customers],
        policies: [...createdPols, ...prev.policies],
      };
    });
  }, []);

  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setData((prev) => ({
      ...prev,
      customers: prev.customers.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      policies: prev.policies.map((p) =>
        p.customerId === id && updates.name ? { ...p, customerName: updates.name } : p
      ),
    }));
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      customers: prev.customers.filter((c) => c.id !== id),
      policies: prev.policies.filter((p) => p.customerId !== id),
      claims: prev.claims.filter((c) => c.customerId !== id),
      careActivities: prev.careActivities.filter((a) => a.customerId !== id),
    }));
  }, []);

  // ==========================================
  // POLICY MUTATIONS & BENEFIT QUOTA
  // ==========================================
  const addPolicy = useCallback((policyData: Policy) => {
    setData((prev) => ({
      ...prev,
      policies: [policyData, ...prev.policies],
    }));
  }, []);

  const updatePolicy = useCallback((id: string, updates: Partial<Policy>) => {
    setData((prev) => ({
      ...prev,
      policies: prev.policies.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  }, []);

  // Tự động đối chiếu và trừ hạn mức quyền lợi khi duyệt claim
  const syncBenefitDeduction = useCallback((
    policyNumber: string,
    claimType: ClaimType,
    amountDelta: number // Số tiền trừ thêm (dương) hoặc hoàn lại (âm)
  ) => {
    if (amountDelta === 0) return;

    setData((prev) => ({
      ...prev,
      policies: prev.policies.map((pol) => {
        if (pol.id !== policyNumber) return pol;
        return {
          ...pol,
          benefits: pol.benefits.map((b) => {
            if (b.type === claimType || (b.type === 'medical_expense' && claimType === 'hospital_cash')) {
              const newUsed = Math.max(0, b.usedAmount + amountDelta);
              const newRemaining = Math.max(0, b.maxLimit - newUsed);
              return {
                ...b,
                usedAmount: newUsed,
                remainingLimit: newRemaining,
              };
            }
            return b;
          }),
        };
      }),
    }));
  }, []);

  // ==========================================
  // CLAIM MUTATIONS
  // ==========================================
  const addClaim = useCallback((newClaimData: Partial<ClaimItem>) => {
    const currentYear = new Date().getFullYear();
    const count = data.claims.length + 1;
    const newId = `CLM-${currentYear}-${String(count).padStart(4, '0')}`;

    const newClaim: ClaimItem = {
      id: newId,
      policyNumber: newClaimData.policyNumber || 'AIA-1108924',
      customerId: newClaimData.customerId,
      policyId: newClaimData.policyNumber,
      insurer: 'AIA Việt Nam',
      productName: newClaimData.productName || 'AIA - Khỏe Trọn Vẹn',
      customerName: newClaimData.customerName || '',
      insuredPersonName: newClaimData.insuredPersonName || newClaimData.customerName || '',
      relationship: newClaimData.relationship || 'Bản thân',
      customerPhone: newClaimData.customerPhone || '',
      customerCccd: newClaimData.customerCccd || '',
      customerEmail: newClaimData.customerEmail,
      claimType: newClaimData.claimType || 'hospital_cash',
      status: 'intake',
      hospitalName: newClaimData.hospitalName || '',
      admissionDate: newClaimData.admissionDate || new Date().toISOString().split('T')[0],
      dischargeDate: newClaimData.dischargeDate,
      diagnosis: newClaimData.diagnosis || '',
      claimedAmount: newClaimData.claimedAmount || 0,
      approvedAmount: 0,
      intakeDate: new Date().toISOString().split('T')[0],
      slaDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      agentName: data.consultant.name,
      agentCode: data.consultant.code,
      documents: newClaimData.documents || [
        { id: `doc-${Date.now()}-1`, name: 'Giấy ra viện (Bản gốc)', status: 'missing', required: true, fileSize: '', updatedAt: new Date().toISOString().split('T')[0] },
        { id: `doc-${Date.now()}-2`, name: 'Hóa đơn điện tử VAT & Bảng kê chi tiết', status: 'missing', required: true, fileSize: '', updatedAt: new Date().toISOString().split('T')[0] },
        { id: `doc-${Date.now()}-3`, name: 'Đơn yêu cầu bồi thường AIA (Mẫu 02)', status: 'received', required: true, fileSize: '1.2 MB', updatedAt: new Date().toISOString().split('T')[0] },
      ],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          title: 'Tiếp nhận hồ sơ mới',
          description: `Tư vấn viên ${data.consultant.name} ghi nhận yêu cầu bồi thường mới.`,
          actor: data.consultant.name,
          type: 'status_change',
        },
      ],
      notes: newClaimData.notes || '',
      updatedAt: new Date().toISOString(),
    };

    setData((prev) => ({
      ...prev,
      claims: [newClaim, ...prev.claims],
    }));

    return newClaim;
  }, [data.claims.length, data.consultant]);

  const updateClaimStatus = useCallback((
    claimId: string,
    newStatus: ClaimStatus,
    approvedAmount?: number,
    note?: string
  ) => {
    setData((prev) => {
      const claim = prev.claims.find((c) => c.id === claimId);
      if (!claim) return prev;

      const oldStatus = claim.status;
      const oldApproved = claim.approvedAmount || 0;
      const effectiveApproved = approvedAmount !== undefined ? approvedAmount : oldApproved;

      // Tính mức chênh lệch trừ hạn mức
      let deductionDelta = 0;
      const wasApproved = oldStatus === 'approved' || oldStatus === 'paid';
      const isNowApproved = newStatus === 'approved' || newStatus === 'paid';

      if (!wasApproved && isNowApproved) {
        deductionDelta = effectiveApproved; // Trừ số tiền duyệt vào hạn mức
      } else if (wasApproved && isNowApproved) {
        deductionDelta = effectiveApproved - oldApproved; // Điều chỉnh mức chênh
      } else if (wasApproved && !isNowApproved) {
        deductionDelta = -oldApproved; // Hoàn trả lại hạn mức nếu bị từ chối
      }

      // Tạo timeline event
      const newEvent = {
        id: `tl-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: `Chuyển trạng thái: ${newStatus.toUpperCase()}`,
        description: note || `Cập nhật trạng thái hồ sơ bồi thường sang ${newStatus}.`,
        actor: prev.consultant.name,
        type: 'status_change' as const,
      };

      const updatedClaims = prev.claims.map((c) => {
        if (c.id !== claimId) return c;
        return {
          ...c,
          status: newStatus,
          approvedAmount: effectiveApproved,
          updatedAt: new Date().toISOString(),
          timeline: [newEvent, ...c.timeline],
        };
      });

      let updatedPolicies = prev.policies;
      if (deductionDelta !== 0 && claim.policyNumber) {
        updatedPolicies = prev.policies.map((pol) => {
          if (pol.id !== claim.policyNumber) return pol;
          // Find exact match first, else compatible match
          let targetIndex = pol.benefits.findIndex((b) => b.type === claim.claimType);
          if (targetIndex === -1) {
            targetIndex = pol.benefits.findIndex((b) => isBenefitMatchingClaimType(b.type, claim.claimType));
          }
          if (targetIndex === -1) {
            targetIndex = 0;
          }

          return {
            ...pol,
            benefits: pol.benefits.map((b, idx) => {
              if (idx === targetIndex) {
                const newUsed = Math.max(0, b.usedAmount + deductionDelta);
                const newRemaining = Math.max(0, b.maxLimit - newUsed);
                return {
                  ...b,
                  usedAmount: newUsed,
                  remainingLimit: newRemaining,
                };
              }
              return b;
            }),
          };
        });
      }

      return {
        ...prev,
        claims: updatedClaims,
        policies: updatedPolicies,
      };
    });
  }, []);

  const updateDocumentStatus = useCallback((
    claimId: string,
    docId: string,
    docStatus: DocumentStatus,
    note?: string
  ) => {
    setData((prev) => ({
      ...prev,
      claims: prev.claims.map((claim) => {
        if (claim.id !== claimId) return claim;
        const updatedDocs = claim.documents.map((d) =>
          d.id === docId
            ? {
                ...d,
                status: docStatus,
                note: note !== undefined ? (note.trim() ? note.trim() : undefined) : d.note,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : d
        );
        const docName = claim.documents.find((d) => d.id === docId)?.name || 'chứng từ';
        const newEvent = {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          title: `Cập nhật chứng từ: ${docName}`,
          description: `Tình trạng chuyển sang [${docStatus.toUpperCase()}]. ${note || ''}`,
          actor: prev.consultant.name,
          type: 'doc_update' as const,
        };
        return {
          ...claim,
          documents: updatedDocs,
          timeline: [newEvent, ...claim.timeline],
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  }, []);

  const attachDocumentImage = useCallback((
    claimId: string,
    docId: string,
    fileUrl: string,
    fileName: string,
    fileSize: string
  ) => {
    setData((prev) => ({
      ...prev,
      claims: prev.claims.map((claim) => {
        if (claim.id !== claimId) return claim;
        const updatedDocs = claim.documents.map((d) =>
          d.id === docId
            ? {
                ...d,
                fileUrl,
                fileName,
                fileSize,
                status: d.status === 'missing' ? ('received' as const) : d.status,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : d
        );
        const docName = claim.documents.find((d) => d.id === docId)?.name || 'chứng từ';
        const newEvent = {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          title: `Đã lưu ảnh chứng từ: ${docName}`,
          description: `Đã đính kèm tệp ${fileName} (${fileSize}) lưu trữ vĩnh viễn trong hồ sơ.`,
          actor: prev.consultant.name,
          type: 'doc_update' as const,
        };
        return {
          ...claim,
          documents: updatedDocs,
          timeline: [newEvent, ...claim.timeline],
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  }, []);

  const addClaimDocument = useCallback((
    claimId: string,
    docName: string,
    fileUrl?: string,
    fileName?: string,
    fileSize?: string
  ) => {
    const newDocId = `doc-${Date.now()}`;
    const newDoc = {
      id: newDocId,
      name: docName,
      status: fileUrl ? ('received' as const) : ('missing' as const),
      required: false,
      fileUrl,
      fileName,
      fileSize: fileSize || 'Ảnh y tế',
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setData((prev) => ({
      ...prev,
      claims: prev.claims.map((claim) => {
        if (claim.id !== claimId) return claim;
        const newEvent = {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          title: `Bổ sung chứng từ: ${docName}`,
          description: `Tư vấn viên ${prev.consultant.name} đã thêm chứng từ mới vào hồ sơ.`,
          actor: prev.consultant.name,
          type: 'doc_update' as const,
        };
        return {
          ...claim,
          documents: [...claim.documents, newDoc],
          timeline: [newEvent, ...claim.timeline],
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
    return newDoc;
  }, []);

  const addTimelineNote = useCallback((claimId: string, title: string, content: string) => {
    setData((prev) => ({
      ...prev,
      claims: prev.claims.map((claim) => {
        if (claim.id !== claimId) return claim;
        const newEvent = {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          title: title || 'Ghi chú thẩm định',
          description: content,
          actor: prev.consultant.name,
          type: 'note' as const,
        };
        return {
          ...claim,
          timeline: [newEvent, ...claim.timeline],
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  }, []);

  const deleteClaim = useCallback((claimId: string) => {
    setData((prev) => ({
      ...prev,
      claims: prev.claims.filter((c) => c.id !== claimId),
    }));
  }, []);

  // ==========================================
  // CARE ACTIVITY MUTATIONS
  // ==========================================
  const addCareActivity = useCallback((activityData: Omit<CareActivity, 'id' | 'createdAt'>) => {
    const newId = `ACT-${new Date().getFullYear()}-${String(data.careActivities.length + 1).padStart(3, '0')}`;
    const newActivity: CareActivity = {
      ...activityData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      careActivities: [newActivity, ...prev.careActivities],
    }));
    return newActivity;
  }, [data.careActivities.length]);

  const updateCareActivity = useCallback((id: string, updates: Partial<CareActivity>) => {
    setData((prev) => ({
      ...prev,
      careActivities: prev.careActivities.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  }, []);

  const toggleActivityStatus = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      careActivities: prev.careActivities.map((a) => {
        if (a.id !== id) return a;
        return {
          ...a,
          status: a.status === 'completed' ? 'planned' : 'completed',
        };
      }),
    }));
  }, []);

  const deleteCareActivity = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      careActivities: prev.careActivities.filter((a) => a.id !== id),
    }));
  }, []);

  // ==========================================
  // DATA BACKUP & RESTORE UTILITIES
  // ==========================================
  const exportAllJSON = useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aia_crm_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const exportAllCSV = useCallback(() => {
    // Export 2 CSVs or combined Customer & Policy CSV
    const headers = ['Ma_KH', 'Ho_Ten', 'SDT', 'CCCD', 'Ngay_Sinh', 'Dia_Chi', 'So_HD', 'San_Pham', 'Trang_Thai_HD', 'Phi_Dinh_Ky', 'Han_Muc_Con_Lai'];
    const rows = data.policies.map((p) => {
      const cust = data.customers.find((c) => c.id === p.customerId);
      const remainingQuota = p.benefits.find((b) => b.type === 'medical_expense')?.remainingLimit || 0;
      return [
        cust?.id || '',
        `"${cust?.name || p.customerName}"`,
        cust?.phone || '',
        cust?.cccd || '',
        cust?.birthDate || '',
        `"${cust?.address || ''}"`,
        p.id,
        `"${p.productName}"`,
        p.status,
        p.premiumAmount,
        remainingQuota,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aia_crm_customers_policies_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importAllJSON = useCallback((jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.customers || !parsed.policies || !parsed.claims) {
        return { success: false, error: 'File JSON không đúng định dạng CRM AIA' };
      }
      setData({
        customers: parsed.customers,
        policies: parsed.policies,
        claims: parsed.claims,
        careActivities: parsed.careActivities || INITIAL_CARE_ACTIVITIES,
        consultant: parsed.consultant || CURRENT_CONSULTANT,
      });
      return { success: true };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Lỗi đọc file JSON';
      return { success: false, error: message };
    }
  }, []);

  const resetCRMDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData({
      customers: INITIAL_CUSTOMERS,
      policies: INITIAL_POLICIES,
      claims: prepareInitialClaims(),
      careActivities: INITIAL_CARE_ACTIVITIES,
      consultant: CURRENT_CONSULTANT,
    });
  }, []);

  return {
    // Entities
    customers: data.customers,
    policies: data.policies,
    claims: data.claims,
    careActivities: data.careActivities,
    consultant: data.consultant,

    // Computed
    alerts,
    stats,

    // Mutations
    addCustomer,
    addBulkCustomers,
    updateCustomer,
    deleteCustomer,

    addPolicy,
    updatePolicy,
    syncBenefitDeduction,

    addClaim,
    updateClaimStatus,
    updateDocumentStatus,
    attachDocumentImage,
    addClaimDocument,
    addTimelineNote,
    deleteClaim,

    addCareActivity,
    updateCareActivity,
    toggleActivityStatus,
    deleteCareActivity,

    // Storage utils
    exportAllJSON,
    exportAllCSV,
    importAllJSON,
    resetCRMDefault,
  };
};
