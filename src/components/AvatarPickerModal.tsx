import React, { useState, useMemo } from 'react';
import {
  X,
  Shuffle,
  Check,
  Search,
  Sparkles,
  Type,
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

  const [selectedId, setSelectedId] = useState<string>(initialSelected);
  const [activeCategory, setActiveCategory] = useState<AvatarCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Filtered avatars
  const filteredAvatars = AVATAR_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedItem: AvatarItem | undefined = getAvatarById(selectedId);
  const isLetterMode = selectedId === 'letter';

  // Random avatar selection
  const handleRandomSelect = () => {
    const available = AVATAR_CATALOG.filter((a) => a.id !== selectedId);
    const randomItem = available[Math.floor(Math.random() * available.length)];
    if (randomItem) {
      setSelectedId(randomItem.id);
    }
  };

  const handleSave = () => {
    onSelectAvatar(selectedId);
    onClose();
  };

  const initials = getCustomerInitials(customer?.name);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-5 text-center">
        <div
          className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all border border-slate-200 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aia-red to-rose-500 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Chọn Avatar cho {customer?.name || 'Khách hàng'}
                </h3>
                <p className="text-xs text-slate-300">
                  Bộ sưu tập 36 mẫu avatar doanh nghiệp trang trọng, chuẩn nhận diện AIA
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preview & Quick Actions Bar */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl p-1 bg-white shadow-md border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                {isLetterMode ? (
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-white font-extrabold flex items-center justify-center text-xl border border-slate-700">
                    {initials}
                  </div>
                ) : selectedItem ? (
                  <div className={`w-full h-full rounded-xl p-1 bg-gradient-to-tr ${selectedItem.bgGradient} flex items-center justify-center shadow-inner`}>
                    <selectedItem.SvgComponent className="w-full h-full drop-shadow-xs" initials={initials} />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                    ?
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-slate-800">
                    {isLetterMode ? 'Chữ cái ban đầu' : selectedItem?.name || 'Đang chọn'}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {isLetterMode ? 'Ký tự' : selectedItem?.category === 'corporate_exec' ? '👔 Chuyên gia' : selectedItem?.category === 'monogram_luxury' ? '💎 Monogram VIP' : '🛡️ Biểu trưng'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Áp dụng cho hồ sơ, danh thiếp và hợp đồng của{' '}
                  <strong className="text-slate-700">{customer?.name}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleRandomSelect}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
                title="Gợi ý ngẫu nhiên 1 mẫu avatar phù hợp"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Đổi ngẫu nhiên</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedId('letter')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isLetterMode
                    ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
                title="Dùng ký tự chữ cái viết tắt"
              >
                <Type className="w-3.5 h-3.5" />
                <span>Dùng chữ cái</span>
              </button>
            </div>
          </div>

          {/* Search & Categories Bar */}
          <div className="p-4 border-b border-slate-200 bg-white space-y-3 shrink-0">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm avatar theo tên (ví dụ: giám đốc, bác sĩ, monogram, khiên, vương miện...)"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-aia-red focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Categories filter tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {AVATAR_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-aia-red text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Avatars */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-h-[50vh]">
            {filteredAvatars.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm font-semibold">Không tìm thấy avatar phù hợp</p>
                <p className="text-xs mt-1">Hãy thử xóa bộ lọc tìm kiếm</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
                {filteredAvatars.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`group relative flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
                        isSelected
                          ? 'ring-3 ring-aia-red ring-offset-2 bg-rose-50/50 shadow-md scale-105'
                          : 'hover:bg-slate-100 hover:scale-105 hover:shadow-xs'
                      }`}
                    >
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-1 bg-gradient-to-tr ${item.bgGradient} shadow-xs flex items-center justify-center transition-transform group-hover:scale-102`}>
                        <item.SvgComponent className="w-full h-full drop-shadow-xs" initials={initials} />
                      </div>

                      <span className="text-[10px] font-semibold text-slate-700 text-center truncate max-w-full mt-1.5 group-hover:text-slate-900">
                        {item.name}
                      </span>

                      {isSelected && (
                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-aia-red text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500">
              Đang chọn:{' '}
              <strong className="text-slate-800">
                {isLetterMode ? 'Chữ cái viết tắt' : selectedItem?.name || selectedId}
              </strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-aia-red hover:bg-aia-red-dark text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
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
