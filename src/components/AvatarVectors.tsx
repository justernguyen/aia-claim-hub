import React from 'react';

export const ExecManNavy: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#1E293B" />
    <path d="M50 20C41 20 34 26 34 35C34 44 41 51 50 51C59 51 66 44 66 35C66 26 59 20 50 20Z" fill="#F8FAFC" />
    {/* Hair */}
    <path d="M33 33C33 24 40 18 50 18C60 18 67 24 67 31C67 31 63 26 52 26C42 26 36 29 33 33Z" fill="#0F172A" />
    {/* Navy Suit Coat */}
    <path d="M22 84C22 66 33 58 43 55L50 63L57 55C67 58 78 66 78 84H22Z" fill="#1E3A8A" />
    {/* Crisp White Shirt Collar */}
    <path d="M43 55L50 68L57 55L50 58Z" fill="#FFFFFF" />
    {/* AIA Crimson Tie */}
    <path d="M48 60L52 60L54 75L50 82L46 75Z" fill="#D31145" />
    {/* Lapel details */}
    <path d="M36 57L44 67L42 77" stroke="#172554" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M64 57L56 67L58 77" stroke="#172554" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ExecWomanBlazer: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#0F172A" />
    {/* Face & Neck */}
    <path d="M50 22C42 22 36 28 36 36C36 44 42 51 50 51C58 51 64 44 64 36C64 28 58 22 50 22Z" fill="#FDE047" opacity="0.9" />
    {/* Hair styled neat */}
    <path d="M33 36C33 22 40 17 50 17C60 17 67 22 67 36C67 44 65 48 64 50C62 38 60 25 50 25C40 25 38 38 36 50C35 48 33 44 33 36Z" fill="#1C1917" />
    {/* Tailored Charcoal Blazer */}
    <path d="M22 84C22 65 32 58 42 56L50 66L58 56C68 58 78 65 78 84H22Z" fill="#334155" />
    {/* Silk Blouse */}
    <path d="M42 56L50 68L58 56L50 60Z" fill="#F8FAFC" />
    {/* Pearl / Gold Necklace */}
    <circle cx="50" cy="62" r="2" fill="#F59E0B" />
  </svg>
);

export const CorporateDirector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#18181B" />
    <path d="M50 21C42 21 35 27 35 36C35 45 42 52 50 52C58 52 65 45 65 36C65 27 58 21 50 21Z" fill="#F1F5F9" />
    {/* Short side-parted hair */}
    <path d="M34 32C35 22 42 17 50 17C58 17 66 21 66 30C63 26 55 24 50 24C42 24 37 27 34 32Z" fill="#27272A" />
    {/* Executive Tuxedo / Suit */}
    <path d="M20 84C20 65 32 58 42 56L50 68L58 56C68 58 80 65 80 84H20Z" fill="#09090B" />
    <path d="M42 56L50 70L58 56L50 60Z" fill="#FFFFFF" />
    {/* Gold Lapel Pin */}
    <circle cx="34" cy="64" r="2.5" fill="#EAB308" />
    {/* Tie */}
    <path d="M48 62L52 62L53.5 76L50 82L46.5 76Z" fill="#3F3F46" />
  </svg>
);

export const ExecWomanGlasses: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#0C4A6E" />
    <path d="M50 23C42 23 36 29 36 37C36 45 42 52 50 52C58 52 64 45 64 37C64 29 58 23 50 23Z" fill="#FEF08A" opacity="0.9" />
    {/* Elegant hair bun / bob */}
    <path d="M33 37C33 23 40 18 50 18C60 18 67 23 67 37C67 46 64 52 64 52C61 36 57 26 50 26C43 26 39 36 36 52C36 52 33 46 33 37Z" fill="#312E81" />
    {/* Executive Glasses */}
    <rect x="38" y="34" width="10" height="7" rx="2" stroke="#F8FAFC" strokeWidth="1.5" fill="none" />
    <rect x="52" y="34" width="10" height="7" rx="2" stroke="#F8FAFC" strokeWidth="1.5" fill="none" />
    <path d="M48 37H52" stroke="#F8FAFC" strokeWidth="1.5" />
    {/* Modern Blue Suit */}
    <path d="M22 84C22 66 33 58 43 56L50 67L57 56C67 58 78 66 78 84H22Z" fill="#0284C7" />
    <path d="M43 56L50 68L57 56Z" fill="#FFFFFF" />
  </svg>
);

export const DoctorSurgeon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#065F46" />
    <path d="M50 22C42 22 36 28 36 36C36 44 42 51 50 51C58 51 64 44 64 36C64 28 58 22 50 22Z" fill="#F8FAFC" />
    {/* Hair */}
    <path d="M34 32C35 22 41 18 50 18C59 18 65 22 66 32C62 27 56 25 50 25C44 25 38 27 34 32Z" fill="#1E293B" />
    {/* White Doctor Coat */}
    <path d="M22 84C22 65 32 58 42 55L50 66L58 55C68 58 78 65 78 84H22Z" fill="#FFFFFF" />
    {/* Inner Scrub Cyan */}
    <path d="M42 55L50 68L58 55L50 59Z" fill="#0D9488" />
    {/* Stethoscope */}
    <path d="M38 57C38 66 43 72 50 72C57 72 62 66 62 57" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M50 72V76" stroke="#475569" strokeWidth="2.5" />
    <circle cx="50" cy="78" r="3.5" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
  </svg>
);

export const MedicalSpecialist: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#047857" />
    <path d="M50 23C42 23 36 29 36 37C36 45 42 52 50 52C58 52 64 45 64 37C64 29 58 23 50 23Z" fill="#FEF08A" opacity="0.9" />
    {/* Hair tied clean */}
    <path d="M34 36C34 23 41 18 50 18C59 18 66 23 66 36C65 42 62 44 60 46C59 34 56 26 50 26C44 26 41 34 40 46C38 44 35 42 34 36Z" fill="#365314" />
    {/* White Clinical Blazer */}
    <path d="M22 84C22 66 32 58 42 56L50 67L58 56C68 58 78 66 78 84H22Z" fill="#F8FAFC" />
    {/* Inner Emerald Blouse */}
    <path d="M42 56L50 67L58 56Z" fill="#10B981" />
    {/* Red Cross Lapel Badge */}
    <rect x="33" y="62" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <path d="M36 63.5V66.5M34.5 65H37.5" stroke="#E11D48" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const LegalCounsel: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#312E81" />
    <path d="M50 22C42 22 35 28 35 36C35 44 42 51 50 51C58 51 65 44 65 36C65 28 58 22 50 22Z" fill="#F1F5F9" />
    <path d="M34 32C35 23 41 18 50 18C59 18 65 23 66 32C62 26 55 24 50 24C45 24 38 26 34 32Z" fill="#1E1B4B" />
    {/* Dark Formal Robe / Suit */}
    <path d="M21 84C21 65 32 58 42 56L50 68L58 56C68 58 79 65 79 84H21Z" fill="#18181B" />
    {/* White Band / Legal Collar */}
    <path d="M44 56L50 68L56 56Z" fill="#FFFFFF" />
    <path d="M47 62V72M53 62V72" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FinanceAnalyst: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#1E3A8A" />
    <path d="M50 22C42 22 36 28 36 36C36 44 42 51 50 51C58 51 64 44 64 36C64 28 58 22 50 22Z" fill="#F8FAFC" />
    <path d="M34 31C35 22 41 18 50 18C59 18 65 22 66 31C62 26 56 25 50 25C44 25 38 26 34 31Z" fill="#0F172A" />
    {/* Crisp Oxford Blue Shirt */}
    <path d="M22 84C22 65 32 57 42 55L50 67L58 55C68 57 78 65 78 84H22Z" fill="#3B82F6" />
    {/* Modern Slim Navy Tie */}
    <path d="M43 55L50 67L57 55Z" fill="#FFFFFF" />
    <path d="M48 60L52 60L53.5 76L50 82L46.5 76Z" fill="#1E293B" />
    {/* Tie Clip */}
    <path d="M48 70H52" stroke="#F59E0B" strokeWidth="1.5" />
  </svg>
);

export const BusinessOwner: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#3F3F46" />
    <path d="M50 22C42 22 36 28 36 36C36 44 42 51 50 51C58 51 64 44 64 36C64 28 58 22 50 22Z" fill="#F4F4F5" />
    {/* Distinguish hair with subtle gray temples */}
    <path d="M34 32C35 22 41 17 50 17C59 17 65 22 66 32C62 26 55 24 50 24C45 24 38 26 34 32Z" fill="#52525B" />
    {/* Navy Blue Textured Blazer */}
    <path d="M22 84C22 65 32 57 42 55L50 67L58 55C68 57 78 65 78 84H22Z" fill="#1E293B" />
    <path d="M43 55L50 67L57 55Z" fill="#FFFFFF" />
    {/* Pocket Square in red */}
    <path d="M33 67L37 63L41 67Z" fill="#E11D48" />
  </svg>
);

export const AcademicScholar: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#713F12" />
    <path d="M50 23C42 23 36 29 36 37C36 45 42 52 50 52C58 52 64 45 64 37C64 29 58 23 50 23Z" fill="#FEF3C7" />
    <path d="M34 36C34 23 41 18 50 18C59 18 66 23 66 36C64 42 61 44 59 46C58 34 55 26 50 26C45 26 42 34 41 46C39 44 36 42 34 36Z" fill="#451A03" />
    {/* Warm Brown Tweed Blazer */}
    <path d="M22 84C22 66 32 58 42 56L50 67L58 56C68 58 78 66 78 84H22Z" fill="#854D0E" />
    <path d="M42 56L50 67L58 56Z" fill="#FEF9C3" />
    {/* Round Specs */}
    <circle cx="43" cy="38" r="4" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
    <circle cx="57" cy="38" r="4" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
    <path d="M47 38H53" stroke="#F59E0B" strokeWidth="1.2" />
  </svg>
);

export const TradeExecutive: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#0F766E" />
    <path d="M50 22C42 22 36 28 36 36C36 44 42 51 50 51C58 51 64 44 64 36C64 28 58 22 50 22Z" fill="#F8FAFC" />
    <path d="M34 31C35 22 41 18 50 18C59 18 65 22 66 31C62 26 56 25 50 25C44 25 38 26 34 31Z" fill="#134E4A" />
    {/* Charcoal Steel Suit */}
    <path d="M22 84C22 65 32 57 42 55L50 67L58 55C68 57 78 65 78 84H22Z" fill="#1E293B" />
    <path d="M43 55L50 67L57 55Z" fill="#FFFFFF" />
    {/* Teal tie */}
    <path d="M48 60L52 60L53.5 76L50 82L46.5 76Z" fill="#0D9488" />
  </svg>
);

export const ConsultantExpert: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#881337" />
    <path d="M50 22C42 22 36 28 36 36C36 44 42 51 50 51C58 51 64 44 64 36C64 28 58 22 50 22Z" fill="#FFF1F2" />
    <path d="M34 32C35 22 41 18 50 18C59 18 65 22 66 32C62 26 56 25 50 25C44 25 38 26 34 32Z" fill="#4C0519" />
    {/* Premium AIA Burgundy Suit */}
    <path d="M22 84C22 65 32 57 42 55L50 67L58 55C68 57 78 65 78 84H22Z" fill="#9F1239" />
    <path d="M43 55L50 67L58 55Z" fill="#FFFFFF" />
    {/* MDRT Golden Shield Badge on Lapel */}
    <path d="M33 64L36 62L39 64L39 68L36 71L33 68Z" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
  </svg>
);

interface MonogramProps {
  className?: string;
  initials?: string;
  outerBorder: string;
  innerRing: string;
  letterColor: string;
  accentDot: string;
}

export const MonogramBase: React.FC<MonogramProps> = ({
  className = 'w-full h-full',
  initials = 'KH',
  outerBorder,
  innerRing,
  letterColor,
  accentDot,
}) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="45" stroke={outerBorder} strokeWidth="2.5" opacity="0.85" />
    <circle cx="50" cy="50" r="41" stroke={innerRing} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
    <circle cx="50" cy="50" r="38" fill="rgba(15, 23, 42, 0.4)" />
    <circle cx="50" cy="18" r="2" fill={accentDot} />
    <circle cx="50" cy="82" r="2" fill={accentDot} />
    <text
      x="50"
      y="58"
      textAnchor="middle"
      fill={letterColor}
      fontSize="25"
      fontWeight="800"
      fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      letterSpacing="1"
    >
      {initials}
    </text>
  </svg>
);

export const MonoCrimson: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#F43F5E" innerRing="#FBBF24" letterColor="#FFFFFF" accentDot="#F59E0B" />
);

export const MonoNavy: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#38BDF8" innerRing="#E2E8F0" letterColor="#FFFFFF" accentDot="#60A5FA" />
);

export const MonoEmerald: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#34D399" innerRing="#FCD34D" letterColor="#FFFFFF" accentDot="#10B981" />
);

export const MonoGold: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#F59E0B" innerRing="#FEF08A" letterColor="#FFFBEB" accentDot="#D97706" />
);

export const MonoTitanium: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#94A3B8" innerRing="#CBD5E1" letterColor="#FFFFFF" accentDot="#E2E8F0" />
);

export const MonoObsidian: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#64748B" innerRing="#F8FAFC" letterColor="#FFFFFF" accentDot="#38BDF8" />
);

export const MonoAmethyst: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#C084FC" innerRing="#FDE047" letterColor="#FFFFFF" accentDot="#A855F7" />
);

export const MonoBronze: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#D97706" innerRing="#FED7AA" letterColor="#FFF7ED" accentDot="#B45309" />
);

export const MonoCobalt: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#60A5FA" innerRing="#BAE6FD" letterColor="#FFFFFF" accentDot="#3B82F6" />
);

export const MonoForest: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#4ADE80" innerRing="#FEF08A" letterColor="#FFFFFF" accentDot="#22C55E" />
);

export const MonoBurgundy: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#FB7185" innerRing="#FDE047" letterColor="#FFFFFF" accentDot="#E11D48" />
);

export const MonoSteel: React.FC<{ className?: string; initials?: string }> = (props) => (
  <MonogramBase {...props} outerBorder="#22D3EE" innerRing="#E2E8F0" letterColor="#FFFFFF" accentDot="#06B6D4" />
);

// ==========================================
// 3. BIỂU TRƯNG BẢO VỆ & TÀI CHÍNH (12 MẪU UY TÍN)
// ==========================================

export const ShieldPremier: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#0F172A" />
    <path
      d="M50 18L74 27V50C74 66 63 78 50 82C37 78 26 66 26 50V27L50 18Z"
      fill="url(#shield-grad)"
      stroke="#F59E0B"
      strokeWidth="2.5"
    />
    <path
      d="M50 25L68 32V50C68 62 59 71 50 74C41 71 32 62 32 50V32L50 25Z"
      fill="#1E293B"
      opacity="0.6"
    />
    {/* Inner Checkmark */}
    <path d="M42 50L48 56L60 42" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="shield-grad" x1="26" y1="18" x2="74" y2="82" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D31145" />
        <stop offset="1" stopColor="#881337" />
      </linearGradient>
    </defs>
  </svg>
);

export const CrownVip: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#18181B" />
    {/* Crown Base */}
    <path
      d="M26 64L22 36L38 48L50 26L62 48L78 36L74 64H26Z"
      fill="url(#crown-grad)"
      stroke="#FDE047"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="25" y="66" width="50" height="8" rx="2" fill="#D97706" stroke="#FEF08A" strokeWidth="1.5" />
    {/* Jewels */}
    <circle cx="50" cy="26" r="3" fill="#F8FAFC" />
    <circle cx="22" cy="36" r="3" fill="#F8FAFC" />
    <circle cx="78" cy="36" r="3" fill="#F8FAFC" />
    <circle cx="38" cy="70" r="2" fill="#EF4444" />
    <circle cx="50" cy="70" r="2.5" fill="#3B82F6" />
    <circle cx="62" cy="70" r="2" fill="#EF4444" />
    <defs>
      <linearGradient id="crown-grad" x1="22" y1="26" x2="78" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
    </defs>
  </svg>
);

export const StarExcellence: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#0C4A6E" />
    <circle cx="50" cy="50" r="38" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
    {/* 5-pointed star */}
    <path
      d="M50 19L58.5 37.5L78.5 40L63.5 54L67.5 74L50 64L32.5 74L36.5 54L21.5 40L41.5 37.5L50 19Z"
      fill="url(#star-grad)"
      stroke="#FEF08A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="star-grad" x1="50" y1="19" x2="50" y2="74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

export const TreeWealth: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#064E3B" />
    {/* Foliage Layers */}
    <circle cx="50" cy="38" r="18" fill="#10B981" />
    <circle cx="39" cy="46" r="14" fill="#059669" />
    <circle cx="61" cy="46" r="14" fill="#059669" />
    {/* Trunk */}
    <path d="M46 54V76H54V54" fill="#78350F" />
    {/* Roots & Soil */}
    <ellipse cx="50" cy="76" rx="22" ry="4" fill="#047857" />
    {/* Golden Fruits / Wealth coins */}
    <circle cx="44" cy="34" r="3" fill="#FBBF24" />
    <circle cx="56" cy="36" r="3" fill="#FBBF24" />
    <circle cx="50" cy="46" r="3" fill="#FBBF24" />
  </svg>
);

export const UmbrellaCare: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#881337" />
    {/* Umbrella Canopy */}
    <path
      d="M22 52C22 36 34 24 50 24C66 24 78 36 78 52C72 50 66 50 61 52C56 50 50 50 45 52C40 50 34 50 28 52C26 52 24 52 22 52Z"
      fill="#F8FAFC"
      stroke="#FFE4E6"
      strokeWidth="2"
    />
    <path d="M50 20V24" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" />
    {/* Shaft & Handle */}
    <path d="M50 50V72C50 76 46 78 43 76" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const SealPolicy: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#1C1917" />
    {/* Ribbons */}
    <path d="M42 60L36 82L46 76L52 82L48 60" fill="#BE123C" />
    <path d="M58 60L54 82L62 76L70 82L64 60" fill="#9F1239" />
    {/* Medallion */}
    <circle cx="50" cy="45" r="26" fill="url(#seal-gold)" stroke="#FEF08A" strokeWidth="2.5" />
    <circle cx="50" cy="45" r="21" stroke="#92400E" strokeWidth="1" strokeDasharray="3 2" />
    {/* Star inside seal */}
    <path d="M50 34L53 41L61 42L55 47L57 55L50 51L43 55L45 47L39 42L47 41Z" fill="#78350F" />
    <defs>
      <linearGradient id="seal-gold" x1="24" y1="19" x2="76" y2="71" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

export const HeartHealth: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#1E293B" />
    {/* Heart base */}
    <path
      d="M50 78C50 78 20 60 20 38C20 27 28 20 38 20C44 20 48 23 50 26C52 23 56 20 62 20C72 20 80 27 80 38C80 60 50 78 50 78Z"
      fill="url(#heart-grad)"
      stroke="#FDA4AF"
      strokeWidth="2"
    />
    {/* Healthcare Cross in center */}
    <rect x="46" y="36" width="8" height="20" rx="2" fill="#FFFFFF" />
    <rect x="40" y="42" width="20" height="8" rx="2" fill="#FFFFFF" />
    <defs>
      <linearGradient id="heart-grad" x1="20" y1="20" x2="80" y2="78" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E11D48" />
        <stop offset="1" stopColor="#9F1239" />
      </linearGradient>
    </defs>
  </svg>
);

export const HomeHaven: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#0F766E" />
    {/* Roof */}
    <path d="M50 22L20 46L25 50L50 30L75 50L80 46L50 22Z" fill="#FDE047" />
    {/* Chimney */}
    <rect x="64" y="27" width="6" height="12" fill="#D97706" />
    {/* House walls */}
    <rect x="28" y="46" width="44" height="30" rx="2" fill="#FFFFFF" />
    {/* Door */}
    <rect x="45" y="58" width="10" height="18" rx="1" fill="#0D9488" />
    {/* Windows */}
    <rect x="33" y="52" width="8" height="8" rx="1" fill="#BAE6FD" />
    <rect x="59" y="52" width="8" height="8" rx="1" fill="#BAE6FD" />
  </svg>
);

export const FamilyShield: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#1E1B4B" />
    {/* Shield */}
    <path
      d="M50 18L76 28V50C76 66 65 78 50 82C35 78 24 66 24 50V28L50 18Z"
      fill="#312E81"
      stroke="#818CF8"
      strokeWidth="2"
    />
    {/* Father silhouette */}
    <circle cx="42" cy="39" r="6" fill="#F8FAFC" />
    <path d="M34 58C34 50 38 47 42 47C46 47 50 50 50 58H34Z" fill="#F8FAFC" />
    {/* Mother silhouette */}
    <circle cx="58" cy="41" r="5.5" fill="#FDE047" />
    <path d="M51 60C51 52 54 49 58 49C62 49 65 52 65 60H51Z" fill="#FDE047" />
    {/* Child silhouette */}
    <circle cx="50" cy="54" r="4" fill="#38BDF8" />
    <path d="M44 68C44 63 47 60 50 60C53 60 56 63 56 68H44Z" fill="#38BDF8" />
  </svg>
);

export const DiamondSecurity: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#042F2E" />
    <path
      d="M32 30L68 30L82 48L50 78L18 48L32 30Z"
      fill="url(#diamond-grad)"
      stroke="#5EEAD4"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M32 30L50 48L68 30" stroke="#CCFBF1" strokeWidth="1.5" />
    <path d="M50 48L50 78" stroke="#CCFBF1" strokeWidth="1.5" />
    <path d="M18 48L82 48" stroke="#CCFBF1" strokeWidth="1.5" />
    <defs>
      <linearGradient id="diamond-grad" x1="18" y1="30" x2="82" y2="78" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2DD4BF" />
        <stop offset="1" stopColor="#0F766E" />
      </linearGradient>
    </defs>
  </svg>
);

export const EducationFuture: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#172554" />
    {/* Mortarboard Top */}
    <path d="M50 26L82 40L50 54L18 40L50 26Z" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2" strokeLinejoin="round" />
    {/* Cap Underneath */}
    <path d="M30 46V62C30 67 39 72 50 72C61 72 70 67 70 62V46" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="1.5" />
    {/* Tassel */}
    <path d="M50 40L24 50V64" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="65" r="2.5" fill="#F59E0B" />
  </svg>
);

export const RetirementSun: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="46" fill="#431407" />
    {/* Radiant Sun */}
    <circle cx="50" cy="48" r="18" fill="url(#sun-grad)" stroke="#FED7AA" strokeWidth="1.5" />
    {/* Horizon lines */}
    <path d="M22 66H78" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 72H72" stroke="#F97316" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <path d="M36 78H64" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Sun Rays */}
    <path d="M50 22V26M32 30L35 33M68 30L65 33M24 48H28M72 48H76" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="sun-grad" x1="50" y1="30" x2="50" y2="66" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
  </svg>
);

// ==========================================
// DANH MỤC 36 AVATAR CHUẨN DOANH NGHIỆP AIA
// ==========================================

