import React, { useState } from 'react';
import {
  X,
  UserPlus,
  CreditCard,
  Phone,
  MapPin,
  Sparkles,
  Layers,
  PlusCircle,
  Trash2,
  RotateCcw,
  FileText,
} from 'lucide-react';
import {
  Customer,
  Policy,
  BillingFrequency,
  AIA_RIDER_PRESETS,
  ConfiguredRiderItem,
  convertRidersToBenefits,
} from '../types/crm';
import { ClaimType } from '../types/claim';
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

const CLAIM_TYPE_OPTIONS: { type: ClaimType; label: string }[] = [
  { type: 'medical_expense', label: 'Chi phí y tế / Thẻ CSSK' },
  { type: 'inpatient', label: 'Điều trị nội trú' },
  { type: 'outpatient', label: 'Điều trị ngoại trú' },
  { type: 'critical_illness', label: 'Bệnh hiểm nghèo' },
  { type: 'accident_injury', label: 'Tai nạn & Thương tật' },
  { type: 'hospital_cash', label: 'Trợ cấp nằm viện' },
  { type: 'dental', label: 'Nha khoa' },
  { type: 'maternity', label: 'Thai sản' },
  { type: 'total_permanent_disability', label: 'Tàn tật toàn bộ & vĩnh viễn' },
  { type: 'death', label: 'Tử vong' },
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
  const [isCustomProduct, setIsCustomProduct] = useState(false);
  const [customProductName, setCustomProductName] = useState('');
  const [mainCoverageStr, setMainCoverageStr] = useState(() => formatNumberInput(1000000000)); // 1 tỷ
  const [premiumStr, setPremiumStr] = useState(() => formatNumberInput(25000000)); // 25 triệu
  const [billingFrequency, setBillingFrequency] = useState<BillingFrequency>('annual');

  // Riders state: initialized with AIA_RIDER_PRESETS
  const [riders, setRiders] = useState<ConfiguredRiderItem[]>(() =>
    AIA_RIDER_PRESETS.map((p) => ({
      id: p.id,
      presetId: p.id,
      name: p.name,
      claimType: p.claimType,
      limit: p.defaultLimit,
      unit: p.unit,
      enabled: p.defaultEnabled,
      isCustom: false,
    }))
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeRidersCount = riders.filter((r) => r.enabled && r.limit > 0).length;
  const parsedPremium = parseNumberInput(premiumStr);
  const parsedMainCoverage = parseNumberInput(mainCoverageStr);

  if (!isOpen) return null;

  const handleToggleRider = (id: string) => {
    setRiders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleUpdateRiderLimit = (id: string, limit: number) => {
    handleUpdateRiderField(id, { limit: Math.max(0, limit) });
  };

  const handleAddCustomRider = () => {
    const newId = `custom-rider-${Date.now()}`;
    setRiders((prev) => [
      ...prev,
      {
        id: newId,
        name: '',
        claimType: 'medical_expense',
        limit: 50000000,
        unit: 'VND',
        enabled: true,
        isCustom: true,
      },
    ]);
  };

  const handleRemoveRider = (id: string) => {
    setRiders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateRiderField = (id: string, fields: Partial<ConfiguredRiderItem>) => {
    setRiders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...fields } : r))
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập họ tên khách hàng';
    if (!phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    if (!cccd.trim()) errs.cccd = 'Vui lòng nhập số CCCD';
    if (!address.trim()) errs.address = 'Vui lòng nhập địa chỉ liên hệ';

    if (createPolicyNow) {
      if (!policyId.trim()) errs.policyId = 'Vui lòng nhập số hợp đồng';
      if (!premiumStr || parsedPremium <= 0) errs.premium = 'Phí bảo hiểm phải lớn hơn 0';
      if (isCustomProduct && !customProductName.trim()) {
        errs.productName = 'Vui lòng nhập tên sản phẩm chính';
      }
      const invalidCustom = riders.find((r) => r.isCustom && r.enabled && !r.name.trim());
      if (invalidCustom) {
        errs.riders = 'Vui lòng nhập tên cho các gói sản phẩm bổ trợ đã thêm';
      }
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
      const effectiveProductName = isCustomProduct
        ? customProductName.trim() || 'AIA - Hợp đồng Bảo vệ'
        : productName;

      const compiledBenefits = convertRidersToBenefits(riders);

      policyData = {
        id: policyId.trim(),
        customerId: '', // Sẽ được gán trong hook
        customerName: name.trim(),
        productName: effectiveProductName,
        mainCoverageAmount: parsedMainCoverage || 1000000000,
        issueDate: todayStr,
        status: 'in_force',
        billingFrequency,
        premiumAmount: parsedPremium || 25000000,
        nextDueDate: nextDue,
        benefits: compiledBenefits.length > 0 ? compiledBenefits : [
          {
            type: 'medical_expense',
            name: 'Thẻ Chăm sóc Sức khỏe Toàn cầu (Nội trú)',
            maxLimit: 250000000,
            usedAmount: 0,
            remainingLimit: 250000000,
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
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
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
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
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

              <div className="sm:col-span-2">
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
                  className="rounded border-slate-300 text-aia-red focus:ring-aia-red cursor-pointer"
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      Sản phẩm AIA (Sản phẩm chính) <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomProduct(!isCustomProduct);
                        if (!isCustomProduct && !customProductName) {
                          setCustomProductName(productName);
                        }
                      }}
                      className="text-[11px] font-semibold text-aia-red hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isCustomProduct ? (
                        <>
                          <RotateCcw className="w-3 h-3" />
                          <span>Chọn từ danh mục</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-3 h-3" />
                          <span>+ Nhập tên khác</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isCustomProduct ? (
                    <div>
                      <input
                        type="text"
                        value={customProductName}
                        onChange={(e) => setCustomProductName(e.target.value)}
                        placeholder="Nhập tên sản phẩm chính (vd: AIA - Bước Đột Phá...)"
                        className={`w-full p-2.5 rounded-xl border ${
                          errors.productName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        } bg-white font-semibold text-slate-900 focus:outline-aia-red`}
                      />
                      {errors.productName && <p className="text-rose-500 text-[11px] mt-1">{errors.productName}</p>}
                    </div>
                  ) : (
                    <select
                      value={productName}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomProduct(true);
                          setCustomProductName('');
                        } else {
                          setProductName(e.target.value);
                        }
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                    >
                      {AIA_PRODUCTS.map((prod) => (
                        <option key={prod} value={prod}>
                          {prod}
                        </option>
                      ))}
                      <option value="__custom__">+ Nhập tên sản phẩm chính khác...</option>
                    </select>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">
                      Phí bảo hiểm định kỳ (VND) <span className="text-rose-500">*</span>
                    </label>
                    {parsedPremium > 0 && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {formatWordsVND(parsedPremium)}
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
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                  >
                    <option value="annual">Đóng theo Năm</option>
                    <option value="semi_annual">Đóng Nửa năm</option>
                    <option value="quarterly">Đóng Quý</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">Mệnh giá bảo vệ chính (STBH)</label>
                    {parsedMainCoverage > 0 && (
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {formatWordsVND(parsedMainCoverage)}
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
                      className="w-full p-2.5 pr-8 rounded-xl border border-slate-200 bg-white font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 select-none">
                      đ
                    </span>
                  </div>
                </div>

                {/* 3. Danh mục Gói sản phẩm & Quyền lợi bổ trợ (Riders) */}
                <div className="sm:col-span-2 mt-2 pt-3 border-t border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-aia-red" />
                          <span>Danh mục Gói Quyền Lợi & Sản Phẩm Bổ Trợ (Riders)</span>
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-aia-red border border-rose-200">
                          {activeRidersCount} gói được chọn
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Tích chọn quyền lợi đính kèm theo hợp đồng hoặc thêm sản phẩm tùy chỉnh linh hoạt
                      </p>
                    </div>
                  </div>

                  {errors.riders && (
                    <p className="text-rose-500 text-[11px] bg-rose-50 p-2 rounded-lg border border-rose-200">
                      {errors.riders}
                    </p>
                  )}

                  {/* Danh sách Gói bổ trợ chuẩn AIA */}
                  <div className="space-y-2.5">
                    {riders.map((rider) => {
                      const preset = AIA_RIDER_PRESETS.find((p) => p.id === rider.presetId);
                      const isPreset = !rider.isCustom && preset;

                      if (isPreset) {
                        return (
                          <div
                            key={rider.id}
                            className={`p-3 rounded-xl border transition-all duration-150 ${
                              rider.enabled
                                ? 'bg-white border-rose-200 shadow-xs'
                                : 'bg-slate-50/60 border-slate-200/80 opacity-75'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <label className="flex items-start gap-2.5 cursor-pointer flex-1 select-none">
                                <input
                                  type="checkbox"
                                  checked={rider.enabled}
                                  onChange={() => handleToggleRider(rider.id)}
                                  className="mt-0.5 rounded border-slate-300 text-aia-red focus:ring-aia-red cursor-pointer"
                                />
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xs text-slate-900">{rider.name}</span>
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                      {preset.categoryBadge}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5">{preset.description}</p>
                                </div>
                              </label>

                              {rider.enabled && (
                                <div className="shrink-0 text-right">
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                    {formatWordsVND(rider.limit)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Cấu hình hạn mức khi bật gói */}
                            {rider.enabled && (
                              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px] text-slate-500 font-medium">Mức gợi ý:</span>
                                  {preset.limitPresets?.map((lp) => (
                                    <button
                                      key={lp}
                                      type="button"
                                      onClick={() => handleUpdateRiderLimit(rider.id, lp)}
                                      className={`text-[11px] px-2 py-0.5 rounded-lg border font-numeric transition-colors cursor-pointer ${
                                        rider.limit === lp
                                          ? 'bg-aia-red text-white border-aia-red font-bold'
                                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                                      }`}
                                    >
                                      {lp >= 1000000000
                                        ? `${lp / 1000000000} tỷ`
                                        : `${lp / 1000000} tr`}
                                    </button>
                                  ))}
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[11px] font-semibold text-slate-600">Hạn mức/năm:</span>
                                  <div className="relative w-36 sm:w-40">
                                    <input
                                      type="text"
                                      inputMode="numeric"
                                      value={formatNumberInput(rider.limit)}
                                      onChange={(e) =>
                                        handleUpdateRiderLimit(rider.id, parseNumberInput(e.target.value))
                                      }
                                      className="w-full py-1 px-2 pr-6 rounded-lg border border-slate-200 bg-white font-mono font-bold text-xs text-right text-slate-900 focus:outline-none focus:ring-1 focus:ring-aia-red"
                                    />
                                    <span className="absolute right-2 top-1 text-[11px] font-bold text-slate-400 select-none">
                                      đ
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }

                      // Custom Rider Card
                      return (
                        <div
                          key={rider.id}
                          className="p-3 rounded-xl border border-amber-200 bg-amber-50/20 shadow-xs space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              <span className="text-xs font-bold text-slate-800">Sản phẩm bổ trợ tùy biến</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                Custom
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveRider(rider.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Xóa sản phẩm này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                            <div className="sm:col-span-5">
                              <input
                                type="text"
                                value={rider.name}
                                onChange={(e) => handleUpdateRiderField(rider.id, { name: e.target.value })}
                                placeholder="Tên sản phẩm (VD: Bảo hiểm Nha khoa Toàn diện)"
                                className="w-full p-2 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-aia-red"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <select
                                value={rider.claimType}
                                onChange={(e) =>
                                  handleUpdateRiderField(rider.id, { claimType: e.target.value as ClaimType })
                                }
                                className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700"
                              >
                                {CLAIM_TYPE_OPTIONS.map((ct) => (
                                  <option key={ct.type} value={ct.type}>
                                    {ct.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="sm:col-span-4">
                              <div className="relative">
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={formatNumberInput(rider.limit)}
                                  onChange={(e) =>
                                    handleUpdateRiderLimit(rider.id, parseNumberInput(e.target.value))
                                  }
                                  placeholder="Hạn mức bảo hiểm"
                                  className="w-full p-2 pr-6 rounded-lg border border-slate-200 bg-white font-mono font-bold text-xs text-right text-slate-900 focus:outline-aia-red"
                                />
                                <span className="absolute right-2 top-2 text-[11px] font-bold text-slate-400 select-none">
                                  đ
                                </span>
                              </div>
                              {rider.limit > 0 && (
                                <p className="text-[10px] text-right text-emerald-700 font-semibold mt-0.5">
                                  {formatWordsVND(rider.limit)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Nút thêm sản phẩm bổ trợ khác */}
                  <button
                    type="button"
                    onClick={handleAddCustomRider}
                    className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-aia-red hover:bg-rose-50/30 text-slate-600 hover:text-aia-red text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-aia-red" />
                    <span>+ Thêm sản phẩm bổ trợ khác</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-aia-red hover:bg-aia-red-dark rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Hoàn tất thêm khách hàng
            </button>
          </div>
        </form>

        {/* Avatar Picker Modal */}
        <AvatarPickerModal
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          currentAvatarId={selectedAvatarId}
          onSelectAvatar={(newId) => setSelectedAvatarId(newId)}
        />
      </div>
    </div>
  );
};
