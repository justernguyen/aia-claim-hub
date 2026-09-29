import React, { useState } from 'react';
import {
  X,
  UserPlus,
  CreditCard,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Customer, Policy, BillingFrequency } from '../types/crm';
import { formatNumberInput, parseNumberInput, formatWordsVND } from '../utils/formatters';
import { CustomerAvatar } from './CustomerAvatar';
import { AvatarPickerModal } from './AvatarPickerModal';
interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    customer: Omit<Customer, 'id' | 'createdAt'>,
    initialPolicy?: Policy
  ) => void;
}

const AIA_PRODUCTS = [
  'AIA - Khỏe Trọn Vẹn',
  'AIA - Trọn Vẹn Cân Bằng',
  'AIA - An Phúc Trọn Đời Ưu Việt',
  'AIA - Bùng Sức Sống 10+ Cùng AIA',
  'AIA - Khỏe Toàn Diện',
];

export const NewCustomerModal: React.FC<NewCustomerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // Customer fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cccd, setCccd] = useState('');
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nữ');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('cool-glasses');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  // Policy toggle & fields
  const [createPolicyNow, setCreatePolicyNow] = useState(true);
  const [policyId, setPolicyId] = useState(`AIA-${Math.floor(1000000 + Math.random() * 9000000)}`);
  const [productName, setProductName] = useState(AIA_PRODUCTS[0]);
  const [mainCoverageStr, setMainCoverageStr] = useState(formatNumberInput(1000000000)); // 1 tỷ -> "1.000.000.000"
  const [premiumStr, setPremiumStr] = useState(formatNumberInput(25000000)); // 25 triệu -> "25.000.000"
  const [billingFrequency, setBillingFrequency] = useState<BillingFrequency>('annual');
  const [healthCardQuotaStr, setHealthCardQuotaStr] = useState('250000000'); // 250 triệu

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập họ tên khách hàng';
    if (!phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    if (!cccd.trim()) errs.cccd = 'Vui lòng nhập số CCCD';
    if (!address.trim()) errs.address = 'Vui lòng nhập địa chỉ liên hệ';

    if (createPolicyNow) {
      if (!policyId.trim()) errs.policyId = 'Vui lòng nhập số hợp đồng';
      if (!premiumStr || parseNumberInput(premiumStr) <= 0) errs.premium = 'Phí bảo hiểm phải lớn hơn 0';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const customerData: Omit<Customer, 'id' | 'createdAt'> = {
      name: name.trim(),
      phone: phone.trim(),
      cccd: cccd.trim(),
      birthDate,
      gender,
      address: address.trim(),
      occupation: occupation.trim() || 'Khách hàng cá nhân',
      email: email.trim() || undefined,
      notes: notes.trim() || undefined,
      avatar: selectedAvatarId,
    };

    let policyData: Policy | undefined = undefined;
    if (createPolicyNow) {
      const todayStr = new Date().toISOString().split('T')[0];
      const nextDue = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const maxQuota = Number(healthCardQuotaStr) || 250000000;

      policyData = {
        id: policyId.trim(),
        customerId: '', // Sẽ được gán trong hook
        customerName: name.trim(),
        productName,
        mainCoverageAmount: parseNumberInput(mainCoverageStr) || 1000000000,
        issueDate: todayStr,
        status: 'in_force',
        billingFrequency,
        premiumAmount: parseNumberInput(premiumStr) || 25000000,
        nextDueDate: nextDue,
        benefits: [
          {
            type: 'medical_expense',
            name: 'Thẻ Chăm sóc Sức khỏe Toàn cầu (Nội trú)',
            maxLimit: maxQuota,
            usedAmount: 0,
            remainingLimit: maxQuota,
            unit: 'VND',
          },
          {
            type: 'hospital_cash',
            name: 'Trợ cấp Nằm viện Tiêu chuẩn',
            maxLimit: 30000000,
            usedAmount: 0,
            remainingLimit: 30000000,
            unit: 'VND',
          },
        ],
      };
    }

    onSubmit(customerData, policyData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aia-red flex items-center justify-center text-white font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Thêm Khách Hàng & Hợp Đồng Mới</h3>
              <p className="text-xs text-slate-400">Khởi tạo hồ sơ khách hàng và gói quyền lợi AIA</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Customer Personal Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-aia-red" />
              <span>1. Thông tin Cá nhân Khách hàng</span>
            </h4>

            {/* Avatar Selection Card */}
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <CustomerAvatar
                avatarId={selectedAvatarId}
                name={name || 'Khách hàng'}
                size="lg"
                editable
                showBadge
                onClick={() => setIsPickerOpen(true)}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">Avatar khách hàng</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-aia-red font-semibold border border-rose-200">
                    50 mẫu vui nhộn
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Chọn biểu cảm 3D, nghề nghiệp hoặc linh vật may mắn cho khách hàng.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="mt-1 text-xs font-bold text-aia-red hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Chọn mẫu avatar (~50 mẫu) &rarr;</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Họ và tên khách hàng <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className={`w-full p-2.5 rounded-xl border ${
                    errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                  } focus:outline-aia-red`}
                />
                {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                      errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-aia-red font-mono`}
                  />
                </div>
                {errors.phone && <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Số CCCD / Định danh <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={cccd}
                    onChange={(e) => setCccd(e.target.value)}
                    placeholder="079198002341"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                      errors.cccd ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-aia-red font-mono`}
                  />
                </div>
                {errors.cccd && <p className="text-rose-500 text-[11px] mt-1">{errors.cccd}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-aia-red font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Giới tính</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'Nam' | 'Nữ')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-aia-red bg-white text-xs"
                  >
                    <option value="Nữ">Nữ</option>
                    <option value="Nam">Nam</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Địa chỉ liên hệ <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ví dụ: Chung cư Vinhomes Central Park, Bình Thạnh, TP.HCM"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                      errors.address ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-aia-red`}
                  />
                </div>
                {errors.address && <p className="text-rose-500 text-[11px] mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nghề nghiệp</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Kỹ sư phần mềm / Doanh nhân..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-aia-red"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@gmail.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-aia-red"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ghi chú đặc điểm khách hàng</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Khách VIP, gia đình có 2 con nhỏ, quan tâm hưu trí..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-aia-red"
                />
              </div>
            </div>
          </div>

          {/* Initial Policy Setup */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>2. Khởi tạo Hợp đồng Bảo hiểm AIA</span>
              </h4>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={createPolicyNow}
                  onChange={(e) => setCreatePolicyNow(e.target.checked)}
                  className="rounded border-slate-300 text-aia-red focus:ring-aia-red"
                />
                <span>Tạo HĐ ngay</span>
              </label>
            </div>

            {createPolicyNow && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Số Hợp đồng (Policy No) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={policyId}
                    onChange={(e) => setPolicyId(e.target.value)}
                    placeholder="AIA-1108999"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono font-bold text-slate-800"
                  />
                  {errors.policyId && <p className="text-rose-500 text-[11px] mt-1">{errors.policyId}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sản phẩm AIA</label>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                  >
                    {AIA_PRODUCTS.map((prod) => (
                      <option key={prod} value={prod}>
                        {prod}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      Phí bảo hiểm định kỳ (VND) <span className="text-rose-500">*</span>
                    </label>
                    {parseNumberInput(premiumStr) > 0 && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {formatWordsVND(parseNumberInput(premiumStr))}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={premiumStr}
                      onChange={(e) => setPremiumStr(formatNumberInput(e.target.value))}
                      placeholder="VD: 25.000.000"
                      className="w-full p-2.5 pr-8 rounded-xl border border-slate-200 bg-white font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 select-none">
                      đ
                    </span>
                  </div>
                  {errors.premium && <p className="text-rose-500 text-[11px] mt-1">{errors.premium}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Định kỳ đóng phí</label>
                  <select
                    value={billingFrequency}
                    onChange={(e) => setBillingFrequency(e.target.value as BillingFrequency)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="annual">Đóng theo Năm</option>
                    <option value="semi_annual">Đóng Nửa năm</option>
                    <option value="quarterly">Đóng Quý</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hạn mức Thẻ Sức Khỏe/năm (VND)</label>
                  <select
                    value={healthCardQuotaStr}
                    onChange={(e) => setHealthCardQuotaStr(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
                  >
                    <option value="150000000">150.000.000đ (Gói Cơ bản)</option>
                    <option value="250000000">250.000.000đ (Gói Nâng cao)</option>
                    <option value="500000000">500.000.000đ (Gói VIP Vàng)</option>
                    <option value="1000000000">1.000.000.000đ (Gói Kim Cương Toàn Cầu)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">Mệnh giá bảo vệ chính (VND)</label>
                    {parseNumberInput(mainCoverageStr) > 0 && (
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {formatWordsVND(parseNumberInput(mainCoverageStr))}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={mainCoverageStr}
                      onChange={(e) => setMainCoverageStr(formatNumberInput(e.target.value))}
                      placeholder="VD: 1.000.000.000"
                      className="w-full p-2.5 pr-8 rounded-xl border border-slate-200 bg-white font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 select-none">
                      đ
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-aia-red hover:bg-aia-red-dark rounded-xl shadow-xs transition-colors"
            >
              Hoàn tất thêm khách hàng
            </button>
          </div>
        </form>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        currentAvatarId={selectedAvatarId}
        customer={name ? ({ id: 'NEW', name, gender } as Customer) : null}
        onSelectAvatar={(id) => setSelectedAvatarId(id)}
      />
    </div>
  );
};
