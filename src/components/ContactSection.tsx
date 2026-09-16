import React, { useState } from 'react';
import { Send, MapPin, Copy, Check, ShieldCheck, Key, Sparkles, Clock, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'Distributed Systems & Microservices',
    message: '',
  });

  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedGpg, setCopiedGpg] = useState(false);

  // Meeting scheduler state
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('14:00 SGT (UTC+8)');
  const [meetingBooked, setMeetingBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClick();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
      soundFx.playSuccess();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#0070f3', '#38bdf8', '#ffffff'],
      });
    }, 1200);
  };

  const handleCopyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyGpg = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.gpgKeyId);
    setCopiedGpg(true);
    setTimeout(() => setCopiedGpg(false), 2000);
  };

  const handleBookMeeting = () => {
    soundFx.playSuccess();
    setMeetingBooked(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#10b981', '#38bdf8'],
    });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Send size={14} />
              <span className="uppercase tracking-widest font-bold">// 07. TRANSMIT_DATA_PACKET // CONTACT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-cyber text-white tracking-wide mt-1">
              Initialize Transmission
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Direct encrypted channel to Moe Kyaw Aung for contract engagements, technical leadership, or architecture advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Schedulers (5 cols) */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            {/* Direct Channel Cards */}
            <div className="p-6 bg-slate-950/80 border border-cyan-500/30 rounded-xl space-y-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <ShieldCheck className="text-cyan-400 w-5 h-5" />
                <h3 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                  Direct Communications Hub
                </h3>
              </div>

              {/* Email Direct Copy */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">PRIMARY INBOX</span>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold select-all text-xs truncate mr-2">
                    {PERSONAL_INFO.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded text-[11px] shrink-0 font-bold"
                  >
                    {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              {/* Location & Status */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-slate-900/40 rounded border border-slate-800">
                  <span className="text-slate-500 block">BASE LOCATION</span>
                  <span className="text-white flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-cyan-400" /> {PERSONAL_INFO.location.split('//')[0]}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/40 rounded border border-slate-800">
                  <span className="text-slate-500 block">TIMEZONE</span>
                  <span className="text-white flex items-center gap-1 mt-0.5">
                    <Clock size={12} className="text-cyan-400" /> UTC+8 (SGT)
                  </span>
                </div>
              </div>

              {/* GPG Key Info */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key size={14} className="text-cyan-400" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">GPG FINGERPRINT</span>
                    <span className="text-slate-300 text-[11px]">{PERSONAL_INFO.gpgKeyId}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyGpg}
                  className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800"
                  title="Copy GPG Key"
                >
                  {copiedGpg ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>

              {/* Social Channels Links */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">EXTERNAL QUANTUM NETWORKS</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 rounded text-center transition-colors block"
                  >
                    // GITHUB
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 rounded text-center transition-colors block"
                  >
                    // LINKEDIN
                  </a>
                  <a
                    href={PERSONAL_INFO.twitter}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 rounded text-center transition-colors block"
                  >
                    // X (TWITTER)
                  </a>
                  <a
                    href={PERSONAL_INFO.telegram}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 rounded text-center transition-colors block"
                  >
                    // TELEGRAM
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive 15-min Cyber Sync Scheduler Simulator */}
            <div className="p-5 bg-slate-950/80 border border-cyan-500/30 rounded-xl space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="text-cyan-400 w-4 h-4" />
                <span className="font-bold text-white uppercase tracking-wider">
                  SCHEDULE 15-MIN ARCHITECTURE SYNC
                </span>
              </div>

              {meetingBooked ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg space-y-1 text-slate-200">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check size={14} /> CALENDAR INVITE DISPATCHED
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Slot reserved for <span className="text-white font-bold">{selectedDay} @ {selectedTime}</span>. A calendar invitation link has been staged.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Today', 'Tomorrow', 'This Friday'].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`p-1.5 rounded border text-[10px] uppercase font-bold transition-colors ${
                          selectedDay === day
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {['14:00 SGT (UTC+8)', '17:30 SGT (UTC+8)', '20:00 SGT (UTC+8)', '22:00 SGT (UTC+8)'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`p-1.5 rounded border text-[10px] font-bold transition-colors ${
                          selectedTime === slot
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleBookMeeting}
                    className="w-full py-2 bg-slate-900 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:text-white rounded uppercase font-bold text-[11px] transition-colors"
                  >
                    LOCK IN SYNC SLOT ({selectedDay} @ {selectedTime.split(' ')[0]})
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Encrypted Transmission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 bg-slate-950/90 border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-bold text-white uppercase font-cyber text-sm tracking-wider">
                    ENCRYPTED MESSAGE PROTOCOL
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">CIPHER: RSA-4096 / TLS-1.3</span>
              </div>

              {transmitted ? (
                <div className="p-6 bg-cyan-950/40 border border-cyan-400/50 rounded-xl space-y-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white font-cyber uppercase tracking-wider">
                    Payload Transmitted Successfully!
                  </h4>
                  <p className="text-xs text-slate-300 font-sans max-w-md mx-auto">
                    Thank you, <span className="text-cyan-300 font-bold">{formData.name}</span>. Your dispatch has been securely forwarded to Moe Kyaw Aung's priority queue. Expect a response within 2-4 hours.
                  </p>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setTransmitted(false);
                      setFormData({ name: '', email: '', scope: 'Distributed Systems & Microservices', message: '' });
                    }}
                    className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 rounded font-bold uppercase tracking-wider text-xs transition-colors"
                  >
                    SEND ANOTHER PACKET
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold block">
                        CALLER IDENTIFIER (NAME):
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Satoshi Nakamoto"
                        className="w-full p-3 bg-slate-900/80 border border-slate-800 focus:border-cyan-400 rounded text-slate-100 text-xs focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold block">
                        RETURN TRANSMISSION (EMAIL):
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full p-3 bg-slate-900/80 border border-slate-800 focus:border-cyan-400 rounded text-slate-100 text-xs focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      ENGAGEMENT SCOPE / DOMAIN:
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded text-slate-100 text-xs focus:outline-none font-mono"
                    >
                      <option value="Distributed Systems & Microservices">Distributed Systems & High-Throughput Microservices (Go/Rust)</option>
                      <option value="Generative AI & Agent Architectures">Generative AI Workflows & Multi-Agent DAGs</option>
                      <option value="Frontend & WebGL 3D Interfaces">Reactive React 19 / Next.js / WebGL Cybernetic UI</option>
                      <option value="Cloud Infra & Kubernetes Scaling">Cloud Infrastructure, DevOps & Kubernetes Scaling</option>
                      <option value="Technical Advisory / Advisory Board">Technical Advisory / Fractional CTO / Consulting</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold block">
                      TRANSMISSION PAYLOAD (MESSAGE):
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline system requirements, architectural challenge, timeline, or meeting request..."
                      className="w-full p-3 bg-slate-900/80 border border-slate-800 focus:border-cyan-400 rounded text-slate-100 text-xs focus:outline-none font-mono resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold uppercase font-mono tracking-wider rounded-lg shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isTransmitting ? (
                      <span>ENCRYPTING & TRANSMITTING PACKET...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>DISPATCH ENCRYPTED PAYLOAD</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
