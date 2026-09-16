import React from 'react';
import { MessageSquare, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <MessageSquare size={14} />
              <span className="uppercase tracking-widest font-bold">// PEER_ENDORSEMENTS & TRANSMISSIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-cyber text-white tracking-wide mt-1">
              Engineering Leadership Feedback
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Transmissions and endorsements from engineering executives, VPs, and technical collaborators.
          </p>
        </div>

        {/* Testimonials 3-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-slate-950/80 border border-cyan-500/25 hover:border-cyan-400/60 rounded-xl space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-3">
                <Quote className="text-cyan-400/60 w-8 h-8" />
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    {t.verified && <ShieldCheck size={13} className="text-cyan-400" />}
                  </div>
                  <div className="text-[11px] text-cyan-400">{t.role}</div>
                  <div className="text-[10px] text-slate-500">{t.company}</div>
                </div>

                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
