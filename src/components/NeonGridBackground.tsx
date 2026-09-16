import React, { useEffect, useRef } from 'react';
import { ThemeMode, GridStyle } from '../types';

interface NeonGridBackgroundProps {
  theme: ThemeMode;
  gridStyle: GridStyle;
  scanlinesEnabled: boolean;
  speedMultiplier?: number;
  glowIntensity?: number;
}

export const NeonGridBackground: React.FC<NeonGridBackgroundProps> = ({
  theme,
  gridStyle,
  scanlinesEnabled,
  speedMultiplier = 1,
  glowIntensity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offsetZ = 0;

    const themeColors: Record<ThemeMode, { primary: string; secondary: string; rgb: string }> = {
      blue: { primary: '#00f0ff', secondary: '#0070f3', rgb: '0, 240, 255' },
      magenta: { primary: '#ff007f', secondary: '#9d00ff', rgb: '255, 0, 127' },
      matrix: { primary: '#00ff66', secondary: '#059669', rgb: '0, 255, 102' },
      amber: { primary: '#ffaa00', secondary: '#ea580c', rgb: '255, 170, 0' },
      violet: { primary: '#c084fc', secondary: '#7c3aed', rgb: '192, 132, 252' },
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Floating cyber data packets
    const packets: Array<{ x: number; y: number; speed: number; size: number; alpha: number }> = [];
    for (let i = 0; i < 40; i++) {
      packets.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.3 + Math.random() * 0.8,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6,
      });
    }

    const render = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentColors = themeColors[theme] || themeColors.blue;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Clear with deep space darkness
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient radial glow behind hero
      const heroGlow = ctx.createRadialGradient(
        width * 0.5 + mouseRef.current.x * 60,
        height * 0.35 + mouseRef.current.y * 40,
        10,
        width * 0.5,
        height * 0.4,
        width * 0.6
      );
      heroGlow.addColorStop(0, `rgba(${currentColors.rgb}, ${0.12 * glowIntensity})`);
      heroGlow.addColorStop(0.5, `rgba(${currentColors.rgb}, ${0.03 * glowIntensity})`);
      heroGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = heroGlow;
      ctx.fillRect(0, 0, width, height);

      if (gridStyle === 'perspective' || gridStyle === 'cyber-mesh') {
        const horizonY = height * 0.52;
        const fov = 340;
        const gridSpacing = 48;
        const gridLines = 26;

        offsetZ = (offsetZ + 0.65 * speedMultiplier) % gridSpacing;

        ctx.save();

        // Glowing Horizon Line
        const horizonGrad = ctx.createLinearGradient(0, horizonY, width, horizonY);
        horizonGrad.addColorStop(0, 'rgba(0,0,0,0)');
        horizonGrad.addColorStop(0.2, `rgba(${currentColors.rgb}, ${0.3 * glowIntensity})`);
        horizonGrad.addColorStop(0.5, `rgba(${currentColors.rgb}, ${0.9 * glowIntensity})`);
        horizonGrad.addColorStop(0.8, `rgba(${currentColors.rgb}, ${0.3 * glowIntensity})`);
        horizonGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(width, horizonY);
        ctx.strokeStyle = horizonGrad;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = currentColors.primary;
        ctx.shadowBlur = 14 * glowIntensity;
        ctx.stroke();

        // 1. Perspective Horizontal Grid Lines
        for (let i = 1; i <= gridLines; i++) {
          const z = (i * gridSpacing - offsetZ);
          if (z <= 0) continue;

          const screenY = horizonY + (fov * 80) / (z + 80);
          if (screenY > height + 20) break;

          const depthRatio = (screenY - horizonY) / (height - horizonY);
          const alpha = Math.min(Math.max(depthRatio * 0.75, 0.05), 0.85) * glowIntensity;

          // Wave pulse on horizontal lines
          const wave = Math.sin(time * 0.002 + i * 0.3) * (mouseRef.current.y * 4);

          ctx.beginPath();
          ctx.moveTo(0, screenY + wave);
          ctx.lineTo(width, screenY + wave);

          ctx.strokeStyle = `rgba(${currentColors.rgb}, ${alpha * 0.4})`;
          ctx.lineWidth = 1 + depthRatio * 1.5;
          ctx.shadowBlur = depthRatio > 0.4 ? 8 * glowIntensity : 0;
          ctx.shadowColor = currentColors.primary;
          ctx.stroke();
        }

        // 2. Perspective Longitudinal Lines (Vanishing Point Lines)
        const vanishX = width * 0.5 + mouseRef.current.x * 120;
        const vanishY = horizonY;
        const numVLines = 36;
        const vSpan = width * 2.4;

        for (let j = -numVLines / 2; j <= numVLines / 2; j++) {
          const bottomX = vanishX + j * (vSpan / numVLines);

          ctx.beginPath();
          ctx.moveTo(vanishX, vanishY);
          ctx.lineTo(bottomX, height);

          const centerDist = Math.abs(j) / (numVLines / 2);
          const lineAlpha = (1 - centerDist * 0.5) * 0.28 * glowIntensity;

          ctx.strokeStyle = `rgba(${currentColors.rgb}, ${Math.max(lineAlpha, 0.04)})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = centerDist < 0.3 ? 6 * glowIntensity : 0;
          ctx.shadowColor = currentColors.primary;
          ctx.stroke();
        }

        // 3. Cyber Wireframe Nodes at Intersections (Topological points)
        if (gridStyle === 'cyber-mesh') {
          for (let row = 4; row <= 16; row += 2) {
            const z = row * gridSpacing - offsetZ;
            const screenY = horizonY + (fov * 80) / (z + 80);
            const depthRatio = (screenY - horizonY) / (height - horizonY);

            for (let col = -10; col <= 10; col += 2) {
              const nodeX = vanishX + col * ((vSpan / numVLines) * (depthRatio * 1.2));
              if (nodeX < 0 || nodeX > width) continue;

              const pulse = (Math.sin(time * 0.003 + row + col) + 1) * 0.5;
              ctx.beginPath();
              ctx.arc(nodeX, screenY, (1 + depthRatio * 2) * (0.8 + pulse * 0.4), 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${currentColors.rgb}, ${depthRatio * 0.7 * pulse})`;
              ctx.fill();
            }
          }
        }

        ctx.restore();
      } else if (gridStyle === 'minimal') {
        // Minimalist Dot Matrix
        const dotSpacing = 32;
        const cols = Math.ceil(width / dotSpacing);
        const rows = Math.ceil(height / dotSpacing);

        ctx.save();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const dx = c * dotSpacing;
            const dy = r * dotSpacing;
            const distToMouse = Math.hypot(dx - (width / 2 + mouseRef.current.x * 300), dy - (height / 2 + mouseRef.current.y * 300));
            const mouseProximity = Math.max(0, 1 - distToMouse / 350);

            ctx.beginPath();
            ctx.arc(dx, dy, 1 + mouseProximity * 2, 0, Math.PI * 2);
            ctx.fillStyle = mouseProximity > 0.1
              ? `rgba(${currentColors.rgb}, ${0.2 + mouseProximity * 0.6})`
              : `rgba(${currentColors.rgb}, 0.07)`;
            ctx.fill();
          }
        }
        ctx.restore();
      }

      // Draw floating cyber data packets
      packets.forEach((p) => {
        p.y -= p.speed * speedMultiplier;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${currentColors.rgb}, ${p.alpha * 0.7})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = currentColors.primary;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, gridStyle, speedMultiplier, glowIntensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {scanlinesEnabled && <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />}
      {/* Vignette border */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
    </div>
  );
};
