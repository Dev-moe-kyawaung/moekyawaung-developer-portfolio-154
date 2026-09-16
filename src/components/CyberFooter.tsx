import React from 'react';
import { ChevronUp, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const CyberFooter: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/20 bg-slate-950/95 py-12 px-4 sm:px-6 lg:px-8 z-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold">
                &gt;
              </div>
              <span className="font-cyber font-bold text-white tracking-widest text-base">
                MOE KYAW AUNG
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm">
              {PERSONAL_INFO.role} &bull; Singapore & Remote
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              // OVERVIEW
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              // PROJECTS
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              // SKILLS
            </a>
            <a
              href="#terminal"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              // TERMINAL
            </a>
            <a
              href="#labs"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              // LABS
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              // EXPERIENCE
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              // TRANSMIT
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 rounded text-xs transition-colors self-start md:self-auto"
          >
            <span>RETURN TO APEX</span>
            <ChevronUp size={14} />
          </button>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center space-x-2">
            <Shield size={12} className="text-cyan-400" />
            <span>SESSION ENCRYPTION: 0x94B2_VERIFIED</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Moe Kyaw Aung. All rights reserved. Built with React 19 & Neon Grid Engine.
          </div>
        </div>
      </div>
    </footer>
  );
};
