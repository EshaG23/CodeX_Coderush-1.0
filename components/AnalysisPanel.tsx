
import React from 'react';
import type { AnalysisResult } from '../types';

interface AnalysisPanelProps {
  result: AnalysisResult;
}

const RiskIndicator: React.FC<{ level: AnalysisResult['risk_level'] }> = ({ level }) => {
  const levelInfo = {
    Low: { color: 'bg-success', text: 'Low Risk' },
    Medium: { color: 'bg-warning', text: 'Medium Risk' },
    High: { color: 'bg-danger', text: 'High Risk' },
  };
  const { color, text } = levelInfo[level] || { color: 'bg-gray-400', text: 'Unknown' };

  return (
    <div className={`px-4 py-2 rounded-full text-white font-bold text-lg ${color}`}>
      {text}
    </div>
  );
};

const ConfidenceMeter: React.FC<{ score: number }> = ({ score }) => {
  const percentage = Math.round(score * 100);
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-text-secondary mb-1">Confidence Score: {percentage}%</p>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-brand-primary h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result }) => {
  if (result.summary.includes("error occurred")) {
    return (
        <div className="text-center p-8 bg-red-50 rounded-lg border border-danger">
            <h3 className="text-xl font-bold text-danger">Analysis Failed</h3>
            <p className="mt-2 text-text-secondary">{result.summary}</p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-brand-light rounded-lg">
        <h3 className="text-2xl font-bold text-brand-dark mb-4 md:mb-0">AI Analysis Results</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <RiskIndicator level={result.risk_level} />
            <div className="w-full md:w-48">
             <ConfidenceMeter score={result.confidence_score} />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-lg text-text-primary border-b pb-2 mb-3">Clinical Summary</h4>
          <p className="text-text-secondary leading-relaxed">{result.summary}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-lg text-text-primary border-b pb-2 mb-3">Key Findings</h4>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            {result.key_findings.map((finding, index) => <li key={index}>{finding}</li>)}
          </ul>
        </div>
        
        <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-lg text-text-primary border-b pb-2 mb-3">Recommendations</h4>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
          </ul>
        </div>
      </div>
       <div className="text-xs text-center text-gray-400 pt-4">
          Disclaimer: This AI-powered analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
        </div>
    </div>
  );
};
