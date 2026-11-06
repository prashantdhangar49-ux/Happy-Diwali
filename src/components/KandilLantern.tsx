interface KandilLanternProps {
  side: 'left' | 'right';
  className?: string;
}

export function KandilLantern({ side, className = '' }: KandilLanternProps) {
  const isLeft = side === 'left';
  const animClass = isLeft ? 'animate-lantern-left' : 'animate-lantern-right';

  return (
    <div
      className={`pointer-events-none select-none ${animClass} w-16 sm:w-28 md:w-36 lg:w-44 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_8px_16px_rgba(251,191,36,0.3)]"
      >
        <defs>
          {/* Hanging golden chain gradient */}
          <linearGradient id={`goldChain-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Lantern body gradient */}
          <linearGradient id={`lanternBody-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Core lamp glow */}
          <radialGradient id={`lampCoreGlow-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
            <stop offset="40%" stopColor="#FDE68A" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          {/* Streamer gradients */}
          <linearGradient id={`streamerRed-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id={`streamerGold-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id={`streamerOrange-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
        </defs>

        {/* Golden Hanging Cord / Chain */}
        <line x1="100" y1="0" x2="100" y2="70" stroke={`url(#goldChain-${side})`} strokeWidth="3" strokeDasharray="4 2" />
        <circle cx="100" cy="70" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />

        {/* Top Cap / Finial */}
        <path d="M75 75 L125 75 L115 62 L85 62 Z" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.5" />
        <path d="M90 62 L110 62 L100 50 Z" fill="#D97706" stroke="#FEF3C7" strokeWidth="1" />

        {/* Central Glowing Aura behind lattice */}
        <circle cx="100" cy="145" r="48" fill={`url(#lampCoreGlow-${side})`} />

        {/* Outer Star Facets / Diamond Points of the Lantern */}
        <polygon points="100,75 145,115 55,115" fill={`url(#lanternBody-${side})`} stroke="#FDE68A" strokeWidth="1.5" />
        
        {/* Center Octagonal / Rhombus Lantern Body */}
        <polygon points="55,115 145,115 175,150 145,185 55,185 25,150" fill="#B45309" stroke="#FBBF24" strokeWidth="2" opacity="0.95" />
        
        {/* Diamond Facet Highlights */}
        <polygon points="100,115 145,150 100,185 55,150" fill={`url(#lanternBody-${side})`} stroke="#FDE68A" strokeWidth="1.5" />
        <polygon points="100,130 120,150 100,170 80,150" fill="#FEF08A" opacity="0.9" stroke="#F59E0B" strokeWidth="1" />

        {/* Traditional Star Cutouts / Window Lattice */}
        <circle cx="100" cy="150" r="10" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="100" cy="150" r="4" fill="#F59E0B" />

        {/* Bottom Base Ring */}
        <path d="M55 185 L145 185 L135 200 L65 200 Z" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.5" />
        {/* Little Hanging Golden Beads along base */}
        <circle cx="70" cy="204" r="3" fill="#FCD34D" />
        <circle cx="85" cy="206" r="3.5" fill="#FCD34D" />
        <circle cx="100" cy="207" r="4" fill="#FCD34D" />
        <circle cx="115" cy="206" r="3.5" fill="#FCD34D" />
        <circle cx="130" cy="204" r="3" fill="#FCD34D" />

        {/* Flowing Traditional Colorful Streamers / Tassels (Kandil Zhalar) */}
        <g className="animate-tassel">
          <path d="M68 205 Q62 280 66 380 Q69 385 73 380 Q76 280 72 205 Z" fill={`url(#streamerRed-${side})`} />
          <path d="M80 206 Q76 290 82 400 Q86 405 89 400 Q88 290 85 206 Z" fill={`url(#streamerGold-${side})`} />
          <path d="M94 207 Q91 300 98 420 Q102 425 106 420 Q109 300 104 207 Z" fill={`url(#streamerOrange-${side})`} />
          <path d="M113 206 Q117 290 114 400 Q118 405 121 400 Q124 290 118 206 Z" fill={`url(#streamerGold-${side})`} />
          <path d="M126 205 Q133 280 128 380 Q132 385 135 380 Q137 280 131 205 Z" fill={`url(#streamerRed-${side})`} />
        </g>
      </svg>
    </div>
  );
}
