import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  X,
  Check,
  Upload,
  Sparkles,
  RefreshCw,
  Link as LinkIcon,
} from 'lucide-react';
import {
  AVATAR_CATALOG,
  AVATAR_CATEGORIES,
  AvatarCategory,
  AvatarItem,
  getAvatarById,
  getDefaultAvatarForCustomer,
  getCustomerInitials,
} from '../data/avatarCatalog';
import { Customer } from '../types/crm';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer | null;
  currentAvatarId?: string;
  onSelectAvatar: (avatarId: string) => void;
}

const AvatarPickerContent: React.FC<Omit<AvatarPickerModalProps, 'isOpen'>> = ({
  onClose,
  customer,
  currentAvatarId,
  onSelectAvatar,
}) => {
  const initialSelected = useMemo(() => {
    if (currentAvatarId) return currentAvatarId;
    if (customer) {
      if (customer.avatar) return customer.avatar;
      const def = getDefaultAvatarForCustomer(customer.id, customer.name);
      return def.id;
    }
    return AVATAR_CATALOG[0].id;
  }, [currentAvatarId, customer]);

  const [activeTab, setActiveTab] = useState<'preset' | 'upload'>('preset');
  const [selectedCategory, setSelectedCategory] = useState<AvatarCategory>('all');
  const [selectedId, setSelectedId] = useState<string>(initialSelected);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(
    initialSelected.startsWith('data:image') || initialSelected.startsWith('http')
      ? initialSelected
      : null
  );
  const [imageUrlInput, setImageUrlInput] = useState('');

  const filteredAvatars = useMemo(() => {
    if (selectedCategory === 'all') return AVATAR_CATALOG;
    return AVATAR_CATALOG.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const selectedItem: AvatarItem | undefined = getAvatarById(selectedId);
  const initials = getCustomerInitials(customer?.name);
  const isCustomImage =
    selectedId.startsWith('data:image') ||
    selectedId.startsWith('http://') ||
    selectedId.startsWith('https://') ||
    selectedId.startsWith('blob:');

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setUploadedPreview(dataUrl);
      setSelectedId(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Handle URL paste
  const handleApplyUrl = () => {
    if (imageUrlInput.trim()) {
      setUploadedPreview(imageUrlInput.trim());
      setSelectedId(imageUrlInput.trim());
    }
  };

  const handleSave = () => {
    onSelectAvatar(selectedId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="relative z-10 flex min-h-full items-center justify-center p-3 sm:p-5 text-center">
        <div
          className="w-full max-w-xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all border border-slate-200 flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Styled Exactly like Image #1 */}
          <div className="px-6 py-4.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Thay đổi ảnh đại diện{' '}
              <span className="text-slate-500 font-medium">({customer?.name || 'Khách hàng'})</span>
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {/* 1. Large Top Circular Avatar Preview (Ảnh mẫu trên cùng) */}
            <div className="flex flex-col items-center justify-center pt-1">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-white shadow-xl ring-4 ring-slate-100 shrink-0 flex items-center justify-center overflow-hidden transition-all hover:scale-102">
                {isCustomImage ? (
                  <img
                    src={selectedId}
                    alt={customer?.name || 'Avatar'}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : selectedItem ? (
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <selectedItem.SvgComponent className="w-full h-full" initials={initials} />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-sky-100 to-indigo-100 text-sky-900 font-extrabold flex items-center justify-center text-2xl border border-sky-200">
                    {initials}
                  </div>
                )}
              </div>

              <div className="mt-2.5 text-center">
                <p className="text-xs font-bold text-slate-800">
                  {isCustomImage
                    ? 'Ảnh tự tải lên'
                    : selectedItem?.name || 'Khuôn mặt hoạt hình'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Ảnh đại diện hiển thị trên hồ sơ, hợp đồng và chăm sóc khách hàng
                </p>
              </div>
            </div>

            {/* 2. Tabs Switcher: [ Hình mẫu ] & [ Tải lên ] (Ảnh mẫu Image #1) */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center max-w-xs mx-auto shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('preset')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'preset'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-aia-red" />
                <span>Hình mẫu</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-aia-red" />
                <span>Tải lên</span>
              </button>
            </div>

            {/* 3. Tab Content: HÌNH MẪU (Kho 50 khuôn mặt hoạt hình biểu cảm phân loại) */}
            {activeTab === 'preset' && (
              <div className="space-y-3.5">
                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {AVATAR_CATEGORIES.map((cat) => {
                    const isCatActive = selectedCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                          isCatActive
                            ? 'bg-slate-900 text-white shadow-xs scale-102'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-0.5">
                  <span>
                    Đang hiển thị{' '}
                    <strong className="text-slate-800 font-bold">{filteredAvatars.length}</strong>{' '}
                    mẫu khuôn mặt:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const pool = filteredAvatars.length > 1 ? filteredAvatars : AVATAR_CATALOG;
                      const otherAvatars = pool.filter((a) => a.id !== selectedId);
                      const rand = otherAvatars[Math.floor(Math.random() * otherAvatars.length)];
                      if (rand) setSelectedId(rand.id);
                    }}
                    className="text-aia-red hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Gợi ý ngẫu nhiên</span>
                  </button>
                </div>

                {/* Scrollable Responsive Grid of 50 Avatars */}
                <div className="max-h-72 sm:max-h-80 overflow-y-auto pr-1 -mr-1 rounded-xl scrollbar-thin scrollbar-thumb-slate-200">
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-3.5 p-1">
                    {filteredAvatars.map((item) => {
                      const isSelected = selectedId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedId(item.id)}
                          className={`group relative aspect-square rounded-full transition-all cursor-pointer focus:outline-hidden ${
                            isSelected
                              ? 'ring-4 ring-aia-red ring-offset-2 scale-105 shadow-md'
                              : 'border-2 border-slate-100 hover:border-slate-300 hover:shadow-md hover:scale-105'
                          }`}
                          title={item.name}
                        >
                          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center shadow-xs">
                            <item.SvgComponent className="w-full h-full transition-transform group-hover:scale-105" />
                          </div>

                          {/* Selected Checkmark Badge */}
                          {isSelected && (
                            <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-aia-red text-white flex items-center justify-center shadow-xs border border-white">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Tab Content: TẢI LÊN (Upload custom image from file or URL) */}
            {activeTab === 'upload' && (
              <div className="space-y-4 pt-1">
                {/* Upload Card Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-aia-red rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/60 hover:bg-rose-50/30 group"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-100/70 text-aia-red flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110 shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-aia-red transition-colors">
                    Bấm để chọn ảnh từ máy tính hoặc điện thoại
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Hỗ trợ định dạng JPG, PNG, WEBP dung lượng tối đa 5MB
                  </p>
                </div>

                {/* Direct Image URL input */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Hoặc dán đường link ảnh trực tiếp:</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-aia-red"
                    />
                    <button
                      type="button"
                      onClick={handleApplyUrl}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>

                {/* Uploaded image preview */}
                {uploadedPreview && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={uploadedPreview}
                        alt="Preview"
                        className="w-10 h-10 rounded-full object-cover border border-emerald-300 shadow-2xs"
                      />
                      <div>
                        <p className="text-xs font-bold text-emerald-900">Đã nạp ảnh thành công!</p>
                        <p className="text-[10px] text-emerald-700">Bấm "Lưu thay đổi" bên dưới để áp dụng.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-emerald-800 hover:underline"
                    >
                      Đổi ảnh khác
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              HỦY BỎ
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-aia-red hover:bg-aia-red-dark text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>LƯU THAY ĐỔI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  isOpen,
  onClose,
  customer,
  currentAvatarId,
  onSelectAvatar,
}) => {
  if (!isOpen) return null;
  const key = `${customer?.id || 'new'}-${currentAvatarId || 'default'}`;
  return (
    <AvatarPickerContent
      key={key}
      onClose={onClose}
      customer={customer}
      currentAvatarId={currentAvatarId}
      onSelectAvatar={onSelectAvatar}
    />
  );
};
