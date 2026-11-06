interface RangoliBorderProps {
  children: React.ReactNode;
  className?: string;
  glowActive?: boolean;
}

export function RangoliBorder({ children, className = '', glowActive = false }: RangoliBorderProps) {
  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-amber-500/30 bg-[#161233]/90 backdrop-blur-md shadow-2xl transition-all duration-700 ${
        glowActive
          ? 'shadow-[0_0_50px_rgba(245,158,11,0.4)] border-amber-400/60'
          : 'shadow-[0_0_30px_rgba(0,0,0,0.7)]'
      } ${className}`}
    >
      {/* Central Rotating Watermark Rangoli */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.05] rounded-2xl sm:rounded-3xl">
        <svg
          viewBox="0 0 500 500"
          className="w-[450px] h-[450px] text-amber-300 animate-slow-spin"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="250" cy="250" r="230" strokeDasharray="6 4" />
          <circle cx="250" cy="250" r="190" />
          <circle cx="250" cy="250" r="150" />
          <circle cx="250" cy="250" r="110" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="70" />
          <circle cx="250" cy="250" r="30" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 250 250)`}>
                <path d="M250 100 C270 140 280 180 250 220 C220 180 230 140 250 100 Z" fill="currentColor" fillOpacity="0.15" />
                <path d="M250 40 C280 90 290 140 250 190 C210 140 220 90 250 40 Z" />
                <circle cx="250" cy="70" r="6" fill="currentColor" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Top-Left Corner Rangoli */}
      <div className="absolute top-0 left-0 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 pointer-events-none select-none text-amber-400/80">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M0 0 L40 0 C30 20 20 30 0 40 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M0 0 L90 0 C60 15 15 60 0 90 Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="6" fill="currentColor" fillOpacity="0.6" />
          <circle cx="45" cy="12" r="3.5" fill="currentColor" />
          <circle cx="12" cy="45" r="3.5" fill="currentColor" />
          <path d="M0 65 Q35 35 65 0" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M0 45 Q25 25 45 0" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Top-Right Corner Rangoli */}
      <div className="absolute top-0 right-0 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 pointer-events-none select-none text-amber-400/80 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M0 0 L40 0 C30 20 20 30 0 40 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M0 0 L90 0 C60 15 15 60 0 90 Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="6" fill="currentColor" fillOpacity="0.6" />
          <circle cx="45" cy="12" r="3.5" fill="currentColor" />
          <circle cx="12" cy="45" r="3.5" fill="currentColor" />
          <path d="M0 65 Q35 35 65 0" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M0 45 Q25 25 45 0" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom-Left Corner Rangoli */}
      <div className="absolute bottom-0 left-0 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 pointer-events-none select-none text-amber-400/80 transform scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M0 0 L40 0 C30 20 20 30 0 40 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M0 0 L90 0 C60 15 15 60 0 90 Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="6" fill="currentColor" fillOpacity="0.6" />
          <circle cx="45" cy="12" r="3.5" fill="currentColor" />
          <circle cx="12" cy="45" r="3.5" fill="currentColor" />
          <path d="M0 65 Q35 35 65 0" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M0 45 Q25 25 45 0" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom-Right Corner Rangoli */}
      <div className="absolute bottom-0 right-0 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 pointer-events-none select-none text-amber-400/80 transform scale-x-[-1] scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M0 0 L40 0 C30 20 20 30 0 40 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M0 0 L90 0 C60 15 15 60 0 90 Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="6" fill="currentColor" fillOpacity="0.6" />
          <circle cx="45" cy="12" r="3.5" fill="currentColor" />
          <circle cx="12" cy="45" r="3.5" fill="currentColor" />
          <path d="M0 65 Q35 35 65 0" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M0 45 Q25 25 45 0" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Center Top Floral Emblem */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="px-3.5 py-1 rounded-full bg-[#1b153e] border border-amber-400/50 shadow-md flex items-center gap-1.5 text-amber-300 text-[11px] sm:text-xs font-cinzel">
          <span className="text-amber-400">✦</span>
          <span>ॐ शुभ लाभ ✦</span>
        </div>
      </div>

      {/* Card Content Slot */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
