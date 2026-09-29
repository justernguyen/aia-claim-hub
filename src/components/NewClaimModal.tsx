import React, { useState, useEffect } from 'react';
import {
  X,
  FilePlus,
  Building2,
  CreditCard,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Customer, Policy } from '../types/crm';
import {
  ClaimItem,
  ClaimType,
  CLAIM_TYPE_LABELS,
} from '../types/claim';
import { formatCurrencyVND, formatNumberInput, parseNumberInput, formatWordsVND } from '../utils/formatters';

interface NewClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newClaim: Partial<ClaimItem>) => void;
  customers?: Customer[];
  policies?: Policy[];
}

const AIA_PRODUCTS = [
  'AIA - Khỏe Trọn Vẹn',
  'AIA - Trọn Vẹn Cân Bằng',
  'AIA - Bùng Sức Sống 10+ Cùng AIA',
  'AIA - An Phúc Trọn Đời Ưu Việt',
  'AIA - Khỏe Toàn Diện',
];

export const NewClaimModal: React.FC<NewClaimModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  customers = [],
  policies = [],
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [insuredPersonName, setInsuredPersonName] = useState('');
  const [relationship, setRelationship] = useState<'Bản thân' | 'Con cái' | 'Vợ/Chồng' | 'Bố/Mẹ'>('Bản thân');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCccd, setCustomerCccd] = useState('');
  const [productName, setProductName] = useState(AIA_PRODUCTS[0]);
  const [claimType, setClaimType] = useState<ClaimType>('hospital_cash');
  const [hospitalName, setHospitalName] = useState('');
  const [admissionDate, setAdmissionDate] = useState('2026-09-28');
  const [dischargeDate, setDischargeDate] = useState('2026-09-29');
  const [diagnosis, setDiagnosis] = useState('');
  const [claimedAmountStr, setClaimedAmountStr] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachedPhotos, setAttachedPhotos] = useState<{ name: string; url: string; size: string }[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle customer selection change
  const handleCustomerSelect = (custId: string) => {
    setSelectedCustomerId(custId);
    if (!custId) return;

    const cust = customers.find((c) => c.id === custId);
    if (!cust) return;

    setCustomerName(cust.name);
    setInsuredPersonName(cust.name);
    setCustomerPhone(cust.phone);
    setCustomerCccd(cust.cccd);

    const custPolicy = policies.find((p) => p.customerId === cust.id);
    if (custPolicy) {
      setPolicyNumber(custPolicy.id);
      setProductName(custPolicy.productName);
    }
  };

  const selectedPolicy = policies.find((p) => p.id === policyNumber || p.customerId === selectedCustomerId);
  const matchingBenefit = selectedPolicy?.benefits.find((b) => b.type === claimType) || selectedPolicy?.benefits[0];

  if (!isOpen) return null;

  const parsedAmount = Number(claimedAmountStr.replace(/\D/g, '')) || 0;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!policyNumber.trim()) newErrors.policyNumber = 'Vui lòng nhập số hợp đồng AIA';
    if (!customerName.trim()) newErrors.customerName = 'Vui lòng nhập tên khách hàng';
    if (!hospitalName.trim()) newErrors.hospitalName = 'Vui lòng nhập bệnh viện/cơ sở y tế';
    if (!diagnosis.trim()) newErrors.diagnosis = 'Vui lòng nhập chẩn đoán sơ bộ';
    if (parsedAmount <= 0) newErrors.claimedAmount = 'Vui lòng nhập số tiền yêu cầu > 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      policyNumber: policyNumber.trim(),
      customerId: selectedCustomerId || undefined,
      customerName: customerName.trim(),
      insuredPersonName: insuredPersonName.trim() || customerName.trim(),
      relationship,
      customerPhone: customerPhone.trim(),
      customerCccd: customerCccd.trim(),
      productName,
      claimType,
      hospitalName: hospitalName.trim(),
      admissionDate,
      dischargeDate: dischargeDate || undefined,
      diagnosis: diagnosis.trim(),
      claimedAmount: parsedAmount,
      documents: attachedPhotos.length > 0
        ? attachedPhotos.map((p, idx) => ({
            id: `doc-${Date.now()}-${idx}`,
            name: p.name,
            status: 'received' as const,
            required: true,
            fileUrl: p.url,
            fileName: p.name,
            fileSize: p.size,
            updatedAt: new Date().toISOString().split('T')[0],
          }))
        : undefined,
      notes: notes.trim() || 'Hồ sơ mới tiếp nhận từ khách hàng.',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
          {/* Header */}
          <div className="px-6 py-4.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-aia-red text-white rounded-xl shadow-xs">
                <FilePlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Tiếp Nhận Hồ Sơ Quyền Lợi AIA Mới
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <img
                    src="/avatar-consultant.png"
                    alt="Dương Như Ý"
                    className="w-4 h-4 rounded-full object-cover border border-slate-200"
                  />
                  <p className="text-xs text-slate-500 font-medium">
                    Tư vấn viên: <strong className="text-slate-700">Dương Như Ý</strong> (AIA-VN-8869)
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Quick Customer Picker */}
            {customers.length > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <label className="block text-slate-700 font-bold text-xs mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-aia-red" />
                    <span>Chọn nhanh Khách hàng từ Danh bạ AIA</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Tự động điền HĐ & quyền lợi</span>
                </label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleCustomerSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-aia-red"
                >
                  <option value="">-- Chọn khách hàng đã có trong hệ thống --</option>
                  {customers.map((c) => {
                    const pol = policies.find((p) => p.customerId === c.id);
                    return (
                      <option key={c.id} value={c.id}>
                        {c.name} - {pol ? `${pol.id} (${pol.productName})` : c.phone}
                      </option>
                    );
                  })}
                </select>

                {selectedPolicy && matchingBenefit && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      Hạn mức {matchingBenefit.name}:
                    </span>
                    <span className="font-mono font-bold text-emerald-700">
                      Còn {matchingBenefit.unit === 'days' ? `${matchingBenefit.remainingLimit} ngày` : formatCurrencyVND(matchingBenefit.remainingLimit)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Section 1: Hợp đồng & Khách hàng */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-aia-red" />
                <span>1. Hợp đồng bảo hiểm AIA & Khách hàng</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Số Hợp Đồng AIA <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    placeholder="VD: AIA-1109988"
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 ${
                      errors.policyNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.policyNumber && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.policyNumber}</span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Sản Phẩm Bảo Hiểm AIA
                  </label>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 font-medium"
                  >
                    {AIA_PRODUCTS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Tên Bên Mua Bảo Hiểm <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="VD: Nguyễn Văn An"
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 ${
                      errors.customerName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.customerName && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.customerName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Người Được Bảo Hiểm (NĐBH)
                  </label>
                  <input
                    type="text"
                    value={insuredPersonName}
                    onChange={(e) => setInsuredPersonName(e.target.value)}
                    placeholder="Để trống nếu là Bên mua"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Quan Hệ Với Bên Mua
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value as 'Bản thân' | 'Con cái' | 'Vợ/Chồng' | 'Bố/Mẹ')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 font-medium"
                  >
                    <option value="Bản thân">Bản thân</option>
                    <option value="Con cái">Con cái</option>
                    <option value="Vợ/Chồng">Vợ/Chồng</option>
                    <option value="Bố/Mẹ">Bố/Mẹ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Số Điện Thoại Liên Hệ
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="VD: 0912 345 678"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Số CCCD / CMND
                  </label>
                  <input
                    type="text"
                    value={customerCccd}
                    onChange={(e) => setCustomerCccd(e.target.value)}
                    placeholder="VD: 079198002341"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Quyền lợi & Cơ sở y tế */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-aia-red" />
                <span>2. Chi tiết quyền lợi & Cơ sở y tế</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Loại Quyền Lợi Yêu Cầu
                  </label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value as ClaimType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 font-medium text-slate-800"
                  >
                    {Object.entries(CLAIM_TYPE_LABELS).map(([k, label]) => (
                      <option key={k} value={k}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Bệnh Viện / Phòng Khám <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="VD: Bệnh viện Vinmec, Chợ Rẫy..."
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 ${
                      errors.hospitalName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.hospitalName && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.hospitalName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Ngày Nhập Viện / Khám
                  </label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Ngày Ra Viện (nếu có)
                  </label>
                  <input
                    type="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 font-semibold mb-1">
                    Chẩn Đoán Y Khoa Sơ Bộ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="VD: Viêm dạ dày cấp tính, Sốt xuất huyết..."
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 ${
                      errors.diagnosis ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.diagnosis && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.diagnosis}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Tài chính */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-aia-red" />
                <span>3. Số tiền yêu cầu & Ghi chú</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-semibold">
                      Số tiền yêu cầu bồi thường (VND) <span className="text-rose-500">*</span>
                    </label>
                    {parsedAmount > 0 && (
                      <span className="text-[11px] font-bold text-aia-red bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        {formatWordsVND(parsedAmount)}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={claimedAmountStr}
                      onChange={(e) => setClaimedAmountStr(formatNumberInput(e.target.value))}
                      placeholder="VD: 15.000.000"
                      className={`w-full p-2.5 pr-8 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20 font-mono text-sm font-bold text-slate-900 ${
                        errors.claimedAmount ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 select-none">
                      đ
                    </span>
                  </div>
                  {parsedAmount > 0 && (
                    <div className="text-[11px] font-semibold text-slate-600 mt-1">
                      Bằng số: <strong className="text-slate-900 font-mono">{formatCurrencyVND(parsedAmount)}</strong>
                    </div>
                  )}
                  {errors.claimedAmount && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.claimedAmount}</span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Ghi Chú Ban Đầu
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ghi chú hồ sơ hoặc nhắc nhở..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red/20"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Đính kèm ảnh chứng từ ban đầu */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Tải lên ảnh giấy tờ y tế (Không sợ mất ảnh như Zalo)
                </label>
                <span className="text-[11px] text-slate-400">Tùy chọn • Tải nhiều ảnh</span>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-aia-red transition-colors bg-slate-50/50">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  id="claim-photos-input"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach((file) => {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const url = ev.target?.result as string;
                        const size = `${Math.round(file.size / 1024)} KB`;
                        setAttachedPhotos((prev) => [...prev, { name: file.name, url, size }]);
                      };
                      reader.readAsDataURL(file);
                    });
                  }}
                />
                <label htmlFor="claim-photos-input" className="cursor-pointer">
                  <div className="text-xs font-semibold text-aia-red hover:underline">
                    + Bấm để chọn ảnh từ máy hoặc chụp từ điện thoại
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Giấy ra viện, bảng kê viện phí, hóa đơn VAT điện tử, giấy phẫu thuật
                  </p>
                </label>

                {attachedPhotos.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                    {attachedPhotos.map((p, idx) => (
                      <div key={idx} className="relative rounded-lg border border-slate-200 bg-white p-1 text-[10px]">
                        <img src={p.url} alt={p.name} className="h-16 w-full object-cover rounded" />
                        <p className="truncate mt-1 font-medium text-slate-700">{p.name}</p>
                        <span className="text-slate-400">{p.size}</span>
                        <button
                          type="button"
                          onClick={() => setAttachedPhotos((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-aia-red hover:bg-aia-red-dark text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                Tiếp nhận hồ sơ ngay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
