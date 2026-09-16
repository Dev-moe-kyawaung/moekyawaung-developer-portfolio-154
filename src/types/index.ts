export type ThemeMode = 'blue' | 'magenta' | 'matrix' | 'amber' | 'violet';
export type GridStyle = 'perspective' | 'cyber-mesh' | 'matrix' | 'minimal';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectArchitectureLayer {
  layer: string;
  tech: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Distributed Systems' | 'AI & LLMs' | 'Web3 & Fintech' | 'WebGL / 3D' | 'Cloud & DevOps';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: ProjectMetric[];
  challenges: string[];
  architecture: ProjectArchitectureLayer[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  sandboxType: 'event-stream' | 'llm-mesh' | 'crypto-settle' | 'webgl-shader' | 'rate-limiter' | 'vector-query';
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  years: number;
  highlight: string;
  icon?: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  techStack: string[];
  metrics: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  relationship: string;
  verified: boolean;
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'success';
  content: string | React.ReactNode;
  timestamp: string;
}

export interface StackRecipe {
  id: string;
  title: string;
  techs: string[];
  category: string;
  diagram: string[];
  explanation: string;
  useCase: string;
  throughput: string;
}
