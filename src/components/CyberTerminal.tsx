import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, Sparkles, CornerDownLeft, Trash2, HelpCircle } from 'lucide-react';
import { PERSONAL_INFO, FEATURED_PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { ThemeMode, Project } from '../types';
import { soundFx } from '../utils/audio';

interface CyberTerminalProps {
  onSelectProject: (p: Project) => void;
  onThemeChange: (t: ThemeMode) => void;
  onOpenMatrix: () => void;
  onOpenDossier: () => void;
}

interface LogEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: React.ReactNode;
}

export const CyberTerminal: React.FC<CyberTerminalProps> = ({
  onSelectProject,
  onThemeChange,
  onOpenMatrix,
  onOpenDossier,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initialWelcome = () => [
    {
      id: 'init-1',
      type: 'system' as const,
      content: (
        <div className="space-y-1 font-mono text-xs">
          <pre className="text-cyan-400 font-bold leading-tight hidden sm:block">
{`
 __  __ _  __    _       ____  ______     __
|  \\/  | |/ /   / \\     |  _ \\| ____\\ \\   / /
| |\\/| | ' /   / _ \\    | | | |  _|  \\ \\ / / 
| |  | | . \\  / ___ \\   | |_| | |___  \\ V /  
|_|  |_|_|\\_\\/_/   \\_\\  |____/|_____|  \\_/   
`}
          </pre>
          <div className="text-cyan-300 font-bold">
            Moe Kyaw Aung Cybernetic Terminal OS // Version 4.8.2-prod
          </div>
          <div className="text-slate-400 text-[11px]">
            Connected to Singapore Quantum Edge Node. Type <span className="text-cyan-400 font-bold">help</span> or click command chips below.
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLogs(initialWelcome());
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const quickCommands = ['help', 'neofetch', 'projects', 'skills', 'hire', 'matrix', 'cat resume', 'clear'];

  const executeCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();
    if (!cmd) return;

    soundFx.playClick();
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const inputEntry: LogEntry = {
      id: `input-${Date.now()}`,
      type: 'input',
      content: (
        <div className="flex items-center space-x-2 text-slate-200">
          <span className="text-cyan-400 font-bold font-mono">mka@quantum:~$</span>
          <span className="font-mono text-cyan-200">{cmd}</span>
        </div>
      ),
    };

    const args = cmd.toLowerCase().split(' ');
    const mainCmd = args[0];
    let outputEntry: LogEntry;

    switch (mainCmd) {
      case 'help':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-slate-300 text-xs font-mono">
              <div className="text-cyan-400 font-bold">// AVAILABLE CYBERNETIC COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                <div><span className="text-cyan-300 font-bold">neofetch</span> - System specs & telemetry</div>
                <div><span className="text-cyan-300 font-bold">projects</span> - View all 6 engineered systems</div>
                <div><span className="text-cyan-300 font-bold">skills</span> - Inspect full technical matrix</div>
                <div><span className="text-cyan-300 font-bold">hire</span> - Initialize project contract</div>
                <div><span className="text-cyan-300 font-bold">cat resume</span> - View dossier summary</div>
                <div><span className="text-cyan-300 font-bold">matrix</span> - Launch digital code stream</div>
                <div><span className="text-cyan-300 font-bold">theme &lt;name&gt;</span> - blue|magenta|matrix|amber</div>
                <div><span className="text-cyan-300 font-bold">audio</span> - Toggle synth SFX audio</div>
                <div><span className="text-cyan-300 font-bold">whoami</span> - Identity and clearance</div>
                <div><span className="text-cyan-300 font-bold">clear</span> - Purge terminal window</div>
              </div>
            </div>
          ),
        };
        break;

      case 'neofetch':
      case 'sysinfo':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="p-3 bg-slate-900/60 rounded border border-cyan-500/20 text-xs font-mono text-slate-300 space-y-1">
              <div className="text-cyan-400 font-bold">mka@quantum-arch-node</div>
              <div className="text-slate-500">----------------------</div>
              <div><span className="text-cyan-300">OS:</span> CyberArch Linux x86_64</div>
              <div><span className="text-cyan-300">Host:</span> Quantum Distributed Node #09</div>
              <div><span className="text-cyan-300">Kernel:</span> 6.8.0-mka-ebpf-custom</div>
              <div><span className="text-cyan-300">Uptime:</span> 99.995% SLA maintained</div>
              <div><span className="text-cyan-300">Packages:</span> React 19, Go 1.24, Rust 1.85, K8s, Kafka</div>
              <div><span className="text-cyan-300">Shell:</span> mka-zsh 5.9 (x86_64)</div>
              <div><span className="text-cyan-300">Memory:</span> 32GB ECC / 120k QPS Active</div>
              <div><span className="text-cyan-300">Location:</span> Singapore (UTC+8)</div>
            </div>
          ),
        };
        break;

      case 'projects':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono">
              <div className="text-cyan-400 font-bold">// FEATURED ARCHITECTURAL SYSTEMS:</div>
              <div className="space-y-1.5">
                {FEATURED_PROJECTS.map((p, idx) => (
                  <div key={p.id} className="p-2 bg-slate-900/50 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-cyan-300 font-bold">[{idx + 1}] {p.title}</span>
                      <span className="text-slate-400 block text-[11px]">{p.subtitle}</span>
                    </div>
                    <button
                      onClick={() => onSelectProject(p)}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 rounded text-[10px] w-fit font-bold"
                    >
                      INSPECT
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ),
        };
        break;

      case 'skills':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono">
              <div className="text-cyan-400 font-bold">// TECHNICAL COMPETENCY STACKS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="p-2 bg-slate-900/50 rounded border border-slate-800">
                    <div className="text-cyan-300 font-bold text-[11px] mb-1">{cat.title.toUpperCase()}</div>
                    <div className="text-slate-400 text-[11px]">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };
        break;

      case 'hire':
      case 'sudo hire':
        soundFx.playSuccess();
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'success',
          content: (
            <div className="p-3 bg-cyan-950/50 border border-cyan-400/40 rounded text-xs font-mono space-y-1.5">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles size={14} /> [SUCCESS] CONTRACT PIPELINE INITIALIZED
              </div>
              <p className="text-slate-300 text-xs">
                Moe Kyaw Aung is currently open for Principal Architecture consulting, High-throughput Backend contracts, and Lead Full-Stack engineering roles.
              </p>
              <div className="text-cyan-300 font-bold pt-1">
                Direct Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="underline text-white">{PERSONAL_INFO.email}</a>
              </div>
            </div>
          ),
        };
        break;

      case 'cat':
        if (args[1] === 'resume' || args[1] === 'resume.md' || args[1] === 'dossier') {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'output',
            content: (
              <div className="space-y-2 text-xs font-mono p-3 bg-slate-900/60 rounded border border-slate-800">
                <div className="text-cyan-400 font-bold">=== {PERSONAL_INFO.name.toUpperCase()} DOSSIER ===</div>
                <div className="text-slate-300">ROLE: {PERSONAL_INFO.role}</div>
                <div className="text-slate-300">LOCATION: {PERSONAL_INFO.location}</div>
                <div className="text-slate-300">EXPERIENCE: {PERSONAL_INFO.experienceYears} Years Production Engineering</div>
                <div className="pt-2">
                  <button
                    onClick={onOpenDossier}
                    className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold rounded text-xs"
                  >
                    OPEN FORMATTED DOSSIER [MODAL]
                  </button>
                </div>
              </div>
            ),
          };
        } else {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'error',
            content: <div className="text-rose-400 font-mono text-xs">cat: file '{args[1] || ''}' not found. Try 'cat resume'.</div>,
          };
        }
        break;

      case 'matrix':
        onOpenMatrix();
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'success',
          content: <div className="text-emerald-400 font-mono text-xs">Matrix Digital Stream session initialized.</div>,
        };
        break;

      case 'theme':
        const requestedTheme = args[1] as ThemeMode;
        if (['blue', 'magenta', 'matrix', 'amber', 'violet'].includes(requestedTheme)) {
          onThemeChange(requestedTheme);
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'success',
            content: <div className="text-cyan-300 font-mono text-xs">Theme switched to '{requestedTheme}'.</div>,
          };
        } else {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'error',
            content: <div className="text-rose-400 font-mono text-xs">Unknown theme '{args[1]}'. Available: blue, magenta, matrix, amber, violet.</div>,
          };
        }
        break;

      case 'audio':
        const muted = soundFx.toggleMute();
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: <div className="text-cyan-300 font-mono text-xs">Audio SFX synthesizer is now: {muted ? 'MUTED' : 'ENABLED'}.</div>,
        };
        break;

      case 'whoami':
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: <div className="text-cyan-300 font-mono text-xs">visitor@guest // Clearance: GUEST_EXPLORER // Session Encrypted</div>,
        };
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'sudo':
        if (args.slice(1).join(' ').includes('rm -rf')) {
          soundFx.playError();
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'error',
            content: (
              <div className="text-rose-400 font-mono text-xs p-2 bg-rose-950/40 rounded border border-rose-500/30">
                [SECURITY ALERT] Kernel self-defense protocol engaged! Nice try, hacker. System is immutable.
              </div>
            ),
          };
        } else {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'output',
            content: <div className="text-slate-400 font-mono text-xs">User is not in sudoers file. Incident reported to quantum security daemon.</div>,
          };
        }
        break;

      default:
        soundFx.playError();
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'error',
          content: (
            <div className="text-rose-400 font-mono text-xs">
              Command '{rawCommand}' not recognized. Type <span className="text-cyan-300 font-bold">help</span> for command list.
            </div>
          ),
        };
        break;
    }

    setLogs((prev) => [...prev, inputEntry, outputEntry]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = quickCommands.find((c) => c.startsWith(inputVal.trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleCopyLogs = () => {
    soundFx.playSuccess();
    const text = logs.map((l) => (typeof l.content === 'string' ? l.content : '[Terminal Output]')).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-16 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-cyan-500/20 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Terminal size={14} />
              <span className="uppercase tracking-widest font-bold">// 04. VIRTUAL_CLI_COMMAND_CENTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cyber text-white tracking-wide mt-1">
              Interactive Terminal Shell
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Execute real-time commands, inspect hardware telemetry, and interface directly with Moe's node.
          </p>
        </div>

        {/* Terminal Container */}
        <div
          className="bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden font-mono"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Window Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-cyan-500/20">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-bold text-slate-300 ml-2 font-mono hidden sm:inline">
                mka@quantum-edge:~ (zsh)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyLogs();
                }}
                className="p-1 text-slate-400 hover:text-cyan-300 rounded text-xs transition-colors"
                title="Copy Terminal Logs"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playClick();
                  setLogs([]);
                }}
                className="p-1 text-slate-400 hover:text-rose-400 rounded text-xs transition-colors"
                title="Clear Terminal"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Terminal Logs Output */}
          <div className="p-4 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto space-y-3 font-mono text-xs">
            {logs.map((log) => (
              <div key={log.id} className="leading-relaxed">
                {log.content}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Command Chips */}
          <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/50 flex items-center space-x-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0 flex items-center gap-1">
              <HelpCircle size={12} /> SHORTCUTS:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 text-slate-300 whitespace-nowrap transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Input Line */}
          <div className="flex items-center px-4 py-3 bg-slate-950 border-t border-cyan-500/20">
            <span className="text-cyan-400 font-bold mr-2 text-xs select-none">
              mka@quantum:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type 'help' or any command..."
              className="flex-1 bg-transparent text-slate-100 text-xs focus:outline-none font-mono"
            />
            <button
              onClick={() => {
                executeCommand(inputVal);
                setInputVal('');
              }}
              className="p-1 text-cyan-400 hover:text-white transition-colors ml-2"
              title="Execute"
            >
              <CornerDownLeft size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
