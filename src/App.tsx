import { useState, useEffect } from 'react';
import { NeonGridBackground } from './components/NeonGridBackground';
import { CyberNavbar } from './components/CyberNavbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CyberTerminal } from './components/CyberTerminal';
import { CyberLabsSection } from './components/CyberLabsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { CyberFooter } from './components/CyberFooter';
import { ProjectModal } from './components/ProjectModal';
import { CommandPalette } from './components/CommandPalette';
import { DossierModal } from './components/DossierModal';
import { MatrixRainOverlay } from './components/MatrixRainOverlay';
import { ThemeMode, GridStyle, Project } from './types';

export function App() {
  const [theme, setTheme] = useState<ThemeMode>('blue');
  const [gridStyle, setGridStyle] = useState<GridStyle>('perspective');
  const [scanlines, setScanlines] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [glowIntensity, setGlowIntensity] = useState<number>(1);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  // Scrollspy active section
  const [activeSection, setActiveSection] = useState('hero');

  // Sync theme to body dataset
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Global Keyboard Shortcuts (Cmd+K, etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsMatrixOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ScrollSpy listener
  useEffect(() => {
    const sections = ['hero', 'projects', 'skills', 'terminal', 'labs', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Dynamic 3D Perspective Canvas Grid Background */}
      <NeonGridBackground
        theme={theme}
        gridStyle={gridStyle}
        scanlinesEnabled={scanlines}
        speedMultiplier={speedMultiplier}
        glowIntensity={glowIntensity}
      />

      {/* Futuristic Cyber Top HUD Navigation Bar */}
      <CyberNavbar
        activeSection={activeSection}
        theme={theme}
        onThemeChange={setTheme}
        gridStyle={gridStyle}
        onGridStyleChange={setGridStyle}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenMatrix={() => setIsMatrixOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col space-y-4">
        {/* 01. Hero Section */}
        <HeroSection
          onOpenTerminal={handleOpenTerminal}
          onOpenDossier={() => setIsDossierOpen(true)}
          onOpenMatrix={() => setIsMatrixOpen(true)}
        />

        {/* 02. Featured Projects Showcase */}
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* 03. Skills Matrix & Architecture Recipes */}
        <SkillsSection />

        {/* 04. Cyber Terminal Command Center */}
        <CyberTerminal
          onSelectProject={(p) => setSelectedProject(p)}
          onThemeChange={setTheme}
          onOpenMatrix={() => setIsMatrixOpen(true)}
          onOpenDossier={() => setIsDossierOpen(true)}
        />

        {/* 05. Interactive Cyber Labs */}
        <CyberLabsSection
          theme={theme}
          onThemeChange={setTheme}
          gridStyle={gridStyle}
          onGridStyleChange={setGridStyle}
          scanlines={scanlines}
          onToggleScanlines={() => setScanlines(!scanlines)}
          speedMultiplier={speedMultiplier}
          onSpeedChange={setSpeedMultiplier}
          glowIntensity={glowIntensity}
          onGlowChange={setGlowIntensity}
        />

        {/* 06. Career Timeline & Certifications */}
        <ExperienceSection />

        {/* Peer Endorsements */}
        <TestimonialsSection />

        {/* 07. Encrypted Transmission / Contact Hub */}
        <ContactSection />
      </main>

      {/* Cyber Footer */}
      <CyberFooter />

      {/* Project Deep Dive Architecture & Sandbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Keyboard Command Spotlight (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
        onThemeChange={setTheme}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenMatrix={() => setIsMatrixOpen(true)}
      />

      {/* Engineering Dossier / CV Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Matrix Stream Mode Easter Egg Modal */}
      <MatrixRainOverlay
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        theme={theme}
      />
    </div>
  );
}
export default App;
