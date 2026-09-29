import React, { useState, useRef } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  Camera,
  Upload,
  Save,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { ConsultantProfile } from '../types/claim';

interface ConsultantProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultant: ConsultantProfile;
  onSave: (updated: Partial<ConsultantProfile>) => void;
}

const COMMON_TITLES = [
  'Chuyên viên Tư vấn Tài chính Cấp cao (MDRT)',
  'Chuyên viên Hoạch định Tài chính (FC)',
  'Thành viên Bàn tròn Triệu đô (COT)',
  'Thành viên Bàn tròn Thượng đỉnh (TOT)',
  'Trưởng nhóm Kinh doanh (UM)',
  'Trưởng ban Kinh doanh (BM)',
  'Giám đốc Phát triển Kinh doanh (AD)',
];

export const ConsultantProfileModal: React.FC<ConsultantProfileModalProps> = ({
  isOpen,
  onClose,
  consultant,
  onSave,
}) => {
  const [formData, setFormData] = useState<ConsultantProfile>({ ...consultant });
  const [customTitle, setCustomTitle] = useState(!COMMON_TITLES.includes(consultant.title));
  const [imageError, setImageError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Vui lòng chọn ảnh có dung lượng dưới 2MB để tối ưu lưu trữ.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setFormData((prev) => ({ ...prev, avatarUrl: dataUrl }));
        setImageError(false);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập họ và tên tư vấn viên');
      return;
    }
    if (!formData.code.trim()) {
      alert('Vui lòng nhập mã số đại lý');
      return;
    }

    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aia-red flex items-center justify-center text-white shadow-md font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Cá nhân hóa Tài khoản Tư vấn viên
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Thông tin này sẽ hiển thị trên Header, báo cáo và các biên nhận nộp iClaim
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Live Preview Card */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md border-2 border-white ring-2 ring-slate-200 flex items-center justify-center">
                {formData.avatarUrl && !imageError ? (
                  <img
                    src={formData.avatarUrl}
                    alt={formData.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-aia-red to-rose-400 text-white font-bold flex items-center justify-center text-2xl">
                    {formData.name ? formData.name.trim().charAt(formData.name.trim().length - 1).toUpperCase() : 'A'}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-white rounded-full shadow-md hover:bg-aia-red transition-colors border-2 border-white cursor-pointer"
                title="Thay ảnh đại diện"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarFile}
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-base font-bold text-slate-900">{formData.name || 'Họ và tên tư vấn viên'}</span>
                <span className="text-[11px] bg-amber-50 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded shadow-2xs">
                  {formData.title.includes('MDRT') ? 'MDRT' : formData.title.includes('COT') ? 'COT' : 'AIA AGENT'}
                </span>
              </div>
              <p className="text-xs font-semibold text-aia-red flex items-center justify-center sm:justify-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Mã số: {formData.code || 'AIA-VN-XXXX'}</span>
              </p>
              <p className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{formData.agency || 'Văn phòng / Chi nhánh AIA'}</span>
              </p>
              <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3 text-slate-500" />
                  <span>Chọn ảnh từ máy tính</span>
                </button>
                {formData.avatarUrl !== '/avatar-consultant.png' && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, avatarUrl: '/avatar-consultant.png' }));
                      setImageError(false);
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-800 underline px-1 py-1 cursor-pointer"
                  >
                    Dùng ảnh mặc định
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Họ và tên */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Họ và Tên tư vấn viên <span className="text-aia-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Dương Như Ý"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-medium"
                />
              </div>
            </div>

            {/* Mã số đại lý */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mã số Đại lý / FC Code <span className="text-aia-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Ví dụ: AIA-VN-8869"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-numeric font-medium uppercase"
                />
              </div>
            </div>

            {/* Chức danh */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Chức danh / Danh hiệu nghề nghiệp
                </label>
                <button
                  type="button"
                  onClick={() => setCustomTitle(!customTitle)}
                  className="text-[11px] text-aia-red hover:underline font-semibold cursor-pointer"
                >
                  {customTitle ? 'Chọn từ danh mục' : 'Tự nhập chức danh'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Award className="w-4 h-4" />
                </div>
                {customTitle ? (
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nhập chức danh của bạn..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-medium"
                  />
                ) : (
                  <select
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-medium"
                  >
                    {COMMON_TITLES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Văn phòng / Đại lý (Agency) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Văn phòng / Chi nhánh (Agency / GA)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.agency}
                  onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                  placeholder="Ví dụ: AIA Exchange Sài Gòn"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-medium"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Số điện thoại liên hệ
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Ví dụ: 0908 123 889"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-numeric font-medium"
                />
              </div>
            </div>

            {/* Email làm việc */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email làm việc
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ví dụ: name@aia.com.vn"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-medium"
                />
              </div>
            </div>

            {/* Địa chỉ văn phòng */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Địa chỉ phòng ban / Tòa nhà
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.office}
                  onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                  placeholder="Ví dụ: Tầng 15, Bitexco, Q.1, TP.HCM"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aia-red focus:border-transparent font-medium"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500">
            Dữ liệu tự động lưu trên máy của bạn
          </p>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-xs font-semibold text-white bg-aia-red hover:bg-aia-red-dark rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã lưu!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu thông tin</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
