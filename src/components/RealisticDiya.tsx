interface RealisticDiyaProps {
  isLit?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onClick?: () => void;
  label?: string;
}

export function RealisticDiya({
  isLit = true,
  size = 'md',
  className = '',
  onClick,
  label = 'Festive Diya',
}: RealisticDiyaProps) {
  const sizeConfig = {
    sm: { width: 'w-14 sm:w-16', flameHeight: 28, glowSize: 'w-20 h-20 -top-6' },
    md: { width: 'w-24 sm:w-28', flameHeight: 40, glowSize: 'w-32 h-32 -top-10' },
    lg: { width: 'w-32 sm:w-36 md:w-44', flameHeight: 52, glowSize: 'w-44 h-44 -top-14' },
    hero: { width: 'w-44 sm:w-56 md:w-64', flameHeight: 70, glowSize: 'w-64 h-64 -top-20' },
  }[size];

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ' ? onClick() : null) : undefined}
      aria-label={label}
      className={`relative inline-flex flex-col items-center justify-end select-none group ${
        onClick ? 'cursor-pointer transition-transform hover:scale-105 active:scale-95' : ''
      } ${sizeConfig.width} ${className}`}
    >
      {/* Dynamic Warm Ambient Light Halo / Aura */}
      {isLit && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${sizeConfig.glowSize} rounded-full bg-gradient-to-t from-amber-500/20 via-yellow-400/25 to-transparent blur-xl pointer-events-none animate-diya-glow`}
        />
      )}

      {/* Flame Assembly */}
      {isLit && (
        <div className="relative z-10 flex flex-col items-center mb-[-6px]">
          {/* Animated Dancing Flame Container */}
          <div className="relative animate-flame">
            {/* Outer Warm Golden-Amber Flame Teardrop */}
            <svg
              viewBox="0 0 60 100"
              className="w-8 sm:w-10 md:w-12 h-auto drop-shadow-[0_0_16px_rgba(251,191,36,0.9)]"
            >
              <defs>
                <radialGradient id="outerFlameGrad" cx="50%" cy="80%" r="65%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="25%" stopColor="#FBBF24" />
                  <stop offset="60%" stopColor="#F97316" />
                  <stop offset="90%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="innerFlameGrad" cx="50%" cy="80%" r="45%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#FEF08A" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                </radialGradient>
                <linearGradient id="blueBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
                  <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Main Outer Teardrop Flame */}
              <path
                d="M30 0 C45 35 56 60 48 82 C42 98 18 98 12 82 C4 60 15 35 30 0 Z"
                fill="url(#outerFlameGrad)"
              />

              {/* Inner Bright Hot Core */}
              <path
                d="M30 20 C38 45 44 65 39 82 C35 92 25 92 21 82 C16 65 22 45 30 20 Z"
                fill="url(#innerFlameGrad)"
                className="animate-inner-flame"
              />

              {/* Blue / Violet Oxygen Core at Wick base */}
              <ellipse cx="30" cy="85" rx="8" ry="6" fill="url(#blueBaseGrad)" opacity="0.8" />
            </svg>
          </div>
        </div>
      )}

      {/* Terracotta Clay Diya Bowl */}
      <div className="relative z-0 w-full">
        <svg
          viewBox="0 0 200 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
        >
          <defs>
            {/* Clay Body Gradient */}
            <radialGradient id="clayGradient" cx="50%" cy="70%" r="65%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="40%" stopColor="#92400E" />
              <stop offset="80%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </radialGradient>

            {/* Golden Oil Pool Gradient */}
            <radialGradient id="oilPool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </radialGradient>

            {/* Brass Rim Gradient */}
            <linearGradient id="brassRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="25%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Terracotta Highlights */}
            <linearGradient id="bodyShine" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#451A03" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Diya Base / Outer Shell */}
          <path
            d="M10 40 Q25 95 100 95 Q175 95 190 40 C175 60 140 70 100 70 C60 70 25 60 10 40 Z"
            fill="url(#clayGradient)"
            stroke="#451A03"
            strokeWidth="2"
          />

          {/* Under-shadow curve */}
          <path
            d="M30 65 Q100 105 170 65 Q100 90 30 65 Z"
            fill="#260C02"
            opacity="0.6"
          />

          {/* Traditional Etched Patterns on Clay Bowl */}
          <path
            d="M40 55 Q50 75 60 55 M70 55 Q80 75 90 55 M100 55 Q110 75 120 55 M130 55 Q140 75 150 55"
            stroke="#F59E0B"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Brass Beaded Rim & Rim Lip */}
          <ellipse
            cx="100"
            cy="40"
            rx="90"
            ry="24"
            fill="url(#brassRim)"
            stroke="#78350F"
            strokeWidth="2"
          />

          {/* Inner Oil / Ghee Reservoir */}
          <ellipse
            cx="100"
            cy="40"
            rx="78"
            ry="18"
            fill="url(#oilPool)"
          />

          {/* Oil Glistening Surface Highlight */}
          <path
            d="M40 38 Q100 48 160 38 Q100 44 40 38 Z"
            fill="#FEF08A"
            opacity="0.75"
          />

          {/* Diya Spout Lip pointing center */}
          <path
            d="M90 24 L100 18 L110 24 Z"
            fill="#F59E0B"
          />

          {/* Cotton Wick (Ruhi Baati) */}
          <path
            d="M100 36 Q102 24 100 18"
            stroke="#FEF3C7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glowing Red/Charred Tip of the wick */}
          <circle cx="100" cy="18" r="2.2" fill="#DC2626" />
        </svg>

        {/* Ambient Ground Glow directly beneath the base */}
        {isLit && (
          <div className="w-3/4 h-2 mx-auto rounded-full bg-amber-500/50 blur-sm -mt-1" />
        )}
      </div>
    </div>
  );
}
