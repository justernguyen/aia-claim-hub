import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Shield,
  Save,
  Phone,
  CreditCard,
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  FileText,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  Customer,
  Policy,
  PolicyStatus,
  BillingFrequency,
  POLICY_STATUS_CONFIG,
  BILLING_FREQ_LABELS,
} from '../types/crm';
import { formatCurrencyVND, formatNumberInput, parseNumberInput } from '../utils/formatters';
import { CustomerAvatar } from './CustomerAvatar';

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  policies: Policy[];
  onSaveCustomer: (id: string, updates: Partial<Customer>) => void;
  onSavePolicy?: (id: string, updates: Partial<Policy>) => void;
}

export const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
  policies,
  onSaveCustomer,
  onSavePolicy,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'policy'>('profile');

  // Customer form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cccd, setCCCD] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState('');
  const [notes, setNotes] = useState('');

  // Primary Policy form state
  const customerPolicies = policies.filter((p) => p.customerId === customer?.id);
  const primaryPolicy = customerPolicies[0];

  const [policyStatus, setPolicyStatus] = useState<PolicyStatus>('in_force');
  const [premiumStr, setPremiumStr] = useState('');
  const [billingFreq, setBillingFreq] = useState<BillingFrequency>('annual');
  const [productName, setProductName] = useState('');
  const [healthMaxLimitStr, setHealthMaxLimitStr] = useState('');
  const [healthUsedAmountStr, setHealthUsedAmountStr] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or load customer & policy data whenever modal opens or customer changes
  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setPhone(customer.phone || '');
      setCCCD(customer.cccd || '');
      setBirthDate(customer.birthDate || '');
      setGender(customer.gender || 'Nam');
      setOccupation(customer.occupation || '');
      setAddress(customer.address || '');
      setEmail(customer.email || '');
      setSegment(customer.segment || 'Tiêu chuẩn');
      setNotes(customer.notes || '');
      setActiveTab('profile');
      setErrors({});

      if (primaryPolicy) {
        setPolicyStatus(primaryPolicy.status);
        setPremiumStr(formatNumberInput(primaryPolicy.premiumAmount));
        setBillingFreq(primaryPolicy.billingFrequency || 'annual');
        setProductName(primaryPolicy.productName || '');

        const medical = primaryPolicy.benefits.find(
          (b) => b.type === 'medical_expense'
        ) || primaryPolicy.benefits[0];

        if (medical) {
          setHealthMaxLimitStr(formatNumberInput(medical.maxLimit));
          setHealthUsedAmountStr(formatNumberInput(medical.usedAmount));
        } else {
          setHealthMaxLimitStr('');
          setHealthUsedAmountStr('');
        }
      }
    }
  }, [customer, primaryPolicy, isOpen]);

  if (!isOpen || !customer) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập họ và tên khách hàng';
    if (!phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      setActiveTab('profile');
      return;
    }

    // 1. Update customer profile
    onSaveCustomer(customer.id, {
      name: name.trim(),
      phone: phone.trim(),
      cccd: cccd.trim(),
      birthDate,
      gender,
      occupation: occupation.trim(),
      address: address.trim(),
      email: email.trim(),
      segment,
      notes: notes.trim(),
    });

    // 2. Update primary policy if present and onSavePolicy provided
    if (primaryPolicy && onSavePolicy) {
      const parsedPremium = parseNumberInput(premiumStr);
      const parsedMaxLimit = parseNumberInput(healthMaxLimitStr);
      const parsedUsedAmount = parseNumberInput(healthUsedAmountStr);

      const updatedBenefits = primaryPolicy.benefits.map((b) => {
        if (b.type === 'medical_expense' || b === primaryPolicy.benefits[0]) {
          const max = parsedMaxLimit > 0 ? parsedMaxLimit : b.maxLimit;
          const used = Math.max(0, parsedUsedAmount);
          return {
            ...b,
            maxLimit: max,
            usedAmount: used,
            remainingLimit: Math.max(0, max - used),
          };
        }
        return b;
      });

      onSavePolicy(primaryPolicy.id, {
        status: policyStatus,
        premiumAmount: parsedPremium > 0 ? parsedPremium : primaryPolicy.premiumAmount,
        billingFrequency: billingFreq,
        productName: productName.trim() || primaryPolicy.productName,
        benefits: updatedBenefits,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3 min-w-0">
            <CustomerAvatar
              avatarId={customer.avatar}
              name={customer.name}
              customerId={customer.id}
              size="md"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 truncate">
                  Chỉnh sửa thông tin khách hàng
                </h3>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 shrink-0">
                  {customer.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                Cập nhật lý lịch, liên hệ và thông tin hợp đồng bảo hiểm
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-white px-5 pt-2 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-aia-red text-aia-red'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Thông tin cá nhân</span>
          </button>

          {primaryPolicy && (
            <button
              type="button"
              onClick={() => setActiveTab('policy')}
              className={`pb-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'policy'
                  ? 'border-aia-red text-aia-red'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Hợp đồng & Quyền lợi ({primaryPolicy.id})</span>
            </button>
          )}
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Họ và tên <span className="text-aia-red">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                        errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      } focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Số điện thoại <span className="text-aia-red">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0901234567"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border ${
                        errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      } focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-numeric font-medium text-slate-900`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: CCCD & Ngày sinh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Số CCCD / Hộ chiếu
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={cccd}
                      onChange={(e) => setCCCD(e.target.value)}
                      placeholder="079198002341"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-numeric font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ngày sinh (YYYY-MM-DD)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-numeric font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Giới tính & Nghề nghiệp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Giới tính
                  </label>
                  <div className="flex gap-2">
                    {(['Nam', 'Nữ'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-2 text-sm font-semibold rounded-xl border transition-all ${
                          gender === g
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nghề nghiệp
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      placeholder="Bác sĩ, Doanh nhân, v.v."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Email & Phân khúc */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="khachhang@email.com"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phân khúc khách hàng
                  </label>
                  <select
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900 bg-white"
                  >
                    <option value="Tiêu chuẩn">Tiêu chuẩn</option>
                    <option value="Fansipan Club">Fansipan Club</option>
                    <option value="Everest Club">Everest Club</option>
                    <option value="VIP Gold">VIP Gold</option>
                    <option value="VIP Platinum">VIP Platinum</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Địa chỉ */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Địa chỉ thường trú / liên hệ
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Row 6: Ghi chú */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ghi chú lưu ý
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Thói quen liên hệ, sở thích, thông tin gia đình..."
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900 resize-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: POLICY SETTINGS */
            primaryPolicy && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-500">Mã hợp đồng:</span>
                    <span className="ml-2 font-mono font-bold text-slate-900 text-sm">
                      {primaryPolicy.id}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    Phát hành: <strong className="text-slate-800">{primaryPolicy.issueDate}</strong>
                  </span>
                </div>

                {/* Policy Product Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tên gói bảo hiểm chính
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900"
                  />
                </div>

                {/* Status & Billing frequency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Trạng thái hợp đồng
                    </label>
                    <select
                      value={policyStatus}
                      onChange={(e) => setPolicyStatus(e.target.value as PolicyStatus)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900 bg-white"
                    >
                      <option value="in_force">Đang hiệu lực</option>
                      <option value="pending_payment">Chờ nộp phí (Gia hạn)</option>
                      <option value="lapsed">Mất hiệu lực</option>
                      <option value="surrendered">Đã hủy / Đáo hạn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Định kỳ đóng phí
                    </label>
                    <select
                      value={billingFreq}
                      onChange={(e) => setBillingFreq(e.target.value as BillingFrequency)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-medium text-slate-900 bg-white"
                    >
                      <option value="annual">Đóng theo Năm (annual)</option>
                      <option value="semi_annual">Đóng Nửa năm (semi-annual)</option>
                      <option value="quarterly">Đóng Quý (quarterly)</option>
                    </select>
                  </div>
                </div>

                {/* Premium Amount */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phí bảo hiểm định kỳ (VND)
                  </label>
                  <input
                    type="text"
                    value={premiumStr}
                    onChange={(e) => setPremiumStr(formatNumberInput(parseNumberInput(e.target.value)))}
                    placeholder="25.000.000"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-numeric font-bold text-slate-900"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Số tiền: {formatCurrencyVND(parseNumberInput(premiumStr))}
                  </p>
                </div>

                {/* Health Card Quota section */}
                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Hạn mức Thẻ sức khỏe (CSSK & Y tế)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Hạn mức tối đa năm (VND)
                      </label>
                      <input
                        type="text"
                        value={healthMaxLimitStr}
                        onChange={(e) =>
                          setHealthMaxLimitStr(formatNumberInput(parseNumberInput(e.target.value)))
                        }
                        placeholder="250.000.000"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-numeric font-semibold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Số tiền đã bồi thường/dùng (VND)
                      </label>
                      <input
                        type="text"
                        value={healthUsedAmountStr}
                        onChange={(e) =>
                          setHealthUsedAmountStr(formatNumberInput(parseNumberInput(e.target.value)))
                        }
                        placeholder="0"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-aia-red/20 focus:border-aia-red font-numeric font-semibold text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-aia-red hover:bg-red-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
