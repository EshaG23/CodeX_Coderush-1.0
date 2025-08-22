export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Stable' | 'At Risk' | 'Needs Review';
  lastCheckup: string;
}

export interface EEGDataPoint {
  time: number;
  Fp1: number;
  Fp2: number;
  C3: number;
  C4: number;
  Pz: number;
  O1: number;
}

export interface AnalysisResult {
  risk_level: 'Low' | 'Medium' | 'High';
  confidence_score: number;
  summary: string;
  key_findings: string[];
  recommendations: string[];
}

export interface FeatureAnalysisResult {
  title: string;
  summary: string;
  details: Array<{
    metric: string;
    value: string;
    interpretation: string;
  }>;
  recommendations: string[];
}
