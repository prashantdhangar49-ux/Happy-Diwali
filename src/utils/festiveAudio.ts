/**
 * Web Audio API synthesizer for realistic Diwali firecracker sounds and ambient chime
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playCrackerSound(type: 'rocket' | 'burst' | 'sparkler' | 'anar' = 'burst'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'rocket') {
      // Ascending whistle sound followed by pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.35);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);

      // Trigger burst sound after rocket reaches apex
      setTimeout(() => {
        playCrackerSound('burst');
      }, 350);
      return;
    }

    if (type === 'burst') {
      // Noise buffer burst with low-pass boom and high crackle
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Filter for deep explosion boom
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.45);

      // Secondary micro-crackles
      for (let j = 0; j < 3; j++) {
        setTimeout(() => {
          try {
            const crackleCtx = getAudioContext();
            if (!crackleCtx) return;
            const cNow = crackleCtx.currentTime;
            const cOsc = crackleCtx.createOscillator();
            const cGain = crackleCtx.createGain();
            cOsc.type = 'triangle';
            cOsc.frequency.setValueAtTime(600 + Math.random() * 800, cNow);
            cGain.gain.setValueAtTime(0.06, cNow);
            cGain.gain.exponentialRampToValueAtTime(0.001, cNow + 0.05);
            cOsc.connect(cGain);
            cGain.connect(crackleCtx.destination);
            cOsc.start(cNow);
            cOsc.stop(cNow + 0.05);
          } catch {
            // ignore
          }
        }, 80 + j * 60 + Math.random() * 40);
      }
      return;
    }

    if (type === 'sparkler' || type === 'anar') {
      // Sizzling sparkling fountain sound
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2500, now);
      bandpass.Q.setValueAtTime(3.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.55);
    }
  } catch {
    // Graceful fallback if Web Audio is restricted
  }
}

// Gentle festive chime when lighting diya
export function playDiyaChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (joyful harp arpeggio)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 1.25);
    });
  } catch {
    // Ignore audio restriction
  }
}
