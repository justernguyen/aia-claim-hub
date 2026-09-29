import React from 'react';

export type AvatarCategory = 'all' | 'faces_female' | 'faces_male' | 'faces_creative';

export interface AvatarCategoryMeta {
  key: AvatarCategory;
  label: string;
  icon: string;
}

export const AVATAR_CATEGORIES: AvatarCategoryMeta[] = [
  { key: 'all', label: 'Tất cả (50)', icon: '✨' },
  { key: 'faces_female', label: 'Nữ tươi tắn (20)', icon: '👩' },
  { key: 'faces_male', label: 'Nam năng động (20)', icon: '👨' },
  { key: 'faces_creative', label: 'Sáng tạo & Nghề (10)', icon: '🎨' },
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


// 17. Bạn nữ tóc tém cá tính, khuyên tai bạc (Pixie Hair)
export const FacePixieHair: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-pixie-hair">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-pixie-hair)">
      <rect width="100" height="100" fill="#E9D5FF" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#7C3AED" />
      <path d="M38 72L50 86L62 72H38Z" fill="#FFFFFF" />
      <rect x="44" y="56" width="12" height="16" fill="#FCD34D" />
      <ellipse cx="50" cy="46" rx="17" ry="19" fill="#FCD34D" />
      <circle cx="31" cy="48" r="3.5" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
      <circle cx="69" cy="48" r="3.5" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
      <path d="M32 44C31 30 40 18 53 18C68 18 73 30 71 44C69 36 62 26 50 26C38 26 34 35 32 44Z" fill="#1E1B4B" />
      <path d="M31 34C36 30 46 29 55 35C48 33 40 34 35 38L31 34Z" fill="#1E1B4B" />
      <path d="M68 32C72 38 71 46 69 50C71 44 72 37 68 32Z" fill="#1E1B4B" />
      <path d="M37 38C40 36 44 37 46 38" stroke="#1E1B4B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M54 38C56 37 60 36 63 38" stroke="#1E1B4B" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="41" cy="44" r="3.2" fill="#1E1B4B" />
      <circle cx="40" cy="43" r="1.2" fill="#FFFFFF" />
      <path d="M44 42L46 40" stroke="#1E1B4B" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="59" cy="44" r="3.2" fill="#1E1B4B" />
      <circle cx="58" cy="43" r="1.2" fill="#FFFFFF" />
      <path d="M62 42L64 40" stroke="#1E1B4B" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="36" cy="50" r="3.5" fill="#F472B6" opacity="0.6" />
      <circle cx="64" cy="50" r="3.5" fill="#F472B6" opacity="0.6" />
      <path d="M46 54C47 57 53 57 54 54" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 18. Bạn gái búi tóc củ tỏi năng động (Top Bun)
export const FaceTopBun: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-top-bun">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-top-bun)">
      <rect width="100" height="100" fill="#FEF08A" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#FB923C" />
      <path d="M44 72V100M50 72V100M56 72V100" stroke="#EA580C" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect x="44" y="58" width="12" height="14" fill="#FED7AA" />
      <ellipse cx="50" cy="48" rx="17" ry="19" fill="#FED7AA" />
      <circle cx="50" cy="18" r="14" fill="#78350F" />
      <ellipse cx="50" cy="28" rx="8" ry="3.5" fill="#F59E0B" />
      <path d="M31 46C31 30 38 24 50 24C62 24 69 30 69 46C66 38 58 32 50 32C42 32 34 38 31 46Z" fill="#78350F" />
      <path d="M37 36C42 41 45 42 48 37" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M39 46C41 43 45 43 47 46" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M53 46C55 43 59 43 61 46" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="52" r="4.5" fill="#FB7185" opacity="0.6" />
      <circle cx="64" cy="52" r="4.5" fill="#FB7185" opacity="0.6" />
      <ellipse cx="50" cy="56" rx="4" ry="3" fill="#991B1B" />
      <path d="M48 56.5C49 57.5 51 57.5 52 56.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 19. Nữ bác sĩ áo blouse trắng, ống nghe y tế (Doctor Female)
export const FaceDoctorFemale: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-doctor-female">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-doctor-female)">
      <rect width="100" height="100" fill="#A7F3D0" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <path d="M40 70L50 85L60 70Z" fill="#0D9488" />
      <path d="M36 74C36 88 44 94 48 94C52 94 60 88 60 74" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="48" cy="94" r="3.5" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
      <rect x="44" y="56" width="12" height="16" fill="#FDE68A" />
      <ellipse cx="50" cy="46" rx="16.5" ry="19" fill="#FDE68A" />
      <path d="M31 48C30 30 38 20 50 20C62 20 70 30 69 48C67 36 60 28 50 28C40 28 33 36 31 48Z" fill="#1F2937" />
      <path d="M30 46C29 55 32 62 35 66" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 46C71 55 68 62 65 66" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="44" r="3" fill="#1F2937" />
      <circle cx="40" cy="43" r="1" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3" fill="#1F2937" />
      <circle cx="58" cy="43" r="1" fill="#FFFFFF" />
      <path d="M37 38C40 36 44 37 46 38" stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M54 38C56 37 60 36 63 38" stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M44 54C47 58 53 58 56 54" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="51" r="3" fill="#FB7185" opacity="0.5" />
      <circle cx="64" cy="51" r="3" fill="#FB7185" opacity="0.5" />
    </g>
  </svg>
);

// 20. Nữ tiếp viên hàng không mũ calot đỏ AIA (Flight Attendant)
export const FaceFlightAttendant: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-flight-attendant">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-flight-attendant)">
      <rect width="100" height="100" fill="#FCE7F3" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#DC2626" />
      <path d="M42 70L50 82L58 70Z" fill="#FFFFFF" />
      <path d="M46 72L50 84L54 72Z" fill="#BE123C" />
      <rect x="44" y="56" width="12" height="16" fill="#FCD34D" />
      <ellipse cx="50" cy="46" rx="16.5" ry="18.5" fill="#FCD34D" />
      <path d="M31 46C31 30 39 23 50 23C61 23 69 30 69 46C67 36 60 28 50 28C40 28 33 36 31 46Z" fill="#0F172A" />
      <path d="M32 24C32 16 62 13 68 20L64 27C55 24 40 25 32 24Z" fill="#DC2626" />
      <path d="M33 24C42 24 57 24 64 26" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="41" cy="44" r="3.2" fill="#0F172A" />
      <circle cx="40" cy="43" r="1.2" fill="#FFFFFF" />
      <path d="M44 42L46 40" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="59" cy="44" r="3.2" fill="#0F172A" />
      <circle cx="58" cy="43" r="1.2" fill="#FFFFFF" />
      <path d="M62 42L64 40" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M43 54C46 58 54 58 57 54" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="50" r="3.5" fill="#FB7185" opacity="0.6" />
      <circle cx="64" cy="50" r="3.5" fill="#FB7185" opacity="0.6" />
    </g>
  </svg>
);

// 21. Cô gái tóc ngắn bob uốn cụp duyên dáng (Bob Cut)
export const FaceBobCut: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-bob-cut">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-bob-cut)">
      <rect width="100" height="100" fill="#FED7AA" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#6EE7B7" />
      <ellipse cx="50" cy="72" rx="12" ry="4" fill="#34D399" />
      <ellipse cx="50" cy="47" rx="17" ry="19" fill="#FDE68A" />
      <path d="M28 48C28 26 36 18 50 18C64 18 72 26 72 48C72 64 68 66 63 64C63 56 68 44 67 36C63 26 56 24 50 24C44 24 37 26 33 36C32 44 37 56 37 64C32 66 28 64 28 48Z" fill="#92400E" />
      <path d="M33 34C40 37 46 38 52 35C57 37 63 36 67 34" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="33" cy="34" r="3.5" fill="#FFFFFF" />
      <circle cx="33" cy="34" r="1.5" fill="#F59E0B" />
      <circle cx="41" cy="45" r="3.2" fill="#451A03" />
      <circle cx="40" cy="43.5" r="1.2" fill="#FFFFFF" />
      <circle cx="59" cy="45" r="3.2" fill="#451A03" />
      <circle cx="58" cy="43.5" r="1.2" fill="#FFFFFF" />
      <path d="M45 54C47 57 53 57 55 54" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="51" r="3.5" fill="#F472B6" opacity="0.6" />
      <circle cx="64" cy="51" r="3.5" fill="#F472B6" opacity="0.6" />
    </g>
  </svg>
);

// 22. Cô nàng mọt sách kính to tròn (Nerd Girl)
export const FaceNerdGirl: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-nerd-girl">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-nerd-girl)">
      <rect width="100" height="100" fill="#BAE6FD" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#1E3A8A" />
      <path d="M42 72L50 82L58 72Z" fill="#FFFFFF" />
      <circle cx="27" cy="62" r="5" fill="#78350F" />
      <circle cx="26" cy="70" r="4.5" fill="#78350F" />
      <rect x="24" y="66" width="6" height="3" fill="#EF4444" rx="1.5" />
      <circle cx="73" cy="62" r="5" fill="#78350F" />
      <circle cx="74" cy="70" r="4.5" fill="#78350F" />
      <rect x="70" y="66" width="6" height="3" fill="#EF4444" rx="1.5" />
      <ellipse cx="50" cy="46" rx="16.5" ry="18.5" fill="#FCD34D" />
      <path d="M31 44C31 28 39 20 50 20C61 20 69 28 69 44C66 34 58 26 50 26C42 26 34 34 31 44Z" fill="#78350F" />
      <circle cx="41" cy="45" r="7.5" stroke="#1E293B" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.15" />
      <circle cx="59" cy="45" r="7.5" stroke="#1E293B" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.15" />
      <line x1="48.5" y1="45" x2="51.5" y2="45" stroke="#1E293B" strokeWidth="2" />
      <circle cx="41" cy="45" r="2.8" fill="#1E293B" />
      <circle cx="40" cy="44" r="1" fill="#FFFFFF" />
      <circle cx="59" cy="45" r="2.8" fill="#1E293B" />
      <circle cx="58" cy="44" r="1" fill="#FFFFFF" />
      <circle cx="45" cy="51" r="0.8" fill="#B45309" />
      <circle cx="47" cy="52" r="0.8" fill="#B45309" />
      <circle cx="53" cy="52" r="0.8" fill="#B45309" />
      <circle cx="55" cy="51" r="0.8" fill="#B45309" />
      <path d="M46 55C48 57 52 57 54 55" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 23. Bạn nữ mũ len vàng ấm áp mùa đông (Winter Beanie Girl)
export const FaceWinterBeanieGirl: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-winter-beanie-girl">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-winter-beanie-girl)">
      <rect width="100" height="100" fill="#BFDBFE" />
      <path d="M20 100C20 78 30 72 50 72C70 72 80 78 80 100H20Z" fill="#1E3A8A" />
      <ellipse cx="50" cy="74" rx="20" ry="10" fill="#DC2626" />
      <ellipse cx="50" cy="74" rx="16" ry="6" fill="#B91C1C" />
      <ellipse cx="50" cy="48" rx="16.5" ry="18" fill="#FEE2E2" />
      <path d="M33 46C31 56 34 66 38 68" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <path d="M67 46C69 56 66 66 62 68" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="11" r="7" fill="#FFFFFF" />
      <path d="M30 38C30 18 40 14 50 14C60 14 70 18 70 38H30Z" fill="#EAB308" />
      <rect x="28" y="34" width="44" height="7" rx="3.5" fill="#CA8A04" />
      <circle cx="36" cy="53" r="4.5" fill="#FB7185" opacity="0.7" />
      <circle cx="64" cy="53" r="4.5" fill="#FB7185" opacity="0.7" />
      <path d="M39 47C41 44 45 44 47 47" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M53 47C55 44 59 44 61 47" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="50" cy="56" rx="3.5" ry="2.5" fill="#DC2626" />
    </g>
  </svg>
);

// 24. Cô gái tóc đuôi ngựa cột cao hiện đại (Ponytail)
export const FacePonytail: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-ponytail">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-ponytail)">
      <rect width="100" height="100" fill="#99F6E4" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#A855F7" />
      <path d="M58 24C68 20 82 25 84 44C82 52 76 56 74 60C76 54 80 46 76 38C72 32 64 28 58 24Z" fill="#B45309" />
      <circle cx="58" cy="24" r="3.5" fill="#EC4899" />
      <ellipse cx="48" cy="46" rx="16.5" ry="18.5" fill="#FCD34D" />
      <path d="M30 44C30 28 38 22 48 22C58 22 66 28 66 44C63 34 56 26 48 26C40 26 33 34 30 44Z" fill="#B45309" />
      <ellipse cx="32" cy="48" rx="2" ry="3.5" fill="#FFFFFF" />
      <rect x="31" y="50" width="2" height="4" fill="#FFFFFF" rx="1" />
      <path d="M37 44C39 47 43 47 45 44" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="56" cy="44" r="3" fill="#451A03" />
      <circle cx="55" cy="43" r="1.1" fill="#FFFFFF" />
      <path d="M43 54C46 58 52 58 55 54" stroke="#9D174D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="51" r="3.5" fill="#FB7185" opacity="0.5" />
      <circle cx="61" cy="51" r="3.5" fill="#FB7185" opacity="0.5" />
    </g>
  </svg>
);

// 25. Quý cô khăn lụa công sở cao cấp (Silk Scarf)
export const FaceSilkScarf: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-silk-scarf">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-silk-scarf)">
      <rect width="100" height="100" fill="#DDD6FE" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#334155" />
      <path d="M38 70C42 84 50 92 50 92C50 92 58 84 62 70Z" fill="#2563EB" />
      <path d="M46 70L50 86L54 70Z" fill="#60A5FA" />
      <rect x="44" y="56" width="12" height="16" fill="#FEE2E2" />
      <ellipse cx="50" cy="46" rx="16.5" ry="18.5" fill="#FEE2E2" />
      <circle cx="32" cy="48" r="2.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="68" cy="48" r="2.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M29 48C28 26 38 18 50 18C62 18 72 26 71 48C69 36 62 26 50 26C38 26 31 36 29 48Z" fill="#0F172A" />
      <path d="M29 46C27 58 32 66 36 70" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
      <path d="M71 46C73 58 68 66 64 70" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="41" cy="44" r="3" fill="#0F172A" />
      <circle cx="40" cy="43" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3" fill="#0F172A" />
      <circle cx="58" cy="43" r="1.1" fill="#FFFFFF" />
      <path d="M44 54C47 57 53 57 56 54" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 26. Bé gái băng đô tai thỏ tinh nghịch (Bunny Ears)
export const FaceBunnyEars: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-bunny-ears">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-bunny-ears)">
      <rect width="100" height="100" fill="#FECDD3" />
      <ellipse cx="38" cy="18" rx="6" ry="14" fill="#FFFFFF" transform="rotate(-10 38 18)" />
      <ellipse cx="38" cy="18" rx="3.5" ry="9" fill="#FB7185" transform="rotate(-10 38 18)" />
      <ellipse cx="62" cy="18" rx="6" ry="14" fill="#FFFFFF" transform="rotate(10 62 18)" />
      <ellipse cx="62" cy="18" rx="3.5" ry="9" fill="#FB7185" transform="rotate(10 62 18)" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#FEF08A" />
      <ellipse cx="50" cy="50" rx="18" ry="18" fill="#FED7AA" />
      <path d="M31 48C31 32 38 28 50 28C62 28 69 32 69 48C66 40 58 35 50 35C42 35 34 40 31 48Z" fill="#78350F" />
      <rect x="30" y="28" width="40" height="4" rx="2" fill="#F43F5E" />
      <circle cx="41" cy="48" r="4" fill="#451A03" />
      <circle cx="40" cy="46" r="1.5" fill="#FFFFFF" />
      <circle cx="42" cy="49" r="0.8" fill="#FFFFFF" />
      <circle cx="59" cy="48" r="4" fill="#451A03" />
      <circle cx="58" cy="46" r="1.5" fill="#FFFFFF" />
      <circle cx="60" cy="49" r="0.8" fill="#FFFFFF" />
      <circle cx="34" cy="54" r="5" fill="#FB7185" opacity="0.6" />
      <circle cx="66" cy="54" r="5" fill="#FB7185" opacity="0.6" />
      <path d="M46 56C48 58 50 56 50 56C50 56 52 58 54 56" stroke="#991B1B" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 27. Nữ nhân viên văn phòng thanh lịch đeo thẻ AIA (Office Lady)
export const FaceOfficeLady: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-office-lady">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-office-lady)">
      <rect width="100" height="100" fill="#E0F2FE" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <path d="M42 70L48 90M58 70L52 90" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <rect x="46" y="88" width="8" height="12" rx="1" fill="#D32F2F" />
      <rect x="44" y="56" width="12" height="16" fill="#FDE68A" />
      <ellipse cx="50" cy="46" rx="16.5" ry="18.5" fill="#FDE68A" />
      <path d="M30 46C29 28 38 20 50 20C62 20 71 28 70 46C68 36 60 27 50 27C40 27 32 36 30 46Z" fill="#451A03" />
      <path d="M30 46C29 58 32 64 36 68" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 46C71 58 68 64 64 68" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="44" r="3" fill="#1C1917" />
      <circle cx="40" cy="43" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3" fill="#1C1917" />
      <circle cx="58" cy="43" r="1.1" fill="#FFFFFF" />
      <path d="M43 54C46 58 54 58 57 54" stroke="#BE123C" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="36" cy="51" r="3.5" fill="#FB7185" opacity="0.5" />
      <circle cx="64" cy="51" r="3.5" fill="#FB7185" opacity="0.5" />
    </g>
  </svg>
);

// 28. Cô nàng tóc xoăn phồng cá tính (Curly Afro)
export const FaceCurlyAfro: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-curly-afro">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-curly-afro)">
      <rect width="100" height="100" fill="#FDE68A" />
      <circle cx="50" cy="42" r="30" fill="#1C1917" />
      <circle cx="30" cy="38" r="14" fill="#1C1917" />
      <circle cx="70" cy="38" r="14" fill="#1C1917" />
      <circle cx="50" cy="20" r="14" fill="#1C1917" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#059669" />
      <ellipse cx="50" cy="48" rx="17" ry="19" fill="#93532C" />
      <circle cx="28" cy="50" r="4.5" stroke="#F59E0B" strokeWidth="2" fill="none" />
      <circle cx="72" cy="50" r="4.5" stroke="#F59E0B" strokeWidth="2" fill="none" />
      <circle cx="41" cy="45" r="3.2" fill="#1C1917" />
      <circle cx="40" cy="44" r="1.2" fill="#FFFFFF" />
      <circle cx="59" cy="45" r="3.2" fill="#1C1917" />
      <circle cx="58" cy="44" r="1.2" fill="#FFFFFF" />
      <path d="M43 54C43 60 57 60 57 54H43Z" fill="#FFFFFF" />
      <path d="M41 54C41 62 59 62 59 54Z" stroke="#451A03" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

// 29. Bạn nữ gamer tai nghe gaming hồng (Gamer Girl)
export const FaceGamerGirl: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-gamer-girl">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-gamer-girl)">
      <rect width="100" height="100" fill="#F5D0FE" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#18181B" />
      <path d="M42 82L50 74L58 82" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 40C26 22 36 14 50 14C64 14 74 22 74 40" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" fill="none" />
      <polygon points="34,16 42,22 32,24" fill="#EC4899" />
      <polygon points="66,16 58,22 68,24" fill="#EC4899" />
      <ellipse cx="50" cy="48" rx="16.5" ry="18" fill="#FED7AA" />
      <path d="M31 46C31 32 39 26 50 26C61 26 69 32 69 46C67 36 60 30 50 30C40 30 33 36 31 46Z" fill="#9333EA" />
      <rect x="22" y="38" width="8" height="16" rx="4" fill="#EC4899" />
      <circle cx="26" cy="46" r="2.5" fill="#06B6D4" />
      <rect x="70" y="38" width="8" height="16" rx="4" fill="#EC4899" />
      <circle cx="74" cy="46" r="2.5" fill="#06B6D4" />
      <path d="M26 50C26 58 36 60 40 60" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M38 46C40 43 44 43 46 46" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="58" cy="45" r="3" fill="#451A03" />
      <circle cx="57" cy="44" r="1" fill="#FFFFFF" />
      <path d="M45 54C47 57 53 57 55 54" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" />
      <circle cx="35" cy="51" r="3.5" fill="#F472B6" opacity="0.6" />
      <circle cx="63" cy="51" r="3.5" fill="#F472B6" opacity="0.6" />
    </g>
  </svg>
);

// 30. Nữ sinh áo sơ mi thắt nơ đỏ (Schoolgirl)
export const FaceSchoolgirl: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-schoolgirl">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-schoolgirl)">
      <rect width="100" height="100" fill="#CFFAFE" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <path d="M34 70L50 82L66 70H34Z" fill="#1E3A8A" />
      <polygon points="46,78 54,78 56,86 50,83 44,86" fill="#DC2626" />
      <circle cx="50" cy="79" r="2.5" fill="#B91C1C" />
      <rect x="44" y="56" width="12" height="16" fill="#FCD34D" />
      <ellipse cx="50" cy="46" rx="16.5" ry="18.5" fill="#FCD34D" />
      <path d="M29 48C28 26 38 18 50 18C62 18 72 26 71 48C70 56 68 64 64 68C65 56 69 44 68 36C64 26 56 24 50 24C44 24 36 26 32 36C31 44 35 56 36 68C32 64 30 56 29 48Z" fill="#1E293B" />
      <path d="M35 34C40 37 45 38 50 37C55 38 60 37 65 34" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="45" r="3.5" fill="#0F172A" />
      <circle cx="40" cy="43.5" r="1.3" fill="#FFFFFF" />
      <circle cx="42" cy="46" r="0.8" fill="#FFFFFF" />
      <circle cx="59" cy="45" r="3.5" fill="#0F172A" />
      <circle cx="58" cy="43.5" r="1.3" fill="#FFFFFF" />
      <circle cx="60" cy="46" r="0.8" fill="#FFFFFF" />
      <path d="M46 54C48 56 52 56 54 54" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="35" cy="51" r="3.5" fill="#FB7185" opacity="0.6" />
      <circle cx="65" cy="51" r="3.5" fill="#FB7185" opacity="0.6" />
    </g>
  </svg>
);

// 31. Chàng trai IT đeo kính tri thức (Dev Glasses)
export const FaceDevGlasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-dev-glasses">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-dev-glasses)">
      <rect width="100" height="100" fill="#CBD5E1" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#334155" />
      <path d="M44 70L50 80L56 70Z" fill="#0284C7" />
      <rect x="43" y="56" width="14" height="16" fill="#FDE68A" />
      <ellipse cx="50" cy="46" rx="17" ry="19" fill="#FDE68A" />
      <path d="M30 40C28 24 38 16 50 16C62 16 72 24 70 40C66 32 60 25 50 25C40 25 34 32 30 40Z" fill="#451A03" />
      <path d="M38 22L42 28L48 20L54 27L60 21" stroke="#451A03" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="32" y="38" width="15" height="12" rx="3" stroke="#0F172A" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.1" />
      <rect x="53" y="38" width="15" height="12" rx="3" stroke="#0F172A" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.1" />
      <line x1="47" y1="44" x2="53" y2="44" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="39.5" cy="44" r="2.8" fill="#0F172A" />
      <circle cx="38.5" cy="43" r="1" fill="#FFFFFF" />
      <circle cx="60.5" cy="44" r="2.8" fill="#0F172A" />
      <circle cx="59.5" cy="43" r="1" fill="#FFFFFF" />
      <path d="M44 55C47 57 53 56 56 53" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 32. Quý ông râu quai nón sành điệu (Beard Hipster)
export const FaceBeardHipster: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-beard-hipster">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-beard-hipster)">
      <rect width="100" height="100" fill="#FED7AA" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#B91C1C" />
      <path d="M40 70L50 82L60 70Z" fill="#1C1917" />
      <ellipse cx="50" cy="45" rx="17" ry="19" fill="#FCD34D" />
      <path d="M30 38C28 20 40 12 50 12C60 12 72 20 70 38C66 28 60 22 50 22C40 22 34 28 30 38Z" fill="#292524" />
      <path d="M33 46C33 66 40 72 50 72C60 72 67 66 67 46C67 52 64 62 50 62C36 62 33 52 33 46Z" fill="#292524" />
      <path d="M41 52C45 49 50 51 50 51C50 51 55 49 59 52C61 54 57 56 50 54C43 56 39 54 41 52Z" fill="#1C1917" />
      <path d="M36 36C39 34 44 35 46 36" stroke="#292524" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M54 36C56 35 61 34 64 36" stroke="#292524" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="41" cy="41" r="3" fill="#1C1917" />
      <circle cx="40" cy="40" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="41" r="3" fill="#1C1917" />
      <circle cx="58" cy="40" r="1.1" fill="#FFFFFF" />
      <path d="M46 56C48 58 52 58 54 56" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 33. Bác sĩ nam áo blouse xanh hiền từ (Doctor Male)
export const FaceDoctorMale: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-doctor-male">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-doctor-male)">
      <rect width="100" height="100" fill="#A7F3D0" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <path d="M38 70L50 84L62 70Z" fill="#0284C7" />
      <path d="M36 72C36 86 44 92 48 92C52 92 60 86 60 72" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="48" cy="92" r="3.5" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
      <rect x="43" y="56" width="14" height="16" fill="#FDE68A" />
      <ellipse cx="50" cy="46" rx="17" ry="19" fill="#FDE68A" />
      <path d="M31 42C30 26 38 18 50 18C62 18 70 26 69 42C66 32 58 24 50 24C42 24 34 32 31 42Z" fill="#475569" />
      <path d="M30 42C29 38 31 34 33 30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 42C71 38 69 34 67 30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="41" cy="43" r="3" fill="#1E293B" />
      <circle cx="40" cy="42" r="1" fill="#FFFFFF" />
      <circle cx="59" cy="43" r="3" fill="#1E293B" />
      <circle cx="58" cy="42" r="1" fill="#FFFFFF" />
      <path d="M35 44L33 45M65 44L67 45" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M43 54C46 58 54 58 57 54" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 34. Game thủ tai nghe gaming LED xanh (Gamer Boy)
export const FaceGamerBoy: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-gamer-boy">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-gamer-boy)">
      <rect width="100" height="100" fill="#E9D5FF" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#1E1B4B" />
      <path d="M26 40C26 22 36 14 50 14C64 14 74 22 74 40" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="50" cy="48" rx="17" ry="19" fill="#FCD34D" />
      <path d="M31 38C32 24 40 18 50 18C60 18 68 24 69 38C64 30 58 24 50 24C42 24 36 30 31 38Z" fill="#1E293B" />
      <path d="M40 22L46 16L50 24L56 16L60 22" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="22" y="38" width="8" height="16" rx="4" fill="#0F172A" />
      <circle cx="26" cy="46" r="2.5" stroke="#06B6D4" strokeWidth="1.5" fill="none" />
      <rect x="70" y="38" width="8" height="16" rx="4" fill="#0F172A" />
      <circle cx="74" cy="46" r="2.5" stroke="#06B6D4" strokeWidth="1.5" fill="none" />
      <path d="M26 50C26 58 36 60 40 60" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="41" cy="44" r="3.2" fill="#0F172A" />
      <circle cx="40" cy="43" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3.2" fill="#0F172A" />
      <circle cx="58" cy="43" r="1.1" fill="#FFFFFF" />
      <path d="M43 54C46 58 54 58 57 54" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 35. Phi công thương mại mũ đại cán viền vàng (Pilot)
export const FacePilot: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-pilot">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-pilot)">
      <rect width="100" height="100" fill="#BAE6FD" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <polygon points="48,70 52,70 54,92 50,96 46,92" fill="#0F172A" />
      <rect x="18" y="80" width="10" height="3" fill="#F59E0B" />
      <rect x="18" y="85" width="10" height="3" fill="#F59E0B" />
      <rect x="72" y="80" width="10" height="3" fill="#F59E0B" />
      <rect x="72" y="85" width="10" height="3" fill="#F59E0B" />
      <ellipse cx="50" cy="48" rx="17" ry="19" fill="#FCD34D" />
      <path d="M26 28C26 18 40 14 50 14C60 14 74 18 74 28H26Z" fill="#0F172A" />
      <rect x="24" y="28" width="52" height="6" rx="2" fill="#1E293B" />
      <line x1="28" y1="32" x2="72" y2="32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="24" r="3.5" fill="#F59E0B" />
      <circle cx="41" cy="44" r="3" fill="#0F172A" />
      <circle cx="40" cy="43" r="1" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3" fill="#0F172A" />
      <circle cx="58" cy="43" r="1" fill="#FFFFFF" />
      <path d="M44 54C47 57 53 57 56 54" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 36. Chàng trai lãng tử tóc uốn gợn sóng (Wavy Hair)
export const FaceWavyHair: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-wavy-hair">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-wavy-hair)">
      <rect width="100" height="100" fill="#FFEDD5" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#D97706" />
      <rect x="40" y="66" width="20" height="12" rx="4" fill="#B45309" />
      <ellipse cx="50" cy="47" rx="17" ry="19" fill="#FEF08A" />
      <path d="M28 42C28 22 38 16 50 16C62 16 72 22 72 42C68 34 60 26 50 26C40 26 32 34 28 42Z" fill="#78350F" />
      <path d="M34 26C38 32 44 34 48 30C52 34 58 32 62 26" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 43C40 40 44 40 46 43" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M54 43C56 40 60 40 62 43" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="36" cy="49" r="3" fill="#FB7185" opacity="0.4" />
      <circle cx="64" cy="49" r="3" fill="#FB7185" opacity="0.4" />
      <path d="M43 53C46 57 54 57 57 53" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 37. Quý ông ria mép cong lịch thiệp (Mustache Gentle)
export const FaceMustacheGentle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-mustache-gentle">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-mustache-gentle)">
      <rect width="100" height="100" fill="#FEF08A" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#166534" />
      <path d="M44 70L50 82L56 70Z" fill="#FFFFFF" />
      <polygon points="46,74 54,74 52,78 48,78" fill="#DC2626" />
      <circle cx="50" cy="76" r="1.5" fill="#B91C1C" />
      <ellipse cx="50" cy="46" rx="17" ry="19" fill="#FDE68A" />
      <path d="M30 38C29 24 38 18 50 18C62 18 71 24 70 38C66 30 60 25 50 25C40 25 34 30 30 38Z" fill="#451A03" />
      <path d="M38 52C42 48 48 51 50 51C52 51 58 48 62 52C64 54 60 56 50 53C40 56 36 54 38 52Z" fill="#451A03" />
      <circle cx="41" cy="42" r="3" fill="#1C1917" />
      <circle cx="40" cy="41" r="1" fill="#FFFFFF" />
      <circle cx="59" cy="42" r="3" fill="#1C1917" />
      <circle cx="58" cy="41" r="1" fill="#FFFFFF" />
      <path d="M46 57C48 59 52 59 54 57" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

// 38. Nam sinh cà vạt sọc trẻ trung (Student Boy)
export const FaceStudentBoy: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-student-boy">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-student-boy)">
      <rect width="100" height="100" fill="#CCFBF1" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <polygon points="48,70 52,70 55,94 50,98 45,94" fill="#2563EB" />
      <path d="M47 76L53 79M46 84L54 87" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="46" rx="16.5" ry="18.5" fill="#FCD34D" />
      <path d="M30 42C29 26 38 18 50 18C62 18 71 26 70 42C67 34 60 26 50 26C40 26 33 34 30 42Z" fill="#3E2723" />
      <path d="M34 30C40 34 46 36 52 34C58 35 62 33 66 30" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="44" r="3.2" fill="#1C1917" />
      <circle cx="40" cy="43" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3.2" fill="#1C1917" />
      <circle cx="58" cy="43" r="1.1" fill="#FFFFFF" />
      <path d="M43 53C43 59 57 59 57 53H43Z" fill="#B91C1C" />
      <path d="M45 53H55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="36" cy="50" r="3" fill="#FB7185" opacity="0.4" />
      <circle cx="64" cy="50" r="3" fill="#FB7185" opacity="0.4" />
    </g>
  </svg>
);

// 39. Vận động viên băng trán thể thao (Sport Sweatband)
export const FaceSportSweatband: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-sport-sweatband">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-sport-sweatband)">
      <rect width="100" height="100" fill="#FECACA" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#DC2626" />
      <path d="M36 72V100M64 72V100" stroke="#FFFFFF" strokeWidth="2.5" />
      <ellipse cx="50" cy="48" rx="17" ry="19" fill="#F59E0B" />
      <path d="M32 32C30 18 42 12 50 12C58 12 70 18 68 32H32Z" fill="#18181B" />
      <polygon points="36,18 42,10 46,18" fill="#18181B" />
      <polygon points="46,16 52,8 56,16" fill="#18181B" />
      <polygon points="56,18 62,10 66,18" fill="#18181B" />
      <rect x="29" y="28" width="42" height="7" rx="3.5" fill="#FFFFFF" />
      <rect x="33" y="30.5" width="34" height="2" fill="#DC2626" />
      <path d="M36 39L46 41M64 39L54 41" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="41" cy="45" r="3.2" fill="#18181B" />
      <circle cx="40" cy="44" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="45" r="3.2" fill="#18181B" />
      <circle cx="58" cy="44" r="1.1" fill="#FFFFFF" />
      <path d="M42 54C42 61 58 61 58 54H42Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.5" />
    </g>
  </svg>
);

// 40. Cậu bạn cười răng khểnh dễ thương (Snaggletooth)
export const FaceSnaggletooth: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-snaggletooth">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-snaggletooth)">
      <rect width="100" height="100" fill="#FDE047" />
      <path d="M18 100C18 78 30 72 50 72C70 72 82 78 82 100H18Z" fill="#0D9488" />
      <ellipse cx="50" cy="47" rx="17" ry="19" fill="#FCD34D" />
      <path d="M30 40C28 22 38 16 50 16C62 16 72 22 70 40C66 32 58 26 50 26C42 26 34 32 30 40Z" fill="#9A3412" />
      <path d="M34 26L40 20L44 27L52 18L58 28" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="41" cy="44" r="3.5" fill="#451A03" />
      <circle cx="40" cy="42.5" r="1.2" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3.5" fill="#451A03" />
      <circle cx="58" cy="42.5" r="1.2" fill="#FFFFFF" />
      <path d="M42 53C42 61 58 61 58 53H42Z" fill="#78350F" />
      <polygon points="52,53 55,53 53.5,57" fill="#FFFFFF" />
      <circle cx="36" cy="50" r="3.5" fill="#FB7185" opacity="0.5" />
      <circle cx="64" cy="50" r="3.5" fill="#FB7185" opacity="0.5" />
    </g>
  </svg>
);

// 41. Bạn trai áo hoodie xám năng động (Hoodie Boy)
export const FaceHoodieBoy: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-hoodie-boy">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-hoodie-boy)">
      <rect width="100" height="100" fill="#BFDBFE" />
      <path d="M24 60C22 34 34 16 50 16C66 16 78 34 76 60C76 76 68 84 50 84C32 84 24 76 24 60Z" fill="#64748B" />
      <path d="M16 100C16 78 28 72 50 72C72 72 84 78 84 100H16Z" fill="#475569" />
      <line x1="44" y1="74" x2="44" y2="88" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="56" y1="74" x2="56" y2="88" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="50" cy="48" rx="16.5" ry="18" fill="#FEE2E2" />
      <path d="M34 38C38 32 46 30 54 32C58 34 62 36 66 40" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="46" r="3" fill="#1E293B" />
      <circle cx="40" cy="45" r="1" fill="#FFFFFF" />
      <circle cx="59" cy="46" r="3" fill="#1E293B" />
      <circle cx="58" cy="45" r="1" fill="#FFFFFF" />
      <path d="M44 55C47 58 53 58 56 55" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 42. Doanh nhân áo vest thắt cà vạt đỏ AIA (Suit Tie)
export const FaceSuitTie: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-suit-tie">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-suit-tie)">
      <rect width="100" height="100" fill="#E2E8F0" />
      <path d="M14 100C14 74 28 68 50 68C72 68 86 74 86 100H14Z" fill="#1E3A8A" />
      <path d="M38 68L50 84L62 68Z" fill="#FFFFFF" />
      <polygon points="48,72 52,72 54,96 50,100 46,96" fill="#DC2626" />
      <line x1="47" y1="84" x2="53" y2="84" stroke="#F59E0B" strokeWidth="1.8" />
      <rect x="43" y="54" width="14" height="16" fill="#FCD34D" />
      <ellipse cx="50" cy="44" rx="17" ry="19" fill="#FCD34D" />
      <path d="M30 36C29 22 38 16 50 16C62 16 71 22 70 36C67 28 60 22 50 22C40 22 33 28 30 36Z" fill="#1F2937" />
      <circle cx="41" cy="42" r="3.2" fill="#0F172A" />
      <circle cx="40" cy="41" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="42" r="3.2" fill="#0F172A" />
      <circle cx="58" cy="41" r="1.1" fill="#FFFFFF" />
      <path d="M43 53C46 57 54 57 57 53" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 43. Chàng trai tóc undercut vuốt keo nam tính (Undercut)
export const FaceUndercut: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-undercut">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-undercut)">
      <rect width="100" height="100" fill="#CFFAFE" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#18181B" />
      <path d="M38 70L50 84L62 70Z" fill="#3B82F6" />
      <path d="M28 44C27 34 32 26 36 24V46H28Z" fill="#4B5563" />
      <path d="M72 44C73 34 68 26 64 24V46H72Z" fill="#4B5563" />
      <ellipse cx="50" cy="46" rx="16.5" ry="19" fill="#F59E0B" />
      <path d="M34 26C34 14 44 10 52 10C60 10 66 14 66 26C62 20 56 16 50 16C44 16 38 20 34 26Z" fill="#18181B" />
      <path d="M36 36L45 38M64 36L55 38" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="41" cy="43" r="3.2" fill="#18181B" />
      <circle cx="40" cy="42" r="1.1" fill="#FFFFFF" />
      <circle cx="59" cy="43" r="3.2" fill="#18181B" />
      <circle cx="58" cy="42" r="1.1" fill="#FFFFFF" />
      <path d="M44 53C47 56 53 55 56 52" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 44. Phi hành gia vũ trụ mũ phi thuyền (Astronaut)
export const FaceAstronaut: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-astronaut">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-astronaut)">
      <rect width="100" height="100" fill="#C7D2FE" />
      <circle cx="22" cy="24" r="1.2" fill="#FFFFFF" />
      <circle cx="78" cy="18" r="1.5" fill="#FFFFFF" />
      <circle cx="82" cy="40" r="1" fill="#FFFFFF" />
      <path d="M14 100C14 74 28 68 50 68C72 68 86 74 86 100H14Z" fill="#FFFFFF" />
      <rect x="42" y="78" width="16" height="10" rx="3" fill="#0284C7" />
      <circle cx="50" cy="44" r="28" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
      <ellipse cx="50" cy="44" rx="20" ry="17" fill="#0F172A" />
      <ellipse cx="50" cy="46" rx="13" ry="12" fill="#FCD34D" />
      <circle cx="45" cy="44" r="2.2" fill="#1E293B" />
      <circle cx="44.5" cy="43.5" r="0.8" fill="#FFFFFF" />
      <circle cx="55" cy="44" r="2.2" fill="#1E293B" />
      <circle cx="54.5" cy="43.5" r="0.8" fill="#FFFFFF" />
      <path d="M47 50C48 52 52 52 53 50" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 38C38 32 46 30 52 30" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
    </g>
  </svg>
);

// 45. Bếp trưởng mũ nón trắng cao vút (Chef)
export const FaceChef: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-chef">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-chef)">
      <rect width="100" height="100" fill="#FEF9C3" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <circle cx="44" cy="80" r="2" fill="#18181B" />
      <circle cx="56" cy="80" r="2" fill="#18181B" />
      <circle cx="44" cy="90" r="2" fill="#18181B" />
      <circle cx="56" cy="90" r="2" fill="#18181B" />
      <path d="M42 70L50 78L58 70Z" fill="#DC2626" />
      <ellipse cx="50" cy="50" rx="18" ry="18" fill="#FCD34D" />
      <path d="M32 34C30 18 36 8 50 8C64 8 70 18 68 34H32Z" fill="#FFFFFF" />
      <path d="M38 12C44 6 56 6 62 12" stroke="#E2E8F0" strokeWidth="2" fill="none" />
      <rect x="30" y="32" width="40" height="6" rx="2" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M39 46C41 43 45 43 47 46" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M53 46C55 43 59 43 61 46" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 54C44 51 49 53 50 53C51 53 56 51 60 54C62 56 58 58 50 55C42 58 38 56 40 54Z" fill="#451A03" />
      <circle cx="36" cy="52" r="3.5" fill="#FB7185" opacity="0.5" />
      <circle cx="64" cy="52" r="3.5" fill="#FB7185" opacity="0.5" />
    </g>
  </svg>
);

// 46. Chú mèo hoạt hình đội mũ len xinh xắn (Cute Cat)
export const FaceCuteCat: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-cute-cat">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-cute-cat)">
      <rect width="100" height="100" fill="#CFFAFE" />
      <path d="M20 100C20 78 32 74 50 74C68 74 80 78 80 100H20Z" fill="#F97316" />
      <ellipse cx="50" cy="76" rx="16" ry="6" fill="#FDBA74" />
      <polygon points="30,22 42,34 26,38" fill="#F97316" />
      <polygon points="31,25 39,33 28,36" fill="#F472B6" />
      <polygon points="70,22 58,34 74,38" fill="#F97316" />
      <polygon points="69,25 61,33 72,36" fill="#F472B6" />
      <ellipse cx="50" cy="50" rx="22" ry="19" fill="#FB923C" />
      <ellipse cx="50" cy="56" rx="10" ry="7" fill="#FFFFFF" />
      <path d="M38 32C38 22 44 18 50 18C56 18 62 22 62 32H38Z" fill="#0D9488" />
      <circle cx="50" cy="16" r="3" fill="#FACC15" />
      <rect x="36" y="30" width="28" height="4" rx="2" fill="#14B8A6" />
      <circle cx="41" cy="46" r="4.5" fill="#059669" />
      <circle cx="40" cy="44.5" r="1.8" fill="#FFFFFF" />
      <circle cx="59" cy="46" r="4.5" fill="#059669" />
      <circle cx="58" cy="44.5" r="1.8" fill="#FFFFFF" />
      <polygon points="48,53 52,53 50,55" fill="#F472B6" />
      <path d="M46 56C48 58 50 56 50 56C50 56 52 58 54 56" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="53" x2="38" y2="54" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="57" x2="38" y2="56" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="72" y1="53" x2="62" y2="54" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="72" y1="57" x2="62" y2="56" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 47. Người máy tương lai mắt sáng LED xanh (Robot)
export const FaceRobot: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-robot">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-robot)">
      <rect width="100" height="100" fill="#DDD6FE" />
      <line x1="50" y1="20" x2="50" y2="10" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="8" r="3.5" fill="#EF4444" />
      <path d="M22 100C22 78 32 74 50 74C68 74 78 78 78 100H22Z" fill="#94A3B8" />
      <rect x="44" y="82" width="12" height="6" rx="2" fill="#06B6D4" />
      <rect x="28" y="24" width="44" height="42" rx="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
      <rect x="24" y="38" width="4" height="14" rx="2" fill="#64748B" />
      <rect x="72" y="38" width="4" height="14" rx="2" fill="#64748B" />
      <rect x="33" y="32" width="34" height="20" rx="6" fill="#0F172A" />
      <path d="M38 43L42 39L46 43" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54 43L58 39L62 43" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="42" y1="58" x2="58" y2="58" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 48. Thám tử mũ phớt fedora cổ điển (Detective)
export const FaceDetective: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-detective">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-detective)">
      <rect width="100" height="100" fill="#FEF3C7" />
      <path d="M16 100C16 76 28 70 50 70C72 70 84 76 84 100H16Z" fill="#D97706" />
      <polygon points="34,70 46,84 40,70" fill="#B45309" />
      <polygon points="66,70 54,84 60,70" fill="#B45309" />
      <ellipse cx="50" cy="48" rx="17" ry="19" fill="#FCD34D" />
      <path d="M22 34C22 30 38 28 50 28C62 28 78 30 78 34C78 38 62 40 50 40C38 40 22 38 22 34Z" fill="#B45309" />
      <path d="M34 30C34 16 42 12 50 12C58 12 66 16 66 30H34Z" fill="#D97706" />
      <rect x="34" y="26" width="32" height="4" fill="#78350F" />
      <circle cx="43" cy="46" r="3" fill="#1C1917" />
      <circle cx="44" cy="45" r="1" fill="#FFFFFF" />
      <circle cx="61" cy="46" r="3" fill="#1C1917" />
      <circle cx="62" cy="45" r="1" fill="#FFFFFF" />
      <path d="M46 56C49 58 55 57 58 54" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 49. Cụ ông râu tóc bạc phơ hiền hậu (Wise Grandpa)
export const FaceWiseGrandpa: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-wise-grandpa">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-wise-grandpa)">
      <rect width="100" height="100" fill="#D1FAE5" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#059669" />
      <path d="M44 70L50 82L56 70Z" fill="#FFFFFF" />
      <ellipse cx="50" cy="46" rx="17" ry="19" fill="#FDE68A" />
      <path d="M30 42C29 24 38 16 50 16C62 16 71 24 70 42C67 32 60 24 50 24C40 24 33 32 30 42Z" fill="#F8FAFC" />
      <path d="M32 48C32 74 40 82 50 82C60 82 68 74 68 48C68 56 62 68 50 68C38 68 32 56 32 48Z" fill="#F8FAFC" />
      <path d="M38 52C42 49 48 51 50 51C52 51 58 49 62 52C64 55 58 57 50 54C42 57 36 55 38 52Z" fill="#E2E8F0" />
      <circle cx="41" cy="42" r="5" stroke="#64748B" strokeWidth="1.8" fill="none" />
      <circle cx="59" cy="42" r="5" stroke="#64748B" strokeWidth="1.8" fill="none" />
      <line x1="46" y1="42" x2="54" y2="42" stroke="#64748B" strokeWidth="1.8" />
      <path d="M39 42C40 40 43 40 44 42" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M57 42C58 40 61 40 62 42" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="36" cy="48" r="3" fill="#FB7185" opacity="0.4" />
      <circle cx="64" cy="48" r="3" fill="#FB7185" opacity="0.4" />
    </g>
  </svg>
);

// 50. Nhà khoa học kính bảo hộ thí nghiệm (Scientist)
export const FaceScientist: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <clipPath id="clip-scientist">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-scientist)">
      <rect width="100" height="100" fill="#BAE6FD" />
      <path d="M16 100C16 76 30 70 50 70C70 70 84 76 84 100H16Z" fill="#FFFFFF" />
      <rect x="62" y="82" width="10" height="12" rx="2" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="65" y1="78" x2="65" y2="84" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="68" y1="77" x2="68" y2="84" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="38" r="10" fill="#E2E8F0" />
      <circle cx="72" cy="38" r="10" fill="#E2E8F0" />
      <circle cx="50" cy="18" r="12" fill="#E2E8F0" />
      <circle cx="36" cy="24" r="10" fill="#E2E8F0" />
      <circle cx="64" cy="24" r="10" fill="#E2E8F0" />
      <ellipse cx="50" cy="46" rx="16.5" ry="18.5" fill="#FCD34D" />
      <rect x="30" y="38" width="40" height="14" rx="7" fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="2" />
      <line x1="24" y1="44" x2="30" y2="44" stroke="#0284C7" strokeWidth="2" />
      <line x1="70" y1="44" x2="76" y2="44" stroke="#0284C7" strokeWidth="2" />
      <circle cx="41" cy="45" r="3.5" fill="#0F172A" />
      <circle cx="40" cy="43.5" r="1.3" fill="#FFFFFF" />
      <circle cx="59" cy="45" r="3.5" fill="#0F172A" />
      <circle cx="58" cy="43.5" r="1.3" fill="#FFFFFF" />
      <path d="M43 54C43 60 57 60 57 54H43Z" fill="#DC2626" />
      <path d="M44 54H56" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
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
  },  {
    id: 'face-pixie-hair',
    name: 'Bạn nữ tóc tém cá tính',
    category: 'faces_female',
    bgGradient: 'from-purple-100 to-indigo-200',
    bgColor: '#E9D5FF',
    SvgComponent: FacePixieHair,
  },
  {
    id: 'face-top-bun',
    name: 'Bạn gái búi tóc củ tỏi',
    category: 'faces_female',
    bgGradient: 'from-amber-100 to-yellow-200',
    bgColor: '#FEF08A',
    SvgComponent: FaceTopBun,
  },
  {
    id: 'face-doctor-female',
    name: 'Nữ bác sĩ áo blouse trắng',
    category: 'faces_female',
    bgGradient: 'from-emerald-100 to-teal-200',
    bgColor: '#A7F3D0',
    SvgComponent: FaceDoctorFemale,
  },
  {
    id: 'face-flight-attendant',
    name: 'Nữ tiếp viên hàng không AIA',
    category: 'faces_female',
    bgGradient: 'from-rose-100 to-pink-200',
    bgColor: '#FCE7F3',
    SvgComponent: FaceFlightAttendant,
  },
  {
    id: 'face-bob-cut',
    name: 'Cô gái tóc bob kẹp hoa',
    category: 'faces_female',
    bgGradient: 'from-orange-100 to-amber-200',
    bgColor: '#FED7AA',
    SvgComponent: FaceBobCut,
  },
  {
    id: 'face-nerd-girl',
    name: 'Cô nàng mọt sách kính tròn',
    category: 'faces_female',
    bgGradient: 'from-sky-100 to-blue-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceNerdGirl,
  },
  {
    id: 'face-winter-beanie-girl',
    name: 'Bạn nữ mũ len vàng mùa đông',
    category: 'faces_female',
    bgGradient: 'from-blue-100 to-indigo-200',
    bgColor: '#BFDBFE',
    SvgComponent: FaceWinterBeanieGirl,
  },
  {
    id: 'face-ponytail',
    name: 'Cô gái tóc đuôi ngựa năng động',
    category: 'faces_female',
    bgGradient: 'from-teal-100 to-emerald-200',
    bgColor: '#99F6E4',
    SvgComponent: FacePonytail,
  },
  {
    id: 'face-silk-scarf',
    name: 'Quý cô khăn lụa công sở',
    category: 'faces_female',
    bgGradient: 'from-purple-100 to-indigo-200',
    bgColor: '#DDD6FE',
    SvgComponent: FaceSilkScarf,
  },
  {
    id: 'face-bunny-ears',
    name: 'Bé gái băng đô tai thỏ',
    category: 'faces_female',
    bgGradient: 'from-pink-100 to-rose-200',
    bgColor: '#FECDD3',
    SvgComponent: FaceBunnyEars,
  },
  {
    id: 'face-office-lady',
    name: 'Nữ nhân viên văn phòng đeo thẻ',
    category: 'faces_female',
    bgGradient: 'from-cyan-100 to-sky-200',
    bgColor: '#E0F2FE',
    SvgComponent: FaceOfficeLady,
  },
  {
    id: 'face-curly-afro',
    name: 'Cô nàng da nâu tóc xoăn afro',
    category: 'faces_female',
    bgGradient: 'from-yellow-100 to-amber-200',
    bgColor: '#FDE68A',
    SvgComponent: FaceCurlyAfro,
  },
  {
    id: 'face-gamer-girl',
    name: 'Nữ streamer tai nghe hồng',
    category: 'faces_female',
    bgGradient: 'from-fuchsia-100 to-pink-200',
    bgColor: '#F5D0FE',
    SvgComponent: FaceGamerGirl,
  },
  {
    id: 'face-schoolgirl',
    name: 'Nữ sinh sơ mi thắt nơ đỏ',
    category: 'faces_female',
    bgGradient: 'from-sky-100 to-cyan-200',
    bgColor: '#CFFAFE',
    SvgComponent: FaceSchoolgirl,
  },
  {
    id: 'face-dev-glasses',
    name: 'Chàng trai IT kính tri thức',
    category: 'faces_male',
    bgGradient: 'from-slate-100 to-blue-200',
    bgColor: '#CBD5E1',
    SvgComponent: FaceDevGlasses,
  },
  {
    id: 'face-beard-hipster',
    name: 'Quý ông râu quai nón sành điệu',
    category: 'faces_male',
    bgGradient: 'from-orange-100 to-amber-200',
    bgColor: '#FED7AA',
    SvgComponent: FaceBeardHipster,
  },
  {
    id: 'face-doctor-male',
    name: 'Bác sĩ nam áo blouse xanh',
    category: 'faces_male',
    bgGradient: 'from-emerald-100 to-teal-200',
    bgColor: '#A7F3D0',
    SvgComponent: FaceDoctorMale,
  },
  {
    id: 'face-gamer-boy',
    name: 'Game thủ tai nghe LED xanh',
    category: 'faces_male',
    bgGradient: 'from-purple-100 to-indigo-200',
    bgColor: '#E9D5FF',
    SvgComponent: FaceGamerBoy,
  },
  {
    id: 'face-pilot',
    name: 'Phi công thương mại mũ đại cán',
    category: 'faces_male',
    bgGradient: 'from-sky-100 to-blue-200',
    bgColor: '#BAE6FD',
    SvgComponent: FacePilot,
  },
  {
    id: 'face-wavy-hair',
    name: 'Chàng trai lãng tử tóc xoăn',
    category: 'faces_male',
    bgGradient: 'from-amber-100 to-orange-200',
    bgColor: '#FFEDD5',
    SvgComponent: FaceWavyHair,
  },
  {
    id: 'face-mustache-gentle',
    name: 'Quý ông ria mép cong lịch thiệp',
    category: 'faces_male',
    bgGradient: 'from-yellow-100 to-amber-200',
    bgColor: '#FEF08A',
    SvgComponent: FaceMustacheGentle,
  },
  {
    id: 'face-student-boy',
    name: 'Nam sinh cà vạt sọc trẻ trung',
    category: 'faces_male',
    bgGradient: 'from-teal-100 to-cyan-200',
    bgColor: '#CCFBF1',
    SvgComponent: FaceStudentBoy,
  },
  {
    id: 'face-sport-sweatband',
    name: 'Vận động viên băng trán thể thao',
    category: 'faces_male',
    bgGradient: 'from-rose-100 to-red-200',
    bgColor: '#FECACA',
    SvgComponent: FaceSportSweatband,
  },
  {
    id: 'face-snaggletooth',
    name: 'Cậu bạn cười răng khểnh',
    category: 'faces_male',
    bgGradient: 'from-yellow-100 to-amber-200',
    bgColor: '#FDE047',
    SvgComponent: FaceSnaggletooth,
  },
  {
    id: 'face-hoodie-boy',
    name: 'Bạn trai áo hoodie xám',
    category: 'faces_male',
    bgGradient: 'from-blue-100 to-slate-200',
    bgColor: '#BFDBFE',
    SvgComponent: FaceHoodieBoy,
  },
  {
    id: 'face-suit-tie',
    name: 'Doanh nhân vest cà vạt đỏ AIA',
    category: 'faces_male',
    bgGradient: 'from-slate-100 to-blue-200',
    bgColor: '#E2E8F0',
    SvgComponent: FaceSuitTie,
  },
  {
    id: 'face-undercut',
    name: 'Chàng trai tóc undercut vuốt keo',
    category: 'faces_male',
    bgGradient: 'from-cyan-100 to-sky-200',
    bgColor: '#CFFAFE',
    SvgComponent: FaceUndercut,
  },
  {
    id: 'face-astronaut',
    name: 'Phi hành gia vũ trụ mũ phi thuyền',
    category: 'faces_creative',
    bgGradient: 'from-indigo-100 to-purple-200',
    bgColor: '#C7D2FE',
    SvgComponent: FaceAstronaut,
  },
  {
    id: 'face-chef',
    name: 'Bếp trưởng mũ nón trắng cao vút',
    category: 'faces_creative',
    bgGradient: 'from-amber-100 to-yellow-200',
    bgColor: '#FEF9C3',
    SvgComponent: FaceChef,
  },
  {
    id: 'face-cute-cat',
    name: 'Chú mèo hoạt hình đội mũ len',
    category: 'faces_creative',
    bgGradient: 'from-cyan-100 to-sky-200',
    bgColor: '#CFFAFE',
    SvgComponent: FaceCuteCat,
  },
  {
    id: 'face-robot',
    name: 'Người máy tương lai mắt sáng LED',
    category: 'faces_creative',
    bgGradient: 'from-purple-100 to-indigo-200',
    bgColor: '#DDD6FE',
    SvgComponent: FaceRobot,
  },
  {
    id: 'face-detective',
    name: 'Thám tử mũ phớt fedora cổ điển',
    category: 'faces_creative',
    bgGradient: 'from-amber-100 to-yellow-200',
    bgColor: '#FEF3C7',
    SvgComponent: FaceDetective,
  },
  {
    id: 'face-wise-grandpa',
    name: 'Cụ ông râu tóc bạc phơ hiền hậu',
    category: 'faces_creative',
    bgGradient: 'from-emerald-100 to-teal-200',
    bgColor: '#D1FAE5',
    SvgComponent: FaceWiseGrandpa,
  },
  {
    id: 'face-scientist',
    name: 'Nhà khoa học kính bảo hộ lab',
    category: 'faces_creative',
    bgGradient: 'from-sky-100 to-cyan-200',
    bgColor: '#BAE6FD',
    SvgComponent: FaceScientist,
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
