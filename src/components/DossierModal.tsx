import React, { useState } from 'react';
import { X, Printer, Copy, Check, ShieldCheck, Mail, MapPin, Terminal } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleCopy = () => {
    soundFx.playSuccess();
    const markdown = `# ${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}

## Professional Summary
${PERSONAL_INFO.aboutBio}

## Experience
${WORK_EXPERIENCE.map((exp) => `### ${exp.role} @ ${exp.company} (${exp.period})
${exp.description}
Key Achievements:
${exp.highlights.map((h) => `- ${h}`).join('\n')}
Tech Stack: ${exp.techStack.join(', ')}
`).join('\n')}

## Core Competencies
${SKILL_CATEGORIES.map((cat) => `### ${cat.title}
${cat.skills.map((s) => `- ${s.name} (${s.level}% proficiency, ${s.years} yrs): ${s.highlight}`).join('\n')}
`).join('\n')}

## Certifications
${CERTIFICATIONS.map((c) => `- ${c.name} (${c.issuer}, ${c.year})`).join('\n')}
`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden">
        {/* Header HUD Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/80 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            <div>
              <span className="font-mono text-xs text-cyan-400 tracking-wider font-bold uppercase block">
                // DOSSIER_CLEARANCE_09 :: VERIFIED_RECORD
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: MKA-SEC-88294</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 rounded text-xs font-mono transition-colors"
              title="Copy as Markdown"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED!' : 'COPY MD'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 rounded text-xs font-mono transition-colors"
              title="Print Dossier"
            >
              <Printer size={14} />
              <span>PRINT</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 text-slate-200 print:text-black font-sans">
          {/* Header Profile */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-cyber flex items-center gap-2">
                  <span>{PERSONAL_INFO.name}</span>
                  <ShieldCheck className="text-cyan-400 w-6 h-6" />
                </h1>
                <p className="text-cyan-400 font-mono text-sm mt-1">{PERSONAL_INFO.role}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-cyan-400" /> {PERSONAL_INFO.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-cyan-400" /> {PERSONAL_INFO.email}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs font-mono space-y-1">
                <div className="text-slate-400">STATUS: <span className="text-emerald-400 font-bold">AVAILABLE</span></div>
                <div className="text-slate-400">UPTIME RECORD: <span className="text-cyan-300 font-bold">99.995%</span></div>
                <div className="text-slate-400">PRIMARY FOCUS: <span className="text-cyan-300">Distributed & Real-Time Web</span></div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
              <Terminal size={15} /> 01 // EXECUTIVE_SUMMARY
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {PERSONAL_INFO.aboutBio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
              <Terminal size={15} /> 02 // PROFESSIONAL_TRACK_RECORD
            </h2>
            <div className="space-y-6">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <div className="text-xs text-cyan-400 font-mono">{exp.company} &bull; {exp.location}</div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 pt-1">{exp.description}</p>

                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pt-1">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="leading-normal">{h}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Mastery Matrix */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
              <Terminal size={15} /> 03 // TECHNICAL_COMPETENCY_MATRIX
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg space-y-2">
                  <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">{cat.title}</h4>
                  <div className="space-y-2">
                    {cat.skills.map((s) => (
                      <div key={s.name} className="text-xs space-y-1">
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-200">{s.name}</span>
                          <span className="text-cyan-400">{s.level}% &bull; {s.years}y</span>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold">
                04 // CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.name} className="p-3 bg-slate-900/40 border border-slate-800 rounded text-xs space-y-1">
                    <div className="font-bold text-slate-200">{cert.name}</div>
                    <div className="text-slate-400 font-mono flex justify-between">
                      <span>{cert.issuer}</span>
                      <span className="text-cyan-400">{cert.year} [{cert.badge}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold">
                05 // ACADEMICS & RESEARCH
              </h2>
              <div className="p-3 bg-slate-900/40 border border-slate-800 rounded text-xs space-y-2">
                <div className="font-bold text-slate-200 text-sm">Bachelor of Science in Computer Science</div>
                <div className="text-cyan-400 font-mono">Specialization in Distributed Systems & Networking</div>
                <p className="text-slate-400 text-xs">
                  Graduated with First Class Academic Honors. Capstone thesis on high-throughput asynchronous lock-free gossip protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-cyan-500/20 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            Encrypted Verification Hash: <span className="text-cyan-400">SHA256: 8f4e2d...01c9</span>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex-1 sm:flex-initial text-center px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs font-mono uppercase transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              Initiate Direct Transmission
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
