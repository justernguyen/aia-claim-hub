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

/**
 * Trích xuất 2 chữ cái viết tắt trang trọng chuẩn phong cách Việt Nam
 */
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
// 16 CARTOON FACE AVATAR COMPONENTS (KHUÔN MẶT HOẠT HÌNH BIỂU CẢM CHUẨN IMAGE #1)
// =========================================================================

// 1. Cô gái trùm khăn Hijab hồng (Hình Preview lớn trong ảnh mẫu)
export const FaceHijabPink: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Pastel sky blue background */}
    <circle cx="50" cy="50" r="50" fill="#BAE6FD" />
    {/* Pink Hijab Drape & Shoulders */}
    <path d="M20 95C20 74 32 62 50 62C68 62 80 74 80 95H20Z" fill="#F43F5E" />
    {/* Hijab Hood Around Head */}
    <path
      d="M50 14C33 14 26 27 26 48C26 69 33 80 50 80C67 80 74 69 74 48C74 27 67 14 50 14Z"
      fill="#F43F5E"
    />
    <path
      d="M50 18C36 18 30 29 30 46C30 65 37 74 50 74C63 74 70 65 70 46C70 29 64 18 50 18Z"
      fill="#FB7185"
    />
    {/* Face Shape (Warm Honey Skin) */}
    <path
      d="M50 25C40 25 35 32 35 44C35 56 41 62 50 62C59 62 65 56 65 44C65 32 60 25 50 25Z"
      fill="#FCD34D"
    />
    {/* Forehead Shadow */}
    <path d="M35 34C40 28 60 28 65 34C64 30 58 26 50 26C42 26 36 30 35 34Z" fill="#F59E0B" opacity="0.3" />
    {/* Eyebrows */}
    <path d="M40 37C42 35 46 36 47 37" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M53 37C54 36 58 35 60 37" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
    {/* Sleepy / Peaceful Closed Eyes */}
    <path d="M39 44C41 47 45 47 47 44" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M53 44C55 47 59 47 61 44" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    {/* Lashes */}
    <path d="M43 46L43 48" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M57 46L57 48" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
    {/* Soft Rosy Cheeks */}
    <circle cx="38" cy="49" r="3.5" fill="#FB7185" opacity="0.4" />
    <circle cx="62" cy="49" r="3.5" fill="#FB7185" opacity="0.4" />
    {/* Cute Open Mouth (like in photo) */}
    <ellipse cx="50" cy="54" rx="3.5" ry="2.5" fill="#78350F" />
    <path d="M48 55C49 56 51 56 52 55" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
    {/* Hijab Chin Tuck */}
    <path d="M42 61C46 64 54 64 58 61C55 68 45 68 42 61Z" fill="#F43F5E" />
  </svg>
);

// 2. Bạn nam quấn khăn Turban xanh ngọc nháy mắt (Card 1 trong ảnh mẫu)
export const FaceTurbanWinking: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#BAE6FD" />
    {/* Shoulders & Dark Shirt with Antler graphic */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#1E293B" />
    {/* White Antler graphic on chest */}
    <path d="M50 78L50 88M46 80L50 83L54 80M44 76L47 80M56 76L53 80" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Neck */}
    <rect x="44" y="60" width="12" height="12" rx="3" fill="#E89A65" />
    {/* Ears */}
    <circle cx="28" cy="48" r="5.5" fill="#E89A65" />
    <circle cx="72" cy="48" r="5.5" fill="#E89A65" />
    {/* Face (Amber Tan Skin) */}
    <rect x="30" y="32" width="40" height="34" rx="16" fill="#E89A65" />
    {/* Turban Wrap (Mint / Turquoise) */}
    <path d="M26 36C26 19 36 12 50 12C64 12 74 19 74 36C74 38 68 34 50 34C32 34 26 38 26 36Z" fill="#6EE7B7" />
    {/* Turban Twist knot */}
    <ellipse cx="50" cy="22" rx="7" ry="10" transform="rotate(-15 50 22)" fill="#34D399" />
    <ellipse cx="50" cy="22" rx="5" ry="8" transform="rotate(15 50 22)" fill="#10B981" />
    <circle cx="50" cy="23" r="3.5" fill="#A7F3D0" />
    {/* Eyebrows */}
    <path d="M37 38C39 36 43 36 45 38" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M55 36C58 35 62 36 64 38" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
    {/* Left Eye: Winking */}
    <path d="M37 45C39 48 43 48 45 45" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
    {/* Right Eye: Big Open Eye */}
    <circle cx="60" cy="45" r="4.5" fill="#FFFFFF" />
    <circle cx="60" cy="45" r="2.8" fill="#1C1917" />
    <circle cx="59" cy="43.5" r="1.2" fill="#FFFFFF" />
    {/* Nose */}
    <path d="M49 46C48 49 50 51 52 50" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
    {/* Surprised / Happy Open Mouth */}
    <rect x="45" y="53" width="10" height="6" rx="3" fill="#451A03" />
    <rect x="46.5" y="53" width="7" height="2" rx="1" fill="#FFFFFF" />
  </svg>
);

// 3. Bạn trai tóc nâu nhọn cười tươi (Card 2 trong ảnh mẫu)
export const FaceSpikyBoy: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#BAE6FD" />
    {/* Black T-shirt with V-neck */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#18181B" />
    <path d="M43 68L50 78L57 68Z" fill="#E89A65" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="13" rx="3" fill="#E89A65" />
    {/* Ears */}
    <circle cx="28" cy="47" r="5.5" fill="#E89A65" />
    <circle cx="72" cy="47" r="5.5" fill="#E89A65" />
    {/* Spiky Brown Hair */}
    <path d="M30 38C26 24 35 15 50 15C65 15 74 24 70 38L74 28L68 20L58 12L50 8L44 12L34 20L28 28Z" fill="#78350F" />
    <path d="M42 12L50 6L56 12L52 14Z" fill="#9A3412" />
    {/* Face */}
    <rect x="30" y="30" width="40" height="35" rx="17" fill="#E89A65" />
    {/* Hair Bangs Top */}
    <path d="M30 35C35 27 65 27 70 35C66 30 58 28 50 28C42 28 34 30 30 35Z" fill="#78350F" />
    {/* Friendly Eyebrows */}
    <path d="M36 37C39 34 43 35 45 37" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M55 37C57 35 61 34 64 37" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
    {/* Two Big Round Cartoon Eyes */}
    <circle cx="40" cy="44" r="4.5" fill="#FFFFFF" />
    <circle cx="40" cy="44" r="2.8" fill="#1C1917" />
    <circle cx="39" cy="42.5" r="1.2" fill="#FFFFFF" />

    <circle cx="60" cy="44" r="4.5" fill="#FFFFFF" />
    <circle cx="60" cy="44" r="2.8" fill="#1C1917" />
    <circle cx="59" cy="42.5" r="1.2" fill="#FFFFFF" />
    {/* Nose */}
    <circle cx="50" cy="49" r="1.5" fill="#B45309" />
    {/* Broad Happy Smile */}
    <path d="M42 53C42 59 58 59 58 53Z" fill="#78350F" />
    <path d="M44 53C46 55 54 55 56 53H44Z" fill="#FFFFFF" />
    <path d="M47 57C48 58 52 58 53 57" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 4. Cô gái tóc xoăn đeo kính trắng (Card 3 trong ảnh mẫu)
export const FaceCurlyGlasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#BAE6FD" />
    {/* Dark T-shirt */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#1E293B" />
    {/* Big Curly Afro Hair Background */}
    <circle cx="30" cy="38" r="15" fill="#1C1917" />
    <circle cx="70" cy="38" r="15" fill="#1C1917" />
    <circle cx="50" cy="24" r="18" fill="#1C1917" />
    <circle cx="26" cy="52" r="12" fill="#1C1917" />
    <circle cx="74" cy="52" r="12" fill="#1C1917" />
    <circle cx="28" cy="66" r="10" fill="#1C1917" />
    <circle cx="72" cy="66" r="10" fill="#1C1917" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#FBBF24" />
    {/* Face (Warm Tan Skin) */}
    <rect x="32" y="32" width="36" height="34" rx="16" fill="#FBBF24" />
    {/* Cute White Retro Glasses */}
    <rect x="33" y="39" width="14" height="11" rx="4" stroke="#FFFFFF" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.15" />
    <rect x="53" y="39" width="14" height="11" rx="4" stroke="#FFFFFF" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.15" />
    <path d="M47 43H53" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    {/* Eyes inside glasses */}
    <circle cx="40" cy="44.5" r="2.5" fill="#1C1917" />
    <circle cx="39" cy="43.5" r="1" fill="#FFFFFF" />
    <circle cx="60" cy="44.5" r="2.5" fill="#1C1917" />
    <circle cx="59" cy="43.5" r="1" fill="#FFFFFF" />
    {/* Rosy Cheeks */}
    <circle cx="35" cy="52" r="3" fill="#F87171" opacity="0.5" />
    <circle cx="65" cy="52" r="3" fill="#F87171" opacity="0.5" />
    {/* Gentle Friendly Smile */}
    <path d="M44 54C46 58 54 58 56 54" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 5. Bạn trai mắt trái tim đỏ yêu đời (Card 4 trong ảnh mẫu)
export const FaceHeartEyes: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Soft Lavender Background */}
    <circle cx="50" cy="50" r="50" fill="#DDD6FE" />
    {/* Bright Blue Jacket over White Tee */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#38BDF8" />
    <path d="M44 68L50 82L56 68H44Z" fill="#FFFFFF" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#8D5B4C" />
    {/* Ears */}
    <circle cx="28" cy="47" r="5.5" fill="#8D5B4C" />
    <circle cx="72" cy="47" r="5.5" fill="#8D5B4C" />
    {/* Dark Fade Hair */}
    <path d="M30 36C30 20 40 16 50 16C60 16 70 20 70 36C70 38 65 30 50 30C35 30 30 38 30 36Z" fill="#171717" />
    {/* Face (Deep Mocha Skin) */}
    <rect x="30" y="30" width="40" height="35" rx="17" fill="#8D5B4C" />
    {/* Eyebrows */}
    <path d="M36 36C39 34 43 35 45 36" stroke="#26150F" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M55 36C57 35 61 34 64 36" stroke="#26150F" strokeWidth="1.8" strokeLinecap="round" />
    {/* VIVID RED HEART EYES ❤️ ❤️ */}
    <path
      d="M39 42C37.5 39.5 34 40.5 34 43C34 46.5 39 49 39 49C39 49 44 46.5 44 43C44 40.5 40.5 39.5 39 42Z"
      fill="#EF4444"
    />
    <path
      d="M61 42C59.5 39.5 56 40.5 56 43C56 46.5 61 49 61 49C61 49 66 46.5 66 43C66 40.5 62.5 39.5 61 42Z"
      fill="#EF4444"
    />
    {/* Nose */}
    <circle cx="50" cy="50" r="1.5" fill="#4E2B20" />
    {/* Satisfied Smile */}
    <path d="M44 54C47 57 53 57 56 54" stroke="#26150F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 6. Bạn trai mũ len hồng lè lưỡi (Card 5 trong ảnh mẫu)
export const FaceBeanieTongue: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Pastel Warm Peach Background */}
    <circle cx="50" cy="50" r="50" fill="#FEEBC8" />
    {/* Light Blue Hoodie */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#BAE6FD" />
    {/* White drawstrings */}
    <path d="M45 74L45 84M55 74L55 84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#E89A65" />
    {/* Ears */}
    <circle cx="27" cy="50" r="5.5" fill="#E89A65" />
    <circle cx="73" cy="50" r="5.5" fill="#E89A65" />
    {/* Pink Beanie Hat with White Fold */}
    <path d="M28 38C28 18 36 12 50 12C64 12 72 18 72 38H28Z" fill="#F43F5E" />
    <path d="M50 12C50 9 52 7 50 7C48 7 50 9 50 12Z" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
    <rect x="25" y="32" width="50" height="9" rx="4" fill="#FFFFFF" />
    {/* Face */}
    <rect x="30" y="38" width="40" height="30" rx="15" fill="#E89A65" />
    {/* Left Eye: Winking */}
    <path d="M37 47C39 49 43 49 45 47" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
    {/* Right Eye: Laughing Cry Eye with Tear */}
    <path d="M55 47C57 44 61 44 63 47" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
    {/* Single tear of joy 💧 */}
    <path d="M34 50C33 53 36 55 36 55C36 55 37 53 35 50Z" fill="#38BDF8" />
    {/* Mischievous Open Mouth with Tongue Out 👅 */}
    <path d="M43 54C43 60 57 60 57 54H43Z" fill="#451A03" />
    {/* Tongue */}
    <path d="M47 57C47 64 53 64 53 57Z" fill="#FB7185" />
    <path d="M50 57V61" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// 7. Cụ già râu trắng đội vương miện hoa (Card 6 trong ảnh mẫu)
export const FaceFlowerCrown: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#CFFAFE" />
    {/* Butter Yellow Shirt with cute bear graphic */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#FEF08A" />
    {/* Bear outline on shirt */}
    <circle cx="50" cy="84" r="5" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="47" cy="79" r="1.5" fill="#FFFFFF" />
    <circle cx="53" cy="79" r="1.5" fill="#FFFFFF" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#78350F" />
    {/* Brown Curly Hair */}
    <circle cx="28" cy="40" r="12" fill="#451A03" />
    <circle cx="72" cy="40" r="12" fill="#451A03" />
    <circle cx="50" cy="26" r="16" fill="#451A03" />
    {/* Face (Mocha Skin) */}
    <rect x="30" y="30" width="40" height="35" rx="17" fill="#78350F" />
    {/* Flower Crown (Pink, Yellow, Mint Flowers) */}
    <circle cx="34" cy="27" r="4" fill="#F43F5E" />
    <circle cx="34" cy="27" r="1.5" fill="#FEF08A" />
    <circle cx="42" cy="24" r="4.5" fill="#FBBF24" />
    <circle cx="42" cy="24" r="1.5" fill="#F43F5E" />
    <circle cx="50" cy="23" r="5" fill="#FB7185" />
    <circle cx="50" cy="23" r="2" fill="#FEF08A" />
    <circle cx="58" cy="24" r="4.5" fill="#34D399" />
    <circle cx="58" cy="24" r="1.5" fill="#FFFFFF" />
    <circle cx="66" cy="27" r="4" fill="#60A5FA" />
    <circle cx="66" cy="27" r="1.5" fill="#FEF08A" />
    {/* Eyes */}
    <circle cx="40" cy="43" r="4" fill="#FFFFFF" />
    <circle cx="40" cy="43" r="2.5" fill="#1C1917" />
    <circle cx="60" cy="43" r="4" fill="#FFFFFF" />
    <circle cx="60" cy="43" r="2.5" fill="#1C1917" />
    {/* Purple Lightning Bolt Earring ⚡ */}
    <path d="M73 49L70 54H73L71 59" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* White Moustache & Beard */}
    <path d="M38 52C42 50 48 53 50 54C52 53 58 50 62 52C62 57 56 65 50 65C44 65 38 57 38 52Z" fill="#F8FAFC" />
    {/* Friendly mouth opening */}
    <ellipse cx="50" cy="56" rx="2.5" ry="1.5" fill="#78350F" />
  </svg>
);

// 8. Bạn nữ tóc vàng nâu nháy mắt (Card 7 trong ảnh mẫu)
export const FaceBlondeWinking: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#BAE6FD" />
    {/* Sky Blue Jacket over White Blouse */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#60A5FA" />
    <path d="M43 68L50 82L57 68H43Z" fill="#FFFFFF" />
    {/* Long Caramel / Honey Hair Background */}
    <path d="M26 36C26 18 36 12 50 12C64 12 74 18 74 36V75C74 75 70 70 68 62L68 40C68 40 32 40 32 40L32 62C30 70 26 75 26 75V36Z" fill="#D97706" />
    {/* Face (Sunny Golden Skin) */}
    <rect x="32" y="30" width="36" height="34" rx="16" fill="#FCD34D" />
    {/* Long Hair Strands Framing Face */}
    <path d="M30 32C30 45 34 60 36 68C34 60 36 45 38 32C34 32 30 32 30 32Z" fill="#B45309" />
    <path d="M70 32C70 45 66 60 64 68C66 60 64 45 62 32C66 32 70 32 70 32Z" fill="#B45309" />
    {/* Eyebrows */}
    <path d="M38 37C41 35 44 36 46 37" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M54 37C56 36 59 35 62 37" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    {/* Left Eye: Winking */}
    <path d="M38 45C40 48 44 48 46 45" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    {/* Right Eye: Open and Confident */}
    <circle cx="58" cy="44" r="4.5" fill="#FFFFFF" />
    <circle cx="58" cy="44" r="2.8" fill="#1C1917" />
    <circle cx="57" cy="42.5" r="1.2" fill="#FFFFFF" />
    {/* Blushing Cheeks */}
    <circle cx="36" cy="51" r="3" fill="#F87171" opacity="0.4" />
    <circle cx="64" cy="51" r="3" fill="#F87171" opacity="0.4" />
    {/* Elegant Smile */}
    <path d="M46 54C48 57 52 57 54 54" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 9. Nhân vật nón mùa đông che tai pom-pom (Card 8 trong ảnh mẫu)
export const FaceTrapperWinter: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#BAE6FD" />
    {/* Blue Winter Hoodie */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#38BDF8" />
    <path d="M46 72L46 84M54 72L54 84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <circle cx="46" cy="85" r="2" fill="#FFFFFF" />
    <circle cx="54" cy="85" r="2" fill="#FFFFFF" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#FBBF24" />
    {/* Face */}
    <rect x="30" y="32" width="40" height="34" rx="16" fill="#FBBF24" />
    {/* Winter Trapper Hat with Ear Flaps */}
    <path d="M28 34C28 16 36 10 50 10C64 10 72 16 72 34H28Z" fill="#FDE68A" />
    {/* Hat Pattern Zigzag */}
    <path d="M30 24L34 20L38 24L42 20L46 24L50 20L54 24L58 20L62 24L66 20L70 24" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Pom-pom on top */}
    <circle cx="50" cy="8" r="4.5" fill="#FFFFFF" />
    {/* Fluffy Ear Flaps */}
    <rect x="24" y="30" width="8" height="26" rx="4" fill="#FDE68A" />
    <rect x="68" y="30" width="8" height="26" rx="4" fill="#FDE68A" />
    {/* White fur trim on forehead */}
    <rect x="27" y="30" width="46" height="8" rx="3" fill="#FFFFFF" />
    {/* Eyebrows */}
    <path d="M37 41C39 39 43 40 45 41" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M55 41C57 40 61 39 63 41" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    {/* Left Eye: Winking */}
    <path d="M37 47C39 50 43 50 45 47" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
    {/* Right Eye: Surprised Open */}
    <circle cx="59" cy="47" r="4.5" fill="#FFFFFF" />
    <circle cx="59" cy="47" r="2.8" fill="#1C1917" />
    <circle cx="58" cy="45.5" r="1.2" fill="#FFFFFF" />
    {/* Surprised "O" Mouth */}
    <ellipse cx="50" cy="56" rx="3.5" ry="3" fill="#78350F" />
  </svg>
);

// 10. Bạn trai ngầu kính râm đen (Cool Sunglasses)
export const FaceCoolSunglasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#FED7AA" />
    {/* Minimalist Black Jacket */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#18181B" />
    <path d="M42 68L50 80L58 68H42Z" fill="#EF4444" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#E89A65" />
    {/* Ears */}
    <circle cx="28" cy="47" r="5" fill="#E89A65" />
    <circle cx="72" cy="47" r="5" fill="#E89A65" />
    {/* Stylish Short Black Hair */}
    <path d="M30 36C28 20 38 14 50 14C62 14 72 20 70 36C66 28 58 26 50 26C42 26 34 28 30 36Z" fill="#18181B" />
    {/* Face */}
    <rect x="30" y="30" width="40" height="35" rx="17" fill="#E89A65" />
    {/* Cool Dark Sunglasses with Reflection */}
    <rect x="32" y="39" width="16" height="11" rx="3" fill="#09090B" />
    <rect x="52" y="39" width="16" height="11" rx="3" fill="#09090B" />
    <path d="M48 43H52" stroke="#09090B" strokeWidth="2.5" />
    {/* Sunglasses Gloss Glare */}
    <path d="M34 41L42 41" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M54 41L62 41" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Confident Smirk */}
    <path d="M44 55C47 57 54 57 56 53" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 11. Bạn nữ thể thao băng đô năng động (Headband Sport)
export const FaceHeadbandSport: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#A7F3D0" />
    {/* Athletic Emerald Jacket */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#059669" />
    <path d="M44 68L50 78L56 68H44Z" fill="#FFFFFF" />
    {/* Ponytail background */}
    <circle cx="70" cy="28" r="9" fill="#78350F" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#FBBF24" />
    {/* Face */}
    <rect x="32" y="30" width="36" height="34" rx="16" fill="#FBBF24" />
    {/* Hair top */}
    <path d="M30 32C30 18 40 14 50 14C60 14 70 18 70 32H30Z" fill="#78350F" />
    {/* Sporty Coral-Orange Headband */}
    <rect x="28" y="27" width="44" height="7" rx="3.5" fill="#FB923C" />
    {/* Eyes */}
    <circle cx="41" cy="44" r="3.5" fill="#1C1917" />
    <circle cx="40" cy="43" r="1.2" fill="#FFFFFF" />
    <circle cx="59" cy="44" r="3.5" fill="#1C1917" />
    <circle cx="58" cy="43" r="1.2" fill="#FFFFFF" />
    {/* Big Athletic Smile */}
    <path d="M43 53C43 58 57 58 57 53H43Z" fill="#78350F" />
    <path d="M45 53H55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 12. Bạn nữ mũ beret đỏ nghệ sĩ (Beret Artist)
export const FaceBeretArtist: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#FCE7F3" />
    {/* Striped Breton Top */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#F8FAFC" />
    <path d="M22 78H78M20 86H80" stroke="#1E3A8A" strokeWidth="2.5" />
    {/* Dark Bob Hair */}
    <path d="M28 36C28 20 38 16 50 16C62 16 72 20 72 36V64C72 64 68 62 66 54L66 40C66 40 34 40 34 40L34 54C32 62 28 64 28 64V36Z" fill="#1C1917" />
    {/* Face */}
    <rect x="32" y="32" width="36" height="34" rx="16" fill="#FDE047" />
    {/* French Red Beret */}
    <ellipse cx="50" cy="22" rx="24" ry="12" transform="rotate(-10 50 22)" fill="#E11D48" />
    <circle cx="48" cy="10" r="2" fill="#BE123C" />
    {/* Eyes */}
    <path d="M38 43C40 41 44 41 46 43" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
    <circle cx="42" cy="45" r="2.5" fill="#1C1917" />
    <path d="M54 43C56 41 60 41 62 43" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
    <circle cx="58" cy="45" r="2.5" fill="#1C1917" />
    {/* Cute Beauty Mark */}
    <circle cx="61" cy="51" r="1" fill="#78350F" />
    {/* Cheerful Red Lip Smile */}
    <path d="M45 54C47 57 53 57 55 54" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 13. Bạn trai mũ lưỡi trai ngược (Cap Backward)
export const FaceCapBackward: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#FEF3C7" />
    {/* Sporty Hoodie */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#475569" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#E89A65" />
    {/* Ears */}
    <circle cx="28" cy="48" r="5" fill="#E89A65" />
    <circle cx="72" cy="48" r="5" fill="#E89A65" />
    {/* Face */}
    <rect x="30" y="32" width="40" height="34" rx="16" fill="#E89A65" />
    {/* Royal Blue Backward Cap */}
    <path d="M28 32C28 16 38 12 50 12C62 12 72 16 72 32H28Z" fill="#2563EB" />
    {/* Backward Visor Rim */}
    <path d="M30 18C30 12 50 8 70 18" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" />
    <rect x="26" y="28" width="48" height="6" rx="3" fill="#1D4ED8" />
    {/* Mischievous Eyes */}
    <circle cx="41" cy="44" r="3.5" fill="#1C1917" />
    <circle cx="40" cy="43" r="1.2" fill="#FFFFFF" />
    <circle cx="59" cy="44" r="3.5" fill="#1C1917" />
    <circle cx="58" cy="43" r="1.2" fill="#FFFFFF" />
    {/* Cheerful Grin */}
    <path d="M43 53C45 58 55 58 57 53" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 14. Bé gái má hồng tóc hai búi (Blush Cute)
export const FaceBlushCute: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#FCE7F3" />
    {/* Soft Lavender Sweater */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#C084FC" />
    {/* Two Cute Space Buns */}
    <circle cx="28" cy="22" r="10" fill="#3B0764" />
    <circle cx="72" cy="22" r="10" fill="#3B0764" />
    <circle cx="28" cy="22" r="4" fill="#F43F5E" />
    <circle cx="72" cy="22" r="4" fill="#F43F5E" />
    {/* Face */}
    <rect x="32" y="32" width="36" height="34" rx="16" fill="#FDE047" />
    {/* Hair Fringe */}
    <path d="M30 32C36 24 64 24 70 32C66 28 58 26 50 26C42 26 34 28 30 32Z" fill="#3B0764" />
    {/* Sparkling Anime Eyes */}
    <ellipse cx="41" cy="43" rx="3.5" ry="4.5" fill="#1C1917" />
    <circle cx="40" cy="41" r="1.5" fill="#FFFFFF" />
    <circle cx="42" cy="45" r="0.8" fill="#FFFFFF" />

    <ellipse cx="59" cy="43" rx="3.5" ry="4.5" fill="#1C1917" />
    <circle cx="58" cy="41" r="1.5" fill="#FFFFFF" />
    <circle cx="60" cy="45" r="0.8" fill="#FFFFFF" />
    {/* Rosy Cheeks */}
    <circle cx="35" cy="50" r="4" fill="#FB7185" opacity="0.6" />
    <circle cx="65" cy="50" r="4" fill="#FB7185" opacity="0.6" />
    {/* Cute Open Mouth :3 */}
    <path d="M46 52C47 54 49 54 50 52C51 54 53 54 54 52" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 15. Quý bà tóc bạc thanh lịch (Elder Glasses)
export const FaceElderGlasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#E2E8F0" />
    {/* Teal Cardigan with Pearl Necklace */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#0D9488" />
    <circle cx="44" cy="74" r="1.5" fill="#FFFFFF" />
    <circle cx="47" cy="76" r="1.5" fill="#FFFFFF" />
    <circle cx="50" cy="77" r="1.5" fill="#FFFFFF" />
    <circle cx="53" cy="76" r="1.5" fill="#FFFFFF" />
    <circle cx="56" cy="74" r="1.5" fill="#FFFFFF" />
    {/* Elegant Silver Hair */}
    <circle cx="32" cy="36" r="12" fill="#CBD5E1" />
    <circle cx="68" cy="36" r="12" fill="#CBD5E1" />
    <circle cx="50" cy="24" r="16" fill="#CBD5E1" />
    {/* Face */}
    <rect x="32" y="32" width="36" height="34" rx="16" fill="#FDE68A" />
    {/* Chic Round Golden Spectacles */}
    <circle cx="41" cy="44" r="6" stroke="#D97706" strokeWidth="1.8" fill="#FFFFFF" fillOpacity="0.2" />
    <circle cx="59" cy="44" r="6" stroke="#D97706" strokeWidth="1.8" fill="#FFFFFF" fillOpacity="0.2" />
    <path d="M47 44H53" stroke="#D97706" strokeWidth="1.8" />
    {/* Gentle Smiling Eyes */}
    <path d="M38 44C40 42 42 42 44 44" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M56 44C58 42 60 42 62 44" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
    {/* Kind Smile */}
    <path d="M45 54C47 57 53 57 55 54" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 16. Chuyên viên nụ cười rạng rỡ (Executive Smile)
export const FaceExecutiveSmile: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="50" fill="#E0F2FE" />
    {/* Crisp Shirt with AIA Red Lanyard */}
    <path d="M18 95C18 76 30 68 50 68C70 68 82 76 82 95H18Z" fill="#F8FAFC" />
    <path d="M47 68L48 85M53 68L52 85" stroke="#D31145" strokeWidth="2" strokeLinecap="round" />
    {/* Neck */}
    <rect x="44" y="58" width="12" height="12" rx="3" fill="#E89A65" />
    {/* Ears */}
    <circle cx="28" cy="47" r="5" fill="#E89A65" />
    <circle cx="72" cy="47" r="5" fill="#E89A65" />
    {/* Neat Pompadour Hair */}
    <path d="M30 34C28 18 38 12 50 12C62 12 72 18 70 34C66 26 56 22 50 22C44 22 34 26 30 34Z" fill="#451A03" />
    {/* Face */}
    <rect x="30" y="30" width="40" height="35" rx="17" fill="#E89A65" />
    {/* Friendly Eyebrows */}
    <path d="M37 36C40 34 44 35 46 36" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M54 36C56 35 60 34 63 36" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
    {/* Bright Eyes */}
    <circle cx="41" cy="43" r="3.5" fill="#1C1917" />
    <circle cx="40" cy="42" r="1.2" fill="#FFFFFF" />
    <circle cx="59" cy="43" r="3.5" fill="#1C1917" />
    <circle cx="58" cy="42" r="1.2" fill="#FFFFFF" />
    {/* Big Warm Tooth Smile */}
    <path d="M42 52C42 58 58 58 58 52Z" fill="#451A03" />
    <path d="M44 52C46 54 54 54 56 52H44Z" fill="#FFFFFF" />
  </svg>
);

// =========================================================================
// AVATAR CATALOG REGISTRY
// =========================================================================

export const AVATAR_CATALOG: AvatarItem[] = [
  // 8 Mẫu chính khớp 100% với ảnh mẫu Image #1
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

  // 8 Mẫu phong cách bổ trợ mở rộng
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

// Mapping for backward compatibility from old corporate/abstract IDs
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
  // Check direct ID match
  const direct = AVATAR_CATALOG.find((a) => a.id === id);
  if (direct) return direct;
  // Check legacy mapping
  const mappedId = LEGACY_AVATAR_MAP[id];
  if (mappedId) {
    return AVATAR_CATALOG.find((a) => a.id === mappedId);
  }
  return undefined;
}

export function getDefaultAvatarForCustomer(customerId: string, name?: string): AvatarItem {
  // Deterministic pick based on ID or Name hash
  const key = `${customerId || ''}-${name || ''}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_CATALOG.length;
  return AVATAR_CATALOG[index];
}
