import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import confetti from 'canvas-confetti';
import { playCrackerSound } from '../utils/festiveAudio';

export interface FireworksCanvasHandle {
  burstCrackers: () => void;
  launchRocketAt: (x: number, y: number) => void;
  lightAnar: (x: number, y: number) => void;
}

interface FireworksCanvasProps {
  enhancedGlow: boolean;
  soundEnabled: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  hue: number;
}

const FESTIVE_PALETTE = [
  '#FFD700', // Gold
  '#FFA500', // Orange
  '#FF4500', // OrangeRed
  '#FF1493', // Deep Pink
  '#00FFFF', // Cyan
  '#39FF14', // Neon Green
  '#FFD166', // Sunset
  '#F72585', // Magenta
  '#7209B7', // Purple
  '#FFF7B2', // Warm White
];

export const FireworksCanvas = forwardRef<FireworksCanvasHandle, FireworksCanvasProps>(
  ({ enhancedGlow, soundEnabled }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rocketsRef = useRef<Rocket[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const starsRef = useRef<Star[]>([]);
    const animFrameRef = useRef<number | null>(null);

    // Initialize stars
    const initStars = (width: number, height: number) => {
      const starCount = Math.floor((width * height) / 8000);
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.02 + 0.008,
          hue: Math.random() > 0.4 ? 45 : 200, // Gold and soft cyan stars
        });
      }
      starsRef.current = stars;
    };

    const explode = (x: number, y: number, color?: string, count: number = 80) => {
      const baseColor = color || FESTIVE_PALETTE[Math.floor(Math.random() * FESTIVE_PALETTE.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          color: Math.random() > 0.25 ? baseColor : FESTIVE_PALETTE[Math.floor(Math.random() * FESTIVE_PALETTE.length)],
          size: Math.random() * 2.5 + 1.2,
          flicker: Math.random() > 0.4,
        });
      }
      if (soundEnabled) {
        playCrackerSound('burst');
      }
    };

    const launchRocket = (targetX: number, targetY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const startX = targetX + (Math.random() * 40 - 20);
      const startY = canvas.height;
      const vy = -(Math.random() * 3 + 12);
      const vx = (targetX - startX) / 25;

      rocketsRef.current.push({
        x: startX,
        y: startY,
        targetY,
        vx,
        vy,
        color: FESTIVE_PALETTE[Math.floor(Math.random() * FESTIVE_PALETTE.length)],
        trail: [],
      });

      if (soundEnabled) {
        playCrackerSound('rocket');
      }
    };

    const burstConfettiShow = () => {
      // Multiple bursts of canvas-confetti with gold, saffron, and vibrant jewel tones
      const end = Date.now() + 1200;
      const colors = ['#FFD700', '#F59E0B', '#EF4444', '#EC4899', '#10B981', '#3B82F6', '#FFFFFF'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
          zIndex: 40,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
          zIndex: 40,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Also trigger 4 random high sky-rocket explosions on the canvas
      const canvas = canvasRef.current;
      if (canvas) {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            const rx = Math.random() * (canvas.width * 0.7) + canvas.width * 0.15;
            const ry = Math.random() * (canvas.height * 0.45) + canvas.height * 0.1;
            explode(rx, ry, undefined, 100);
          }, i * 220);
        }
      }
    };

    // Expose control methods
    useImperativeHandle(ref, () => ({
      burstCrackers: () => {
        burstConfettiShow();
      },
      launchRocketAt: (x: number, y: number) => {
        launchRocket(x, y);
      },
      lightAnar: (x: number, y: number) => {
        // Golden fountain sparkles shooting upward
        for (let i = 0; i < 50; i++) {
          const angle = -Math.PI / 2 + (Math.random() * 0.8 - 0.4);
          const speed = Math.random() * 8 + 3;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.02,
            color: Math.random() > 0.3 ? '#FFD700' : '#FFF275',
            size: Math.random() * 2 + 1,
            flicker: true,
          });
        }
        if (soundEnabled) {
          playCrackerSound('anar');
        }
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars(canvas.width, canvas.height);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      // Animation Loop
      const render = () => {
        // Subtle clear trailing for motion blur
        ctx.fillStyle = 'rgba(15, 12, 41, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render celestial stars
        starsRef.current.forEach((star) => {
          star.alpha += star.speed;
          if (star.alpha > 1 || star.alpha < 0.2) {
            star.speed = -star.speed;
          }
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, 90%, 80%, ${Math.max(0.1, star.alpha)})`;
          ctx.fill();
        });

        // Update and draw rockets
        for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
          const r = rocketsRef.current[i];
          r.x += r.vx;
          r.y += r.vy;
          r.vy += 0.12; // slight gravity

          r.trail.push({ x: r.x, y: r.y, alpha: 0.9 });
          if (r.trail.length > 8) r.trail.shift();

          // Draw trail
          ctx.beginPath();
          r.trail.forEach((pt, idx) => {
            ctx.lineTo(pt.x, pt.y);
            pt.alpha -= 0.1;
          });
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = r.color;
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Apex or target reached
          if (r.y <= r.targetY || r.vy >= 0) {
            explode(r.x, r.y, r.color, 90);
            rocketsRef.current.splice(i, 1);
          }
        }

        // Update and draw particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // gravity
          p.vx *= 0.985; // air resistance
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.flicker && Math.random() > 0.5 ? p.alpha * 0.5 : p.alpha;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = enhancedGlow ? 12 : 6;
          ctx.fill();
          ctx.restore();
        }

        animFrameRef.current = requestAnimationFrame(render);
      };

      animFrameRef.current = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    }, [enhancedGlow, soundEnabled]);

    // Handle user clicking directly anywhere on the canvas to shoot a rocket
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      launchRocket(clickX, clickY);
    };

    return (
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        data-testid="fireworks-canvas"
        className="fixed inset-0 pointer-events-auto z-0 cursor-crosshair"
        title="Click anywhere to shoot Diwali rockets! 🎆"
        aria-label="Interactive Diwali Fireworks Canvas"
      />
    );
  }
);

FireworksCanvas.displayName = 'FireworksCanvas';
