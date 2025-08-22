"""
ML EEG Analysis API
Flask-based REST API for serving ML EEG analysis results

This API provides:
- Real-time EEG analysis using ML models
- File upload and processing
- Results visualization endpoints
- Model information and status
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
import json
import logging
import os
import tempfile
from datetime import datetime
from typing import Dict, Any, Optional
import traceback

# Import our ML analyzer
from ml_eeg_analyzer import ML_EEGAnalyzer, analyze_eeg_with_ml

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize ML analyzer
ml_analyzer = ML_EEGAnalyzer()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'ML EEG Analysis API',
        'version': '1.0.0'
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_eeg():
    """
    Analyze EEG data using ML models
    
    Expected input:
    - JSON with 'data' field containing EEG signal
    - Optional 'sample_rate' field (default: 256)
    """
    try:
        data = request.get_json()
        
        if not data or 'data' not in data:
            return jsonify({
                'error': 'Missing EEG data',
                'status': 'error'
            }), 400
        
        # Extract data
        eeg_data = np.array(data['data'], dtype=float)
        sample_rate = data.get('sample_rate', 256)
        
        # Validate data
        if len(eeg_data) < 100:
            return jsonify({
                'error': 'Insufficient data points (minimum 100 required)',
                'status': 'error'
            }), 400
        
        # Perform analysis
        results = ml_analyzer.analyze_eeg_data(eeg_data, sample_rate)
        
        # Add API metadata
        results['api_version'] = '1.0.0'
        results['processing_time'] = datetime.now().isoformat()
        
        logger.info(f"Analysis completed for {len(eeg_data)} data points")
        return jsonify(results)
        
    except Exception as e:
        logger.error(f"Error in analysis: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': str(e),
            'status': 'error',
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/analyze-file', methods=['POST'])
def analyze_eeg_file():
    """
    Analyze EEG data from uploaded file
    
    Supports: CSV, TXT, EDF files
    """
    try:
        if 'file' not in request.files:
            return jsonify({
                'error': 'No file uploaded',
                'status': 'error'
            }), 400
        
        file = request.files['file']
        sample_rate = int(request.form.get('sample_rate', 256))
        
        if file.filename == '':
            return jsonify({
                'error': 'No file selected',
                'status': 'error'
            }), 400
        
        # Process file based on extension
        filename = file.filename.lower()
        
        if filename.endswith('.csv'):
            # Read CSV file
            df = pd.read_csv(file)
            # Assume first numeric column is EEG data
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            if len(numeric_cols) == 0:
                return jsonify({
                    'error': 'No numeric data found in CSV',
                    'status': 'error'
                }), 400
            eeg_data = df[numeric_cols[0]].values
            
        elif filename.endswith('.txt'):
            # Read TXT file
            content = file.read().decode('utf-8')
            lines = content.strip().split('\n')
            eeg_data = np.array([float(line.strip()) for line in lines if line.strip()])
            
        else:
            return jsonify({
                'error': 'Unsupported file format. Use CSV or TXT',
                'status': 'error'
            }), 400
        
        # Validate data
        if len(eeg_data) < 100:
            return jsonify({
                'error': 'Insufficient data points (minimum 100 required)',
                'status': 'error'
            }), 400
        
        # Perform analysis
        results = ml_analyzer.analyze_eeg_data(eeg_data, sample_rate)
        
        # Add file metadata
        results['filename'] = file.filename
        results['file_size'] = len(eeg_data)
        results['api_version'] = '1.0.0'
        results['processing_time'] = datetime.now().isoformat()
        
        logger.info(f"File analysis completed: {file.filename}")
        return jsonify(results)
        
    except Exception as e:
        logger.error(f"Error in file analysis: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': str(e),
            'status': 'error',
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    """Get information about the ML models"""
    try:
        model_info = ml_analyzer.get_model_info()
        model_info['timestamp'] = datetime.now().isoformat()
        return jsonify(model_info)
    except Exception as e:
        logger.error(f"Error getting model info: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/features', methods=['POST'])
def extract_features():
    """
    Extract features from EEG data without classification
    """
    try:
        data = request.get_json()
        
        if not data or 'data' not in data:
            return jsonify({
                'error': 'Missing EEG data',
                'status': 'error'
            }), 400
        
        eeg_data = np.array(data['data'], dtype=float)
        sample_rate = data.get('sample_rate', 256)
        
        # Extract features only
        features = ml_analyzer.preprocessor.extract_features(eeg_data)
        
        return jsonify({
            'features': features,
            'sample_rate': sample_rate,
            'data_length': len(eeg_data),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error extracting features: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/batch-analyze', methods=['POST'])
def batch_analyze():
    """
    Analyze multiple EEG signals in batch
    """
    try:
        data = request.get_json()
        
        if not data or 'signals' not in data:
            return jsonify({
                'error': 'Missing signals data',
                'status': 'error'
            }), 400
        
        signals = data['signals']
        sample_rate = data.get('sample_rate', 256)
        
        if not isinstance(signals, list) or len(signals) == 0:
            return jsonify({
                'error': 'Invalid signals format',
                'status': 'error'
            }), 400
        
        results = []
        for i, signal_data in enumerate(signals):
            try:
                eeg_data = np.array(signal_data, dtype=float)
                if len(eeg_data) >= 100:
                    result = ml_analyzer.analyze_eeg_data(eeg_data, sample_rate)
                    result['signal_index'] = i
                    results.append(result)
                else:
                    results.append({
                        'signal_index': i,
                        'error': 'Insufficient data points',
                        'status': 'error'
                    })
            except Exception as e:
                results.append({
                    'signal_index': i,
                    'error': str(e),
                    'status': 'error'
                })
        
        return jsonify({
            'results': results,
            'total_signals': len(signals),
            'successful_analyses': len([r for r in results if 'error' not in r]),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in batch analysis: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/validate', methods=['POST'])
def validate_data():
    """
    Validate EEG data format and quality
    """
    try:
        data = request.get_json()
        
        if not data or 'data' not in data:
            return jsonify({
                'error': 'Missing EEG data',
                'status': 'error'
            }), 400
        
        eeg_data = np.array(data['data'], dtype=float)
        
        # Perform validation checks
        validation_results = {
            'data_length': len(eeg_data),
            'is_valid': True,
            'warnings': [],
            'errors': []
        }
        
        # Check data length
        if len(eeg_data) < 100:
            validation_results['errors'].append('Insufficient data points (minimum 100 required)')
            validation_results['is_valid'] = False
        elif len(eeg_data) < 1000:
            validation_results['warnings'].append('Limited data points may affect accuracy')
        
        # Check for NaN values
        if np.any(np.isnan(eeg_data)):
            validation_results['errors'].append('Data contains NaN values')
            validation_results['is_valid'] = False
        
        # Check for infinite values
        if np.any(np.isinf(eeg_data)):
            validation_results['errors'].append('Data contains infinite values')
            validation_results['is_valid'] = False
        
        # Check data range
        data_range = np.max(eeg_data) - np.min(eeg_data)
        if data_range == 0:
            validation_results['errors'].append('Data has no variation (constant values)')
            validation_results['is_valid'] = False
        
        # Check for outliers
        z_scores = np.abs((eeg_data - np.mean(eeg_data)) / np.std(eeg_data))
        outlier_count = np.sum(z_scores > 3)
        if outlier_count > len(eeg_data) * 0.1:  # More than 10% outliers
            validation_results['warnings'].append(f'High number of outliers detected ({outlier_count})')
        
        validation_results['statistics'] = {
            'mean': float(np.mean(eeg_data)),
            'std': float(np.std(eeg_data)),
            'min': float(np.min(eeg_data)),
            'max': float(np.max(eeg_data)),
            'outlier_count': int(outlier_count)
        }
        
        validation_results['timestamp'] = datetime.now().isoformat()
        
        return jsonify(validation_results)
        
    except Exception as e:
        logger.error(f"Error in data validation: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'status': 'error'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'status': 'error'
    }), 500

if __name__ == '__main__':
    # Run the Flask app
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting ML EEG Analysis API on port {port}")
    logger.info(f"Debug mode: {debug}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
