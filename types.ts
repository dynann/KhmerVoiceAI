export interface TranscriptionResult {
  text: string;
  confidence?: number;
  timestamp: number;
}

export enum RecordingState {
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: string;
}

export type PageType = 'home' | 'features' | 'pricing' | 'demo';