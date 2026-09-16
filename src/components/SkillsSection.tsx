import React, { useState } from 'react';
import { Cpu, Layout, Server, Cloud, Database, Zap, CheckCircle2, Workflow } from 'lucide-react';
import { SKILL_CATEGORIES, STACK_RECIPES } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeRecipeIndex, setActiveRecipeIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="text-cyan-400 w-5 h-5" />;
      case 'Server':
        return <Server className="text-cyan-400 w-5 h-5" />;
      case 'Cloud':
        return <Cloud className="text-cyan-400 w-5 h-5" />;
      case 'Database':
        return <Database className="text-cyan-400 w-5 h-5" />;
      default:
        return <Cpu className="text-cyan-400 w-5 h-5" />;
    }
  };

  const currentRecipe = STACK_RECIPES[activeRecipeIndex];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Zap size={14} />
              <span className="uppercase tracking-widest font-bold">// 03. TECHNICAL_COMPETENCY_MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-cyber text-white tracking-wide mt-1">
              Skills, Paradigms & Architecture Recipes
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Full-stack mastery spanning high-throughput distributed Go/Rust microservices to reactive React 19 and WebGL interfaces.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">
                    {cat.skills.length} STACKS
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-cyber">{cat.title}</h3>
                <p className="text-xs font-mono text-slate-400 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Skill Proficiency Bars for Selected Category */}
        {SKILL_CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
          <div
            key={cat.id}
            className="p-6 md:p-8 bg-slate-950/80 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.6)] space-y-6 font-mono"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-bold text-white uppercase tracking-wider font-cyber">
                  {cat.title} — Proficiency Telemetry
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Category ID: <span className="text-cyan-400">{cat.id.toUpperCase()}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="space-y-2 p-3.5 bg-slate-900/50 rounded-lg border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-cyan-400 font-bold">
                      {skill.level}% &bull; {skill.years} YRS EXP
                    </span>
                  </div>

                  {/* Energy Bar */}
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-700 shadow-[0_0_10px_#00f0ff]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-400 leading-normal">
                    {skill.highlight}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Interactive Architecture Recipe Builder */}
        <div className="p-6 md:p-8 bg-slate-950/90 border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
            <div className="flex items-center space-x-2">
              <Workflow className="text-cyan-400 w-5 h-5" />
              <h3 className="text-lg font-bold font-cyber text-white">
                Battle-Tested Architecture Recipes
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              SELECT PRODUCTION BLUEPRINT:
            </span>
          </div>

          {/* Recipe Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            {STACK_RECIPES.map((recipe, idx) => (
              <button
                key={recipe.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveRecipeIndex(idx);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`p-3 rounded-lg border text-left transition-all ${
                  activeRecipeIndex === idx
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase text-slate-500 font-bold">RECIPE 0{idx + 1}</div>
                <div className="font-bold text-slate-200 mt-0.5">{recipe.title}</div>
              </button>
            ))}
          </div>

          {/* Active Recipe Blueprint Display */}
          {currentRecipe && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono text-xs">
              {/* Left Column: Dataflow ASCII Diagram */}
              <div className="lg:col-span-7 p-4 sm:p-5 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    LIVE DATAFLOW BLUEPRINT
                  </span>
                  <span>THROUGHPUT: <span className="text-emerald-400 font-bold">{currentRecipe.throughput}</span></span>
                </div>

                <pre className="text-cyan-300 text-[11px] sm:text-xs overflow-x-auto p-2 bg-slate-900/40 rounded leading-relaxed">
                  {currentRecipe.diagram.join('\n')}
                </pre>
              </div>

              {/* Right Column: Architectural Explanation & Use Cases */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase text-cyan-400 font-bold block">
                    ARCHITECTURAL BLUEPRINT
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentRecipe.explanation}
                  </p>
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase text-cyan-400 font-bold block">
                    PRODUCTION USE CASES
                  </span>
                  <p className="text-xs text-slate-300">
                    {currentRecipe.useCase}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentRecipe.techs.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 rounded flex items-center gap-1"
                    >
                      <CheckCircle2 size={12} className="text-cyan-400" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
