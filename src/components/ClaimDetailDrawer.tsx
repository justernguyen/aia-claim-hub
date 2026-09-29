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
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Eye,
  Image as ImageIcon,
  UploadCloud,
  MessageSquare,
  Copy,
  SendHorizontal,
  FileWarning,
} from 'lucide-react';
import { DocumentImageViewer } from './DocumentImageViewer';
import { DocumentItem } from '../types/claim';
import {
  generateMissingDocZaloMessage,
  generateClaimSubmittedZaloMessage,
} from '../utils/claimPresets';
import {
  ClaimItem,
  ClaimStatus,
  DocumentStatus,
  STATUS_CONFIG,
  CLAIM_TYPE_LABELS,
  isBenefitMatchingClaimType,
} from '../types/claim';
import { Policy } from '../types/crm';
import { formatCurrencyVND, formatDate, formatNumberInput, parseNumberInput, formatCCCD, formatPhone } from '../utils/formatters';
const QUICK_DOC_REASONS = [
  'Bản chụp bị mờ dấu mộc tròn bệnh viện',
  'Chưa xin bảng kê từ quầy thanh toán viện phí',
  'Thiếu chữ ký / họ tên của Bác sĩ điều trị',
  'Hóa đơn điện tử thiếu mã tra cứu hợp lệ',
  'Thiếu Giấy chứng nhận phẫu thuật',
];


interface ClaimDetailDrawerProps {
  claim: ClaimItem | null;
  policies?: Policy[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (claimId: string, status: ClaimStatus, approvedAmount?: number, note?: string) => void;
  onUpdateDocStatus: (claimId: string, docId: string, status: DocumentStatus, note?: string) => void;
  onAddNote: (claimId: string, title: string, content: string) => void;
  onDeleteClaim: (claimId: string) => void;
  onAttachDocImage?: (claimId: string, docId: string, fileUrl: string, fileName: string, fileSize: string) => void;
  onAddDocument?: (claimId: string, docName: string, fileUrl?: string, fileName?: string, fileSize?: string) => void;
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
  onAttachDocImage,
  onAddDocument,
}) => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [statusChangeNote, setStatusChangeNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ClaimStatus>('intake');
  const [approvedAmountInput, setApprovedAmountInput] = useState<number>(0);
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);
  const [newDocNameInput, setNewDocNameInput] = useState('');
  const [editingNoteDocId, setEditingNoteDocId] = useState<string | null>(null);
  const [customNoteInput, setCustomNoteInput] = useState('');
  const [zaloModalContent, setZaloModalContent] = useState<string | null>(null);
  const [copiedZalo, setCopiedZalo] = useState(false);
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
  const allRequiredDocsVerified =
    claim.documents.length > 0 &&
    claim.documents.filter((d) => d.required).every((d) => d.status === 'verified');


  return (
    <React.Fragment>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-5xl h-full sm:h-auto max-h-[96vh] sm:max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Brand Accent Line */}
          <div className="h-1 bg-gradient-to-r from-aia-red via-rose-600 to-rose-400 w-full shrink-0" />
          {/* Header */}
          <div className="px-4 py-4 sm:px-6 sm:py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="p-2 sm:p-2.5 bg-aia-red text-white font-bold rounded-xl text-xs shadow-xs shrink-0">
                AIA
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">{claim.id}</h2>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${statusCfg.badgeClass}`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: statusCfg.dotColor }}
                    />
                    <span>{statusCfg.label}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                  Tư vấn viên phụ trách: <strong>{claim.agentName}</strong> ({claim.agentCode})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
            {/* Top Info Grid: Customer/Policy & Hospital Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Box 1: Customer & Policy Information */}
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between">
                <div>
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
                      <span className="font-numeric text-slate-800">{formatPhone(claim.customerPhone)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Số CCCD:</span>
                      <span className="font-numeric text-slate-800">{formatCCCD(claim.customerCccd)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Số hợp đồng AIA:</span>
                      <span className="font-numeric font-bold text-aia-red">{claim.policyNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Sản phẩm bảo hiểm:</span>
                      <span className="font-semibold text-slate-900">{claim.productName}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2.5 mt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Loại quyền lợi yêu cầu:</span>
                  <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200 text-xs">
                    {CLAIM_TYPE_LABELS[claim.claimType]}
                  </span>
                </div>
              </div>

              {/* Box 2: Hospital & Clinical Details */}
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between">
                <div>
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
                  </div>
                </div>
                <div className="pt-2.5 mt-2.5 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-500 text-[11px] block mb-1">Chẩn đoán y khoa & Mã ICD-10:</span>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-medium">
                    {claim.diagnosis}
                    {claim.icd10Code && (
                      <span className="ml-2 font-numeric text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
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
                  <span className="text-base font-extrabold text-slate-900 font-numeric">
                    {formatCurrencyVND(claim.claimedAmount)}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 bg-emerald-50/30">
                  <span className="text-emerald-700 text-[11px] block font-medium">Số tiền AIA duyệt chi trả:</span>
                  <span className="text-base font-extrabold text-emerald-700 font-numeric">
                    {formatCurrencyVND(claim.approvedAmount)}
                  </span>
                </div>
              </div>
              {/* Benefit Utilization Comparison Section */}
              {(() => {
                const matchingPolicy = policies.find((p) => p.id === claim.policyNumber);
                const matchingBenefit = matchingPolicy?.benefits.find((b) => b.type === claim.claimType) ||
                  matchingPolicy?.benefits.find((b) => isBenefitMatchingClaimType(b.type, claim.claimType)) ||
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
                      <span className="font-numeric text-[11px] font-bold text-slate-800">
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

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-numeric">
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
                  <span className="font-numeric font-semibold text-slate-800">
                    {claim.bankAccount.bankName} - {claim.bankAccount.accountNumber} ({claim.bankAccount.accountHolder})
                  </span>
                </div>
              )}
            </div>

            {/* Box 4: Document Verification Checklist & Image Gallery */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-aia-red" />
                    <span>Kho ảnh & Chứng từ y tế ({claim.documents.length})</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Lưu trữ ảnh giấy tờ vĩnh viễn, không lo hết hạn hay trôi tin nhắn Zalo
                  </p>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Đã duyệt {claim.documents.filter((d) => d.status === 'verified').length}/{claim.documents.length}
                </span>
              </div>

              {/* Visual Photo Gallery Grid (if any document has image) */}
              {claim.documents.some((d) => d.fileUrl || d.previewUrl) && (
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-aia-red" />
                    <span>Album ảnh chứng từ (Bấm vào ảnh để soi toàn màn hình)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {claim.documents
                      .filter((d) => d.fileUrl || d.previewUrl)
                      .map((d) => (
                        <div
                          key={d.id}
                          onClick={() => setViewingDoc(d)}
                          className="group relative rounded-lg border border-slate-200 overflow-hidden bg-slate-100 cursor-pointer hover:border-aia-red transition-all shadow-2xs"
                        >
                          <img
                            src={d.fileUrl || d.previewUrl}
                            alt={d.name}
                            className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Eye className="w-5 h-5 drop-shadow-md" />
                          </div>
                          <div className="p-1.5 bg-white text-[10px] font-semibold text-slate-700 truncate" title={d.name}>
                            {d.name}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="space-y-2.5">
                {claim.documents.map((doc) => {
                  const isVerified = doc.status === 'verified';
                  const isMissing = doc.status === 'missing';
                  const isInvalid = doc.status === 'invalid';

                  return (
                    <div
                      key={doc.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col gap-2.5 shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                            {doc.required && (
                              <span className="text-[9px] bg-rose-50 text-aia-red border border-rose-200 px-1.5 py-0.2 rounded font-semibold whitespace-nowrap">
                                Bắt buộc
                              </span>
                            )}
                            {isVerified && (
                              <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5 whitespace-nowrap">
                                <Check className="w-2.5 h-2.5" />
                                <span>Hợp lệ</span>
                              </span>
                            )}
                            {isInvalid && (
                              <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5 whitespace-nowrap">
                                <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                                <span>Cần bổ sung</span>
                              </span>
                            )}
                            {isMissing && (
                              <span className="text-[9px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5 whitespace-nowrap">
                                <X className="w-2.5 h-2.5 text-rose-600" />
                                <span>Thiếu</span>
                              </span>
                            )}
                            {!isVerified && !isInvalid && !isMissing && (
                              <span className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.2 rounded font-semibold whitespace-nowrap">
                                Chờ duyệt
                              </span>
                            )}
                          </div>

                          {doc.note && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <p className={`text-[11px] font-medium ${isInvalid ? 'text-amber-700' : isMissing ? 'text-rose-600' : 'text-slate-500'}`}>
                                {doc.note}
                              </p>
                              {isInvalid && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNoteDocId(editingNoteDocId === doc.id ? null : doc.id);
                                    setCustomNoteInput(doc.note || '');
                                  }}
                                  className="text-[10px] text-amber-600 hover:text-amber-800 underline font-semibold cursor-pointer shrink-0"
                                >
                                  Sửa lý do
                                </button>
                              )}
                            </div>
                          )}

                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {doc.fileSize && <span>Dung lượng: {doc.fileSize} • </span>}
                            <span>Cập nhật: {doc.updatedAt || formatDate(claim.intakeDate)}</span>
                          </div>
                        </div>

                        {/* Document Actions: View, Upload Photo & 3-State Action Segment */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center flex-wrap">
                          {/* View Image Button if image exists */}
                          {(doc.fileUrl || doc.previewUrl) && (
                            <button
                              type="button"
                              onClick={() => setViewingDoc(doc)}
                              className="px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                              title="Phóng to soi số liệu chứng từ"
                            >
                              <Eye className="w-3 h-3 text-amber-300" />
                              <span>Soi ảnh</span>
                            </button>
                          )}

                          {/* Attach/Upload Image Button */}
                          <label className="cursor-pointer px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors">
                            <UploadCloud className="w-3.5 h-3.5 text-aia-red" />
                            <span>{doc.fileUrl ? 'Đổi ảnh' : 'Tải ảnh'}</span>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const base64 = ev.target?.result as string;
                                  const sizeKb = `${Math.round(file.size / 1024)} KB`;
                                  onAttachDocImage?.(claim.id, doc.id, base64, file.name, sizeKb);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </label>

                          {/* 3-State Status Segment */}
                          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingNoteDocId(null);
                                onUpdateDocStatus(
                                  claim.id,
                                  doc.id,
                                  isVerified ? 'received' : 'verified',
                                  ''
                                );
                              }}
                              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                isVerified
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/80'
                              }`}
                              title="Xác nhận chứng từ đầy đủ và hợp lệ"
                            >
                              <Check className="w-3 h-3" />
                              <span>Hợp lệ</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (editingNoteDocId === doc.id) {
                                  setEditingNoteDocId(null);
                                } else {
                                  setEditingNoteDocId(doc.id);
                                  const initialReason = doc.note || 'Bản chụp bị mờ dấu mộc tròn bệnh viện';
                                  setCustomNoteInput(initialReason);
                                  if (!isInvalid) {
                                    onUpdateDocStatus(claim.id, doc.id, 'invalid', initialReason);
                                  }
                                }
                              }}
                              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                isInvalid
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-amber-700 hover:bg-white/80'
                              }`}
                              title="Báo chứng từ bị mờ hoặc cần khách hàng chụp lại"
                            >
                              <AlertCircle className="w-3 h-3" />
                              <span>Bổ sung</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingNoteDocId(null);
                                onUpdateDocStatus(
                                  claim.id,
                                  doc.id,
                                  isMissing ? 'received' : 'missing',
                                  isMissing ? '' : 'Khách hàng chưa nộp bản gốc'
                                );
                              }}
                              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                isMissing
                                  ? 'bg-rose-500 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-rose-700 hover:bg-white/80'
                              }`}
                              title="Đánh dấu tài liệu còn thiếu"
                            >
                              <X className="w-3 h-3" />
                              <span>Thiếu</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Inline Reason Editor for Invalid/Needs Supplement */}
                      {editingNoteDocId === doc.id && (
                        <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between font-bold text-amber-900">
                            <span className="flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>Chọn hoặc nhập lý do yêu cầu bổ sung ({doc.name}):</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingNoteDocId(null)}
                              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Quick presets */}
                          <div className="flex flex-wrap gap-1.5">
                            {QUICK_DOC_REASONS.map((reason) => (
                              <button
                                key={reason}
                                type="button"
                                onClick={() => {
                                  setCustomNoteInput(reason);
                                  onUpdateDocStatus(claim.id, doc.id, 'invalid', reason);
                                  setEditingNoteDocId(null);
                                }}
                                className="px-2 py-1 bg-white hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-lg text-[10px] font-medium transition-colors text-left cursor-pointer"
                              >
                                {reason}
                              </button>
                            ))}
                          </div>

                          {/* Custom input */}
                          <div className="flex gap-1.5 pt-1">
                            <input
                              type="text"
                              value={customNoteInput}
                              onChange={(e) => setCustomNoteInput(e.target.value)}
                              placeholder="Nhập lý do khác..."
                              className="flex-1 bg-white border border-amber-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!customNoteInput.trim()) return;
                                onUpdateDocStatus(claim.id, doc.id, 'invalid', customNoteInput.trim());
                                setEditingNoteDocId(null);
                              }}
                              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                            >
                              Lưu lý do
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Add Custom Document Row */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={newDocNameInput}
                    onChange={(e) => setNewDocNameInput(e.target.value)}
                    placeholder="Thêm chứng từ khác (VD: Kết quả chụp X-Quang, Đơn thuốc...)"
                    className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-aia-red"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newDocNameInput.trim()) return;
                      onAddDocument?.(claim.id, newDocNameInput.trim());
                      setNewDocNameInput('');
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
                  >
                    + Thêm giấy tờ
                  </button>
                </div>
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

          {/* 1-Click Quick Actions Bar */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-rose-50/70 to-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <MessageSquare className="w-3.5 h-3.5 text-aia-red" />
              <span>Thao tác nhanh 1-Chạm:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  const missing = claim.documents?.filter(
                    (d) => d.status === 'missing' || d.status === 'invalid'
                  ).map((d) => d.name) || ['Giấy ra viện (Mộc đỏ)', 'Bảng kê chi tiết viện phí', 'Hóa đơn VAT'];
                  const msg = generateMissingDocZaloMessage({
                    customerName: claim.customerName,
                    claimId: claim.id,
                    policyNumber: claim.policyNumber,
                    hospitalName: claim.hospitalName,
                    missingDocs: missing.length > 0 ? missing : ['Giấy tờ viện phí liên quan'],
                  });
                  setZaloModalContent(msg);
                  setCopiedZalo(false);
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-rose-50 text-slate-700 hover:text-aia-red border border-slate-200 hover:border-rose-300 font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-all"
              >
                <FileWarning className="w-3.5 h-3.5 text-amber-500" />
                <span>Mẫu Zalo báo thiếu giấy tờ</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const msg = generateClaimSubmittedZaloMessage({
                    customerName: claim.customerName,
                    claimId: claim.id,
                    policyNumber: claim.policyNumber,
                    claimedAmount: formatCurrencyVND(claim.claimedAmount),
                  });
                  setZaloModalContent(msg);
                  setCopiedZalo(false);
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-all"
              >
                <SendHorizontal className="w-3.5 h-3.5 text-blue-500" />
                <span>Mẫu Zalo đã nộp iClaim</span>
              </button>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm(`Xác nhận xóa hồ sơ ${claim.id} của khách hàng ${claim.customerName}?`)) {
                  onDeleteClaim(claim.id);
                }
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa hồ sơ</span>
            </button>

            {/* Quick Status Transition Form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {(selectedStatus === 'approved' || selectedStatus === 'paid') && (
                <div className="flex items-center gap-1.5 bg-white border border-emerald-300 rounded-xl px-2.5 py-1">
                  <span className="text-[11px] font-semibold text-emerald-700 whitespace-nowrap">Tiền duyệt:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={approvedAmountInput > 0 ? formatNumberInput(approvedAmountInput) : ''}
                    onChange={(e) => setApprovedAmountInput(parseNumberInput(e.target.value))}
                    className="w-28 text-xs font-bold font-numeric text-emerald-800 focus:outline-none"
                    placeholder="0"
                  />
                  <span className="text-xs font-bold text-emerald-600 select-none">₫</span>
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
              {/* Smart Next Step Recommendation if all required docs are verified */}
              {allRequiredDocsVerified && (claim.status === 'intake' || claim.status === 'pending_docs') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStatus('underwriting');
                    onUpdateStatus(claim.id, 'underwriting');
                  }}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đủ hồ sơ → Chuyển AIA Thẩm định</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleStatusApply}
                disabled={selectedStatus === claim.status}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                  selectedStatus === claim.status
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-aia-red hover:bg-aia-red-dark text-white active:scale-95 cursor-pointer'
                }`}
                title={selectedStatus === claim.status ? 'Hồ sơ đang ở trạng thái này' : 'Bấm để lưu trạng thái mới'}
              >
                <span>{selectedStatus === claim.status ? 'Trạng thái hiện tại' : 'Cập nhật trạng thái'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Zalo Quick Message Modal */}
      {zaloModalContent && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div
            onClick={() => setZaloModalContent(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xs transition-opacity"
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500 text-white rounded-lg">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Mẫu Tin Nhắn Zalo Chăm Sóc Claim
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setZaloModalContent(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-500">
                  Tin nhắn đã được cá nhân hóa tự động theo hồ sơ của khách hàng <strong>{claim.customerName}</strong>. Bấm sao chép và dán vào Zalo/SMS:
                </p>
                <textarea
                  readOnly
                  rows={9}
                  value={zaloModalContent}
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-800 focus:outline-none"
                />
              </div>
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setZaloModalContent(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(zaloModalContent);
                    setCopiedZalo(true);
                    setTimeout(() => setCopiedZalo(false), 2000);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  {copiedZalo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedZalo ? 'Đã sao chép!' : 'Sao chép tin nhắn'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Full-Screen Document Image Lightbox Viewer */}
      <DocumentImageViewer
        document={viewingDoc}
        isOpen={Boolean(viewingDoc)}
        onClose={() => setViewingDoc(null)}
      />
    </React.Fragment>
  );
};
