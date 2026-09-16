import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, ArrowRight, Zap, Layers, Sparkles, FileText, Volume2, Palette, Shield } from 'lucide-react';
import { FEATURED_PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode, Project } from '../types';
import { soundFx } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onThemeChange: (t: ThemeMode) => void;
  onOpenDossier: () => void;
  onOpenMatrix: () => void;
}

interface CommandItem {
  id: string;
  category: 'NAVIGATION' | 'PROJECTS' | 'ACTIONS' | 'SYSTEM';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onThemeChange,
  onOpenDossier,
  onOpenMatrix,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToSection = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const pos = element.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  // Build command list
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-overview',
      category: 'NAVIGATION',
      title: 'Navigate to System Overview (Hero)',
      subtitle: 'Bio, telemetry statistics & clearance status',
      icon: <Terminal className="text-cyan-400 w-4 h-4" />,
      action: () => scrollToSection('hero'),
    },
    {
      id: 'nav-projects',
      category: 'NAVIGATION',
      title: 'Navigate to Featured Projects',
      subtitle: '6 battle-tested distributed & AI systems',
      icon: <Layers className="text-cyan-400 w-4 h-4" />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-skills',
      category: 'NAVIGATION',
      title: 'Navigate to Skills Matrix & Stack Recipes',
      subtitle: 'Interactive architecture recipes and radar',
      icon: <Zap className="text-cyan-400 w-4 h-4" />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-terminal',
      category: 'NAVIGATION',
      title: 'Navigate to Cyber Terminal CLI',
      subtitle: 'Interactive virtual REPL command line',
      icon: <Terminal className="text-cyan-400 w-4 h-4" />,
      action: () => scrollToSection('terminal'),
    },
    {
      id: 'nav-labs',
      category: 'NAVIGATION',
      title: 'Navigate to Cyber Labs & Tools',
      subtitle: 'Grid tuner, crypto JWT inspector, latency mesh',
      icon: <Sparkles className="text-cyan-400 w-4 h-4" />,
      action: () => scrollToSection('labs'),
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      title: 'Navigate to Transmission / Contact Hub',
      subtitle: 'Encrypted message channel & meeting sync',
      icon: <Shield className="text-cyan-400 w-4 h-4" />,
      action: () => scrollToSection('contact'),
    },

    // Actions
    {
      id: 'act-matrix',
      category: 'ACTIONS',
      title: 'Initialize Fullscreen Matrix Stream Mode',
      subtitle: 'Digital neon code rain simulation',
      icon: <Sparkles className="text-emerald-400 w-4 h-4" />,
      action: () => {
        onClose();
        onOpenMatrix();
      },
    },
    {
      id: 'act-dossier',
      category: 'ACTIONS',
      title: 'Open Verified Engineering Dossier (CV)',
      subtitle: 'Printable & copyable resume format',
      icon: <FileText className="text-cyan-400 w-4 h-4" />,
      action: () => {
        onClose();
        onOpenDossier();
      },
    },
    {
      id: 'act-audio',
      category: 'ACTIONS',
      title: 'Toggle Cyber Synth Sound FX',
      subtitle: 'Mute / Unmute synthesized audio feedback',
      icon: <Volume2 className="text-amber-400 w-4 h-4" />,
      action: () => {
        soundFx.toggleMute();
        onClose();
      },
    },
    {
      id: 'act-email',
      category: 'ACTIONS',
      title: 'Copy Moe\'s Direct Email Address',
      subtitle: PERSONAL_INFO.email,
      icon: <FileText className="text-blue-400 w-4 h-4" />,
      action: () => {
        soundFx.playSuccess();
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        onClose();
      },
    },

    // Themes
    {
      id: 'theme-blue',
      category: 'SYSTEM',
      title: 'Theme: Electric Blue (Primary Default)',
      subtitle: '0x00F0FF Neon Glow',
      icon: <Palette className="text-cyan-400 w-4 h-4" />,
      action: () => {
        onThemeChange('blue');
        onClose();
      },
    },
    {
      id: 'theme-magenta',
      category: 'SYSTEM',
      title: 'Theme: Cyber Magenta & Neon Violet',
      subtitle: 'Cyberpunk Synthwave Hue',
      icon: <Palette className="text-pink-400 w-4 h-4" />,
      action: () => {
        onThemeChange('magenta');
        onClose();
      },
    },
    {
      id: 'theme-matrix',
      category: 'SYSTEM',
      title: 'Theme: Matrix Emerald Green',
      subtitle: 'Hacker Terminal Green Hue',
      icon: <Palette className="text-emerald-400 w-4 h-4" />,
      action: () => {
        onThemeChange('matrix');
        onClose();
      },
    },

    // Projects direct inspect
    ...FEATURED_PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      category: 'PROJECTS' as const,
      title: `Inspect: ${p.title}`,
      subtitle: `${p.category} // ${p.tags.slice(0, 3).join(', ')}`,
      icon: <Layers className="text-cyan-400 w-4 h-4" />,
      action: () => {
        onClose();
        onSelectProject(p);
      },
    })),
  ];

  const filtered = commands.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      soundFx.playOpenModal();
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      soundFx.playHover();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      soundFx.playHover();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        soundFx.playClick();
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-cyan-500/20 bg-slate-900/80">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, projects, commands, themes, or skills..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono text-xs">
              No matching commands or projects located in quantum memory.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFx.playClick();
                    item.action();
                  }}
                  onMouseEnter={() => {
                    setSelectedIndex(idx);
                    soundFx.playHover();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all font-mono ${
                    isSelected
                      ? 'bg-cyan-500/15 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] text-white'
                      : 'border border-transparent text-slate-300 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 shrink-0">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-200 truncate">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-[11px] text-slate-400 truncate">{item.subtitle}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      {item.category}
                    </span>
                    <ArrowRight
                      size={14}
                      className={`transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-3">
            <span>Navigation: <kbd className="text-cyan-400 font-bold">↑ ↓</kbd></span>
            <span>Execute: <kbd className="text-cyan-400 font-bold">↵ ENTER</kbd></span>
          </div>
          <span className="text-cyan-400 font-bold">MKA_SPOTLIGHT_V4</span>
        </div>
      </div>
    </div>
  );
};
