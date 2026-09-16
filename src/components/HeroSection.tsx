import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, ArrowRight, FileText, Sparkles, Activity, Globe, Cpu } from 'lucide-react';
import { PERSONAL_INFO, TELEMETRY_METRICS } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onOpenDossier: () => void;
  onOpenMatrix: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTerminal,
  onOpenDossier,
  onOpenMatrix,
}) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const rotatingTexts = [
    'Architecting sub-10ms distributed event streaming meshes.',
    'Building high-throughput Go & Rust microservice architectures.',
    'Crafting reactive React 19 & WebGL 3D cybernetic experiences.',
    'Scaling multi-agent LLM reasoning pipelines & vector search engines.',
  ];

  useEffect(() => {
    const currentFullText = rotatingTexts[typingIndex];
    const typingSpeed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText.length === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % rotatingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typingIndex]);

  const scrollToContact = () => {
    soundFx.playClick();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto">
        {/* Cyber Top HUD Header Coordinate Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 bg-slate-950/70 border border-cyan-500/30 rounded-lg backdrop-blur-md font-mono text-[11px] text-slate-400 mb-8 sm:mb-12">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 font-bold tracking-wider">
              SYS_NODE // SINGAPORE [1.3521° N, 103.8198° E]
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-slate-500">
              CLEARANCE: <span className="text-cyan-300 font-bold">{PERSONAL_INFO.clearance}</span>
            </span>
            <span className="text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
              {PERSONAL_INFO.status}
            </span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Interactive Tagline */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Monospace System Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300">
              <Cpu size={14} className="text-cyan-400" />
              <span>SENIOR FULL-STACK ARCHITECT & CREATIVE TECHNOLOGIST</span>
            </div>

            {/* Main Name Heading with Neon Electric Glow */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-cyber uppercase leading-none">
                <span className="text-white block">MOE KYAW</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_35px_rgba(0,240,255,0.6)]">
                  AUNG
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-mono text-cyan-400/80 tracking-widest uppercase">
                [ DISTRIBUTED SYSTEMS // REACT 19 // GO // RUST // WEBGL // CLOUD INFRA ]
              </p>
            </div>

            {/* Dynamic Interactive Terminal Typing Tagline */}
            <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-lg font-mono text-xs sm:text-sm text-slate-200 shadow-[0_0_25px_rgba(0,240,255,0.1)] relative">
              <div className="flex items-center space-x-2 text-slate-500 mb-1.5 text-[11px]">
                <span className="text-cyan-400 font-bold">&gt;&gt;</span>
                <span>CORE_MISSION_PROMPT:</span>
              </div>
              <div className="text-cyan-200 font-mono min-h-[44px] flex items-center">
                <span>{displayedText}</span>
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToContact}
                onMouseEnter={() => soundFx.playHover()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.65)] transition-all flex items-center space-x-2"
              >
                <span>INITIALIZE CONTRACT // TRANSMIT</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-4 py-3 bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all flex items-center space-x-2"
              >
                <Terminal size={15} className="text-cyan-400" />
                <span>TERMINAL [CLI]</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenDossier();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-4 py-3 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-all flex items-center space-x-2"
              >
                <FileText size={15} />
                <span>DOSSIER (CV)</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenMatrix();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-3.5 py-3 bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-all flex items-center space-x-1.5"
                title="Launch Matrix Simulation Mode"
              >
                <Sparkles size={15} className="text-cyan-400" />
                <span>MATRIX</span>
              </button>
            </div>
          </div>

          {/* Right Column: Holographic Avatar Frame with Cyber Orbital Rings */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
              {/* Outer Neon Orbit Ring 1 */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin [animation-duration:30s] pointer-events-none" />
              {/* Outer Neon Orbit Ring 2 */}
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/30 animate-spin [animation-duration:20s] [animation-direction:reverse] pointer-events-none" />

              {/* Corner Targeting Brackets */}
              <div className="absolute -top-2 -left-2 text-cyan-400 font-mono text-sm">[+]</div>
              <div className="absolute -top-2 -right-2 text-cyan-400 font-mono text-sm">[+]</div>
              <div className="absolute -bottom-2 -left-2 text-cyan-400 font-mono text-sm">[+]</div>
              <div className="absolute -bottom-2 -right-2 text-cyan-400 font-mono text-sm">[+]</div>

              {/* Holographic Card Container */}
              <div className="relative w-4/5 h-4/5 rounded-2xl overflow-hidden bg-slate-950 border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,240,255,0.35)] group">
                {/* Developer Avatar Image */}
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-center filter saturate-110 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Scanline overlay */}
                <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Cyber Card Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 font-mono space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">
                      MKA // LEAD_ARCHITECT
                    </span>
                    <span className="flex items-center space-x-1 text-[11px] text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>ONLINE</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Singapore &bull; Remote Available
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-cyan-500/30">
                    <span>UPTIME: 99.995%</span>
                    <span>PING: 12ms</span>
                  </div>
                </div>
              </div>

              {/* Floating Orbiting Badges */}
              <div className="absolute -bottom-3 -right-2 sm:-right-4 px-3 py-1.5 bg-slate-950/90 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] font-mono text-xs text-cyan-300 flex items-center space-x-2">
                <ShieldCheck size={14} className="text-cyan-400" />
                <span>VERIFIED ARCHITECT</span>
              </div>

              <div className="absolute -top-3 -left-2 sm:-left-4 px-3 py-1.5 bg-slate-950/90 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] font-mono text-xs text-cyan-300 flex items-center space-x-1.5">
                <Globe size={13} className="text-cyan-400" />
                <span>GLOBAL SCALE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Metrics Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {TELEMETRY_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className="p-4 bg-slate-950/70 border border-cyan-500/25 hover:border-cyan-400/60 rounded-xl backdrop-blur-md transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>0{idx + 1} // METRIC</span>
                <span className="text-cyan-400 font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {metric.badge}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold font-cyber text-white group-hover:text-cyan-300 transition-colors">
                {metric.value}
              </div>

              <div className="text-xs font-mono text-slate-300 mt-1 uppercase tracking-wider">
                {metric.label}
              </div>

              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center space-x-1">
                <Activity size={11} />
                <span>{metric.change} baseline</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
