import React, { useState } from 'react';
import { Layers, ExternalLink, GitBranch, ArrowUpRight, Zap } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (p: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Distributed Systems', 'AI & LLMs', 'Web3 & Fintech', 'WebGL / 3D', 'Cloud & DevOps'];

  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Layers size={14} />
              <span className="uppercase tracking-widest font-bold">// 02. ARCHITECTURAL_SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-cyber text-white tracking-wide mt-1">
              Featured Systems & Deployments
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Production-grade distributed meshes, real-time AI reasoning workflows, and GPU-accelerated cybernetic engines.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3.5 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat === 'ALL' ? '// ALL SYSTEMS' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundFx.playClick();
                onSelectProject(project);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative bg-slate-950/80 border border-cyan-500/25 hover:border-cyan-400/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_35px_rgba(0,240,255,0.2)] flex flex-col justify-between"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Image Preview Banner with cyber overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-cyan-500/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase backdrop-blur-md">
                  {project.category}
                </div>

                {/* Live Sandbox Available Indicator */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold flex items-center space-x-1 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>INTERACTIVE LAB</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold font-cyber text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                    />
                  </div>

                  <p className="text-xs font-mono text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Performance Metric Badges */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-900/50 rounded-lg border border-slate-800 text-xs font-mono">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] text-slate-500 uppercase block">{m.label}</span>
                      <span className="text-cyan-400 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300/90 border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer CTAs */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-mono text-xs">
                    <span className="text-cyan-400 group-hover:underline text-[11px] font-bold flex items-center gap-1">
                      <Zap size={12} /> EXPLORE ARCHITECTURE &gt;
                    </span>

                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                          title="View Source"
                        >
                          <GitBranch size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-cyan-400 rounded hover:bg-slate-800 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
