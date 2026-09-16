import React, { useState, useEffect } from 'react';
import { X, ExternalLink, GitBranch, Layers, Cpu, Code2, Check, Copy, Play, RefreshCw, Zap, ShieldAlert, Radio } from 'lucide-react';
import { Project } from '../types';
import { soundFx } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'sandbox' | 'code' | 'challenges'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  // Live Sandbox state simulators
  const [streamCount, setStreamCount] = useState(14820);
  const [streamLatency, setStreamLatency] = useState(7.8);
  const [streamActive, setStreamActive] = useState(false);
  const [streamLogs, setStreamLogs] = useState<string[]>([]);

  // Agent DAG simulation state
  const [agentStep, setAgentStep] = useState<number>(0);
  const [agentRunning, setAgentRunning] = useState(false);

  // Rate limiter simulator state
  const [tokensLeft, setTokensLeft] = useState(20);
  const [rateLog, setRateLog] = useState<{ id: number; status: 'ALLOW' | 'DENY'; time: string }[]>([]);

  useEffect(() => {
    if (project) {
      soundFx.playOpenModal();
      setActiveTab('architecture');
      setStreamLogs([
        `[INFO] Ingress Node #09 initialized at edge-sin-1`,
        `[INFO] Established QUIC mTLS session with 42 edge peers`,
        `[READY] Listening for streaming payloads...`
      ]);
    }
  }, [project]);

  if (!project) return null;

  const handleCopyCode = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Run Event Stream Simulation
  const triggerEventBurst = () => {
    soundFx.playClick();
    setStreamActive(true);
    const added = Math.floor(Math.random() * 500) + 500;
    setStreamCount((prev) => prev + added);
    const newLatency = (Math.random() * 3 + 5.2).toFixed(1);
    setStreamLatency(parseFloat(newLatency));

    const newLog = `[DISPATCH] Stream chunk (+${added} msgs) verified in ${newLatency}ms // hash: 0x${Math.random().toString(16).slice(2, 8)}`;
    setStreamLogs((prev) => [newLog, ...prev.slice(0, 5)]);

    setTimeout(() => setStreamActive(false), 600);
  };

  // Run Multi-Agent DAG Simulation
  const runAgentDAG = () => {
    soundFx.playClick();
    setAgentRunning(true);
    setAgentStep(1);

    setTimeout(() => {
      setAgentStep(2);
      setTimeout(() => {
        setAgentStep(3);
        setTimeout(() => {
          setAgentStep(4);
          setAgentRunning(false);
          soundFx.playSuccess();
        }, 800);
      }, 800);
    }, 800);
  };

  // Run Rate Limiter test
  const sendRateLimitedRequest = () => {
    const timestamp = new Date().toLocaleTimeString();
    if (tokensLeft > 0) {
      soundFx.playClick();
      setTokensLeft((prev) => prev - 1);
      setRateLog((prev) => [{ id: Date.now(), status: 'ALLOW', time: timestamp }, ...prev.slice(0, 5)]);
    } else {
      soundFx.playError();
      setRateLog((prev) => [{ id: Date.now(), status: 'DENY', time: timestamp }, ...prev.slice(0, 5)]);
    }
  };

  const refillBucket = () => {
    soundFx.playSuccess();
    setTokensLeft(20);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden font-sans">
        {/* Header HUD */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                // PROJECT_TELEMETRY :: {project.category.toUpperCase()}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white font-cyber tracking-wide">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 rounded text-xs font-mono transition-colors"
              >
                <ExternalLink size={13} />
                <span>LIVE DEMO</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded text-xs font-mono transition-colors"
              >
                <GitBranch size={13} />
                <span>SOURCE</span>
              </a>
            )}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-slate-800 bg-slate-900/50 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('architecture');
            }}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={14} />
            <span>01 // ARCHITECTURE BLUEPRINT</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('sandbox');
            }}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'sandbox'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu size={14} />
            <span>02 // LIVE INTERACTIVE LAB</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('code');
            }}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 size={14} />
            <span>03 // KERNEL CODE</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('challenges');
            }}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'challenges'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert size={14} />
            <span>04 // CHALLENGES & IMPACT</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Top Quick Overview & Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-lg">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">{m.label}</span>
                <span className="text-base sm:text-lg font-mono font-bold text-cyan-400">{m.value}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {project.longDescription}
          </p>

          {/* TAB 1: ARCHITECTURE BLUEPRINT */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <Layers size={14} /> SYSTEM TOPOLOGY & DEPLOYMENT LAYERS
              </h3>

              <div className="space-y-3">
                {project.architecture.map((layer, idx) => (
                  <div key={layer.layer} className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-cyan-500/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center font-bold">
                          0{idx + 1}
                        </span>
                        <span className="font-bold text-white text-sm">{layer.layer}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {layer.tech.map((t) => (
                          <span key={t} className="text-[11px] font-mono px-2 py-0.5 bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 pl-7">{layer.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE INTERACTIVE SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="p-5 bg-slate-900/70 border border-cyan-500/30 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Radio className="text-cyan-400 w-4 h-4 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                    INTERACTIVE DEMO SANDBOX :: {project.title.toUpperCase()}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                  RUNTIME: LIVE
                </span>
              </div>

              {/* Sandbox Type 1: Event Stream */}
              {project.sandboxType === 'event-stream' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-400 text-xs font-mono block">MESSAGES PROCESSED</span>
                      <span className="text-xl font-bold font-mono text-cyan-400">{streamCount.toLocaleString()}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-400 text-xs font-mono block">EDGE LATENCY</span>
                      <span className="text-xl font-bold font-mono text-emerald-400">{streamLatency} ms</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-400 text-xs font-mono block">NODE STATUS</span>
                      <span className="text-xl font-bold font-mono text-cyan-300">{streamActive ? 'PACKET SPIKE' : 'STABLE'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-xs space-y-1 max-h-36 overflow-y-auto">
                    <div className="text-slate-500 font-bold mb-1">// LIVE EVENT TELEMETRY STREAM:</div>
                    {streamLogs.map((log, i) => (
                      <div key={i} className="text-cyan-300 font-mono text-[11px]">{log}</div>
                    ))}
                  </div>

                  <button
                    onClick={triggerEventBurst}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs rounded uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center space-x-2"
                  >
                    <Zap size={14} />
                    <span>INJECT REAL-TIME EVENT BURST (+1,000 EVENTS)</span>
                  </button>
                </div>
              )}

              {/* Sandbox Type 2: LLM Agent DAG */}
              {project.sandboxType === 'llm-mesh' && (
                <div className="space-y-4 font-mono text-xs">
                  <p className="text-slate-300">
                    Simulate autonomous DAG execution across 4 parallel AI agent workers:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <div className={`p-3 rounded border transition-all ${agentStep >= 1 ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <div className="font-bold">1. INTENT PLANNER</div>
                      <div className="text-[10px] mt-1">{agentStep >= 1 ? 'RESOLVED (12ms)' : 'WAITING'}</div>
                    </div>
                    <div className={`p-3 rounded border transition-all ${agentStep >= 2 ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <div className="font-bold">2. VECTOR RECALL</div>
                      <div className="text-[10px] mt-1">{agentStep >= 2 ? '98.4% SIMILARITY' : 'WAITING'}</div>
                    </div>
                    <div className={`p-3 rounded border transition-all ${agentStep >= 3 ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <div className="font-bold">3. CODE SYNTHESIS</div>
                      <div className="text-[10px] mt-1">{agentStep >= 3 ? 'AST COMPILED' : 'WAITING'}</div>
                    </div>
                    <div className={`p-3 rounded border transition-all ${agentStep >= 4 ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <div className="font-bold">4. VERIFIED</div>
                      <div className="text-[10px] mt-1">{agentStep >= 4 ? 'SUCCESS 200 OK' : 'WAITING'}</div>
                    </div>
                  </div>

                  <button
                    onClick={runAgentDAG}
                    disabled={agentRunning}
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Play size={14} />
                    <span>{agentRunning ? 'EXECUTING AGENT PIPELINE...' : 'EXECUTE MULTI-AGENT DAG'}</span>
                  </button>
                </div>
              )}

              {/* Sandbox Type 3: Rate Limiter */}
              {project.sandboxType === 'rate-limiter' && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800">
                    <div>
                      <span className="text-slate-400">TOKEN BUCKET CAPACITY</span>
                      <div className="text-lg font-bold text-cyan-400">{tokensLeft} / 20 TOKENS</div>
                    </div>
                    <button
                      onClick={refillBucket}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center space-x-1"
                    >
                      <RefreshCw size={12} />
                      <span>REFILL</span>
                    </button>
                  </div>

                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${tokensLeft > 5 ? 'bg-cyan-400' : 'bg-rose-500'}`}
                      style={{ width: `${(tokensLeft / 20) * 100}%` }}
                    />
                  </div>

                  <div className="space-y-1">
                    {rateLog.map((l) => (
                      <div key={l.id} className="flex justify-between p-1.5 bg-slate-950/60 rounded text-[11px]">
                        <span>REQ_{l.id.toString().slice(-4)} @ {l.time}</span>
                        <span className={l.status === 'ALLOW' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          [{l.status} {l.status === 'ALLOW' ? '200' : '429 TOO MANY REQUESTS'}]
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={sendRateLimitedRequest}
                    className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded uppercase tracking-wider"
                  >
                    DISPATCH API CALL TO INGRESS
                  </button>
                </div>
              )}

              {/* Default Fallback Simulator for crypto & shaders & vector */}
              {(project.sandboxType === 'crypto-settle' || project.sandboxType === 'webgl-shader' || project.sandboxType === 'vector-query') && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2">
                    <div className="text-slate-400">EMBEDDED METRIC MONITOR:</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>SHARD PARTITIONS: <span className="text-cyan-400 font-bold">16 ACTIVE</span></div>
                      <div>PROVING OVERHEAD: <span className="text-cyan-400 font-bold">42 ms</span></div>
                      <div>SIMD VECTOR ACCEL: <span className="text-emerald-400 font-bold">AVX-512 ENABLED</span></div>
                      <div>COSINE DISTANCE: <span className="text-cyan-400 font-bold">0.9942</span></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playSuccess();
                    }}
                    className="w-full py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 rounded uppercase font-bold"
                  >
                    TRIGGER SYSTEM DIAGNOSTIC RUN
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KERNEL CODE */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border border-slate-800 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-xs font-mono text-cyan-300 font-bold">{project.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1 text-xs font-mono text-slate-300 hover:text-white px-2 py-1 bg-slate-800 rounded"
                >
                  {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCode ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-b-lg overflow-x-auto text-xs font-mono text-cyan-200/90 leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* TAB 4: CHALLENGES & IMPACT */}
          {activeTab === 'challenges' && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                KEY TECHNICAL HURDLES & ARCHITECTURAL SOLUTIONS
              </h3>
              <div className="space-y-2">
                {project.challenges.map((challenge, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg flex items-start space-x-3">
                    <span className="text-cyan-400 font-mono font-bold text-xs mt-0.5">[{idx + 1}]</span>
                    <p className="text-xs text-slate-300 leading-normal">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack badges */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">INTEGRATED TECHNOLOGIES</span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/20 bg-slate-900/80 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
            CLEARANCE: <span className="text-cyan-400 font-bold">PUBLIC DEPLOYMENT READY</span>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded transition-colors"
          >
            CLOSE DOSSIER [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
