import React, { useState, useMemo, useCallback } from 'react';
import type { Patient, EEGDataPoint, AnalysisResult, FeatureAnalysisResult } from '../types';
import { EEGChart } from './EEGChart';
import { AnalysisPanel } from './AnalysisPanel';
import { analyzeEEGData, analyzeAdvancedFeature } from '../services/geminiService';
import { Spinner } from './Spinner';
import { ADVANCED_FEATURES } from '../constants';
import { FeatureModal } from './FeatureModal';

interface DashboardProps {
  patient: Patient;
}

export const Dashboard: React.FC<DashboardProps> = ({ patient }) => {
  // Main analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Advanced feature modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<{ id: string; name: string } | null>(null);
  const [isFeatureLoading, setIsFeatureLoading] = useState(false);
  const [featureResult, setFeatureResult] = useState<FeatureAnalysisResult | null>(null);

  const eegData = useMemo(() => {
    const data: EEGDataPoint[] = [];
    for (let i = 0; i < 500; i++) {
      data.push({
        time: i,
        Fp1: Math.sin(i / 20) * (10 + Math.random() * 5) + (Math.random() - 0.5) * 5,
        Fp2: Math.sin(i / 18) * (10 + Math.random() * 5) + (Math.random() - 0.5) * 6,
        C3: Math.cos(i / 25) * (15 + Math.random() * 7) + (Math.random() - 0.5) * 8,
        C4: Math.cos(i / 22) * (15 + Math.random() * 7) + (Math.random() - 0.5) * 7,
        Pz: Math.sin(i / 30) * (12 + Math.random() * 4) + (Math.random() - 0.5) * 4,
        O1: Math.cos(i / 35) * (8 + Math.random() * 6) + (Math.random() - 0.5) * 5,
      });
    }
    return data;
  }, [patient.id]);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate feature extraction for the prompt
    const mockFeatures = `
      - Spectral analysis shows elevated high-frequency beta and gamma activity in frontal lobes (Fp1, Fp2).
      - Decreased alpha wave power in occipital regions (O1).
      - Reduced phase-amplitude coupling between theta and gamma bands in the central cortex (C3, C4).
      - Event-Related Potential (ERP) analysis indicates a P300 amplitude reduction.
      - Connectivity analysis suggests hyper-connectivity within the default mode network and hypo-connectivity with executive control networks.
    `;
    
    const result = await analyzeEEGData(patient.name, mockFeatures);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  }, [patient.name]);

  const handleFeatureClick = useCallback(async (feature: { id: string; name: string }) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
    setIsFeatureLoading(true);
    setFeatureResult(null); // Clear previous results
    
    const result = await analyzeAdvancedFeature(feature.id, feature.name, patient);
    
    setFeatureResult(result);
    setIsFeatureLoading(false);
  }, [patient]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
    setFeatureResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-text-primary">{patient.name}</h2>
        <div className="flex space-x-6 mt-2 text-text-secondary">
          <span>Age: {patient.age}</span>
          <span>Gender: {patient.gender}</span>
          <span>Last Checkup: {patient.lastCheckup}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-text-primary">EEG Signal Visualization</h3>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow hover:bg-brand-secondary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isAnalyzing && <Spinner />}
            {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </button>
        </div>
        <EEGChart data={eegData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Advanced Analysis Modules</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {ADVANCED_FEATURES.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-brand-light hover:border-brand-primary hover:shadow-md transition-all duration-200 text-center text-text-secondary hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label={`Analyze ${feature.name}`}
            >
              <feature.Icon className="w-8 h-8 mx-auto mb-2 text-brand-primary" />
              <span className="text-xs font-semibold">{feature.name}</span>
            </button>
          ))}
        </div>
      </div>

      { (isAnalyzing || analysisResult) && (
        <div className="bg-white p-6 rounded-lg shadow">
            {isAnalyzing && (
                 <div className="flex flex-col items-center justify-center p-8">
                    <Spinner size="lg" />
                    <p className="mt-4 text-lg text-text-secondary font-semibold">Performing Deep Learning Analysis...</p>
                    <p className="mt-2 text-sm text-gray-500">This may take a moment as the model processes the signal data.</p>
                 </div>
            )}
            {!isAnalyzing && analysisResult && <AnalysisPanel result={analysisResult} />}
        </div>
      )}

      <FeatureModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        featureName={selectedFeature?.name || ''}
        isLoading={isFeatureLoading}
        result={featureResult}
      />
    </div>
  );
};
