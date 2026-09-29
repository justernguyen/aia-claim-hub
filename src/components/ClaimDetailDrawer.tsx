import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  CreditCard,
  FileCheck,
  AlertTriangle,
  Clock,
  User,
  Send,
  Trash2,
  Check,
  ShieldCheck,
} from 'lucide-react';
import {
  ClaimItem,
  ClaimStatus,
  DocumentStatus,
  STATUS_CONFIG,
  CLAIM_TYPE_LABELS,
} from '../types/claim';
import { Policy } from '../types/crm';
import { formatCurrencyVND, formatDate } from '../utils/formatters';

interface ClaimDetailDrawerProps {
  claim: ClaimItem | null;
  policies?: Policy[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (claimId: string, status: ClaimStatus, approvedAmount?: number, note?: string) => void;
  onUpdateDocStatus: (claimId: string, docId: string, status: DocumentStatus, note?: string) => void;
  onAddNote: (claimId: string, title: string, content: string) => void;
  onDeleteClaim: (claimId: string) => void;
}

export const ClaimDetailDrawer: React.FC<ClaimDetailDrawerProps> = ({
  claim,
  policies = [],
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateDocStatus,
  onAddNote,
  onDeleteClaim,
}) => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [statusChangeNote, setStatusChangeNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ClaimStatus>('intake');
  const [approvedAmountInput, setApprovedAmountInput] = useState<number>(0);

  useEffect(() => {
    if (claim) {
      setSelectedStatus(claim.status);
      setApprovedAmountInput(claim.approvedAmount > 0 ? claim.approvedAmount : claim.claimedAmount);
    }
  }, [claim]);
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !claim) return null;

  const statusCfg = STATUS_CONFIG[claim.status];

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    onAddNote(claim.id, newNoteTitle.trim() || 'Nhật ký xử lý', newNoteContent.trim());
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleStatusApply = () => {
    if (selectedStatus === claim.status && approvedAmountInput === claim.approvedAmount) return;
    onUpdateStatus(
      claim.id,
      selectedStatus,
      selectedStatus === 'approved' || selectedStatus === 'paid' ? approvedAmountInput : 0,
      statusChangeNote.trim() || undefined
    );
    setStatusChangeNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-aia-red text-white font-bold rounded-xl text-xs shadow-xs">
                AIA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">{claim.id}</h2>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusCfg.badgeClass}`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: statusCfg.dotColor }}
                    />
                    <span>{statusCfg.label}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Tư vấn viên phụ trách: <strong>{claim.agentName}</strong> ({claim.agentCode})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Box 1: Customer & Policy Information */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-aia-red" />
                <span>Thông tin Khách hàng & Hợp đồng bảo hiểm</span>
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Bên mua bảo hiểm:</span>
                  <span className="font-bold text-slate-900 text-sm">{claim.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Người được bảo hiểm:</span>
                  <span className="font-semibold text-slate-900">
                    {claim.insuredPersonName}{' '}
                    <span className="text-[11px] text-slate-500 font-normal">({claim.relationship})</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Số điện thoại:</span>
                  <span className="font-mono text-slate-800">{claim.customerPhone || 'Chưa cập nhật'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Số CCCD:</span>
                  <span className="font-mono text-slate-800">{claim.customerCccd || 'Chưa cập nhật'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Số hợp đồng AIA:</span>
                  <span className="font-mono font-bold text-aia-red">{claim.policyNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Sản phẩm bảo hiểm:</span>
                  <span className="font-semibold text-slate-900">{claim.productName}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">Loại quyền lợi yêu cầu:</span>
                  <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200 text-xs">
                    {CLAIM_TYPE_LABELS[claim.claimType]}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: Hospital & Clinical Details */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-aia-red" />
                <span>Chi tiết y tế & Cơ sở điều trị</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-slate-500 text-[11px]">Cơ sở khám chữa bệnh:</span>
                  <span className="font-bold text-slate-900 text-right">{claim.hospitalName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">Thời gian điều trị:</span>
                  <span className="font-medium text-slate-800">
                    {formatDate(claim.admissionDate)}
                    {claim.dischargeDate ? ` ➔ ${formatDate(claim.dischargeDate)}` : ' (Ngoại trú/Trong ngày)'}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500 text-[11px] block mb-1">Chẩn đoán y khoa & Mã ICD-10:</span>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-medium">
                    {claim.diagnosis}
                    {claim.icd10Code && (
                      <span className="ml-2 font-mono text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                        {claim.icd10Code}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Financials & Payout details */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-aia-red" />
                <span>Chi tiết tài chính & Chi trả bồi thường</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[11px] block">Số tiền yêu cầu bồi thường:</span>
                  <span className="text-base font-extrabold text-slate-900 font-mono">
                    {formatCurrencyVND(claim.claimedAmount)}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 bg-emerald-50/30">
                  <span className="text-emerald-700 text-[11px] block font-medium">Số tiền AIA duyệt chi trả:</span>
                  <span className="text-base font-extrabold text-emerald-700 font-mono">
                    {formatCurrencyVND(claim.approvedAmount)}
                  </span>
                </div>
              </div>
              {/* Benefit Utilization Comparison Section */}
              {(() => {
                const matchingPolicy = policies.find((p) => p.id === claim.policyNumber);
                const matchingBenefit = matchingPolicy?.benefits.find((b) => b.type === claim.claimType) ||
                  matchingPolicy?.benefits.find((b) => b.type === 'medical_expense') ||
                  matchingPolicy?.benefits[0];

                if (!matchingBenefit) return null;

                const used = matchingBenefit.usedAmount;
                const max = matchingBenefit.maxLimit;
                const rem = matchingBenefit.remainingLimit;
                const pct = max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0;
                const isOverLimit = claim.claimedAmount > rem;

                return (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 mb-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-aia-red" />
                        <span>Đối chiếu: {matchingBenefit.name}</span>
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-800">
                        Hạn mức năm: {matchingBenefit.unit === 'days' ? `${max} ngày` : formatCurrencyVND(max)}
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          pct > 80 ? 'bg-rose-500' : pct > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Đã bồi thường: {matchingBenefit.unit === 'days' ? `${used} ngày` : formatCurrencyVND(used)}</span>
                      <span className="font-bold text-emerald-700">
                        Còn lại: {matchingBenefit.unit === 'days' ? `${rem} ngày` : formatCurrencyVND(rem)}
                      </span>
                    </div>

                    {isOverLimit && (
                      <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-[11px] flex items-center gap-1.5 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Số tiền yêu cầu vượt quá hạn mức quyền lợi còn lại ({formatCurrencyVND(rem)})!</span>
                      </div>
                    )}
                  </div>
                );
              })()}

               {/* Bank Account */}
              {/* Deduction Reason if any */}
              {claim.deductedAmount && claim.deductedAmount > 0 && (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 mb-3">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Giảm trừ: {formatCurrencyVND(claim.deductedAmount)}</span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">{claim.deductionReason}</p>
                </div>
              )}

              {/* Bank Account */}
              {claim.bankAccount && (
                <div className="pt-2 border-t border-slate-200/60 text-xs flex items-center justify-between text-slate-600">
                  <span>Tài khoản nhận tiền:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {claim.bankAccount.bankName} - {claim.bankAccount.accountNumber} ({claim.bankAccount.accountHolder})
                  </span>
                </div>
              )}
            </div>

            {/* Box 4: Document Verification Checklist */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-aia-red" />
                  <span>Danh mục chứng từ y tế ({claim.documents.length})</span>
                </h3>
                <span className="text-[11px] text-slate-500">
                  Đã duyệt {claim.documents.filter((d) => d.status === 'verified').length}/{claim.documents.length}
                </span>
              </div>

              <div className="space-y-2">
                {claim.documents.map((doc) => {
                  const isVerified = doc.status === 'verified';
                  const isMissing = doc.status === 'missing';
                  const isInvalid = doc.status === 'invalid';

                  return (
                    <div
                      key={doc.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                          {doc.required && (
                            <span className="text-[9px] bg-rose-50 text-aia-red border border-rose-200 px-1.5 py-0.2 rounded font-semibold">
                              Bắt buộc
                            </span>
                          )}
                          {isInvalid && (
                            <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                              Cần bổ sung
                            </span>
                          )}
                        </div>
                        {doc.note && (
                          <p className="text-[11px] text-amber-700 font-medium mt-0.5">{doc.note}</p>
                        )}
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {doc.fileSize && <span>Dung lượng: {doc.fileSize} • </span>}
                          <span>Cập nhật: {doc.updatedAt || formatDate(claim.intakeDate)}</span>
                        </div>
                      </div>

                      {/* Document Status Selector */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateDocStatus(
                              claim.id,
                              doc.id,
                              isVerified ? 'received' : 'verified'
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            isVerified
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isVerified ? 'Hợp lệ' : 'Duyệt'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateDocStatus(
                              claim.id,
                              doc.id,
                              isMissing ? 'received' : 'missing',
                              isMissing ? '' : 'Khách hàng chưa nộp bản gốc'
                            )
                          }
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                            isMissing
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-700'
                          }`}
                        >
                          {isMissing ? 'Thiếu' : 'Báo thiếu'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Box 5: Timeline & Activity History */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-aia-red" />
                <span>Nhật ký tiến độ hồ sơ ({claim.timeline.length})</span>
              </h3>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {claim.timeline.map((event) => (
                  <div key={event.id} className="relative group">
                    <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-aia-red ring-4 ring-rose-50" />
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{event.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{event.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{event.description}</p>
                      <div className="text-[10px] text-slate-400 mt-1 italic">
                        Bởi: {event.actor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNoteSubmit} className="mt-4 pt-3 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-700 mb-2">Thêm ghi chú xử lý mới:</div>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Tiêu đề (VD: Đã liên hệ khách hàng, Gửi email AIA...)"
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg mb-2 focus:outline-none focus:ring-1 focus:ring-aia-red"
                />
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Nội dung ghi chú chi tiết..."
                    className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-aia-red"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-aia-red hover:bg-aia-red-dark text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Lưu</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Quick Delete */}
            <button
              type="button"
              onClick={() => {
                if (confirm(`Xác nhận xóa hồ sơ ${claim.id} của khách hàng ${claim.customerName}?`)) {
                  onDeleteClaim(claim.id);
                }
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa hồ sơ</span>
            </button>

            {/* Quick Status Transition Form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {(selectedStatus === 'approved' || selectedStatus === 'paid') && (
                <div className="flex items-center gap-1 bg-white border border-emerald-300 rounded-xl px-2.5 py-1">
                  <span className="text-[11px] font-semibold text-emerald-700 whitespace-nowrap">Tiền duyệt:</span>
                  <input
                    type="number"
                    value={approvedAmountInput}
                    onChange={(e) => setApprovedAmountInput(Number(e.target.value) || 0)}
                    className="w-28 text-xs font-bold font-mono text-emerald-800 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              )}

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ClaimStatus)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red"
              >
                <option value="intake">1. Tiếp nhận hồ sơ</option>
                <option value="pending_docs">2. Cần bổ sung chứng từ</option>
                <option value="underwriting">3. AIA Thẩm định</option>
                <option value="approved">4. Đã duyệt chi trả</option>
                <option value="paid">5. Đã chuyển khoản</option>
                <option value="rejected">6. Từ chối chi trả</option>
              </select>
              <button
                type="button"
                onClick={handleStatusApply}
                disabled={selectedStatus === claim.status}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs ${
                  selectedStatus === claim.status
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-aia-red hover:bg-aia-red-dark text-white active:scale-95'
                }`}
              >
                Cập nhật trạng thái
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
