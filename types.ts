import { LucideIcon } from "lucide-react";

export enum AppMode {
  THEORY = 'THEORY',
  TUTOR = 'TUTOR'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface SimulationState {
  leanAngle: number;
  steerAngle: number;
  speed: number;
  isRunning: boolean;
  score: number;
}

export interface ArchitectureItem {
  title: string;
  role: string;
  techStack: string;
  status?: 'frozen' | 'training';
}

export interface LayerSection {
  id: string;
  title: string;
  description?: string;
  items: ArchitectureItem[];
}

export interface ProductItem {
  name: string;
  region: string;
  status: 'production' | 'commercial' | 'rnd';
  landingDate?: string;
  features: string[];
  performance?: string[];
  progress?: string;
  models?: string;
  icon?: LucideIcon;
}

export interface Category {
  title: string;
  items: ProductItem[];
}

export interface ModelPerformance {
  metric: string;
  value: string;
  improvement?: string;
}

export interface ModelData {
  id: string;
  name: string;
  fullName?: string;
  organization: string;
  repoUrl: string;
  paperUrl?: string;
  features: string[];
  performance: ModelPerformance[];
  tags: {
    hasVLM: boolean;
    isSOTA: boolean;
    isOpenSource: boolean;
  };
  highlight?: string; // Additional short note
}

export interface ComparisonRow {
  name: string;
  innovation: string;
  hasVLM: boolean;
  sotaContext: string;
  openSource: boolean;
}