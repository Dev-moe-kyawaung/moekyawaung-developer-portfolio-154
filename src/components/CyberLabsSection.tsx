import React, { useState, useEffect } from 'react';
import { Sliders, Shield, Activity, RefreshCw, Copy, Check, Lock, Globe, Sparkles } from 'lucide-react';
import { ThemeMode, GridStyle } from '../types';
import { soundFx } from '../utils/audio';

interface CyberLabsSectionProps {
  theme: ThemeMode;
  onThemeChange: (t: ThemeMode) => void;
  gridStyle: GridStyle;
  onGridStyleChange: (s: GridStyle) => void;
  scanlines: boolean;
  onToggleScanlines: () => void;
  speedMultiplier: number;
  onSpeedChange: (speed: number) => void;
  glowIntensity: number;
  onGlowChange: (glow: number) => void;
}

export const CyberLabsSection: React.FC<CyberLabsSectionProps> = ({
  theme,
  onThemeChange,
  gridStyle,
  onGridStyleChange,
  scanlines,
  onToggleScanlines,
  speedMultiplier,
  onSpeedChange,
  glowIntensity,
  onGlowChange,
}) => {
  const [activeTab, setActiveTab] = useState<'grid-tuner' | 'crypto-tool' | 'latency-mesh'>('grid-tuner');

  // Crypto tool state
  const [inputText, setInputText] = useState('Moe Kyaw Aung // Cyber Architect 2026');
  const [shaHash, setShaHash] = useState('');
  const [base64Val, setBase64Val] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);

  // Compute live SHA-256 and Base64
  useEffect(() => {
    try {
      setBase64Val(btoa(inputText));
    } catch {
      setBase64Val('[ENCODING_ERROR]');
    }

    // Web Crypto API SHA-256
    const computeSHA = async () => {
      try {
        const msgBuffer = new TextEncoder().encode(inputText);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setShaHash(hashHex);
      } catch {
        setShaHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
      }
    };
    computeSHA();
  }, [inputText]);

  // Global Latency simulator state
  const edgeNodes = [
    { region: 'Singapore (SIN-01)', base: 8, jitter: 1.2, active: true, load: '42%' },
    { region: 'Tokyo (NRT-02)', base: 45, jitter: 3.5, active: true, load: '68%' },
    { region: 'Frankfurt (FRA-01)', base: 140, jitter: 4.8, active: true, load: '55%' },
    { region: 'San Francisco (SFO-01)', base: 165, jitter: 6.2, active: true, load: '72%' },
    { region: 'London (LHR-01)', base: 135, jitter: 5.1, active: true, load: '49%' },
  ];

  const [pingPings, setPingPings] = useState<Record<string, number>>({});

  const refreshPings = () => {
    soundFx.playClick();
    const newPings: Record<string, number> = {};
    edgeNodes.forEach((node) => {
      newPings[node.region] = +(node.base + (Math.random() * node.jitter * 2 - node.jitter)).toFixed(1);
    });
    setPingPings(newPings);
  };

  useEffect(() => {
    refreshPings();
    const interval = setInterval(refreshPings, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyHash = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(shaHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section id="labs" className="py-20 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Sparkles size={14} />
              <span className="uppercase tracking-widest font-bold">// 05. CYBERNETIC_LABORATORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-cyber text-white tracking-wide mt-1">
              Interactive Dev Tools & Playground
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Test live background shaders, inspect real-time cryptographic primitives, and monitor distributed edge latency mesh.
          </p>
        </div>

        {/* Labs Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('grid-tuner');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
              activeTab === 'grid-tuner'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders size={14} />
            <span>01 // NEON GRID & SHADER TUNER</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('crypto-tool');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
              activeTab === 'crypto-tool'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock size={14} />
            <span>02 // REAL-TIME CRYPTO & HASH TOOL</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('latency-mesh');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
              activeTab === 'latency-mesh'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe size={14} />
            <span>03 // GLOBAL LATENCY MESH SIMULATOR</span>
          </button>
        </div>

        {/* Tab 1: Grid Tuner */}
        {activeTab === 'grid-tuner' && (
          <div className="p-6 md:p-8 bg-slate-950/90 border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                <Sliders size={15} /> LIVE BACKGROUND GRID PARAMETER CONTROLS
              </span>
              <span className="text-slate-400 text-[11px]">Changes modify the page canvas in real-time</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Grid Style Mode */}
              <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
                <span className="text-slate-300 font-bold block">GRID TOPOLOGY MODE</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['perspective', 'cyber-mesh', 'minimal'] as GridStyle[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        soundFx.playClick();
                        onGridStyleChange(mode);
                      }}
                      className={`p-2 rounded border uppercase text-[10px] font-bold transition-all ${
                        gridStyle === mode
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Speed Slider */}
              <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-bold">GRID TRAVEL SPEED</span>
                  <span className="text-cyan-400 font-bold">{speedMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.2"
                  value={speedMultiplier}
                  onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Static (0x)</span>
                  <span>Normal (1x)</span>
                  <span>Hyper (3x)</span>
                </div>
              </div>

              {/* Glow Bloom Intensity */}
              <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-bold">NEON GLOW BLOOM</span>
                  <span className="text-cyan-400 font-bold">{Math.round(glowIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2"
                  step="0.1"
                  value={glowIntensity}
                  onChange={(e) => onGlowChange(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Subtle (30%)</span>
                  <span>Balanced (100%)</span>
                  <span>Max Bloom (200%)</span>
                </div>
              </div>
            </div>

            {/* Bottom toggles */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onToggleScanlines();
                  }}
                  className={`px-3 py-1.5 rounded border transition-colors ${
                    scanlines
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  CRT SCANLINES: {scanlines ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-[11px]">SPECTRUM:</span>
                {(['blue', 'magenta', 'matrix', 'amber', 'violet'] as ThemeMode[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      soundFx.playClick();
                      onThemeChange(t);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border transition-all ${
                      theme === t ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Crypto Tool */}
        {activeTab === 'crypto-tool' && (
          <div className="p-6 md:p-8 bg-slate-950/90 border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                <Shield size={15} /> CLIENT-SIDE WEB CRYPTO & HASH GENERATOR
              </span>
              <span className="text-emerald-400 text-[11px] font-bold">SUBTLE_CRYPTO_ACTIVE</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-slate-300 block mb-1 font-bold">RAW PAYLOAD / STRING INPUT:</label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                  placeholder="Enter any text to inspect real-time cryptographic digest..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold">SHA-256 DIGEST (HEX):</span>
                    <button
                      onClick={handleCopyHash}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedHash ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedHash ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-cyan-200 break-all select-all font-mono">
                    {shaHash}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-bold block">BASE64 ENCODED:</span>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-300 break-all select-all font-mono">
                    {base64Val}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Global Latency Simulator */}
        {activeTab === 'latency-mesh' && (
          <div className="p-6 md:p-8 bg-slate-950/90 border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                <Activity size={15} /> DISTRIBUTED EDGE NODE TELEMETRY & RTT
              </span>
              <button
                onClick={refreshPings}
                className="flex items-center space-x-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-xs transition-colors"
              >
                <RefreshCw size={12} />
                <span>PING ALL NODES</span>
              </button>
            </div>

            <div className="space-y-3">
              {edgeNodes.map((node) => {
                const currentPing = pingPings[node.region] || node.base;
                const isVeryFast = currentPing < 20;
                const isFast = currentPing < 70;

                return (
                  <div
                    key={node.region}
                    className="p-3.5 bg-slate-900/50 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <span className="font-bold text-white text-xs block">{node.region}</span>
                        <span className="text-[10px] text-slate-500">EDGE POP &bull; LOAD: {node.load}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span
                          className={`text-sm font-bold font-mono ${
                            isVeryFast ? 'text-emerald-400' : isFast ? 'text-cyan-400' : 'text-amber-400'
                          }`}
                        >
                          {currentPing} ms
                        </span>
                        <span className="text-[10px] text-slate-500 block">Round-Trip Time</span>
                      </div>

                      <div className="w-24 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${Math.min(100, (currentPing / 180) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
