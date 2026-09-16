import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Command, FileText, Menu, X, Activity, Grid } from 'lucide-react';
import { ThemeMode, GridStyle } from '../types';
import { soundFx } from '../utils/audio';

interface CyberNavbarProps {
  activeSection: string;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  gridStyle: GridStyle;
  onGridStyleChange: (style: GridStyle) => void;
  onOpenCommandPalette: () => void;
  onOpenDossier: () => void;
  onOpenMatrix: () => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  activeSection,
  theme,
  onThemeChange,
  gridStyle,
  onGridStyleChange,
  onOpenCommandPalette,
  onOpenDossier,
  onOpenMatrix,
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(soundFx.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const unsub = soundFx.subscribe(setIsAudioMuted);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Simple FPS tracker
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };
    animId = requestAnimationFrame(measureFps);

    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: '01 // OVERVIEW' },
    { id: 'projects', label: '02 // PROJECTS' },
    { id: 'skills', label: '03 // SKILLS' },
    { id: 'terminal', label: '04 // TERMINAL' },
    { id: 'labs', label: '05 // LABS' },
    { id: 'experience', label: '06 // TIMELINE' },
    { id: 'contact', label: '07 // TRANSMIT' },
  ];

  const themeOptions: { id: ThemeMode; label: string; color: string }[] = [
    { id: 'blue', label: 'Electric Blue', color: '#00f0ff' },
    { id: 'magenta', label: 'Cyber Magenta', color: '#ff007f' },
    { id: 'matrix', label: 'Matrix Emerald', color: '#00ff66' },
    { id: 'amber', label: 'Synth Amber', color: '#ffaa00' },
    { id: 'violet', label: 'Void Violet', color: '#c084fc' },
  ];

  const scrollTo = (id: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 border-b border-cyan-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Live Telemetry HUD */}
          <div className="flex items-center space-x-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="group flex items-center space-x-2 font-cyber text-lg font-bold tracking-widest text-white transition-all"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded border border-cyan-500/50 bg-cyan-950/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                <span className="text-cyan-400 text-xs font-mono font-bold">&gt;</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute -top-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="group-hover:text-cyan-300 transition-colors text-sm sm:text-base tracking-wider">
                  MKA<span className="text-cyan-400 animate-pulse">_</span>DEV
                </span>
              </div>
            </a>

            {/* Live System Status Indicator (Desktop) */}
            <div className="hidden xl:flex items-center space-x-3 px-3 py-1 bg-slate-900/60 border border-slate-800 rounded-md text-[11px] font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">SYS: NORMAL</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center space-x-1 text-slate-300">
                <Activity size={12} className="text-cyan-400" />
                <span>12ms</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-300">{fps} FPS</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-3 py-1.5 rounded transition-all relative ${
                    isActive
                      ? 'text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* HUD Utility Actions */}
          <div className="flex items-center space-x-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenCommandPalette();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 rounded text-xs font-mono transition-all"
              title="Open Command Palette (Cmd + K)"
            >
              <Command size={13} className="text-cyan-400" />
              <span className="text-[11px] text-slate-400">CMD+K</span>
            </button>

            {/* Matrix Rain Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenMatrix();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 rounded text-xs font-mono transition-all"
              title="Launch Matrix Simulation"
            >
              <Sparkles size={13} />
              <span className="text-[11px] font-bold">MATRIX</span>
            </button>

            {/* Dossier CV Modal */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenDossier();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 rounded text-xs font-mono transition-all"
              title="View Dossier / CV"
            >
              <FileText size={13} className="text-cyan-400" />
              <span>DOSSIER</span>
            </button>

            {/* Grid Style Switcher */}
            <button
              onClick={() => {
                soundFx.playClick();
                const styles: GridStyle[] = ['perspective', 'cyber-mesh', 'minimal'];
                const nextIdx = (styles.indexOf(gridStyle) + 1) % styles.length;
                onGridStyleChange(styles[nextIdx]);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors"
              title={`Grid Mode: ${gridStyle} (Click to toggle)`}
            >
              <Grid size={16} />
            </button>

            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setThemeDropdownOpen(!themeDropdownOpen);
                }}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Neon Theme Switcher"
              >
                <div
                  className="w-4 h-4 rounded-full border border-white/40 shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: themeOptions.find((t) => t.id === theme)?.color || '#00f0ff' }}
                />
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 p-2 bg-slate-950/95 border border-cyan-500/40 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 font-mono text-xs space-y-1">
                  <div className="px-2 py-1 text-[10px] text-slate-500 uppercase font-bold tracking-wider border-b border-slate-800">
                    NEON SPECTRA
                  </div>
                  {themeOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        soundFx.playClick();
                        onThemeChange(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded transition-colors ${
                        theme === t.id ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Audio Synthesizer SFX Mute/Unmute */}
            <button
              onClick={() => {
                const muted = soundFx.toggleMute();
                setIsAudioMuted(muted);
              }}
              className={`p-1.5 rounded border transition-all ${
                isAudioMuted
                  ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
              }`}
              title={isAudioMuted ? 'SFX Audio: Muted (Click to enable)' : 'SFX Audio: Active (Click to mute)'}
            >
              {isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Fast "Hire Moe" CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('contact');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="hidden lg:flex items-center px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs rounded uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              HIRE // SYNC
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-1.5 lg:hidden rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-slate-950/95 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-xl font-mono text-xs space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`p-2.5 text-left rounded border transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                  onOpenDossier();
                }}
                className="flex-1 py-2 bg-slate-900 border border-slate-800 text-cyan-300 rounded text-center"
              >
                VIEW DOSSIER
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                  onOpenMatrix();
                }}
                className="flex-1 py-2 bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 rounded text-center font-bold"
              >
                MATRIX MODE
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
