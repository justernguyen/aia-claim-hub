import React from 'react';
import { Camera } from 'lucide-react';
import { getAvatarById, getDefaultAvatarForCustomer, getCustomerInitials } from '../data/avatarCatalog';

export type CustomerAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface CustomerAvatarProps {
  avatarId?: string;
  name: string;
  customerId?: string;
  size?: CustomerAvatarSize;
  className?: string;
  editable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showBadge?: boolean;
}

const SIZE_MAP: Record<
  CustomerAvatarSize,
  {
    boxClass: string;
    textClass: string;
    badgeClass: string;
    badgeIconClass: string;
  }
> = {
  xs: {
    boxClass: 'w-6 h-6 rounded-md',
    textClass: 'text-[10px]',
    badgeClass: 'w-3 h-3 -bottom-0.5 -right-0.5',
    badgeIconClass: 'w-2 h-2',
  },
  sm: {
    boxClass: 'w-8 h-8 rounded-lg',
    textClass: 'text-xs',
    badgeClass: 'w-3.5 h-3.5 -bottom-0.5 -right-0.5',
    badgeIconClass: 'w-2 h-2',
  },
  md: {
    boxClass: 'w-11 h-11 rounded-xl',
    textClass: 'text-sm',
    badgeClass: 'w-4 h-4 -bottom-1 -right-1',
    badgeIconClass: 'w-2.5 h-2.5',
  },
  lg: {
    boxClass: 'w-14 h-14 rounded-2xl',
    textClass: 'text-lg',
    badgeClass: 'w-5 h-5 -bottom-1 -right-1',
    badgeIconClass: 'w-3 h-3',
  },
  xl: {
    boxClass: 'w-18 h-18 rounded-2xl',
    textClass: 'text-xl',
    badgeClass: 'w-6 h-6 -bottom-1.5 -right-1.5',
    badgeIconClass: 'w-3.5 h-3.5',
  },
  '2xl': {
    boxClass: 'w-24 h-24 rounded-3xl',
    textClass: 'text-2xl',
    badgeClass: 'w-7 h-7 -bottom-1.5 -right-1.5',
    badgeIconClass: 'w-4 h-4',
  },
};

export const CustomerAvatar: React.FC<CustomerAvatarProps> = ({
  avatarId,
  name,
  customerId,
  size = 'md',
  className = '',
  editable = false,
  onClick,
  showBadge = false,
}) => {
  const isUploadedImage =
    avatarId &&
    (avatarId.startsWith('data:image') ||
      avatarId.startsWith('http://') ||
      avatarId.startsWith('https://') ||
      avatarId.startsWith('blob:'));

  // Try to find custom avatar from catalog
  let avatarItem = getAvatarById(avatarId);

  // If customer has no explicit avatar set, use deterministic fun avatar or letter
  if (!isUploadedImage && !avatarItem && avatarId !== 'letter') {
    avatarItem = getDefaultAvatarForCustomer(customerId || name, name);
  }

  const initials = getCustomerInitials(name);
  const sizeConfig = SIZE_MAP[size] || SIZE_MAP.md;
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={editable ? `Đổi avatar cho ${name}` : name}
      className={`relative inline-flex items-center justify-center shrink-0 select-none transition-all ${
        sizeConfig.boxClass
      } ${
        editable
          ? 'cursor-pointer hover:ring-2 hover:ring-aia-red hover:ring-offset-2 hover:scale-105 active:scale-95 group/avatar'
          : ''
      } ${className}`}
    >
      {isUploadedImage ? (
        <div className="w-full h-full rounded-[inherit] overflow-hidden shadow-xs border border-slate-200/80 bg-slate-50 flex items-center justify-center">
          <img src={avatarId} alt={name} className="w-full h-full object-cover rounded-[inherit]" />
        </div>
      ) : avatarItem && avatarId !== 'letter' ? (
        <div className="w-full h-full rounded-[inherit] overflow-hidden shadow-xs flex items-center justify-center border border-slate-200/60">
          <avatarItem.SvgComponent className="w-full h-full" initials={initials} />
        </div>
      ) : (
        <div className="w-full h-full rounded-[inherit] bg-gradient-to-tr from-sky-100 to-indigo-100 text-sky-900 font-extrabold flex items-center justify-center shadow-xs border border-sky-200">
          <span className={sizeConfig.textClass}>{initials}</span>
        </div>
      )}

      {/* Editable Overlay / Badge */}
      {editable && (
        <div
          className={`absolute ${sizeConfig.badgeClass} rounded-full bg-aia-red text-white flex items-center justify-center shadow-sm border border-white transition-transform group-hover/avatar:scale-110 ${
            showBadge ? 'opacity-100' : 'opacity-0 group-hover/avatar:opacity-100'
          }`}
        >
          <Camera className={sizeConfig.badgeIconClass} />
        </div>
      )}
    </div>
  );
};
