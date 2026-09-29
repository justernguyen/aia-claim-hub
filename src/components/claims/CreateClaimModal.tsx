import React, { useState } from 'react';
import { ClaimItem, ClaimType, CLAIM_TYPE_LABELS } from '../../types/claim';
import { X, Plus, AlertCircle } from 'lucide-react';

interface CreateClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClaim: (newClaim: Omit<ClaimItem, 'id' | 'timeline' | 'updatedAt'>) => void;
  defaultCustomerName?: string;
}

export const CreateClaimModal: React.FC<CreateClaimModalProps> = ({
  isOpen,
  onClose,
  onAddClaim,
  defaultCustomerName = 'Nguyễn Thị Hạnh Dung',
}) => {
  const [policyNumber, setPolicyNumber] = useState('U9182390');
  const [productName, setProductName] = useState('Chăm Sóc Sức Khỏe Toàn Diện');
  const [customerName, setCustomerName] = useState(defaultCustomerName);
  const [insuredPersonName, setInsuredPersonName] = useState('');
  const [relationship, setRelationship] = useState<'Bản thân' | 'Con cái' | 'Vợ/Chồng' | 'Bố/Mẹ'>('Bản thân');
  const [customerPhone, setCustomerPhone] = useState('0903124567');
  const [customerCccd, setCustomerCccd] = useState('079198001234');
  const [claimType, setClaimType] = useState<ClaimType>('medical_expense');
  const [hospitalName, setHospitalName] = useState('');
  const [admissionDate, setAdmissionDate] = useState('2026-09-29');
  const [dischargeDate, setDischargeDate] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [claimedAmountStr, setClaimedAmountStr] = useState('');
  const [bankName, setBankName] = useState('Vietcombank');
  const [accountNumber, setAccountNumber] = useState('0071001234567');
  const [accountHolder, setAccountHolder] = useState(defaultCustomerName.toUpperCase());
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!policyNumber.trim()) newErrors.policyNumber = 'Vui lòng nhập số hợp đồng';
    if (!customerName.trim()) newErrors.customerName = 'Vui lòng nhập tên bên mua bảo hiểm';
    if (!hospitalName.trim()) newErrors.hospitalName = 'Vui lòng nhập tên bệnh viện / phòng khám';
    if (!diagnosis.trim()) newErrors.diagnosis = 'Vui lòng nhập chẩn đoán bệnh';
    
    const amount = Number(claimedAmountStr.replace(/\D/g, ''));
    if (!amount || amount <= 0) {
      newErrors.claimedAmount = 'Vui lòng nhập số tiền yêu cầu hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const amount = Number(claimedAmountStr.replace(/\D/g, ''));
    const finalInsuredName = insuredPersonName.trim() || customerName.trim();

    onAddClaim({
      policyNumber: policyNumber.trim(),
      productName: productName.trim(),
      customerName: customerName.trim(),
      insuredPersonName: finalInsuredName,
      relationship,
      customerPhone: customerPhone.trim(),
      customerCccd: customerCccd.trim(),
      claimType,
      status: 'underwriting',
      hospitalName: hospitalName.trim(),
      admissionDate,
      dischargeDate: dischargeDate || undefined,
      diagnosis: diagnosis.trim(),
      claimedAmount: amount,
      approvedAmount: 0,
      totalBillAmount: amount,
      deductedAmount: 0,
      intakeDate: '2026-09-29',
      slaDeadline: '2026-10-04',
      agentName: 'Nguyễn Thị Hạnh Dung',
      agentCode: 'AG-8899',
      insurer: 'AIA Việt Nam',
      bankAccount: {
        bankName,
        accountNumber,
        accountHolder,
      },
      documents: [
        {
          id: `doc-${Date.now()}`,
          name: 'Don_yeu_cau_boi_thuong.pdf',
          status: 'verified',
          required: true,
          updatedAt: '2026-09-29',
        },
      ],
      notes: notes.trim() || 'Hồ sơ tạo mới cần theo dõi chứng từ bổ sung.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Tạo Hồ Sơ Yêu Cầu Bồi Thường</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Nhập thông tin sự kiện bảo hiểm và số tiền yêu cầu thanh toán
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {/* Section 1: Hợp đồng & Khách hàng */}
            <div className="space-y-3">
              <div className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-1">
                1. Thông tin Hợp đồng & Người thụ hưởng
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Số Hợp Đồng <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    placeholder="VD: U9182390"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  {errors.policyNumber && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.policyNumber}</span>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tên Sản Phẩm Bảo Hiểm</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="VD: Chăm Sóc Sức Khỏe Toàn Diện"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Bên Mua Bảo Hiểm <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  {errors.customerName && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.customerName}</span>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Người Được Bảo Hiểm (NĐBH)
                  </label>
                  <input
                    type="text"
                    value={insuredPersonName}
                    onChange={(e) => setInsuredPersonName(e.target.value)}
                    placeholder="Để trống nếu chính là Bên mua"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Mối Quan Hệ Với Bên Mua</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as 'Bản thân' | 'Con cái' | 'Vợ/Chồng' | 'Bố/Mẹ')}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="Bản thân">Bản thân</option>
                    <option value="Con cái">Con cái</option>
                    <option value="Vợ/Chồng">Vợ/Chồng</option>
                    <option value="Bố/Mẹ">Bố/Mẹ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Số Điện Thoại</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Sự kiện y tế */}
            <div className="space-y-3">
              <div className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-1">
                2. Sự kiện Y Tế & Chẩn Đoán
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Loại Quyền Lợi <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value as ClaimType)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    {Object.entries(CLAIM_TYPE_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Cơ Sở Y Tế / Bệnh Viện <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="VD: Bệnh viện Tai Mũi Họng TP.HCM"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  {errors.hospitalName && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.hospitalName}</span>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Ngày Khám / Nhập Viện <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Ngày Xuất Viện (nếu có)</label>
                  <input
                    type="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Chẩn Đoán Y Khoa <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="VD: Viêm họng cấp tính, theo dõi viêm phế quản"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  {errors.diagnosis && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.diagnosis}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Tài chính */}
            <div className="space-y-3">
              <div className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-1">
                3. Chi Phí Yêu Cầu & Tài Khoản Nhận Tiền
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Số Tiền Yêu Cầu Bồi Thường (VNĐ) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={claimedAmountStr}
                    onChange={(e) => {
                      const num = e.target.value.replace(/\D/g, '');
                      setClaimedAmountStr(num ? new Intl.NumberFormat('vi-VN').format(Number(num)) : '');
                    }}
                    placeholder="VD: 952.445"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono text-sm font-semibold text-slate-900"
                  />
                  {errors.claimedAmount && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.claimedAmount}</span>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tên Ngân Hàng</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Số Tài Khoản</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Chủ Tài Khoản</label>
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 uppercase"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Ghi Chú Ban Đầu</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ghi chú hồ sơ hoặc lưu ý đối soát..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-rose-700 rounded-md hover:bg-rose-800 transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                <span>Tạo hồ sơ</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
