import React, { useState, useEffect } from 'react';
import { ClaimItem, ClaimStatus, STATUS_CONFIG, CLAIM_TYPE_LABELS } from '../../types/claim';
import { formatCurrencyVND, formatDate, getRemainingDays } from '../../utils/formatters';
import { generateCustomerMessage } from '../../utils/messageGenerator';
import {
  X,
  Copy,
  Check,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  Send,
  Trash2,
} from 'lucide-react';

interface SlideOverDrawerProps {
  claim: ClaimItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (claimId: string, status: ClaimStatus, note?: string) => void;
  onDeleteClaim: (claimId: string) => void;
}

type DrawerTab = 'overview' | 'financials' | 'documents' | 'message';

export const SlideOverDrawer: React.FC<SlideOverDrawerProps> = ({
  claim,
  isOpen,
  onClose,
  onUpdateStatus,
  onDeleteClaim,
}) => {
  const [activeTab, setActiveTab] = useState<DrawerTab>('overview');
  const [copied, setCopied] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const [showStatusNoteInput, setShowStatusNoteInput] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ClaimStatus | null>(null);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset tab when new claim opened
  useEffect(() => {
    if (claim) {
      setActiveTab('overview');
      setCopied(false);
      setShowStatusNoteInput(false);
      setPendingStatus(null);
    }
  }, [claim?.id]);

  if (!isOpen || !claim) return null;

  const statusMeta = STATUS_CONFIG[claim.status] || STATUS_CONFIG.intake;
  const benefitLabel = CLAIM_TYPE_LABELS[claim.claimType] || claim.claimType;
  const remainingDays = getRemainingDays(claim.slaDeadline);
  const customerMessage = generateCustomerMessage(claim);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(customerMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectStatus = (newStatus: ClaimStatus) => {
    if (newStatus === claim.status) return;
    setPendingStatus(newStatus);
    setShowStatusNoteInput(true);
  };

  const handleConfirmStatusChange = () => {
    if (pendingStatus) {
      onUpdateStatus(claim.id, pendingStatus, statusNote || undefined);
      setShowStatusNoteInput(false);
      setPendingStatus(null);
      setStatusNote('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-base font-bold text-slate-900">
                    {claim.id}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-xs text-slate-500 font-medium">
                    HĐ: {claim.policyNumber}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Sản phẩm: {claim.productName}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Đóng (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-medium">Trạng thái:</span>
                <select
                  value={claim.status}
                  onChange={(e) => handleSelectStatus(e.target.value as ClaimStatus)}
                  className="text-xs font-semibold py-1 px-2.5 rounded border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
                >
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status badge */}
              <div
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusMeta.badgeClass}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mr-1.5"
                  style={{ backgroundColor: statusMeta.dotColor }}
                />
                <span>{statusMeta.label}</span>
              </div>
            </div>

            {/* Note input if status is being changed */}
            {showStatusNoteInput && (
              <div className="mt-3 p-3 bg-amber-50 rounded-md border border-amber-200 text-xs">
                <div className="font-medium text-amber-900 mb-1">
                  Xác nhận chuyển trạng thái sang: <strong>{STATUS_CONFIG[pendingStatus!].label}</strong>
                </div>
                <input
                  type="text"
                  placeholder="Ghi chú nội bộ (tùy chọn)..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full text-xs p-1.5 bg-white border border-amber-300 rounded mb-2 focus:outline-none"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowStatusNoteInput(false);
                      setPendingStatus(null);
                    }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmStatusChange}
                    className="px-2.5 py-1 bg-amber-600 text-white rounded font-medium hover:bg-amber-700"
                  >
                    Lưu trạng thái
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-200 px-5 flex space-x-4 bg-white text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`py-2.5 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-rose-600 text-rose-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Tổng quan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('financials')}
              className={`py-2.5 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'financials'
                  ? 'border-rose-600 text-rose-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Tài chính & Chi trả
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`py-2.5 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'documents'
                  ? 'border-rose-600 text-rose-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Chứng từ ({claim.documents.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('message')}
              className={`py-2.5 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'message'
                  ? 'border-rose-600 text-rose-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Tin nhắn gửi khách
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 text-sm">
            {/* Tab 1: Tổng quan */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                {/* Thông tin khách hàng */}
                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                    Thông tin người thụ hưởng
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Bên mua bảo hiểm:</span>
                      <span className="font-semibold text-slate-900">{claim.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Người được bảo hiểm:</span>
                      <span className="font-semibold text-slate-900">
                        {claim.insuredPersonName || claim.customerName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Số điện thoại:</span>
                      <span className="font-mono text-slate-800">{claim.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Số CCCD / CMT:</span>
                      <span className="font-mono text-slate-800">{claim.customerCccd}</span>
                    </div>
                  </div>
                </div>

                {/* Sự kiện y tế & Quyền lợi */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Sự kiện & Quyền lợi yêu cầu
                  </div>

                  <div className="flex items-start space-x-3 text-xs">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">{claim.hospitalName}</div>
                      <div className="text-slate-500">Cơ sở khám chữa bệnh tiếp nhận</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-800">
                        Ngày khám / Nhập viện: {formatDate(claim.admissionDate)}
                        {claim.dischargeDate ? ` -> Ra viện: ${formatDate(claim.dischargeDate)}` : ''}
                      </div>
                      <div className="text-slate-500">Quyền lợi: {benefitLabel}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200 text-xs">
                    <div className="text-slate-400 mb-1">Chẩn đoán y khoa:</div>
                    <div className="font-medium text-slate-800">{claim.diagnosis}</div>
                  </div>
                </div>

                {/* Tiến độ SLA & Ghi chú */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Theo dõi thời hạn xử lý (SLA)
                  </div>
                  <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Hạn chót thẩm định hãng:</span>
                    </div>
                    <div className="font-semibold text-slate-900">
                      {formatDate(claim.slaDeadline)}
                      {remainingDays !== null && (
                        <span className={`ml-2 ${remainingDays <= 3 ? 'text-rose-600' : 'text-slate-500'}`}>
                          ({remainingDays > 0 ? `còn ${remainingDays} ngày` : 'đã quá hạn'})
                        </span>
                      )}
                    </div>
                  </div>

                  {claim.notes && (
                    <div className="p-3 bg-amber-50/50 rounded border border-amber-200/70 text-xs text-amber-900">
                      <div className="font-medium mb-0.5">Ghi chú nội bộ:</div>
                      <div>{claim.notes}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Tài chính & Đối soát */}
            {activeTab === 'financials' && (
              <div className="space-y-5">
                {/* Bảng đối soát số tiền */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 border-b border-slate-200">
                    Bảng đối soát dòng tiền
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-slate-500">Tổng viện phí (hóa đơn y tế):</span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        {formatCurrencyVND(claim.totalBillAmount || claim.claimedAmount)}
                      </span>
                    </div>
                    <div className="p-3 flex items-center justify-between bg-amber-50/30">
                      <span className="font-medium text-amber-900">Số tiền gửi yêu cầu bồi thường:</span>
                      <span className="font-bold text-amber-800 tabular-nums text-sm">
                        {formatCurrencyVND(claim.claimedAmount)}
                      </span>
                    </div>
                    <div className="p-3 flex items-center justify-between bg-emerald-50/30">
                      <span className="font-medium text-emerald-900">Số tiền được duyệt chi trả:</span>
                      <span className="font-bold text-emerald-700 tabular-nums text-sm">
                        {claim.approvedAmount > 0 ? formatCurrencyVND(claim.approvedAmount) : 'Chưa duyệt'}
                      </span>
                    </div>
                    {claim.deductedAmount !== undefined && claim.deductedAmount > 0 && (
                      <div className="p-3 flex items-center justify-between bg-rose-50/30">
                        <span className="font-medium text-rose-900">Số tiền bị giảm trừ / từ chối:</span>
                        <span className="font-bold text-rose-700 tabular-nums">
                          -{formatCurrencyVND(claim.deductedAmount)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lý do giảm trừ nếu có */}
                {claim.deductionReason && (
                  <div className="p-3.5 bg-rose-50 rounded-lg border border-rose-200 text-xs">
                    <div className="flex items-center text-rose-800 font-semibold mb-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 text-rose-600" />
                      Lý do giảm trừ / Không chi trả:
                    </div>
                    <p className="text-rose-900 leading-relaxed">{claim.deductionReason}</p>
                  </div>
                )}

                {/* Tài khoản ngân hàng nhận tiền */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 mb-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span>Tài khoản nhận tiền bồi thường</span>
                  </div>
                  {claim.bankAccount ? (
                    <div className="text-xs space-y-1">
                      <div>
                        <span className="text-slate-400">Ngân hàng: </span>
                        <span className="font-semibold text-slate-800">{claim.bankAccount.bankName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Số tài khoản: </span>
                        <span className="font-mono font-bold text-slate-900">{claim.bankAccount.accountNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Chủ tài khoản: </span>
                        <span className="uppercase text-slate-700">{claim.bankAccount.accountHolder}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">Chưa cập nhật tài khoản ngân hàng thụ hưởng.</div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Chứng từ & Nhật ký */}
            {activeTab === 'documents' && (
              <div className="space-y-5">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                    Hồ sơ chứng từ đính kèm
                  </div>
                  <div className="space-y-2">
                    {claim.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs hover:bg-slate-100/70 transition-colors"
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="font-medium text-slate-800 truncate" title={doc.name}>
                            {doc.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          {doc.status === 'verified' && (
                            <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 mr-0.5" /> Hợp lệ
                            </span>
                          )}
                          {doc.status === 'missing' && (
                            <span className="inline-flex items-center text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                              <AlertCircle className="w-3 h-3 mr-0.5" /> Cần bổ sung
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                    Lịch sử xử lý hồ sơ
                  </div>
                  <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 ml-1 text-xs">
                    {claim.timeline.map((event) => (
                      <div key={event.id} className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-400 border-2 border-white" />
                        <div className="font-semibold text-slate-800">{event.title}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">{event.description}</div>
                        <div className="text-slate-400 text-[10px] mt-0.5 font-mono">
                          {event.timestamp} • {event.actor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Tin nhắn gửi khách */}
            {activeTab === 'message' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Mẫu tin nhắn gửi Zalo / SMS
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center text-xs font-medium py-1 px-2.5 rounded bg-rose-700 text-white hover:bg-rose-800 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" /> Đã sao chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" /> Sao chép văn bản
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    readOnly
                    rows={12}
                    value={customerMessage}
                    className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed focus:outline-none"
                  />
                </div>

                <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
                  <Send className="w-3.5 h-3.5 text-slate-400" />
                  <span>Nội dung đã được chuẩn hóa theo quy tắc hành chính trang trọng.</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Bạn có chắc chắn muốn xóa hồ sơ ${claim.id}?`)) {
                  onDeleteClaim(claim.id);
                }
              }}
              className="inline-flex items-center text-xs font-medium text-rose-600 hover:text-rose-800 py-1.5 px-2.5 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              <span>Xóa hồ sơ</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-4 text-xs font-medium rounded border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
