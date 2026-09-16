import React, { useState } from 'react';
import { Briefcase, Award, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { WORK_EXPERIENCE, CERTIFICATIONS } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('exp-1');

  const toggleExpand = (id: string) => {
    soundFx.playClick();
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Briefcase size={14} />
              <span className="uppercase tracking-widest font-bold">// 06. CAREER_TRAJECTORY & ACCREDITATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-cyber text-white tracking-wide mt-1">
              Engineering Track Record
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Over 8 years scaling distributed systems, leading engineering teams, and optimizing mission-critical cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Timeline (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {WORK_EXPERIENCE.map((exp, idx) => {
              const isExpanded = expandedId === exp.id;
              return (
                <div
                  key={exp.id}
                  className={`p-5 sm:p-6 rounded-xl border transition-all ${
                    isExpanded
                      ? 'bg-slate-950/95 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-cyan-500/40'
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="flex items-start justify-between cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400">
                        <span>0{idx + 1} //</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar size={12} /> {exp.period}
                        </span>
                        {exp.current && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                            CURRENT
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-cyber text-white">
                        {exp.role}
                      </h3>

                      <div className="flex items-center space-x-3 text-xs font-mono text-cyan-300">
                        <span className="font-bold">{exp.company}</span>
                        <span className="text-slate-600">&bull;</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin size={12} /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <button
                      className="p-1 text-slate-400 hover:text-white rounded bg-slate-900 border border-slate-800"
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Expandable Deep Dive Body */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 font-mono text-xs">
                      <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                        {exp.description}
                      </p>

                      {/* Impact Metrics */}
                      <div className="flex flex-wrap gap-2">
                        {exp.metrics.map((m) => (
                          <div
                            key={m}
                            className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded text-cyan-300 text-[11px] font-bold"
                          >
                            &bull; {m}
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">
                          CORE DELIVERABLES & ARCHITECTURAL IMPACT
                        </span>
                        {exp.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-2 text-slate-300">
                            <CheckCircle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stack Tags */}
                      <div className="pt-2">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1.5">
                          DEPLOYED TECHNOLOGIES
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800 text-[10px]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Verified Certifications (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 bg-slate-950/80 border border-cyan-500/30 rounded-xl space-y-4 font-mono">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Award className="text-cyan-400 w-5 h-5" />
                <h3 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                  Verified Certifications
                </h3>
              </div>

              <div className="space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-1 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-bold text-xs text-white leading-snug">
                        {cert.name}
                      </span>
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{cert.issuer}</span>
                      <span className="text-cyan-400 font-bold">[{cert.badge}]</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-xs space-y-1">
                <span className="text-cyan-300 font-bold block">ACADEMIC HONORS</span>
                <p className="text-[11px] text-slate-400">
                  B.S. in Computer Science (Distributed Systems Specialization). Graduated with First Class Honors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
