/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  Flame,
  Volume2,
  VolumeX,
  Send,
  RotateCcw,
  Rocket,
  Sun,
  FlameKindling
} from 'lucide-react';
import { FireworksCanvas, FireworksCanvasHandle } from './components/FireworksCanvas';
import { KandilLantern } from './components/KandilLantern';
import { RealisticDiya } from './components/RealisticDiya';
import { RangoliBorder } from './components/RangoliBorder';
import {
  generateGreeting,
  formatWhatsAppUrl,
  getInitialSenderFromSearch,
  validateName,
  FESTIVE_WISHES
} from './utils/greeting';
import { playCrackerSound, playDiyaChime } from './utils/festiveAudio';

function GoldenDiyaIcon({ className = 'w-6 h-6 sm:w-8 sm:h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 45" fill="none" className={`inline-block ${className} drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]`}>
      {/* Flame */}
      <path
        d="M30 2 C37 14 42 22 38 30 C34 35 26 35 22 30 C18 22 23 14 30 2 Z"
        fill="url(#iconFlame)"
        className="animate-flame"
      />
      <path
        d="M30 10 C34 18 36 23 34 27 C32 30 28 30 26 27 C24 23 26 18 30 10 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
      {/* Diya Bowl */}
      <path
        d="M8 24 Q14 42 30 42 Q46 42 52 24 C44 32 36 34 30 34 C24 34 16 32 8 24 Z"
        fill="url(#iconBowl)"
        stroke="#78350F"
        strokeWidth="1.2"
      />
      <ellipse cx="30" cy="24" rx="22" ry="6" fill="#FDE68A" />
      <ellipse cx="30" cy="24" rx="19" ry="4" fill="#D97706" />
      <defs>
        <radialGradient id="iconFlame" cx="50%" cy="80%" r="65%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="35%" stopColor="#FBBF24" />
          <stop offset="75%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#DC2626" />
        </radialGradient>
        <radialGradient id="iconBowl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="70%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function App() {
  const fireworksRef = useRef<FireworksCanvasHandle | null>(null);

  // Application State
  const [nameInput, setNameInput] = useState('Prashant Dhangar');
  const [selectedWishIndex, setSelectedWishIndex] = useState(0);
  const [submittedName, setSubmittedName] = useState<string | null>('Prashant Dhangar');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'text' | 'link' | null>(null);

  // Interactive Atmosphere Toggles
  const [enhancedGlow, setEnhancedGlow] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [appUrl, setAppUrl] = useState('');

  // Read URL parameters on mount (?from=... or ?name=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.origin + window.location.pathname;
      setAppUrl(currentUrl);

      const senderFromUrl = getInitialSenderFromSearch(window.location.search);
      if (senderFromUrl) {
        setSubmittedName(senderFromUrl);
        setNameInput(senderFromUrl);
        // Automatically celebrate with a firework burst for someone opening a shared card!
        setTimeout(() => {
          fireworksRef.current?.burstCrackers();
        }, 600);
      }
    }
  }, []);

  const handleGenerateWish = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validation = validateName(nameInput);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Please enter your name');
      return;
    }

    setValidationError(null);
    setSubmittedName(validation.sanitized);

    // Trigger celebration fireworks & sound
    if (soundEnabled) {
      playCrackerSound('burst');
    }
    fireworksRef.current?.burstCrackers();
  };

  const handleResetWish = () => {
    setSubmittedName(null);
    setNameInput('');
    setCopiedType(null);
  };

  const handleToggleDiyaGlow = () => {
    const nextState = !enhancedGlow;
    setEnhancedGlow(nextState);
    if (nextState && soundEnabled) {
      playDiyaChime();
    }
  };

  const handleBurstCrackers = () => {
    if (soundEnabled) {
      playCrackerSound('burst');
    }
    fireworksRef.current?.burstCrackers();
  };

  const handleLaunchRocket = () => {
    if (typeof window !== 'undefined') {
      const x = Math.random() * (window.innerWidth * 0.7) + window.innerWidth * 0.15;
      const y = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.1;
      fireworksRef.current?.launchRocketAt(x, y);
    }
  };

  const handleLightAnar = () => {
    if (typeof window !== 'undefined') {
      const x = window.innerWidth / 2;
      const y = window.innerHeight - 80;
      fireworksRef.current?.lightAnar(x, y);
    }
  };

  const greetingData = submittedName
    ? generateGreeting(submittedName, selectedWishIndex, appUrl)
    : null;

  const handleWhatsAppShare = () => {
    if (!greetingData) return;
    const shareUrl = formatWhatsAppUrl(greetingData.whatsappMessage);
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyGreeting = async () => {
    if (!greetingData) return;
    try {
      await navigator.clipboard.writeText(greetingData.whatsappMessage);
      setCopiedType('text');
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyLink = async () => {
    if (!submittedName) return;
    const shareLink = `${appUrl}?from=${encodeURIComponent(submittedName)}`;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopiedType('link');
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-amber-50 flex flex-col justify-between selection:bg-amber-500/30">
      {/* Background Interactive Fireworks and Twinkling Stars Canvas */}
      <FireworksCanvas
        ref={fireworksRef}
        enhancedGlow={enhancedGlow}
        soundEnabled={soundEnabled}
      />

      {/* Enhanced Ambient Golden Aura / Divine Diya Radiance */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-[1] ${
          enhancedGlow ? 'opacity-100' : 'opacity-25'
        }`}
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-t from-amber-600/25 via-amber-500/10 to-transparent blur-2xl" />
      </div>

      {/* Hanging Decorative Lanterns (Kandils) in Top Corners */}
      <div className="fixed top-0 left-0 sm:left-4 md:left-8 z-10 pointer-events-none opacity-60 sm:opacity-95">
        <KandilLantern side="left" />
      </div>
      <div className="fixed top-0 right-0 sm:right-4 md:right-8 z-10 pointer-events-none opacity-60 sm:opacity-95">
        <KandilLantern side="right" />
      </div>

      {/* Top Floating Control Bar */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-3 sm:px-6 pt-3 pb-2 flex items-center justify-between gap-2">
        {/* Festival Sub-Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-medium backdrop-blur-md shadow-sm shrink-0">
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '18s' }} />
          <span className="font-cinzel tracking-wider whitespace-nowrap">Festival of Lights</span>
        </div>

        {/* Action Controls: Sound Toggle, Diya Toggle, Burst Crackers */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Sound Toggle Button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all backdrop-blur-md flex items-center gap-1 hover:border-amber-400/60 active:scale-95"
            title={soundEnabled ? 'Mute Festive Audio Effects' : 'Enable Festive Audio Effects'}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span className="hidden md:inline">{soundEnabled ? 'Sound' : 'Muted'}</span>
          </button>

          {/* Light the Diya Toggle Button */}
          <button
            onClick={handleToggleDiyaGlow}
            className={`px-2.5 py-1.5 rounded-lg sm:rounded-xl text-xs font-medium transition-all backdrop-blur-md flex items-center gap-1 active:scale-95 border ${
              enhancedGlow
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-amber-200 border-amber-500/30'
            }`}
            title="Toggle divine background diya radiance and aura"
          >
            <Flame className={`w-3.5 h-3.5 ${enhancedGlow ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
            <span className="whitespace-nowrap">{enhancedGlow ? 'Diya Lit 🪔' : 'Light Diya 🪔'}</span>
          </button>

          {/* Burst Crackers Button */}
          <button
            onClick={handleBurstCrackers}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all flex items-center gap-1 active:scale-95 border border-yellow-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
            <span className="whitespace-nowrap">Burst Crackers ✨</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-3 sm:px-6 py-3 sm:py-6 w-full max-w-4xl mx-auto">
        {/* Regal Title & Golden Divine Heading */}
        <div className="text-center mb-4 sm:mb-6 space-y-1.5 select-none">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <GoldenDiyaIcon />
            <h1 className="font-cinzel-dec text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-[0_4px_20px_rgba(245,158,11,0.6)] animate-gold-shimmer">
              SHUBH DEEPAWALI
            </h1>
            <GoldenDiyaIcon className="transform scale-x-[-1] w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          {/* Authentic Hindi Subtext in Rozha One / Devanagari */}
          <p className="font-festive-hindi text-lg sm:text-2xl md:text-3xl text-amber-200/95 tracking-wide drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]">
            दीपावली की हार्दिक शुभकामनाएं
          </p>

          <p className="font-outfit text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto pt-0.5">
            Celebrate the auspicious festival of lights, prosperity, and joy with personalized festive greetings.
          </p>
        </div>

        {/* Central Rangoli Decorated Card Container */}
        <RangoliBorder glowActive={enhancedGlow} className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!submittedName ? (
              /* State 1: Name Input & Customization Form */
              <motion.div
                key="input-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="text-center space-y-1">
                  <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-amber-300">
                    Create Your Personalized Diwali Greeting
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-100/70">
                    Enter your name to generate an auspicious customized blessing for your family and friends.
                  </p>
                </div>

                <form onSubmit={handleGenerateWish} className="space-y-4 sm:space-y-5">
                  {/* Name Input Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="user-name-input"
                      className="block text-xs sm:text-sm font-medium text-amber-200 tracking-wide"
                    >
                      Your Full Name or Family Name
                    </label>
                    <div className="relative">
                      <input
                        id="user-name-input"
                        type="text"
                        value={nameInput}
                        onChange={(e) => {
                          setNameInput(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        placeholder="Enter your name... (e.g. Prashant Dhangar)"
                        maxLength={50}
                        className="w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl bg-slate-950/70 border border-amber-500/40 text-amber-50 placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-sm sm:text-base transition-all shadow-inner"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base sm:text-lg">
                        🪔
                      </span>
                    </div>
                    {validationError && (
                      <p className="text-xs text-rose-400 font-medium pl-1 flex items-center gap-1">
                        <span>⚠</span> {validationError}
                      </p>
                    )}
                  </div>

                  {/* Festive Wish Blessing Selector */}
                  <div className="space-y-1.5">
                    <span className="block text-xs sm:text-sm font-medium text-amber-200 tracking-wide">
                      Select Blessing Theme
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {FESTIVE_WISHES.map((wish, idx) => (
                        <button
                          key={wish.id}
                          type="button"
                          onClick={() => setSelectedWishIndex(idx)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all ${
                            selectedWishIndex === idx
                              ? 'bg-amber-500/25 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                              : 'bg-slate-900/40 border-amber-500/20 text-amber-200/60 hover:border-amber-400/40 hover:text-amber-100'
                          }`}
                        >
                          <div className="font-semibold text-amber-300 flex items-center gap-1 mb-1">
                            <span>{idx === 0 ? '🪙' : idx === 1 ? '✨' : '🚀'}</span>
                            <span className="truncate">{wish.label.split('(')[0]}</span>
                          </div>
                          <p className="text-[11px] line-clamp-2 text-amber-200/70">
                            {wish.english}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-3 sm:py-3.5 px-6 rounded-xl font-cinzel text-sm sm:text-base font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] border border-amber-200"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                      <span>Generate My Wish</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* State 2: Customized Dynamic Greeting Card Display */
              <motion.div
                key="greeting-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 sm:space-y-6 text-center"
              >
                {/* Auspicious Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold shadow-inner">
                  <span>✨</span>
                  <span>Personalized Festive Greeting</span>
                  <span>✨</span>
                </div>

                {/* Primary English Personalized Greeting */}
                <div className="space-y-2 px-1 sm:px-3">
                  <h3 className="font-cinzel text-lg sm:text-2xl md:text-3xl font-extrabold text-amber-300 leading-snug">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400 underline decoration-amber-500/50 decoration-wavy underline-offset-4 sm:underline-offset-8">
                      {greetingData?.senderName}
                    </span>{' '}
                    wishes you and your family a very happy, prosperous, and joyous Diwali!
                  </h3>

                  <p className="font-outfit text-xs sm:text-sm md:text-base text-amber-100/90 leading-relaxed max-w-xl mx-auto pt-1">
                    {FESTIVE_WISHES[selectedWishIndex].english}
                  </p>
                </div>

                {/* Traditional Hindi Inscription Card */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-950/40 border border-amber-500/30 backdrop-blur-sm shadow-inner space-y-1.5">
                  <p className="font-festive-hindi text-base sm:text-xl text-amber-200 leading-relaxed">
                    <span className="font-bold text-yellow-300">{greetingData?.senderName}</span>{' '}
                    की ओर से आपको एवं आपके सपरिवार को दीपावली की हार्दिक एवं मंगलमय शुभकामनाएं!
                  </p>
                  <p className="font-festive-hindi text-xs sm:text-base text-amber-300/80">
                    {FESTIVE_WISHES[selectedWishIndex].hindi}
                  </p>
                </div>

                {/* Share and Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Share on WhatsApp Button */}
                    <button
                      onClick={handleWhatsAppShare}
                      className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-medium bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="font-semibold text-sm">Share on WhatsApp</span>
                    </button>

                    {/* Copy Greeting Text Button */}
                    <button
                      onClick={handleCopyGreeting}
                      className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-medium bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 text-amber-200 shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      {copiedType === 'text' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300 text-sm font-semibold">Message Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-amber-300" />
                          <span className="text-sm font-semibold">Copy Greeting Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {/* Copy Personalized Link */}
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300/80 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors flex items-center gap-1.5"
                    >
                      {copiedType === 'link' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedType === 'link' ? 'Link Copied!' : 'Copy Shareable Link'}</span>
                    </button>

                    {/* Create Your Wish With Your Name */}
                    <button
                      onClick={handleResetWish}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-amber-200 hover:text-amber-100 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                      <span>Create your wish with your name</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </RangoliBorder>

        {/* Quick Cracker Action Trays */}
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-xs z-20">
          <button
            onClick={handleLaunchRocket}
            className="px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-amber-500/30 text-amber-200 hover:text-amber-100 flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            <span>Launch Sky Rocket</span>
          </button>
          <button
            onClick={handleLightAnar}
            className="px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-amber-500/30 text-amber-200 hover:text-amber-100 flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <FlameKindling className="w-3.5 h-3.5 text-orange-400" />
            <span>Golden Anar Fountain</span>
          </button>
        </div>
      </main>

      {/* Realistic Animated Flickering Diyas at the Bottom */}
      <footer className="relative z-20 w-full mt-auto pt-4 sm:pt-6 pb-4 sm:pb-6 px-3 sm:px-4">
        {/* Row of Festive Flickering Diyas with Ambient Floor Glow */}
        <div className="max-w-4xl mx-auto flex items-end justify-between sm:justify-around gap-1.5 sm:gap-6 overflow-hidden">
          {/* Left Wing Small Diya */}
          <div className="hidden sm:block">
            <RealisticDiya
              size="sm"
              isLit={enhancedGlow}
              onClick={() => {
                if (soundEnabled) playCrackerSound('sparkler');
              }}
              label="Decorative Corner Diya"
            />
          </div>

          {/* Left Mid Diya */}
          <RealisticDiya
            size="md"
            isLit={enhancedGlow}
            onClick={() => {
              if (soundEnabled) playCrackerSound('sparkler');
            }}
            label="Left Accent Diya"
          />

          {/* Center Main Ceremonial Large Diya */}
          <div className="relative -mb-1 sm:-mb-2">
            <RealisticDiya
              size="hero"
              isLit={enhancedGlow}
              onClick={handleToggleDiyaGlow}
              label="Center Sacred Deepawali Diya - Click to toggle glow"
            />
          </div>

          {/* Right Mid Diya */}
          <RealisticDiya
            size="md"
            isLit={enhancedGlow}
            onClick={() => {
              if (soundEnabled) playCrackerSound('sparkler');
            }}
            label="Right Accent Diya"
          />

          {/* Right Wing Small Diya */}
          <div className="hidden sm:block">
            <RealisticDiya
              size="sm"
              isLit={enhancedGlow}
              onClick={() => {
                if (soundEnabled) playCrackerSound('sparkler');
              }}
              label="Decorative Corner Diya"
            />
          </div>
        </div>

        {/* Traditional Festive Blessing Line & Developer Credit */}
        <div className="text-center mt-2.5 pt-2.5 border-t border-amber-500/15 space-y-1">
          <p className="text-[10px] sm:text-xs text-amber-300/60 tracking-wider font-cinzel">
            शुभ लाभ ✦ शुभ दीपावली ✦ तमसो मा ज्योतिर्गमय
          </p>
          <p className="text-[11px] sm:text-xs text-amber-200/80 font-outfit tracking-wide">
            Web Developed by <span className="font-semibold text-amber-300">Prashant Dhangar</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
