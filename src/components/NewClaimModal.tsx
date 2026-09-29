import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Building2,
  User,
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  Info,
  Search,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  Lock,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Customer, Policy, BenefitQuota } from '../types/crm';
import { ClaimItem, ClaimType } from '../types/claim';
import {
  formatCurrencyVND,
  formatNumberInput,
  formatWordsVND,
} from '../utils/formatters';
import {
  AIA_11_BENEFITS,
  DOCUMENT_CATEGORIES_BY_BENEFIT,
  COMMON_ICD10_CODES,
  VIETNAM_PROVINCES,
  POPULAR_HOSPITALS,
  VIETNAM_BANKS,
  CLAIM_REASONS,
} from '../data/claimPortalData';
import { AiaMountainSymbol } from './AiaLogo';

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

interface UploadedDocItem {
  id: string;
  name: string;
  category: string;
  url: string;
  size: string;
  timestamp: number;
}

export const NewClaimModal: React.FC<NewClaimModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  customers = [],
  policies = [],
}) => {
  // Wizard navigation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [step1SubView, setStep1SubView] = useState<'benefits' | 'auth_otp'>('benefits');

  // Step 1: Authentication & Agreement
  const [agentCode, setAgentCode] = useState('000850386'); // Dương Thị Như Ý
  const [customerCccd, setCustomerCccd] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Step 1: Benefits & Documents
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [productName, setProductName] = useState(AIA_PRODUCTS[0]);
  const [claimType, setClaimType] = useState<ClaimType>('outpatient');
  const [activeTooltip, setActiveTooltip] = useState<ClaimType | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocItem[]>([]);
  const [isUploadingCategory, setIsUploadingCategory] = useState<string | null>(null);
  const [carouselIndexByCategory, setCarouselIndexByCategory] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetCategoryForUpload, setTargetCategoryForUpload] = useState<string>('invoice');

  // Step 2: Insured & Medical Treatment
  const [customerName, setCustomerName] = useState('');
  const [insuredPersonName, setInsuredPersonName] = useState('');
  const [relationship, setRelationship] = useState<'Bản thân' | 'Con cái' | 'Vợ/Chồng' | 'Bố/Mẹ'>('Bản thân');
  const [customerPhone, setCustomerPhone] = useState('');
  const [incidentDate, setIncidentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [claimedAmountStr, setClaimedAmountStr] = useState('601.873');
  const [hospitalCity, setHospitalCity] = useState('TP. Hồ Chí Minh');
  const [hospitalName, setHospitalName] = useState('Bệnh viện Đa khoa Quốc tế Vinmec Central Park');
  const [claimReason, setClaimReason] = useState(CLAIM_REASONS[0]);
  const [icd10Search, setIcd10Search] = useState('K29');
  const [selectedIcd10, setSelectedIcd10] = useState('K29 - Viêm dạ dày và tá tràng');
  const [diagnosis, setDiagnosis] = useState('Viêm dạ dày và tá tràng cấp tính, điều trị ngoại trú theo toa');

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'cash'>('bank_transfer');
  const [bankName, setBankName] = useState('Vietcombank');
  const [bankAccountNumber, setBankAccountNumber] = useState('0071001234567');
  const [bankAccountHolder, setBankAccountHolder] = useState('NGUYỄN THỊ MAI');

  // Step 4: Legal & Submit
  const [agreedCommitment, setAgreedCommitment] = useState(true);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});


  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-fill from CRM Customer selection
  const handleCustomerSelect = (custId: string) => {
    setSelectedCustomerId(custId);
    if (!custId) return;

    const cust = customers.find((c) => c.id === custId);
    if (!cust) return;

    setCustomerName(cust.name);
    setInsuredPersonName(cust.name);
    setCustomerPhone(cust.phone);
    setCustomerCccd(cust.cccd);
    setBankAccountHolder(cust.name.toUpperCase());

    const custPolicy = policies.find((p) => p.customerId === cust.id);
    if (custPolicy) {
      setPolicyNumber(custPolicy.id);
      setProductName(custPolicy.productName);
    }
  };

  // Quick fill sample scenarios according to 4 steps of AIA iClaim
  const handleFillSample = (preset: 'outpatient' | 'inpatient' | 'dental') => {
    const sampleCust = customers[0] || {
      id: 'cust-mai-anh',
      name: 'Nguyễn Thị Mai Anh',
      phone: '079198002341',
      cccd: '079198002341',
    };

    setSelectedCustomerId(sampleCust.id);
    setCustomerName(sampleCust.name);
    setInsuredPersonName(sampleCust.name);
    setCustomerPhone(sampleCust.phone);
    setCustomerCccd(sampleCust.cccd);
    setBankAccountHolder(sampleCust.name.toUpperCase());
    setPolicyNumber(policies[0]?.id || 'AIA-1108924');
    setProductName(policies[0]?.productName || AIA_PRODUCTS[0]);

    if (preset === 'outpatient') {
      setClaimType('outpatient');
      setHospitalCity('TP. Hồ Chí Minh');
      setHospitalName('Bệnh viện Đa khoa Quốc tế Vinmec Central Park');
      setClaimReason('Bệnh tật / Ốm đau');
      setIcd10Search('K29');
      setSelectedIcd10('K29 - Viêm dạ dày và tá tràng');
      setDiagnosis('Viêm dạ dày và tá tràng cấp tính, điều trị ngoại trú theo toa bác sĩ');
      setClaimedAmountStr('601.873');
      setPaymentMethod('bank_transfer');
      setBankName('Vietcombank');
      setBankAccountNumber('0071001234567');

      // Generate realistic sample medical document preview
      const sampleSvgInvoice = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%23FFFFFF"/><rect x="20" y="20" width="360" height="460" rx="8" fill="none" stroke="%23D31145" stroke-width="2"/><text x="40" y="60" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23D31145">HOÁ ĐƠN ĐIỆN TỬ - BV VINMEC</text><text x="40" y="90" font-family="sans-serif" font-size="11" fill="%23334155">Khách hàng: NGUYỄN THỊ MAI ANH</text><text x="40" y="115" font-family="sans-serif" font-size="11" fill="%23334155">Chẩn đoán: Viêm dạ dày tá tràng (K29)</text><line x1="40" y1="130" x2="360" y2="130" stroke="%23E2E8F0"/><text x="40" y="160" font-family="sans-serif" font-size="11" fill="%2364748B">1. Tiền khám chuyên khoa tiêu hoá: 450.000đ</text><text x="40" y="185" font-family="sans-serif" font-size="11" fill="%2364748B">2. Thuốc điều trị theo đơn: 151.873đ</text><text x="40" y="230" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23D31145">TỔNG CỘNG: 601.873 VND</text><circle cx="300" cy="380" r="45" fill="none" stroke="%23DC2626" stroke-width="2" stroke-dasharray="4"/><text x="270" y="385" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23DC2626">ĐÃ THU TIỀN</text></svg>`;
      const sampleSvgRx = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%23F8FAFC"/><rect x="20" y="20" width="360" height="460" rx="8" fill="none" stroke="%230284C7" stroke-width="2"/><text x="40" y="60" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230284C7">ĐƠN THUỐC ĐIỀU TRỊ NGOẠI TRÚ</text><text x="40" y="90" font-family="sans-serif" font-size="11" fill="%23334155">Bác sĩ kê đơn: BS.CKII Lê Hoàng</text><text x="40" y="115" font-family="sans-serif" font-size="11" fill="%23334155">Thuốc: Nexium 40mg + Phosphalugel</text><text x="40" y="145" font-family="sans-serif" font-size="11" fill="%23334155">Dặn dò: Uống trước bữa ăn 30 phút</text></svg>`;

      setUploadedDocs([
        {
          id: 'doc-sample-1',
          name: 'HoaDon_Vinmec_601k.png',
          category: 'invoice',
          url: sampleSvgInvoice,
          size: '142 KB',
          timestamp: Date.now(),
        },
        {
          id: 'doc-sample-2',
          name: 'ToaThuoc_K29_Nexium.png',
          category: 'prescription',
          url: sampleSvgRx,
          size: '118 KB',
          timestamp: Date.now(),
        },
      ]);
    } else if (preset === 'inpatient') {
      setClaimType('inpatient');
      setHospitalCity('TP. Hồ Chí Minh');
      setHospitalName('Bệnh viện FV (Pháp Việt)');
      setClaimReason('Phẫu thuật');
      setIcd10Search('K35');
      setSelectedIcd10('K35 - Viêm ruột thừa cấp');
      setDiagnosis('Phẫu thuật nội soi cắt ruột thừa viêm cấp, lưu viện 3 ngày');
      setClaimedAmountStr('14.500.000');
      setPaymentMethod('bank_transfer');
      setBankName('Techcombank');
      setBankAccountNumber('19036888999018');

      const sampleSvgDischarge = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" fill="%23FFFFFF"/><rect x="20" y="20" width="360" height="460" rx="8" fill="none" stroke="%23D31145" stroke-width="2"/><text x="40" y="60" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23D31145">GIẤY RA VIỆN - BV FV</text><text x="40" y="90" font-family="sans-serif" font-size="11" fill="%23334155">Bệnh nhân: NGUYỄN THỊ MAI ANH</text><text x="40" y="115" font-family="sans-serif" font-size="11" fill="%23334155">Chẩn đoán: Viêm ruột thừa cấp (K35)</text><text x="40" y="140" font-family="sans-serif" font-size="11" fill="%23334155">Phương pháp: Phẫu thuật nội soi</text><text x="40" y="165" font-family="sans-serif" font-size="11" fill="%23334155">Thời gian nằm viện: 3 ngày</text><circle cx="300" cy="380" r="45" fill="none" stroke="%23DC2626" stroke-width="2"/><text x="265" y="385" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23DC2626">MỘC TRÒN BV</text></svg>`;

      setUploadedDocs([
        {
          id: 'doc-sample-discharge',
          name: 'GiayRaVien_FV_K35.png',
          category: 'discharge_cert',
          url: sampleSvgDischarge,
          size: '210 KB',
          timestamp: Date.now(),
        },
      ]);
    } else {
      setClaimType('dental');
      setHospitalCity('TP. Hồ Chí Minh');
      setHospitalName('Bệnh viện Răng Hàm Mặt Trung Ương TP.HCM');
      setClaimReason('Bệnh lý răng miệng');
      setIcd10Search('K05');
      setSelectedIcd10('K05 - Viêm nướu và bệnh nha chu');
      setDiagnosis('Cạo vôi răng và điều trị viêm nướu nha chu 2 hàm');
      setClaimedAmountStr('1.850.000');
      setPaymentMethod('cash');
      setUploadedDocs([]);
    }
  };

  const selectedPolicy = policies.find((p) => p.id === policyNumber || p.customerId === selectedCustomerId);
  const matchingBenefit = selectedPolicy?.benefits.find((b: BenefitQuota) => b.type === claimType) || selectedPolicy?.benefits[0];
  const parsedAmount = Number(claimedAmountStr.replace(/\D/g, '')) || 0;

  // File upload trigger for a specific category
  const handleTriggerUpload = (categoryId: string) => {
    setTargetCategoryForUpload(categoryId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Handle file input change
  const handleFilesAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingCategory(targetCategoryForUpload);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        const size = `${Math.round(file.size / 1024)} KB`;
        const newDoc: UploadedDocItem = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: file.name,
          category: targetCategoryForUpload,
          url,
          size,
          timestamp: Date.now(),
        };

        // Simulate short portal loading delay
        setTimeout(() => {
          setUploadedDocs((prev) => [...prev, newDoc]);
          setIsUploadingCategory(null);
        }, 400);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove document
  const handleRemoveDoc = (docId: string, category: string) => {
    setUploadedDocs((prev) => prev.filter((d) => d.id !== docId));
    setCarouselIndexByCategory((prev) => ({
      ...prev,
      [category]: Math.max(0, (prev[category] || 0) - 1),
    }));
  };

  // Navigate carousel for a category
  const handleNextPhoto = (category: string, total: number) => {
    setCarouselIndexByCategory((prev) => ({
      ...prev,
      [category]: ((prev[category] || 0) + 1) % total,
    }));
  };

  const handlePrevPhoto = (category: string, total: number) => {
    setCarouselIndexByCategory((prev) => ({
      ...prev,
      [category]: ((prev[category] || 0) - 1 + total) % total,
    }));
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!claimType) newErrors.claimType = 'Vui lòng chọn 1 quyền lợi bảo hiểm';
      if (!agreedTerms) newErrors.agreedTerms = 'Vui lòng đồng ý với Điều Khoản Sử Dụng AIA';
    } else if (step === 2) {
      if (!customerName.trim()) newErrors.customerName = 'Vui lòng nhập tên khách hàng';
      if (!insuredPersonName.trim()) newErrors.insuredPersonName = 'Vui lòng nhập tên NĐBH';
      if (!incidentDate) newErrors.incidentDate = 'Vui lòng chọn ngày xảy ra sự kiện';
      if (parsedAmount <= 0) newErrors.claimedAmount = 'Vui lòng nhập số tiền yêu cầu thanh toán';
      if (!hospitalName.trim()) newErrors.hospitalName = 'Vui lòng nhập tên bệnh viện';
      if (!diagnosis.trim()) newErrors.diagnosis = 'Vui lòng nhập chẩn đoán theo Giấy ra viện';
    } else if (step === 3) {
      if (paymentMethod === 'bank_transfer') {
        if (!bankAccountNumber.trim()) newErrors.bankAccountNumber = 'Vui lòng nhập số tài khoản ngân hàng';
        if (!bankAccountHolder.trim()) newErrors.bankAccountHolder = 'Vui lòng nhập tên chủ tài khoản';
      }
    } else if (step === 4) {
      if (!agreedCommitment) newErrors.agreedCommitment = 'Vui lòng cam kết tính trung thực của hồ sơ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  // Final submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const formattedDocs = uploadedDocs.map((doc, idx) => ({
      id: doc.id || `doc-${Date.now()}-${idx}`,
      name: doc.name,
      category: doc.category,
      status: 'received' as const,
      required: true,
      fileUrl: doc.url,
      fileName: doc.name,
      fileSize: doc.size,
      updatedAt: new Date().toISOString().split('T')[0],
    }));

    onSubmit({
      policyNumber: policyNumber.trim() || 'AIA-1108924',
      customerId: selectedCustomerId || undefined,
      customerName: customerName.trim() || 'Khách hàng AIA',
      insuredPersonName: insuredPersonName.trim() || customerName.trim(),
      relationship,
      customerPhone: customerPhone.trim(),
      customerCccd: customerCccd.trim(),
      productName,
      claimType,
      hospitalName: hospitalName.trim(),
      hospitalCity,
      admissionDate: incidentDate,
      dischargeDate: incidentDate,
      claimReason,
      diagnosis: diagnosis.trim(),
      icd10Code: icd10Search || 'K29',
      claimedAmount: parsedAmount,
      totalBillAmount: parsedAmount,
      paymentMethod,
      bankAccount:
        paymentMethod === 'bank_transfer'
          ? {
              bankName,
              accountNumber: bankAccountNumber.trim(),
              accountHolder: bankAccountHolder.trim().toUpperCase(),
            }
          : undefined,
      documents: formattedDocs.length > 0 ? formattedDocs : undefined,
      notes: notes.trim() || 'Tiếp nhận hồ sơ trực tuyến qua cổng AIA iClaim.',
    });

    onClose();
  };

  if (!isOpen) return null;

  const currentCategories = DOCUMENT_CATEGORIES_BY_BENEFIT[claimType] || DOCUMENT_CATEGORIES_BY_BENEFIT.outpatient;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/png,image/jpeg,image/jpg,application/pdf"
        className="hidden"
        onChange={handleFilesAdded}
      />

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
          {/* Header - Styled like AIA Portal Mobile Header */}
          <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-aia-red flex items-center justify-center shadow-xs">
                <AiaMountainSymbol fill="#FFFFFF" className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold tracking-tight text-white uppercase">
                    Cổng Tiếp Nhận AIA iClaim
                  </h2>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-white/10 text-emerald-400 text-[10px] font-semibold rounded-full border border-emerald-500/30">
                    Online Portal
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span>Đại lý:</span>
                  <strong className="text-white font-semibold">Dương Thị Như Ý</strong>
                  <span className="font-mono text-slate-400">({agentCode})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick CRM Selection & Sample Fill Toolbar */}
          <div className="px-4 sm:px-6 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <User className="w-4 h-4 text-aia-red shrink-0" />
              <select
                value={selectedCustomerId}
                onChange={(e) => handleCustomerSelect(e.target.value)}
                className="w-full sm:w-auto flex-1 max-w-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-aia-red shadow-xs"
              >
                <option value="">-- Chọn nhanh Khách hàng từ Danh bạ AIA --</option>
                {customers.map((c) => {
                  const pol = policies.find((p) => p.customerId === c.id);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name} - {pol ? pol.id : c.phone} ({c.cccd})
                    </option>
                  );
                })}
              </select>

              {/* Quick Fill Samples Dropdown / Buttons */}
              <div className="flex items-center gap-1 bg-white border border-rose-200 rounded-lg px-2 py-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-aia-red shrink-0" />
                <span className="text-[11px] font-bold text-slate-700 hidden sm:inline">Mẫu:</span>
                <button
                  type="button"
                  onClick={() => handleFillSample('outpatient')}
                  className="px-1.5 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-aia-red text-[10px] font-semibold transition-colors"
                  title="Điền mẫu Ngoại trú: Viêm dạ dày BV Vinmec (601k) + Hóa đơn + Đơn thuốc"
                >
                  Ngoại trú
                </button>
                <button
                  type="button"
                  onClick={() => handleFillSample('inpatient')}
                  className="px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-semibold transition-colors"
                  title="Điền mẫu Nội trú: Phẫu thuật ruột thừa BV FV (14.5tr) + Giấy ra viện"
                >
                  Nội trú
                </button>
                <button
                  type="button"
                  onClick={() => handleFillSample('dental')}
                  className="px-1.5 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-semibold transition-colors"
                  title="Điền mẫu Nha khoa: Viêm nướu BV RHM (1.85tr)"
                >
                  Nha khoa
                </button>
              </div>
            </div>

            {selectedPolicy && matchingBenefit && (
              <div className="flex items-center gap-1.5 text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
                <span>Hạn mức {matchingBenefit.name}:</span>
                <strong className="font-bold text-emerald-700">
                  {matchingBenefit.unit === 'days'
                    ? `${matchingBenefit.remainingLimit} ngày`
                    : formatCurrencyVND(matchingBenefit.remainingLimit)}
                </strong>
              </div>
            )}
          </div>
          {/* Step Progress Bar - Styled Exactly like AIA iClaim Mobile App (1) - (2) - (3) - (4) */}
          <div className="px-4 sm:px-8 py-3 bg-white border-b border-slate-100 shrink-0">
            <div className="flex items-center justify-between max-w-lg mx-auto relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-slate-200 -z-0" />
              
              {[
                { num: 1, label: 'Quyền lợi & Hồ sơ' },
                { num: 2, label: 'Thông tin sự kiện' },
                { num: 3, label: 'Phương thức nhận tiền' },
                { num: 4, label: 'Xác nhận & Nộp' },
              ].map((s) => {
                const isCompleted = currentStep > s.num;
                const isActive = currentStep === s.num;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      if (currentStep > s.num) setCurrentStep(s.num as 1 | 2 | 3 | 4);
                    }}
                    className={`relative z-10 flex flex-col items-center group transition-all ${
                      currentStep > s.num ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                        isCompleted
                          ? 'bg-[#00A3E0] text-white border-2 border-[#00A3E0]'
                          : isActive
                          ? 'bg-aia-red text-white ring-4 ring-rose-100 border-2 border-aia-red'
                          : 'bg-white text-slate-400 border-2 border-slate-300'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-semibold mt-1 tracking-tight hidden sm:block ${
                        isActive ? 'text-aia-red font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {/* ========================================================================= */}
            {/* STEP 1: LỰA CHỌN QUYỀN LỢI & ĐÍNH KÈM CHỨNG TỪ (Ảnh 1, 2, 3, 5, 6) */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <div className="space-y-5">
                {/* Mode switcher tab: Portal Authentication / 11 Benefits */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {step1SubView === 'benefits' ? '1. Lựa Chọn Quyền Lợi & Tải Chứng Từ' : 'Xác Thực Đại Lý & Khách Hàng (AIA Portal)'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep1SubView((prev) => (prev === 'benefits' ? 'auth_otp' : 'benefits'))}
                    className="text-xs font-semibold text-aia-red hover:underline flex items-center gap-1"
                  >
                    {step1SubView === 'benefits' ? 'Xem màn hình xác thực portal' : 'Quay lại chọn quyền lợi'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* SubView: Portal Auth & Agreement (Ảnh 1 & 2) */}
                {step1SubView === 'auth_otp' && (
                  <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                      Đại lý được uỷ quyền nộp yêu cầu giải quyết quyền lợi bảo hiểm trực tuyến
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Mã số Đại lý</label>
                        <input
                          type="text"
                          value={agentCode}
                          onChange={(e) => setAgentCode(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-slate-800 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">
                          Số định danh cá nhân/Hộ chiếu/MST của Bên mua
                        </label>
                        <input
                          type="text"
                          value={customerCccd}
                          onChange={(e) => setCustomerCccd(e.target.value)}
                          placeholder="Nhập số định danh cá nhân/Hộ chiếu/MST"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Cloudflare simulation */}
                    <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-800">Thành công!</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        CLOUDFLARE Turnstile
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-0.5 rounded text-aia-red focus:ring-aia-red"
                      />
                      <span>
                        Tôi đã đọc và đồng ý với{' '}
                        <strong className="text-sky-600 underline">Điều Khoản Sử Dụng</strong> và{' '}
                        <strong className="text-sky-600 underline">Cam kết bảo mật</strong> của AIA Việt Nam.
                      </span>
                    </label>

                    {/* Red Warning Banner from Photo 1 & 2 */}
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                      <strong>Lưu ý:</strong> Không áp dụng Ủy quyền nhận tiền cho các loại yêu cầu Giải quyết quyền lợi bảo hiểm!
                    </div>

                    {/* OTP Simulation trigger */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowOtpModal(true)}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Mở bước xác thực OTP (Ảnh 4)
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep1SubView('benefits')}
                        className="px-4 py-1.5 bg-aia-red text-white text-xs font-bold rounded-lg hover:bg-aia-red-dark"
                      >
                        Tiếp tục chọn quyền lợi
                      </button>
                    </div>
                  </div>
                )}

                {/* SubView: 11 AIA Benefits Grid (Ảnh 3) */}
                {step1SubView === 'benefits' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                          LỰA CHỌN QUYỀN LỢI BỒI THƯỜNG (11 Quyền Lợi Chuẩn AIA)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Tích chọn quyền lợi yêu cầu để hiển thị chính xác danh mục giấy tờ cần nộp.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-aia-red bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {AIA_11_BENEFITS.length} quyền lợi
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {AIA_11_BENEFITS.map((b) => {
                        const isSelected = claimType === b.id;
                        const hasInPolicy = selectedPolicy?.benefits?.some(
                          (pb: BenefitQuota) => pb.type === b.id || (pb.type === 'medical_expense' && (b.id === 'inpatient' || b.id === 'outpatient'))
                        );
                        return (
                          <div
                            key={b.id}
                            onClick={() => setClaimType(b.id)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between relative group ${
                              isSelected
                                ? 'border-aia-red bg-rose-50/50 shadow-xs ring-1 ring-aia-red'
                                : hasInPolicy
                                ? 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-300'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border transition-all ${
                                  isSelected
                                    ? 'bg-aia-red border-aia-red text-white'
                                    : 'border-slate-300 bg-white group-hover:border-slate-400'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <p className={`text-xs font-bold ${isSelected ? 'text-aia-red' : 'text-slate-800'}`}>
                                    {b.title}
                                  </p>
                                  {hasInPolicy && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                      Có trong HĐ
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                  {b.description}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTooltip(activeTooltip === b.id ? null : b.id);
                              }}
                              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-full hover:bg-slate-100"
                              title="Xem hướng dẫn quyền lợi"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>

                            {/* Tooltip Popup */}
                            {activeTooltip === b.id && (
                              <div className="absolute z-30 left-2 right-2 top-full mt-1 p-2.5 bg-slate-900 text-white rounded-xl shadow-xl text-[11px] space-y-1">
                                <p className="font-semibold text-rose-300">{b.title}</p>
                                <p className="text-slate-200">{b.tooltip}</p>
                                <div className="pt-1 border-t border-slate-700 text-[10px] text-slate-400">
                                  Chứng từ gợi ý: {b.recommendedDocs.join(', ')}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SubView: Specialized Document Uploaders (Ảnh 5 & 6) */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-aia-red" />
                        <span>ĐÍNH KÈM HỒ SƠ Y TẾ</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Vui lòng tải các tệp có định dạng hình ảnh (png, jpg, jpeg) hoặc PDF.
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Đã tải: <strong>{uploadedDocs.length}</strong> tệp
                    </span>
                  </div>

                  {errors.documents && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{errors.documents}</span>
                    </div>
                  )}

                  {/* Document Category Upload Cards */}
                  <div className="space-y-2.5">
                    {currentCategories.map((cat) => {
                      const categoryDocs = uploadedDocs.filter((d) => d.category === cat.id);
                      const currentIdx = carouselIndexByCategory[cat.id] || 0;
                      const activeDoc = categoryDocs[currentIdx];
                      const isUploading = isUploadingCategory === cat.id;

                      return (
                        <div
                          key={cat.id}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800">
                                {cat.label}
                                {cat.required && <span className="text-rose-500 ml-0.5">*</span>}
                              </span>
                              {cat.tooltip && (
                                <span className="text-[10px] text-slate-400 hidden sm:inline" title={cat.tooltip}>
                                  ({cat.tooltip})
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleTriggerUpload(cat.id)}
                              className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 shadow-2xs hover:border-aia-red hover:text-aia-red transition-all flex items-center gap-1.5"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              TẢI HỒ SƠ
                            </button>
                          </div>

                          {/* Upload Spinner State from Photo 6 */}
                          {isUploading && (
                            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-center gap-2 text-xs text-slate-600">
                              <Loader2 className="w-4 h-4 animate-spin text-aia-red" />
                              <span>Hệ thống đang tải hồ sơ, Quý khách vui lòng chờ trong giây lát...</span>
                            </div>
                          )}

                          {/* Uploaded Photos Carousel & Thumbnail Display (Ảnh 6: IMG_8327.jpeg) */}
                          {categoryDocs.length > 0 && !isUploading && (
                            <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-mono text-slate-700 font-semibold flex items-center gap-1">
                                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                                  {activeDoc.name}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-slate-400">
                                    {currentIdx + 1} / {categoryDocs.length} ({activeDoc.size})
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveDoc(activeDoc.id, cat.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                    title="Xóa ảnh này"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Thumbnail preview with < > navigation */}
                              <div className="relative rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center h-32 sm:h-40 border border-slate-200">
                                <img
                                  src={activeDoc.url}
                                  alt={activeDoc.name}
                                  className="h-full w-auto object-contain max-w-full"
                                />

                                {categoryDocs.length > 1 && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handlePrevPhoto(cat.id, categoryDocs.length)}
                                      className="absolute left-2 p-1.5 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-md transition-colors"
                                    >
                                      <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleNextPhoto(cat.id, categoryDocs.length)}
                                      className="absolute right-2 p-1.5 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-md transition-colors"
                                    >
                                      <ChevronRight className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: NHẬP THÔNG TIN GIẢI QUYẾT QUYỀN LỢI (Ảnh 7, 8) */}
            {/* ========================================================================= */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    2. Nhập Thông Tin Giải Quyết Quyền Lợi Bảo Hiểm
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Điền đầy đủ thông tin người được bảo hiểm, sự kiện viện phí và mã chẩn đoán ICD-10.
                  </p>
                </div>

                {/* Section I: Thông tin Người được bảo hiểm (Ảnh 7) */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4 text-aia-red" />
                    <span>I. Thông tin Người được bảo hiểm</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Họ và tên <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={insuredPersonName}
                        onChange={(e) => setInsuredPersonName(e.target.value)}
                        placeholder="Vui lòng nhập họ và tên NĐBH"
                        className={`w-full px-3 py-2 bg-white border rounded-xl focus:outline-aia-red font-semibold text-slate-900 ${
                          errors.insuredPersonName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Quan hệ với Bên mua bảo hiểm
                      </label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value as 'Bản thân' | 'Con cái' | 'Vợ/Chồng' | 'Bố/Mẹ')}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-aia-red"
                      >
                        <option value="Bản thân">Bản thân</option>
                        <option value="Con cái">Con cái</option>
                        <option value="Vợ/Chồng">Vợ/Chồng</option>
                        <option value="Bố/Mẹ">Bố/Mẹ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Ngày xảy ra sự kiện bảo hiểm <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={incidentDate}
                        onChange={(e) => setIncidentDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-slate-800"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-slate-700 font-semibold">
                          Tổng số tiền yêu cầu thanh toán (đồng) <span className="text-rose-500">*</span>
                        </label>
                        {parsedAmount > 0 && (
                          <span className="text-[11px] font-bold text-aia-red bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
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
                          placeholder="VD: 601.873"
                          className="w-full px-3 py-2.5 pr-8 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-aia-red"
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 select-none">
                          đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section II: Thông tin về điều trị (Ảnh 7 & 8) */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-aia-red" />
                    <span>II. Thông tin về điều trị</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Tỉnh / Thành phố */}
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Tỉnh/Thành phố <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={hospitalCity}
                          onChange={(e) => {
                            setHospitalCity(e.target.value);
                            const list = POPULAR_HOSPITALS[e.target.value] || [];
                            if (list.length > 0) setHospitalName(list[0]);
                          }}
                          className="w-full pl-3 pr-8 py-2 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-aia-red"
                        >
                          {VIETNAM_PROVINCES.map((prov) => (
                            <option key={prov} value={prov}>{prov}</option>
                          ))}
                        </select>
                        <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Bệnh viện */}
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Bệnh viện / Cơ sở y tế <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
                          placeholder="Vui lòng nhập/chọn bệnh viện"
                          className="w-full pl-3 pr-8 py-2 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-aia-red"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                      {/* Popular hospital quick tags */}
                      {/* Quick Hospital Chips */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {['BV Vinmec Central Park', 'BV Chợ Rẫy TP.HCM', 'BV Pháp Việt (FV)', 'BV Đại Học Y Dược', 'BV Nhi Đồng 1', 'BV Bạch Mai'].map((hosp) => (
                          <button
                            key={hosp}
                            type="button"
                            onClick={() => setHospitalName(hosp)}
                            className={`text-[10px] px-2 py-0.5 rounded transition-all font-medium ${
                              hospitalName === hosp
                                ? 'bg-aia-red text-white font-bold'
                                : 'bg-slate-200/80 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            + {hosp}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Nguyên nhân xảy ra sự kiện */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-semibold mb-1">
                        Nguyên nhân xảy ra sự kiện bảo hiểm <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={claimReason}
                        onChange={(e) => setClaimReason(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-aia-red"
                      >
                        {CLAIM_REASONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mã chẩn đoán bệnh ICD-10 (Ảnh 8) */}
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Tìm kiếm theo mã bệnh (ICD-10) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={icd10Search}
                          onChange={(e) => {
                            const val = e.target.value.toUpperCase();
                            setIcd10Search(val);
                            const matched = COMMON_ICD10_CODES.find((c) => c.code.startsWith(val));
                            if (matched) {
                              setSelectedIcd10(`${matched.code} - ${matched.name}`);
                              setDiagnosis(`${matched.name}, điều trị ngoại trú theo đơn thuốc`);
                            }
                          }}
                          placeholder="VD: K29, A09, J06..."
                          className="w-full pl-3 pr-8 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:outline-aia-red"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Tìm kiếm theo tên bệnh
                      </label>
                      <select
                        value={selectedIcd10}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedIcd10(val);
                          const item = COMMON_ICD10_CODES.find((c) => `${c.code} - ${c.name}` === val);
                          if (item) {
                            setIcd10Search(item.code);
                            setDiagnosis(`${item.name}, điều trị theo hồ sơ bệnh án`);
                          }
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-aia-red"
                      >
                        {COMMON_ICD10_CODES.map((item) => (
                          <option key={item.code} value={`${item.code} - ${item.name}`}>
                            {item.code} - {item.name} ({item.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Chẩn đoán theo Giấy ra viện (Ảnh 8) */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-semibold mb-1">
                        Chẩn đoán theo Giấy ra viện / Toa thuốc <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Vui lòng nhập chẩn đoán chi tiết theo Giấy ra viện."
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-aia-red leading-relaxed text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: CHỌN PHƯƠNG THỨC THANH TOÁN (Ảnh 9) */}
            {/* ========================================================================= */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    3. Chọn Phương Thức Thanh Toán
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Lựa chọn hình thức nhận tiền chi trả quyền lợi bảo hiểm từ AIA Việt Nam.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Single Clean Card containing both Radio options (Exact AIA Mobile Layout) */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs divide-y divide-slate-100">
                    {/* Option 1: Nhận tiền qua tài khoản ngân hàng */}
                    <label
                      className={`flex items-center gap-3.5 p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'bank_transfer' ? 'bg-rose-50/30' : 'hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="w-4 h-4 text-aia-red focus:ring-aia-red border-slate-300"
                      />
                      <span className={`text-sm ${paymentMethod === 'bank_transfer' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                        Nhận tiền qua tài khoản ngân hàng
                      </span>
                    </label>

                    {/* Option 2: Nhận tiền mặt tại Ngân hàng */}
                    <label
                      className={`flex items-center gap-3.5 p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'cash' ? 'bg-rose-50/30' : 'hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                        className="w-4 h-4 text-aia-red focus:ring-aia-red border-slate-300"
                      />
                      <span className={`text-sm ${paymentMethod === 'cash' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                        Nhận tiền mặt tại Ngân hàng
                      </span>
                    </label>
                  </div>

                  {/* Bank Account Details Form - Clean standalone card when bank_transfer is active */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-aia-red" />
                          Chi tiết tài khoản nhận thụ hưởng
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium">Bắt buộc nhập chính xác</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">
                            Ngân hàng thụ hưởng <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-aia-red shadow-xs"
                          >
                            {VIETNAM_BANKS.map((b) => (
                              <option key={b.code} value={b.shortName}>
                                {b.shortName} - {b.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">
                            Số tài khoản ngân hàng <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            placeholder="Nhập số tài khoản"
                            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:outline-aia-red shadow-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 font-semibold mb-1">
                            Tên chủ tài khoản (Chữ in hoa không dấu) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={bankAccountHolder}
                            onChange={(e) => setBankAccountHolder(e.target.value.toUpperCase())}
                            placeholder="VD: NGUYEN THI MAI ANH"
                            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:outline-aia-red uppercase shadow-xs"
                          />
                          <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            Tên chủ tài khoản phải trùng khớp với Người được bảo hiểm hoặc Bên mua bảo hiểm.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cash withdrawal note when cash option is selected */}
                  {paymentMethod === 'cash' && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
                      <strong className="font-semibold text-amber-900">Hướng dẫn nhận tiền mặt:</strong> Khách hàng mang theo bản gốc Căn cước công dân đến chi nhánh Vietcombank hoặc Sacombank gần nhất trên toàn quốc sau khi nhận tin nhắn/thông báo AIA duyệt chi trả quyền lợi.
                    </div>
                  )}

                  {/* Red Notice Banner from AIA Portal (Photo 9) */}
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium leading-relaxed">
                    <strong className="text-aia-red font-bold">Lưu ý:</strong> Không áp dụng Ủy quyền nhận tiền cho các loại yêu cầu Giải quyết quyền lợi bảo hiểm!
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: XÁC NHẬN & NỘP HỒ SƠ */}
            {/* ========================================================================= */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    4. Kiểm Tra & Xác Nhận Hồ Sơ Yêu Cầu Bồi Thường
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Kiểm tra lại toàn bộ thông tin trước khi hoàn tất nộp hồ sơ vào hệ thống AIA.
                  </p>
                </div>

                {/* Comprehensive Review Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-slate-500 font-medium block">Người được bảo hiểm:</span>
                      <strong className="text-sm font-bold text-slate-900">{insuredPersonName}</strong>
                      <span className="text-[11px] text-slate-500 block">
                        Số HĐ: <strong className="font-mono text-slate-700">{policyNumber || 'AIA-1108924'}</strong>
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 font-medium block">Quyền lợi yêu cầu:</span>
                      <strong className="text-sm font-bold text-aia-red">
                        {AIA_11_BENEFITS.find((b) => b.id === claimType)?.title}
                      </strong>
                      <span className="text-[11px] text-slate-500 block">
                        Mã chẩn đoán: <strong className="font-mono text-slate-700">{icd10Search}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-slate-500 font-medium block">Cơ sở y tế điều trị:</span>
                      <strong className="text-slate-800">{hospitalName}</strong>
                      <span className="text-[11px] text-slate-500 block">Khu vực: {hospitalCity}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 font-medium block">Tổng tiền yêu cầu:</span>
                      <strong className="text-base font-bold text-aia-red font-mono">
                        {formatCurrencyVND(parsedAmount)}
                      </strong>
                      <span className="text-[11px] text-slate-500 block italic">
                        ({formatWordsVND(parsedAmount)})
                      </span>
                    </div>
                  </div>

                  <div className="pb-3 border-b border-slate-200">
                    <span className="text-slate-500 font-medium block">Phương thức nhận tiền:</span>
                    {paymentMethod === 'bank_transfer' ? (
                      <strong className="text-slate-800 font-mono">
                        {bankName} - {bankAccountNumber} ({bankAccountHolder})
                      </strong>
                    ) : (
                      <strong className="text-slate-800">Nhận tiền mặt tại quầy Ngân hàng</strong>
                    )}
                  </div>

                  {/* Documents count summary */}
                  <div>
                    <span className="text-slate-500 font-medium block mb-1.5">
                      Chứng từ y tế đính kèm ({uploadedDocs.length} tệp):
                    </span>
                    {uploadedDocs.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {uploadedDocs.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px]"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-aia-red" />
                            <span className="font-medium text-slate-800 truncate max-w-[150px]">{doc.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({doc.size})</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">Chưa tải ảnh chứng từ.</p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 text-xs">
                    Ghi chú bổ sung cho bộ phận thẩm định AIA
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ghi chú hồ sơ hoặc nhắc nhở..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-aia-red"
                  />
                </div>

                {/* Legal commitment Checkbox */}
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer p-3 bg-rose-50/50 rounded-xl border border-rose-200">
                  <input
                    type="checkbox"
                    checked={agreedCommitment}
                    onChange={(e) => setAgreedCommitment(e.target.checked)}
                    className="mt-0.5 rounded text-aia-red focus:ring-aia-red"
                  />
                  <span>
                    Tôi cam đoan các thông tin kê khai trên là hoàn toàn đúng sự thật và các tài liệu đính kèm là chứng từ hợp pháp của Người được bảo hiểm.
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Footer Actions - Styled Exactly like AIA iClaim Mobile App */}
          <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                QUAY LẠI
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                HỦY BỎ
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-aia-red hover:bg-aia-red-dark text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95"
              >
                TIẾP TỤC
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-aia-red hover:bg-aia-red-dark text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 animate-pulse hover:animate-none"
              >
                <Send className="w-4 h-4" />
                NỘP HỒ SƠ BỒI THƯỜNG
              </button>
            )}
          </div>

          {/* Simulated OTP Modal (Photo 4: XÁC THỰC MÃ OTP) */}
          {showOtpModal && (
            <div className="absolute inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl space-y-4 border border-slate-200 text-center">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-aia-red mx-auto flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase">Xác Thực Mã OTP</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Số điện thoại nhận mã xác thực OTP:{' '}
                    <strong className="font-mono text-slate-700">XXXXXX7956</strong>
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Nhập mã xác thực OTP"
                    className="w-full text-center tracking-[0.4em] font-mono text-lg font-bold py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-aia-red"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setOtpCode('889922');
                      setOtpSent(true);
                    }}
                    className="text-xs font-semibold text-aia-red hover:underline block mx-auto"
                  >
                    {otpSent ? '✓ Đã gửi lại mã OTP (Mẫu: 889922)' : 'GỬI LẠI MÃ OTP'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    QUAY LẠI
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpModal(false);
                      setStep1SubView('benefits');
                    }}
                    className="py-2 bg-aia-red hover:bg-aia-red-dark text-white text-xs font-bold rounded-xl"
                  >
                    XÁC THỰC
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
