import React from 'react';

export type AvatarCategory = 'all' | 'faces_female' | 'faces_male' | 'faces_creative';

export interface AvatarCategoryMeta {
  key: AvatarCategory;
  label: string;
  icon: string;
}

export const AVATAR_CATEGORIES: AvatarCategoryMeta[] = [
  { key: 'all', label: 'Tất cả (16)', icon: '✨' },
  { key: 'faces_female', label: 'Nữ tươi tắn', icon: '👩' },
  { key: 'faces_male', label: 'Nam năng động', icon: '👨' },
  { key: 'faces_creative', label: 'Phong cách độc đáo', icon: '🎨' },
];

export interface AvatarItem {
  id: string;
  name: string;
  category: 'faces_female' | 'faces_male' | 'faces_creative';
  bgGradient: string;
  bgColor: string;
  SvgComponent: React.FC<{ className?: string; initials?: string }>;
}

export function getCustomerInitials(name?: string): string {
  if (!name || !name.trim()) return 'KH';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  const last = parts[parts.length - 1];
  const secondLast = parts[parts.length - 2];
  return (secondLast[0] + last[0]).toUpperCase();
}

// =========================================================================
// 16 BỘ KHUÔN MẶT HOẠT HÌNH BIỂU CẢM CHUẨN TRÒN TUYỆT ĐỐI (CLIP-PATH FULL-BLEED)
// =========================================================================

// 1. Cô gái trùm khăn Hijab hồng (Khớp ảnh mẫu Preview lớn trên cùng)
export const FaceHijabPink: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-hijab">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-hijab)">
      {/* Background Pastel Sky */}
      <rect width="100" height="100" fill="#BAE6FD" />
      {/* Hijab Hood Around Head */}
      <path
        d="M50 10C30 10 21 24 21 48C21 72 30 82 50 82C70 82 79 72 79 48C79 24 70 10 50 10Z"
        fill="#E11D48"
      />
      {/* Shoulders & Chest Drape */}
      <path d="M12 100C12 74 28 66 50 66C72 66 88 74 88 100H12Z" fill="#F43F5E" />
      <path d="M42 66L50 82L58 66Z" fill="#BE123C" />
      {/* Inner Hijab Shadow */}
      <path
        d="M50 15C34 15 27 27 27 48C27 68 34 76 50 76C66 76 73 68 73 48C73 27 66 15 50 15Z"
        fill="#FB7185"
      />
      {/* Face (Warm Honey Gold) */}
      <ellipse cx="50" cy="46" rx="17" ry="20" fill="#FCD34D" />
      {/* Forehead Shadow */}
      <path d="M34 38C40 30 60 30 66 38C63 32 57 28 50 28C43 28 37 32 34 38Z" fill="#F59E0B" opacity="0.35" />
      {/* Eyebrows */}
      <path d="M38 38C41 36 45 37 47 38" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M53 38C55 37 59 36 62 38" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      {/* Sleepy Peaceful Curved Eyes (⌒ ⌒) */}
      <path d="M38 45C40 48 45 48 47 45" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M53 45C55 48 60 48 62 45" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
      {/* Lashes */}
      <path d="M42.5 47V49M57.5 47V49" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="36" cy="51" r="4" fill="#FB7185" opacity="0.5" />
      <circle cx="64" cy="51" r="4" fill="#FB7185" opacity="0.5" />
      {/* Cute Open Mouth */}
      <ellipse cx="50" cy="55" rx="3.5" ry="2.5" fill="#78350F" />
      <path d="M48 55.5C49 56.5 51 56.5 52 55.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
      {/* Chin Tuck */}
      <path d="M43 64C47 67 53 67 57 64C55 72 45 72 43 64Z" fill="#E11D48" />
    </g>
  </svg>
);

// 2. Bạn nam quấn khăn Turban xanh ngọc nháy mắt (Card 1 trong ảnh mẫu)
export const FaceTurbanWinking: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-turban">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-turban)">
      <rect width="100" height="100" fill="#BAE6FD" />
      {/* Shoulders & Black T-shirt */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#18181B" />
      {/* Antler graphic on chest */}
      <path d="M50 78V88M45 81L50 84L55 81M43 77L47 81M57 77L53 81" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#E89A65" />
      {/* Ears */}
      <circle cx="27" cy="48" r="6" fill="#E89A65" />
      <circle cx="27" cy="48" r="3" fill="#D97706" opacity="0.4" />
      <circle cx="73" cy="48" r="6" fill="#E89A65" />
      <circle cx="73" cy="48" r="3" fill="#D97706" opacity="0.4" />
      {/* Face (Amber Tan Skin) */}
      <rect x="29" y="32" width="42" height="35" rx="18" fill="#E89A65" />
      {/* Turquoise Turban Body */}
      <path d="M24 36C24 16 35 9 50 9C65 9 76 16 76 36C76 39 68 34 50 34C32 34 24 39 24 36Z" fill="#6EE7B7" />
      {/* Center Twist Knot & Gem */}
      <ellipse cx="50" cy="20" rx="8" ry="11" transform="rotate(-15 50 20)" fill="#34D399" />
      <ellipse cx="50" cy="20" rx="6" ry="9" transform="rotate(15 50 20)" fill="#10B981" />
      <circle cx="50" cy="21" r="3.5" fill="#A7F3D0" />
      {/* Eyebrows */}
      <path d="M36 38C39 35 44 36 46 38" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 36C57 35 62 36 64 38" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      {/* Left Eye: Winking */}
      <path d="M36 46C39 49 44 49 46 46" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right Eye: Big Cartoon Eye with Double Highlight */}
      <circle cx="60" cy="46" r="5" fill="#FFFFFF" />
      <circle cx="60" cy="46" r="3.2" fill="#1C1917" />
      <circle cx="58.5" cy="44.5" r="1.5" fill="#FFFFFF" />
      <circle cx="61.5" cy="47.5" r="0.8" fill="#FFFFFF" />
      {/* Nose */}
      <path d="M49 47C48 50 51 52 53 50" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
      {/* Cheerful Open Smile with Teeth */}
      <rect x="44" y="53" width="12" height="7" rx="3.5" fill="#451A03" />
      <rect x="45.5" y="53" width="9" height="2.5" rx="1" fill="#FFFFFF" />
    </g>
  </svg>
);

// 3. Bạn trai tóc nâu nhọn cười tươi (Trần Hoàng Nam - Sửa triệt để lỗi tóc hở trán)
export const FaceSpikyBoy: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-spiky">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-spiky)">
      <rect width="100" height="100" fill="#BAE6FD" />
      {/* Charcoal T-shirt */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#18181B" />
      {/* V-neck */}
      <path d="M43 68L50 78L57 68Z" fill="#E89A65" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#E89A65" />
      {/* Ears */}
      <circle cx="26" cy="47" r="6" fill="#E89A65" />
      <circle cx="26" cy="47" r="3" fill="#D97706" opacity="0.4" />
      <circle cx="74" cy="47" r="6" fill="#E89A65" />
      <circle cx="74" cy="47" r="3" fill="#D97706" opacity="0.4" />
      {/* Back Hair Spikes */}
      <path
        d="M24 38L22 28L30 22L36 14L46 7L54 7L64 14L70 22L78 28L76 38Z"
        fill="#78350F"
      />
      {/* Head / Face (Solid Warm Skin) */}
      <rect x="28" y="26" width="44" height="40" rx="19" fill="#E89A65" />
      {/* Front Hair & Spiky Bangs (Overlapping Forehead naturally with NO gaps) */}
      <path
        d="M26 34C26 18 36 12 50 12C64 12 74 18 74 34L70 26L64 34L56 22L50 32L44 20L36 32L30 24Z"
        fill="#78350F"
      />
      {/* Hair Shadow on Forehead */}
      <path d="M30 32C38 35 62 35 70 32C66 36 58 37 50 37C42 37 34 36 30 32Z" fill="#451A03" opacity="0.25" />
      {/* Friendly Eyebrows */}
      <path d="M35 39C38 36 43 37 45 39" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M55 39C57 37 62 36 65 39" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      {/* Big Cartoon Eyes with Sparkles */}
      <circle cx="39" cy="46" r="5" fill="#FFFFFF" />
      <circle cx="39" cy="46" r="3.2" fill="#1C1917" />
      <circle cx="37.5" cy="44.5" r="1.5" fill="#FFFFFF" />
      <circle cx="40.5" cy="47.5" r="0.8" fill="#FFFFFF" />

      <circle cx="61" cy="46" r="5" fill="#FFFFFF" />
      <circle cx="61" cy="46" r="3.2" fill="#1C1917" />
      <circle cx="59.5" cy="44.5" r="1.5" fill="#FFFFFF" />
      <circle cx="62.5" cy="47.5" r="0.8" fill="#FFFFFF" />
      {/* Nose */}
      <circle cx="50" cy="51" r="1.8" fill="#B45309" />
      {/* Rosy Cheeks */}
      <circle cx="34" cy="52" r="3.5" fill="#F87171" opacity="0.4" />
      <circle cx="66" cy="52" r="3.5" fill="#F87171" opacity="0.4" />
      {/* Broad Tooth Smile */}
      <path d="M41 54C41 61 59 61 59 54H41Z" fill="#78350F" />
      <path d="M43 54C46 56.5 54 56.5 57 54H43Z" fill="#FFFFFF" />
      <path d="M47 58.5C48 59.5 52 59.5 53 58.5" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 4. Cô gái tóc xoăn đeo kính trắng (Card 3 trong ảnh mẫu)
export const FaceCurlyGlasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-curly">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-curly)">
      <rect width="100" height="100" fill="#BAE6FD" />
      {/* Dark T-shirt */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#1E293B" />
      {/* Big Curly Afro Hair Background */}
      <circle cx="26" cy="38" r="16" fill="#1C1917" />
      <circle cx="74" cy="38" r="16" fill="#1C1917" />
      <circle cx="50" cy="22" r="19" fill="#1C1917" />
      <circle cx="22" cy="54" r="13" fill="#1C1917" />
      <circle cx="78" cy="54" r="13" fill="#1C1917" />
      <circle cx="25" cy="68" r="11" fill="#1C1917" />
      <circle cx="75" cy="68" r="11" fill="#1C1917" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#FBBF24" />
      {/* Face (Warm Tan Skin) */}
      <rect x="30" y="30" width="40" height="36" rx="18" fill="#FBBF24" />
      {/* Cute White Retro Glasses */}
      <rect x="31" y="38" width="16" height="13" rx="4" stroke="#FFFFFF" strokeWidth="2.8" fill="#FFFFFF" fillOpacity="0.15" />
      <rect x="53" y="38" width="16" height="13" rx="4" stroke="#FFFFFF" strokeWidth="2.8" fill="#FFFFFF" fillOpacity="0.15" />
      <path d="M47 43H53" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      {/* Eyes inside glasses */}
      <circle cx="39" cy="44.5" r="3" fill="#1C1917" />
      <circle cx="38" cy="43.5" r="1.2" fill="#FFFFFF" />
      <circle cx="61" cy="44.5" r="3" fill="#1C1917" />
      <circle cx="60" cy="43.5" r="1.2" fill="#FFFFFF" />
      {/* Rosy Cheeks */}
      <circle cx="33" cy="52" r="3.5" fill="#F87171" opacity="0.5" />
      <circle cx="67" cy="52" r="3.5" fill="#F87171" opacity="0.5" />
      {/* Cheerful Smile */}
      <path d="M43 54C45 58 55 58 57 54" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 5. Bạn trai mắt trái tim đỏ yêu đời (Card 4 trong ảnh mẫu)
export const FaceHeartEyes: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-heart">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-heart)">
      <rect width="100" height="100" fill="#DDD6FE" />
      {/* Bright Sky Jacket */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#38BDF8" />
      <path d="M43 68L50 84L57 68H43Z" fill="#FFFFFF" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#8D5B4C" />
      {/* Ears */}
      <circle cx="27" cy="47" r="6" fill="#8D5B4C" />
      <circle cx="73" cy="47" r="6" fill="#8D5B4C" />
      {/* Dark Fade Hair */}
      <path d="M28 34C28 18 38 13 50 13C62 13 72 18 72 34H28Z" fill="#171717" />
      {/* Face (Deep Mocha Skin) */}
      <rect x="29" y="28" width="42" height="38" rx="19" fill="#8D5B4C" />
      {/* Eyebrows */}
      <path d="M35 37C38 34 43 35 45 37" stroke="#26150F" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 37C57 35 62 34 65 37" stroke="#26150F" strokeWidth="2" strokeLinecap="round" />
      {/* VIVID RED HEART EYES ❤️ ❤️ */}
      <path
        d="M39 42C37.5 39.5 33 40.5 33 43.5C33 47.5 39 50.5 39 50.5C39 50.5 45 47.5 45 43.5C45 40.5 40.5 39.5 39 42Z"
        fill="#EF4444"
      />
      <path
        d="M61 42C59.5 39.5 55 40.5 55 43.5C55 47.5 61 50.5 61 50.5C61 50.5 67 47.5 67 43.5C67 40.5 62.5 39.5 61 42Z"
        fill="#EF4444"
      />
      {/* Nose */}
      <circle cx="50" cy="51" r="1.8" fill="#4E2B20" />
      {/* Confident Smile */}
      <path d="M43 55C46 59 54 59 57 55" stroke="#26150F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 6. Bạn trai mũ len hồng lè lưỡi (Card 5 trong ảnh mẫu)
export const FaceBeanieTongue: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-beanie">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-beanie)">
      <rect width="100" height="100" fill="#FEEBC8" />
      {/* Light Blue Hoodie */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#BAE6FD" />
      <path d="M45 74V86M55 74V86" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#E89A65" />
      {/* Ears */}
      <circle cx="26" cy="50" r="6" fill="#E89A65" />
      <circle cx="74" cy="50" r="6" fill="#E89A65" />
      {/* Beanie Hat Top */}
      <path d="M26 36C26 16 36 9 50 9C64 9 74 16 74 36H26Z" fill="#F43F5E" />
      <circle cx="50" cy="9" r="4.5" fill="#F43F5E" />
      {/* Folded Brim */}
      <rect x="23" y="30" width="54" height="10" rx="5" fill="#FFFFFF" />
      {/* Face */}
      <rect x="28" y="38" width="44" height="32" rx="16" fill="#E89A65" />
      {/* Left Eye: Winking */}
      <path d="M36 47C38 50 43 50 45 47" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" />
      {/* Right Eye: Laughing Cry Eye with Tear */}
      <path d="M55 47C57 44 62 44 64 47" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M33 50C32 53.5 35 56 35 56C35 56 37 53.5 35.5 50Z" fill="#38BDF8" />
      {/* Mischievous Open Mouth with Tongue Out 👅 */}
      <path d="M42 54C42 61 58 61 58 54H42Z" fill="#451A03" />
      <path d="M46 57C46 65 54 65 54 57Z" fill="#FB7185" />
      <path d="M50 57V62" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 7. Cụ già râu trắng đội vương miện hoa (Card 6 trong ảnh mẫu)
export const FaceFlowerCrown: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-flower">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-flower)">
      <rect width="100" height="100" fill="#CFFAFE" />
      {/* Butter Yellow Shirt */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#FEF08A" />
      <circle cx="50" cy="85" r="5.5" stroke="#FFFFFF" strokeWidth="1.6" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#78350F" />
      {/* Brown Curly Hair */}
      <circle cx="27" cy="40" r="13" fill="#451A03" />
      <circle cx="73" cy="40" r="13" fill="#451A03" />
      <circle cx="50" cy="24" r="17" fill="#451A03" />
      {/* Face (Mocha Skin) */}
      <rect x="29" y="28" width="42" height="38" rx="19" fill="#78350F" />
      {/* Flower Crown (Pink, Yellow, Mint Flowers) */}
      <circle cx="33" cy="25" r="4.5" fill="#F43F5E" />
      <circle cx="33" cy="25" r="1.8" fill="#FEF08A" />
      <circle cx="42" cy="22" r="5" fill="#FBBF24" />
      <circle cx="42" cy="22" r="1.8" fill="#F43F5E" />
      <circle cx="50" cy="20" r="5.5" fill="#FB7185" />
      <circle cx="50" cy="20" r="2.2" fill="#FEF08A" />
      <circle cx="58" cy="22" r="5" fill="#34D399" />
      <circle cx="58" cy="22" r="1.8" fill="#FFFFFF" />
      <circle cx="67" cy="25" r="4.5" fill="#60A5FA" />
      <circle cx="67" cy="25" r="1.8" fill="#FEF08A" />
      {/* Big Eyes */}
      <circle cx="39" cy="43" r="4.5" fill="#FFFFFF" />
      <circle cx="39" cy="43" r="2.8" fill="#1C1917" />
      <circle cx="61" cy="43" r="4.5" fill="#FFFFFF" />
      <circle cx="61" cy="43" r="2.8" fill="#1C1917" />
      {/* Purple Lightning Bolt Earring ⚡ */}
      <path d="M74 49L71 54H74L72 59" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* White Full Moustache & Beard */}
      <path d="M37 50C41 48 48 52 50 53C52 52 59 48 63 50C63 58 56 66 50 66C44 66 37 58 37 50Z" fill="#F8FAFC" />
      <ellipse cx="50" cy="55" rx="3" ry="1.8" fill="#78350F" />
    </g>
  </svg>
);

// 8. Bạn nữ tóc vàng nâu nháy mắt (Card 7 trong ảnh mẫu)
export const FaceBlondeWinking: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-blonde">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-blonde)">
      <rect width="100" height="100" fill="#BAE6FD" />
      {/* Sky Blue Jacket */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#60A5FA" />
      <path d="M43 68L50 84L57 68H43Z" fill="#FFFFFF" />
      {/* Long Flowing Caramel Hair */}
      <path d="M25 34C25 16 35 10 50 10C65 10 75 16 75 34V76C75 76 70 70 67 62L67 38C67 38 33 38 33 38L33 62C30 70 25 76 25 76V34Z" fill="#D97706" />
      {/* Face (Sunny Golden Skin) */}
      <rect x="30" y="28" width="40" height="38" rx="19" fill="#FCD34D" />
      {/* Long Strands Framing Face */}
      <path d="M28 32C28 46 33 62 35 70C33 62 35 46 37 32H28Z" fill="#B45309" />
      <path d="M72 32C72 46 67 62 65 70C67 62 65 46 63 32H72Z" fill="#B45309" />
      {/* Eyebrows */}
      <path d="M37 37C40 35 44 36 46 37" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 37C56 36 60 35 63 37" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Left Eye: Winking */}
      <path d="M37 45C39 48 44 48 46 45" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
      {/* Right Eye: Confident Cartoon Eye */}
      <circle cx="60" cy="45" r="4.5" fill="#FFFFFF" />
      <circle cx="60" cy="45" r="2.8" fill="#1C1917" />
      <circle cx="58.5" cy="43.5" r="1.2" fill="#FFFFFF" />
      {/* Cheeks */}
      <circle cx="34" cy="51" r="3.5" fill="#F87171" opacity="0.45" />
      <circle cx="66" cy="51" r="3.5" fill="#F87171" opacity="0.45" />
      {/* Elegant Smile */}
      <path d="M45 54C47 57.5 53 57.5 55 54" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 9. Nhân vật nón mùa đông che tai pom-pom (Card 8 trong ảnh mẫu)
export const FaceTrapperWinter: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-trapper">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-trapper)">
      <rect width="100" height="100" fill="#BAE6FD" />
      {/* Blue Winter Hoodie */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#38BDF8" />
      <path d="M46 72V86M54 72V86" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="46" cy="87" r="2" fill="#FFFFFF" />
      <circle cx="54" cy="87" r="2" fill="#FFFFFF" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#FBBF24" />
      {/* Face */}
      <rect x="29" y="30" width="42" height="36" rx="18" fill="#FBBF24" />
      {/* Trapper Hat Body */}
      <path d="M26 34C26 14 35 9 50 9C65 9 74 14 74 34H26Z" fill="#FDE68A" />
      {/* Pom-pom on top */}
      <circle cx="50" cy="8" r="5.5" fill="#FFFFFF" />
      {/* Ear Flaps */}
      <rect x="23" y="28" width="9" height="28" rx="4.5" fill="#FDE68A" />
      <rect x="68" y="28" width="9" height="28" rx="4.5" fill="#FDE68A" />
      {/* White fur trim */}
      <rect x="26" y="28" width="48" height="9" rx="4" fill="#FFFFFF" />
      {/* Left Eye: Winking */}
      <path d="M36 47C38 50 43 50 45 47" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
      {/* Right Eye: Surprised Open */}
      <circle cx="60" cy="47" r="4.5" fill="#FFFFFF" />
      <circle cx="60" cy="47" r="2.8" fill="#1C1917" />
      <circle cx="58.5" cy="45.5" r="1.2" fill="#FFFFFF" />
      {/* Surprised "O" Mouth */}
      <ellipse cx="50" cy="56" rx="3.5" ry="3.2" fill="#78350F" />
    </g>
  </svg>
);

// 10. Bạn trai ngầu kính râm đen (Cool Sunglasses)
export const FaceCoolSunglasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-sunglasses">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-sunglasses)">
      <rect width="100" height="100" fill="#FED7AA" />
      {/* Black Jacket */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#18181B" />
      <path d="M42 68L50 82L58 68H42Z" fill="#EF4444" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#E89A65" />
      {/* Ears */}
      <circle cx="26" cy="47" r="6" fill="#E89A65" />
      <circle cx="74" cy="47" r="6" fill="#E89A65" />
      {/* Hair */}
      <path d="M28 34C26 18 36 12 50 12C64 12 74 18 72 34H28Z" fill="#18181B" />
      {/* Face */}
      <rect x="29" y="28" width="42" height="38" rx="19" fill="#E89A65" />
      {/* Cool Dark Sunglasses */}
      <rect x="30" y="38" width="18" height="12" rx="3.5" fill="#09090B" />
      <rect x="52" y="38" width="18" height="12" rx="3.5" fill="#09090B" />
      <path d="M48 43H52" stroke="#09090B" strokeWidth="2.8" />
      <path d="M33 40.5L41 40.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <path d="M55 40.5L63 40.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      {/* Smirk */}
      <path d="M43 55C46 58 54 58 57 54" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 11. Bạn nữ thể thao băng đô năng động (Headband Sport)
export const FaceHeadbandSport: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-headband">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-headband)">
      <rect width="100" height="100" fill="#A7F3D0" />
      {/* Emerald Track Jacket */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#059669" />
      <path d="M43 68L50 80L57 68H43Z" fill="#FFFFFF" />
      {/* High Ponytail */}
      <circle cx="73" cy="26" r="10" fill="#78350F" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#FBBF24" />
      {/* Face */}
      <rect x="30" y="28" width="40" height="38" rx="19" fill="#FBBF24" />
      {/* Hair Top */}
      <path d="M28 32C28 16 38 12 50 12C62 12 72 16 72 32H28Z" fill="#78350F" />
      {/* Sporty Coral-Orange Headband */}
      <rect x="26" y="25" width="48" height="8" rx="4" fill="#FB923C" />
      {/* Eyes */}
      <circle cx="40" cy="44" r="4.2" fill="#1C1917" />
      <circle cx="39" cy="42.5" r="1.4" fill="#FFFFFF" />
      <circle cx="60" cy="44" r="4.2" fill="#1C1917" />
      <circle cx="59" cy="42.5" r="1.4" fill="#FFFFFF" />
      {/* Tooth Smile */}
      <path d="M42 53C42 59 58 59 58 53H42Z" fill="#78350F" />
      <path d="M44 53H56" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 12. Bạn nữ mũ beret đỏ nghệ sĩ (Beret Artist)
export const FaceBeretArtist: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-beret">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-beret)">
      <rect width="100" height="100" fill="#FCE7F3" />
      {/* Striped Breton Top */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#F8FAFC" />
      <path d="M18 78H82M16 86H84M14 94H86" stroke="#1E3A8A" strokeWidth="2.5" />
      {/* Dark Bob Hair */}
      <path d="M26 34C26 18 36 12 50 12C64 12 74 18 74 34V66C74 66 70 62 67 54L67 38H33L33 54C30 62 26 66 26 66V34Z" fill="#1C1917" />
      {/* Face */}
      <rect x="30" y="30" width="40" height="36" rx="18" fill="#FDE047" />
      {/* French Red Beret */}
      <ellipse cx="50" cy="20" rx="26" ry="13" transform="rotate(-10 50 20)" fill="#E11D48" />
      <circle cx="48" cy="7" r="2.5" fill="#BE123C" />
      {/* Eyes */}
      <path d="M37 43C39 41 43 41 45 43" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="41" cy="45" r="3" fill="#1C1917" />
      <path d="M55 43C57 41 61 41 63 43" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="59" cy="45" r="3" fill="#1C1917" />
      {/* Beauty Mark */}
      <circle cx="62" cy="51" r="1.2" fill="#78350F" />
      {/* Red Lip Smile */}
      <path d="M44 54C46 58 54 58 56 54" stroke="#E11D48" strokeWidth="2.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 13. Bạn trai mũ lưỡi trai ngược (Cap Backward)
export const FaceCapBackward: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-cap">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-cap)">
      <rect width="100" height="100" fill="#FEF3C7" />
      {/* Slate Hoodie */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#475569" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#E89A65" />
      {/* Ears */}
      <circle cx="26" cy="48" r="6" fill="#E89A65" />
      <circle cx="74" cy="48" r="6" fill="#E89A65" />
      {/* Backward Cap Rim */}
      <path d="M26 30C26 14 36 9 50 9C64 9 74 14 74 30H26Z" fill="#2563EB" />
      <path d="M28 16C28 10 50 6 72 16" stroke="#1D4ED8" strokeWidth="4.5" strokeLinecap="round" />
      <rect x="24" y="26" width="52" height="7" rx="3.5" fill="#1D4ED8" />
      {/* Face */}
      <rect x="28" y="30" width="44" height="36" rx="18" fill="#E89A65" />
      {/* Eyes */}
      <circle cx="39" cy="44" r="4.2" fill="#1C1917" />
      <circle cx="38" cy="42.5" r="1.4" fill="#FFFFFF" />
      <circle cx="61" cy="44" r="4.2" fill="#1C1917" />
      <circle cx="60" cy="42.5" r="1.4" fill="#FFFFFF" />
      {/* Smile */}
      <path d="M42 53C45 59 55 59 58 53" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  </svg>
);

// 14. Bé gái má hồng tóc hai búi (Blush Cute)
export const FaceBlushCute: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-blush">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-blush)">
      <rect width="100" height="100" fill="#FCE7F3" />
      {/* Lavender Sweater */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#C084FC" />
      {/* Two Space Buns */}
      <circle cx="26" cy="20" r="12" fill="#3B0764" />
      <circle cx="74" cy="20" r="12" fill="#3B0764" />
      <circle cx="26" cy="20" r="5" fill="#F43F5E" />
      <circle cx="74" cy="20" r="5" fill="#F43F5E" />
      {/* Face */}
      <rect x="29" y="30" width="42" height="36" rx="18" fill="#FDE047" />
      {/* Hair Fringe */}
      <path d="M28 32C34 22 66 22 72 32C68 26 58 24 50 24C42 24 32 26 28 32Z" fill="#3B0764" />
      {/* Sparkling Anime Eyes */}
      <ellipse cx="40" cy="43" rx="4" ry="5" fill="#1C1917" />
      <circle cx="39" cy="40.5" r="1.8" fill="#FFFFFF" />
      <circle cx="41" cy="45.5" r="0.9" fill="#FFFFFF" />

      <ellipse cx="60" cy="43" rx="4" ry="5" fill="#1C1917" />
      <circle cx="59" cy="40.5" r="1.8" fill="#FFFFFF" />
      <circle cx="61" cy="45.5" r="0.9" fill="#FFFFFF" />
      {/* Rosy Cheeks */}
      <circle cx="33" cy="51" r="4.5" fill="#FB7185" opacity="0.65" />
      <circle cx="67" cy="51" r="4.5" fill="#FB7185" opacity="0.65" />
      {/* Cat Smile :3 */}
      <path d="M45 52C46.5 54.5 48.5 54.5 50 52C51.5 54.5 53.5 54.5 55 52" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 15. Quý bà kính tròn thông thái (Elder Glasses)
export const FaceElderGlasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-elder">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-elder)">
      <rect width="100" height="100" fill="#E2E8F0" />
      {/* Teal Cardigan */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#0D9488" />
      <circle cx="44" cy="74" r="1.8" fill="#FFFFFF" />
      <circle cx="47" cy="76" r="1.8" fill="#FFFFFF" />
      <circle cx="50" cy="77" r="1.8" fill="#FFFFFF" />
      <circle cx="53" cy="76" r="1.8" fill="#FFFFFF" />
      <circle cx="56" cy="74" r="1.8" fill="#FFFFFF" />
      {/* Silver Hair */}
      <circle cx="30" cy="34" r="13" fill="#CBD5E1" />
      <circle cx="70" cy="34" r="13" fill="#CBD5E1" />
      <circle cx="50" cy="22" r="17" fill="#CBD5E1" />
      {/* Face */}
      <rect x="30" y="30" width="40" height="36" rx="18" fill="#FDE68A" />
      {/* Golden Round Spectacles */}
      <circle cx="40" cy="44" r="7" stroke="#D97706" strokeWidth="2" fill="#FFFFFF" fillOpacity="0.2" />
      <circle cx="60" cy="44" r="7" stroke="#D97706" strokeWidth="2" fill="#FFFFFF" fillOpacity="0.2" />
      <path d="M47 44H53" stroke="#D97706" strokeWidth="2" />
      {/* Smiling Eyes */}
      <path d="M37 44C39 42 41 42 43 44" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M57 44C59 42 61 42 63 44" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Gentle Smile */}
      <path d="M44 55C46 58.5 54 58.5 56 55" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 16. Chuyên viên nụ cười rạng rỡ (Executive Smile)
export const FaceExecutiveSmile: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-executive">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-executive)">
      <rect width="100" height="100" fill="#E0F2FE" />
      {/* White Shirt with AIA Red Tie */}
      <path d="M12 100C12 76 26 68 50 68C74 68 88 76 88 100H12Z" fill="#F8FAFC" />
      <path d="M47 68L48 88M53 68L52 88" stroke="#D31145" strokeWidth="2.2" strokeLinecap="round" />
      {/* Neck */}
      <rect x="43" y="58" width="14" height="13" rx="4" fill="#E89A65" />
      {/* Ears */}
      <circle cx="26" cy="47" r="6" fill="#E89A65" />
      <circle cx="74" cy="47" r="6" fill="#E89A65" />
      {/* Neat Pompadour Hair */}
      <path d="M28 32C26 16 36 10 50 10C64 10 74 16 72 32H28Z" fill="#451A03" />
      {/* Face */}
      <rect x="28" y="28" width="44" height="38" rx="19" fill="#E89A65" />
      {/* Eyebrows */}
      <path d="M35 37C38 34 43 35 45 37" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 37C57 35 62 34 65 37" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="39" cy="44" r="4.2" fill="#1C1917" />
      <circle cx="38" cy="42.5" r="1.4" fill="#FFFFFF" />
      <circle cx="61" cy="44" r="4.2" fill="#1C1917" />
      <circle cx="60" cy="42.5" r="1.4" fill="#FFFFFF" />
      {/* Broad Tooth Smile */}
      <path d="M41 53C41 60 59 60 59 53H41Z" fill="#451A03" />
      <path d="M43 53H57" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// =========================================================================
// CATALOG REGISTRY
// =========================================================================

export const AVATAR_CATALOG: AvatarItem[] = [
  {
    id: 'face-hijab-pink',
    name: 'Cô gái khăn Hijab hồng',
    category: 'faces_female',
    bgGradient: 'from-sky-100 to-cyan-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceHijabPink,
  },
  {
    id: 'face-turban-winking',
    name: 'Bạn nam Turban nháy mắt',
    category: 'faces_male',
    bgGradient: 'from-sky-100 to-teal-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceTurbanWinking,
  },
  {
    id: 'face-spiky-boy',
    name: 'Bạn trai tóc nhọn rạng rỡ',
    category: 'faces_male',
    bgGradient: 'from-blue-100 to-sky-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceSpikyBoy,
  },
  {
    id: 'face-curly-glasses',
    name: 'Cô gái tóc xoăn đeo kính',
    category: 'faces_female',
    bgGradient: 'from-sky-100 to-indigo-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceCurlyGlasses,
  },
  {
    id: 'face-heart-eyes',
    name: 'Bạn trai mắt trái tim',
    category: 'faces_male',
    bgGradient: 'from-purple-100 to-indigo-200',
    bgColor: '#DDD6FE',
    SvgComponent: FaceHeartEyes,
  },
  {
    id: 'face-beanie-tongue',
    name: 'Bạn trai mũ len lè lưỡi',
    category: 'faces_male',
    bgGradient: 'from-amber-100 to-orange-200',
    bgColor: '#FEEBC8',
    SvgComponent: FaceBeanieTongue,
  },
  {
    id: 'face-flower-crown',
    name: 'Cụ già đội vương miện hoa',
    category: 'faces_creative',
    bgGradient: 'from-cyan-100 to-sky-200',
    bgColor: '#CFFAFE',
    SvgComponent: FaceFlowerCrown,
  },
  {
    id: 'face-blonde-winking',
    name: 'Bạn nữ tóc vàng nháy mắt',
    category: 'faces_female',
    bgGradient: 'from-blue-100 to-sky-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceBlondeWinking,
  },
  {
    id: 'face-trapper-winter',
    name: 'Nón mùa đông che tai',
    category: 'faces_creative',
    bgGradient: 'from-sky-100 to-cyan-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceTrapperWinter,
  },
  {
    id: 'face-cool-sunglasses',
    name: 'Bạn trai ngầu kính râm',
    category: 'faces_male',
    bgGradient: 'from-orange-100 to-amber-200',
    bgColor: '#FED7AA',
    SvgComponent: FaceCoolSunglasses,
  },
  {
    id: 'face-headband-sport',
    name: 'Bạn nữ thể thao năng động',
    category: 'faces_female',
    bgGradient: 'from-emerald-100 to-teal-200',
    bgColor: '#A7F3D0',
    SvgComponent: FaceHeadbandSport,
  },
  {
    id: 'face-beret-artist',
    name: 'Bạn nữ mũ Beret đỏ',
    category: 'faces_female',
    bgGradient: 'from-pink-100 to-rose-200',
    bgColor: '#FCE7F3',
    SvgComponent: FaceBeretArtist,
  },
  {
    id: 'face-cap-backward',
    name: 'Bạn trai mũ lưỡi trai ngược',
    category: 'faces_male',
    bgGradient: 'from-yellow-100 to-amber-200',
    bgColor: '#FEF3C7',
    SvgComponent: FaceCapBackward,
  },
  {
    id: 'face-blush-cute',
    name: 'Bé gái má hồng hai búi',
    category: 'faces_female',
    bgGradient: 'from-rose-100 to-pink-200',
    bgColor: '#FCE7F3',
    SvgComponent: FaceBlushCute,
  },
  {
    id: 'face-elder-glasses',
    name: 'Quý bà kính tròn thông thái',
    category: 'faces_creative',
    bgGradient: 'from-slate-100 to-teal-200',
    bgColor: '#E2E8F0',
    SvgComponent: FaceElderGlasses,
  },
  {
    id: 'face-executive-smile',
    name: 'Chuyên viên nụ cười ấm áp',
    category: 'faces_male',
    bgGradient: 'from-sky-100 to-blue-200',
    bgColor: '#E0F2FE',
    SvgComponent: FaceExecutiveSmile,
  },
];

export const LEGACY_AVATAR_MAP: Record<string, string> = {
  'exec-woman-blazer': 'face-hijab-pink',
  'corporate-director': 'face-spiky-boy',
  'business-owner': 'face-turban-winking',
  'medical-specialist': 'face-curly-glasses',
  'finance-analyst': 'face-heart-eyes',
  'academic-scholar': 'face-beanie-tongue',
  'doctor-surgeon': 'face-flower-crown',
  'exec-woman-glasses': 'face-blonde-winking',
  'trade-executive': 'face-trapper-winter',
  'legal-counsel': 'face-cool-sunglasses',
  'consultant-expert': 'face-headband-sport',
  'exec-man-navy': 'face-executive-smile',
};

export function getAvatarById(id?: string): AvatarItem | undefined {
  if (!id) return undefined;
  const direct = AVATAR_CATALOG.find((a) => a.id === id);
  if (direct) return direct;
  const mappedId = LEGACY_AVATAR_MAP[id];
  if (mappedId) {
    return AVATAR_CATALOG.find((a) => a.id === mappedId);
  }
  return undefined;
}

export function getDefaultAvatarForCustomer(customerId: string, name?: string): AvatarItem {
  const key = `${customerId || ''}-${name || ''}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_CATALOG.length;
  return AVATAR_CATALOG[index];
}
