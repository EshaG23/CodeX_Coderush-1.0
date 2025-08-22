import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, FeatureAnalysisResult, Patient } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we'll proceed assuming it's set in the environment.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    risk_level: {
      type: Type.STRING,
      enum: ['Low', 'Medium', 'High'],
      description: "The assessed risk level for schizophrenia.",
    },
    confidence_score: {
      type: Type.NUMBER,
      description: "A confidence score for the assessment, from 0.0 to 1.0.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise clinical summary of the findings, written for a healthcare professional.",
    },
    key_findings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A bulleted list of the most significant EEG patterns detected.",
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A bulleted list of recommended next steps for the patient.",
    },
  },
  required: ['risk_level', 'confidence_score', 'summary', 'key_findings', 'recommendations'],
};

export const analyzeEEGData = async (patientName: string, eegFeatures: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Act as an advanced AI clinical decision support system specializing in neurology and psychiatry.
      You are analyzing simulated EEG data for a patient named ${patientName} to detect early signs of schizophrenia.
      
      Here are the summarized features extracted from the EEG signal:
      ${eegFeatures}
      
      Based on these features, provide a detailed analysis. Your response must be in JSON format and adhere to the provided schema.
      The summary should be professional and objective. The recommendations should be clinically relevant.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Validate the result structure before returning
    if (
      result.risk_level &&
      typeof result.confidence_score === 'number' &&
      result.summary &&
      Array.isArray(result.key_findings) &&
      Array.isArray(result.recommendations)
    ) {
      return result as AnalysisResult;
    } else {
      throw new Error("Invalid response structure from API.");
    }
  } catch (error) {
    console.error("Error analyzing EEG data with Gemini API:", error);
    // Return a structured error response that fits the type
    return {
      risk_level: 'Low',
      confidence_score: 0,
      summary: "An error occurred during analysis. Could not connect to the AI model. Please check the API key and network connection.",
      key_findings: ["API call failed."],
      recommendations: ["Retry the analysis.", "Verify system configuration."],
    };
  }
};

const featureAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    title: { 
      type: Type.STRING,
      description: "The title of the analysis report.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise clinical summary of the findings for a healthcare professional.",
    },
    details: {
      type: Type.ARRAY,
      description: "A list of specific metrics, their values, and interpretations.",
      items: {
        type: Type.OBJECT,
        properties: {
          metric: { type: Type.STRING, description: "The name of the metric measured." },
          value: { type: Type.STRING, description: "The value of the metric." },
          interpretation: { type: Type.STRING, description: "The clinical interpretation of the metric's value." },
        },
        required: ['metric', 'value', 'interpretation'],
      },
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A bulleted list of recommended next steps for the patient.",
    },
  },
  required: ['title', 'summary', 'details', 'recommendations'],
};

const getFeaturePrompt = (featureId: string, featureName: string, patient: Patient): string => {
  const baseIntro = `Act as a specialized clinical AI assistant. You are generating a simulated report for a patient named ${patient.name}, age ${patient.age}, whose current status is '${patient.status}'. The analysis is for '${featureName}'. Base your plausible, simulated report on typical patterns observed in psychiatric assessment, particularly in the context of schizophrenia risk evaluation. Your response MUST be in JSON format adhering to the provided schema.`;

  const prompts: { [key: string]: string } = {
    cognitive: "Generate a simulated report for a Cognitive Assessment. Include metrics from mock tests like MOCA and Trail Making Test, interpret the scores, and provide recommendations.",
    sleep: "Generate a simulated Sleep Pattern Analysis report from overnight EEG data. Include key metrics like sleep latency, REM latency, sleep efficiency, and sleep stage percentages. Interpret these findings.",
    treatment: "Generate a Treatment Predictor report. Based on simulated neurophysiological markers, predict patient response to common antipsychotics (e.g., Risperidone, Olanzapine) and suggest an optimal, hypothetical treatment path.",
    stress: "Generate a Stress Response Monitoring report. Analyze simulated EEG alpha/beta ratios and autonomic markers to assess stress levels. Provide an interpretation and stress management recommendations.",
    genetic: "Generate a Genetic Risk report. Create a plausible polygenic risk score and analyze a few key (but hypothetical) genetic markers associated with schizophrenia. Explain the implications.",
    speech: "Generate a Speech Pattern Analysis report. Analyze simulated linguistic features like prosody, coherence, and sentiment. Interpret these findings in the context of disorganized speech.",
    social: "Generate a Social Metrics report from simulated digital phenotyping data (e.g., social media activity, call logs). Assess patterns of social withdrawal or unusual activity and provide an interpretation.",
    med_tracker: "Generate a Medication Compliance report. Correlate simulated adherence data from an IoT pill dispenser with EEG markers. Report on compliance levels and their neurophysiological impact.",
    circadian: "Generate a Circadian Rhythm Analysis report from 24-hour monitoring. Report on rhythm stability, acrophase, and amplitude. Interpret any disruptions found.",
    vr_therapy: "Generate a report for a Virtual Reality Therapy session. Analyze simulated real-time EEG feedback during a VR cognitive enhancement task. Report on engagement, performance, and neural activity.",
    nutrition: "Generate a Nutritional Status Correlation report. Correlate simulated dietary patterns (e.g., low omega-3, vitamin D deficiency) with EEG changes. Provide dietary recommendations.",
    environment: "Generate an Environmental Factor Analysis report. Assess the impact of simulated environmental stressors (e.g., high noise levels, urbanicity) on the patient's neurophysiology.",
    peer: "Generate a Peer Comparison report. Anonymously compare the patient's key simulated EEG biomarkers against a normative database for their demographic group. Highlight any significant deviations.",
    crisis: "Generate a Suicide Risk Assessment report. Combine simulated EEG markers (e.g., frontal alpha asymmetry) and behavioral indicators to produce a risk score. Provide immediate action recommendations.",
    telemedicine: "Generate a summary for a Telemedicine Consultation. Synthesize key discussion points, patient-reported symptoms, and real-time observations from a simulated remote session.",
    research: "Generate a Research Contribution summary. De-identify the patient's key simulated data points and format them for a hypothetical research database contribution, explaining the significance of the data.",
    emergency: "Generate an Emergency Alert protocol. Based on critical simulated EEG patterns indicating a potential psychotic episode, create a structured alert for an emergency response team.",
  };

  return `${baseIntro} ${prompts[featureId] || `Generate a general analysis for ${featureName}.`}`;
};

export const analyzeAdvancedFeature = async (featureId: string, featureName: string, patient: Patient): Promise<FeatureAnalysisResult> => {
  try {
    const prompt = getFeaturePrompt(featureId, featureName, patient);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: featureAnalysisSchema,
        temperature: 0.5,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Basic validation
    if (result.title && result.summary && Array.isArray(result.details) && Array.isArray(result.recommendations)) {
      return result as FeatureAnalysisResult;
    } else {
      throw new Error("Invalid response structure from advanced feature API.");
    }
  } catch (error) {
    console.error(`Error analyzing feature ${featureName} with Gemini API:`, error);
    return {
      title: `Analysis Failed for ${featureName}`,
      summary: "An error occurred while communicating with the AI model. This could be due to a network issue or an invalid API key. Please try again later.",
      details: [{ metric: "Error", value: "API Call Failed", interpretation: "The request to the analysis service did not succeed." }],
      recommendations: ["Verify API key and network connection.", "Retry the analysis."],
    };
  }
};
