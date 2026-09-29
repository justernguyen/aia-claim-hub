import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  CreditCard,
  Calendar,
  Briefcase,
  ShieldCheck,
  HeartPulse,
  Receipt,
  Clock,
  Plus,
  CalendarPlus,
  AlertTriangle,
  Building2,
  Trash2,
} from 'lucide-react';
import { Customer, Policy, CareActivity, POLICY_STATUS_CONFIG, BILLING_FREQ_LABELS, CARE_CHANNEL_CONFIG } from '../types/crm';
import { ClaimItem, STATUS_CONFIG } from '../types/claim';
import { formatCurrencyVND } from '../utils/formatters';

interface CustomerDetailDrawerProps {
  customer: Customer | null;
  policies: Policy[];
  claims: ClaimItem[];
  careActivities: CareActivity[];
  isOpen: boolean;
  onClose: () => void;
  onSelectClaim?: (claimId: string) => void;
  onAddCareActivity?: (activity: Omit<CareActivity, 'id' | 'createdAt'>) => void;
  onDeleteCustomer?: (customerId: string) => void;
}

export const CustomerDetailDrawer: React.FC<CustomerDetailDrawerProps> = ({
  customer,
  policies,
  claims,
  careActivities,
  isOpen,
  onClose,
  onSelectClaim,
  onAddCareActivity,
  onDeleteCustomer,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'policies' | 'claims' | 'care'>('policies');

  // Quick care note state inside drawer
  const [quickCareTitle, setQuickCareTitle] = useState('');
  const [quickCareContent, setQuickCareContent] = useState('');
  const [quickCareChannel, setQuickCareChannel] = useState<CareActivity['channel']>('call');
  const [isAddingCare, setIsAddingCare] = useState(false);

  if (!isOpen || !customer) return null;

  const customerPolicies = policies.filter((p) => p.customerId === customer.id);
  const customerClaims = claims.filter((c) => c.customerId === customer.id || c.customerName === customer.name);
  const customerActivities = careActivities.filter((a) => a.customerId === customer.id);

  const totalAnnualPremium = customerPolicies.reduce((sum, p) => sum + p.premiumAmount, 0);

  const handleSaveQuickCare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCareTitle.trim()) return;

    onAddCareActivity?.({
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      policyId: customerPolicies[0]?.id,
      date: new Date().toISOString().split('T')[0],
      channel: quickCareChannel,
      title: quickCareTitle,
      content: quickCareContent,
      status: 'completed',
    });

    setQuickCareTitle('');
    setQuickCareContent('');
    setIsAddingCare(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 flex items-start justify-between border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-aia-red to-rose-400 text-white font-extrabold flex items-center justify-center text-xl shadow-lg border-2 border-white/20">
                {customer.name.split(' ').slice(-1)[0][0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight">{customer.name}</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {customer.gender}
                  </span>
                  <span className="text-xs font-mono text-slate-400">({customer.id})</span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-0.5">{customer.occupation}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 font-mono whitespace-nowrap">
                  <span className="whitespace-nowrap">{customerPolicies.length} Hợp đồng</span>
                  <span>•</span>
                  <span className="whitespace-nowrap">Tổng phí: <strong className="text-white">{formatCurrencyVND(totalAnnualPremium)}/năm</strong></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Contact Action Bar */}
          <div className="bg-slate-800/80 px-6 py-2.5 flex items-center justify-between text-xs text-slate-300 border-b border-slate-700">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
              <a
                href={`tel:${customer.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Gọi điện: {customer.phone}</span>
              </a>
              <a
                href={`https://zalo.me/${customer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>Nhắn Zalo</span>
              </a>
            </div>
            {onDeleteCustomer && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Xóa khách hàng ${customer.name} và các hợp đồng liên quan?`)) {
                    onDeleteCustomer(customer.id);
                    onClose();
                  }
                }}
                className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                title="Xóa hồ sơ khách hàng"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 text-xs font-bold overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveSubTab('policies')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeSubTab === 'policies'
                  ? 'border-aia-red text-aia-red bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Hợp đồng & Quyền lợi</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                activeSubTab === 'policies' ? 'bg-rose-100 text-aia-red' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {customerPolicies.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('claims')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeSubTab === 'claims'
                  ? 'border-aia-red text-aia-red bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              <Receipt className="w-4 h-4 shrink-0" />
              <span>Lịch sử Bồi thường</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                activeSubTab === 'claims' ? 'bg-rose-100 text-aia-red' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {customerClaims.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('care')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeSubTab === 'care'
                  ? 'border-aia-red text-aia-red bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>Nhật ký Chăm sóc</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                activeSubTab === 'care' ? 'bg-rose-100 text-aia-red' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {customerActivities.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('profile')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeSubTab === 'profile'
                  ? 'border-aia-red text-aia-red bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Hồ sơ Cá nhân</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* SUB-TAB 1: HỢP ĐỒNG & HẠN MỨC QUYỀN LỢI */}
            {activeSubTab === 'policies' && (
              <div className="space-y-6">
                {customerPolicies.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <ShieldCheck className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Khách hàng chưa có hợp đồng nào.</p>
                  </div>
                ) : (
                  customerPolicies.map((policy) => (
                    <div
                      key={policy.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
                    >
                      {/* Policy Card Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-slate-900 font-mono">
                              {policy.id}
                            </h4>
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                                POLICY_STATUS_CONFIG[policy.status]?.badgeClass
                              }`}
                            >
                              {POLICY_STATUS_CONFIG[policy.status]?.label}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-aia-red mt-0.5">
                            {policy.productName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900 font-mono">
                            {formatCurrencyVND(policy.premiumAmount)}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {BILLING_FREQ_LABELS[policy.billingFrequency]}
                          </p>
                        </div>
                      </div>

                      {/* Payment Dates & Grace Period Alert */}
                      <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Ngày phát hành HĐ</span>
                          <span className="font-semibold text-slate-700 font-mono">{policy.issueDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Kỳ đóng phí tiếp theo</span>
                          <span className="font-semibold text-slate-700 font-mono">{policy.nextDueDate}</span>
                        </div>
                      </div>

                      {policy.status === 'pending_payment' && policy.gracePeriodEnd && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <div>
                            <strong>Thời gian gia hạn đóng phí 60 ngày:</strong> Hạn chót{' '}
                            <span className="font-bold underline">{policy.gracePeriodEnd}</span>. Vui lòng nhắc khách hàng hoàn tất để tránh mất quyền lợi.
                          </div>
                        </div>
                      )}

                      {/* Detailed Benefit Quotas Table */}
                      <div>
                        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <HeartPulse className="w-3.5 h-3.5 text-aia-red" />
                          <span>Chi tiết Hạn mức Quyền lợi Bảo hiểm</span>
                        </h5>

                        <div className="space-y-3">
                          {policy.benefits.map((b, idx) => {
                            const pct = b.maxLimit > 0 ? Math.min(100, Math.round((b.usedAmount / b.maxLimit) * 100)) : 0;
                            return (
                              <div
                                key={idx}
                                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                              >
                                <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
                                  <span className="font-semibold text-slate-800">{b.name}</span>
                                  <span className="font-mono text-slate-500 font-bold whitespace-nowrap shrink-0">
                                    {b.unit === 'days'
                                      ? `${b.usedAmount}/${b.maxLimit} ngày`
                                      : `${formatCurrencyVND(b.usedAmount)} / ${formatCurrencyVND(b.maxLimit)}`}
                                  </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1.5">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      pct > 80 ? 'bg-rose-500' : pct > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>

                                <div className="flex items-center justify-between text-[11px] text-slate-500 gap-2">
                                  <span className="whitespace-nowrap">Tỷ lệ đã sử dụng: <strong className="font-mono">{pct}%</strong></span>
                                  <span className="text-emerald-700 font-bold font-mono whitespace-nowrap">
                                    Hạn mức còn lại: {b.unit === 'days' ? `${b.remainingLimit} ngày` : formatCurrencyVND(b.remainingLimit)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SUB-TAB 2: LỊCH SỬ BỒI THƯỜNG CLAIM */}
            {activeSubTab === 'claims' && (
              <div className="space-y-4">
                {customerClaims.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Receipt className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">Khách hàng chưa có hồ sơ bồi thường nào.</p>
                  </div>
                ) : (
                  customerClaims.map((claim) => (
                    <div
                      key={claim.id}
                      onClick={() => onSelectClaim?.(claim.id)}
                      className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-aia-red transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 group-hover:text-aia-red font-mono text-sm">
                              {claim.id}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                STATUS_CONFIG[claim.status]?.badgeClass
                              }`}
                            >
                              {STATUS_CONFIG[claim.status]?.label}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-600 mt-1 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{claim.hospitalName}</span>
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 italic">
                            Chẩn đoán: {claim.diagnosis}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-400">Yêu cầu: {formatCurrencyVND(claim.claimedAmount)}</p>
                          <p className="text-sm font-bold text-emerald-600 font-mono mt-0.5">
                            {claim.approvedAmount > 0
                              ? `AIA duyệt: ${formatCurrencyVND(claim.approvedAmount)}`
                              : 'Chờ duyệt'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Ngày nộp: {claim.intakeDate}</span>
                        <span className="text-aia-red font-semibold group-hover:underline">
                          Xem chi tiết bồi thường →
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SUB-TAB 3: NHẬT KÝ CHĂM SÓC */}
            {activeSubTab === 'care' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Các lần gặp gỡ & Tư vấn
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingCare(!isAddingCare)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm ghi chú</span>
                  </button>
                </div>

                {isAddingCare && (
                  <form onSubmit={handleSaveQuickCare} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-slate-500 font-medium mb-1">Kênh tương tác</label>
                        <select
                          value={quickCareChannel}
                          onChange={(e) => setQuickCareChannel(e.target.value as CareActivity['channel'])}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                        >
                          <option value="call">Gọi điện thoại</option>
                          <option value="meeting">Gặp trực tiếp</option>
                          <option value="coffee">Hẹn cafe</option>
                          <option value="zalo">Nhắn Zalo</option>
                          <option value="gift">Gửi thiệp/quà</option>
                          <option value="hospital_visit">Thăm viện</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-500 font-medium mb-1">Tiêu đề</label>
                        <input
                          type="text"
                          required
                          value={quickCareTitle}
                          onChange={(e) => setQuickCareTitle(e.target.value)}
                          placeholder="Ví dụ: Tư vấn nâng cấp thẻ sức khỏe..."
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 font-medium mb-1">Nội dung trao đổi</label>
                      <textarea
                        rows={2}
                        value={quickCareContent}
                        onChange={(e) => setQuickCareContent(e.target.value)}
                        placeholder="Nội dung chi tiết cuộc gặp / trao đổi..."
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingCare(false)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1.5 text-xs bg-aia-red text-white font-semibold rounded-lg hover:bg-aia-red-dark"
                      >
                        Lưu ghi chú
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {customerActivities.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      Chưa có ghi chú chăm sóc nào cho khách hàng này.
                    </div>
                  ) : (
                    customerActivities.map((act) => (
                      <div
                        key={act.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-md font-semibold text-[10px] border ${
                                CARE_CHANNEL_CONFIG[act.channel]?.badgeClass
                              }`}
                            >
                              {CARE_CHANNEL_CONFIG[act.channel]?.label}
                            </span>
                            <span className="font-bold text-slate-900">{act.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">{act.date}</span>
                        </div>
                        <p className="text-xs text-slate-600">{act.content}</p>
                        {act.result && (
                          <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                            <strong className="text-slate-700">Kết quả:</strong> {act.result}
                          </div>
                        )}
                        {act.nextAction && (
                          <div className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg flex items-center justify-between">
                            <span>
                              <strong>Việc tiếp theo:</strong> {act.nextAction}
                            </span>
                            {act.nextFollowUpDate && (
                              <span className="font-mono text-[11px] text-emerald-600">
                                Hẹn: {act.nextFollowUpDate}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: HỒ SƠ CÁ NHÂN */}
            {activeSubTab === 'profile' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Số CCCD / Định danh</span>
                      <span className="font-semibold text-slate-800 font-mono text-sm">{customer.cccd}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Ngày sinh</span>
                      <span className="font-semibold text-slate-800 font-mono text-sm">{customer.birthDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Số điện thoại</span>
                      <span className="font-semibold text-slate-800 font-mono text-sm">{customer.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Email</span>
                      <span className="font-semibold text-slate-800">{customer.email || 'Chưa cập nhật'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Địa chỉ liên hệ</span>
                    <span className="font-semibold text-slate-800 text-xs">{customer.address}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Nghề nghiệp</span>
                    <span className="font-semibold text-slate-800 text-xs">{customer.occupation}</span>
                  </div>
                  {customer.notes && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-slate-400 block text-[11px]">Ghi chú tư vấn</span>
                      <p className="text-slate-600 italic mt-0.5">{customer.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
