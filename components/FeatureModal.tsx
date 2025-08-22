import React from 'react';
import type { FeatureAnalysisResult } from '../types';
import { Spinner } from './Spinner';
import { CloseIcon } from './icons/CloseIcon';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  isLoading: boolean;
  result: FeatureAnalysisResult | null;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, featureName, isLoading, result }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-text-primary">{featureName} Analysis</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors" aria-label="Close modal">
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Spinner size="lg" />
              <p className="mt-4 text-lg font-semibold text-text-secondary">Generating {featureName} Report...</p>
              <p className="mt-2 text-sm text-gray-500">The AI is processing the request. This may take a moment.</p>
            </div>
          )}
          
          {!isLoading && result && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-brand-dark text-center">{result.title}</h3>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-lg text-text-primary border-b pb-2 mb-3">Clinical Summary</h4>
                <p className="text-text-secondary leading-relaxed">{result.summary}</p>
              </div>

              {result.details && result.details.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-semibold text-lg text-text-primary border-b pb-2 mb-3">Detailed Metrics</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-100 text-text-secondary">
                        <tr>
                          <th className="p-2">Metric</th>
                          <th className="p-2">Value</th>
                          <th className="p-2">Interpretation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.details.map((detail, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="p-2 font-medium">{detail.metric}</td>
                            <td className="p-2">{detail.value}</td>
                            <td className="p-2">{detail.interpretation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-lg text-text-primary border-b pb-2 mb-3">Recommendations</h4>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                </ul>
              </div>

              <div className="text-xs text-center text-gray-400 pt-4">
                 Disclaimer: This AI-generated report is for simulation purposes only and not a substitute for professional medical advice.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
