import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundFx } from '../utils/audio';

interface MatrixRainOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const MatrixRainOverlay: React.FC<MatrixRainOverlayProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(soundFx.getMuted());

  useEffect(() => {
    const unsub = soundFx.subscribe(setIsAudioMuted);
    return unsub;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    soundFx.playOpenModal();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜMKA_DEV_CYBER_MATRIX_SYSTEM_ONLINE_';
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array.from({ length: columns }).map(() => Math.floor(Math.random() * -100));

    const themeColors: Record<ThemeMode, { main: string; head: string }> = {
      blue: { main: '#00f0ff', head: '#ffffff' },
      magenta: { main: '#ff007f', head: '#ffffff' },
      matrix: { main: '#00ff66', head: '#ffffff' },
      amber: { main: '#ffaa00', head: '#ffffff' },
      violet: { main: '#c084fc', head: '#ffffff' },
    };

    const draw = () => {
      if (!isRunning) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      const colors = themeColors[theme] || themeColors.blue;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Top character is bright white
        ctx.fillStyle = colors.head;
        ctx.fillText(text, x, y);

        // Body is theme neon
        ctx.fillStyle = colors.main;
        ctx.shadowColor = colors.main;
        ctx.shadowBlur = 8;
        ctx.fillText(text, x, y - fontSize);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isRunning, theme]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />

      {/* Cyber HUD Control Panel */}
      <div className="relative z-10 max-w-lg w-full mx-4 p-6 bg-slate-950/85 border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.25)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs tracking-wider text-cyan-400 font-bold uppercase">
              // MATRIX_STREAM :: ACTIVE_SESSION
            </span>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white hover:bg-cyan-500/20 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 font-mono text-xs text-slate-300">
          <p className="text-cyan-300 leading-relaxed">
            Neural stream connection established with Moe Kyaw Aung's cybernetic matrix node. All system telemetry running at maximum throughput.
          </p>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/60 rounded border border-cyan-500/20">
            <div>
              <span className="text-slate-500 block">CIPHER PROTOCOL</span>
              <span className="text-cyan-400 font-bold">AES-256-GCM / ZK</span>
            </div>
            <div>
              <span className="text-slate-500 block">TRANSMISSION RATE</span>
              <span className="text-cyan-400 font-bold">128.4 MB/s</span>
            </div>
            <div>
              <span className="text-slate-500 block">ACTIVE SECTORS</span>
              <span className="text-cyan-400 font-bold">64 NODES</span>
            </div>
            <div>
              <span className="text-slate-500 block">LATENCY SYNC</span>
              <span className="text-cyan-400 font-bold">&lt; 1.4 ms</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsRunning(!isRunning);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 rounded text-xs transition-colors"
              >
                {isRunning ? <Pause size={14} /> : <Play size={14} />}
                <span>{isRunning ? 'FREEZE' : 'RESUME'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.toggleMute();
                }}
                className="p-1.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 rounded text-xs transition-colors"
                title={isAudioMuted ? 'Unmute SFX' : 'Mute SFX'}
              >
                {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              DISMISS MATRIX [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
