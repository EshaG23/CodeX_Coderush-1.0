import os
import numpy as np
import pandas as pd
from scipy import signal
from dotenv import load_dotenv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from io import StringIO  # Import StringIO from io module

# Import EEG processor
from eeg_processor import EEGProcessor

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get configuration from environment variables
MIN_FREQ = float(os.getenv('SOUND_FILTER_MIN_FREQUENCY', 20))
MAX_FREQ = float(os.getenv('SOUND_FILTER_MAX_FREQUENCY', 20000))
SAMPLE_RATE = int(os.getenv('SOUND_FILTER_SAMPLE_RATE', 44100))


class SoundProcessor:
    def __init__(self):
        self.min_freq = MIN_FREQ
        self.max_freq = MAX_FREQ
        self.sample_rate = SAMPLE_RATE
        logger.info(f"Initialized SoundProcessor with frequency range: {self.min_freq}-{self.max_freq} Hz")

    def filter_sound(self, data, file_type):
        """Filter sound data from various file types"""
        try:
            # Convert data to numpy array if it's not already
            if isinstance(data, list):
                data = np.array(data)
            
            logger.info(f"Processing {file_type} data with shape: {data.shape if hasattr(data, 'shape') else 'unknown'}")
            
            # Apply bandpass filter
            filtered_data = self._apply_bandpass_filter(data)
            
            # Return filtered data and metadata
            return {
                'success': True,
                'filtered_data': filtered_data.tolist() if hasattr(filtered_data, 'tolist') else filtered_data,
                'metadata': {
                    'min_freq': self.min_freq,
                    'max_freq': self.max_freq,
                    'sample_rate': self.sample_rate,
                    'file_type': file_type
                }
            }
        except Exception as e:
            logger.error(f"Error filtering sound: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }

    def _apply_bandpass_filter(self, data):
        """Apply a bandpass filter to the data"""
        # Normalize frequencies to Nyquist frequency
        nyq = 0.5 * self.sample_rate
        low = self.min_freq / nyq
        high = self.max_freq / nyq
        
        # Design filter
        b, a = signal.butter(4, [low, high], btype='band')
        
        # Apply filter
        filtered_data = signal.filtfilt(b, a, data)
        
        return filtered_data

    def extract_sound_from_csv(self, csv_data):
        """Extract sound data from CSV file"""
        try:
            # Parse CSV data
            df = pd.read_csv(StringIO(csv_data))
            
            # Look for columns that might contain audio data
            # This is a simplified approach - in reality, you'd need more sophisticated detection
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            
            if len(numeric_cols) == 0:
                return {'success': False, 'error': 'No numeric columns found in CSV'}
            
            # Use the first numeric column as audio data (simplified approach)
            audio_data = df[numeric_cols[0]].values
            
            # Apply filtering
            return self.filter_sound(audio_data, 'csv')
        except Exception as e:
            logger.error(f"Error extracting sound from CSV: {str(e)}")
            return {'success': False, 'error': str(e)}

    def extract_sound_from_text(self, text_data):
        """Extract sound data from text file"""
        try:
            # Split by lines and try to convert to numbers
            lines = text_data.strip().split('\n')
            
            # Try to extract numeric data
            numeric_data = []
            for line in lines:
                try:
                    # Split line by common delimiters and try to convert to float
                    values = [float(val.strip()) for val in line.split() if val.strip()]
                    numeric_data.extend(values)
                except ValueError:
                    # Skip non-numeric lines
                    continue
            
            if not numeric_data:
                return {'success': False, 'error': 'No numeric data found in text file'}
            
            # Apply filtering
            return self.filter_sound(np.array(numeric_data), 'txt')
        except Exception as e:
            logger.error(f"Error extracting sound from text: {str(e)}")
            return {'success': False, 'error': str(e)}


# Initialize processors
sound_processor = SoundProcessor()
eeg_processor = EEGProcessor()


@app.route('/api/filter-sound', methods=['POST'])
def filter_sound_api():
    """API endpoint to filter sound from uploaded files"""
    try:
        # Get request data
        data = request.json
        
        if not data or 'fileContent' not in data or 'fileType' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        file_content = data['fileContent']
        file_type = data['fileType'].lower()
        
        # Process based on file type
        if file_type == 'csv':
            result = sound_processor.extract_sound_from_csv(file_content)
        elif file_type == 'txt':
            result = sound_processor.extract_sound_from_text(file_content)
        elif file_type in ['edf', 'pdf']:
            # These would require specialized libraries
            result = {'success': False, 'error': f'{file_type.upper()} processing requires specialized libraries'}
        else:
            result = {'success': False, 'error': f'Unsupported file type: {file_type}'}
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/process-eeg', methods=['POST'])
def process_eeg_api():
    """API endpoint to process EEG data from uploaded files"""
    try:
        # Get request data
        data = request.json
        
        if not data or 'fileContent' not in data or 'fileType' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        file_content = data['fileContent']
        file_type = data['fileType'].lower()
        analysis_type = data.get('analysisType', 'all')
        
        # Process based on file type
        if file_type == 'csv':
            result = eeg_processor.extract_eeg_from_csv(file_content)
        elif file_type == 'txt':
            result = eeg_processor.extract_eeg_from_text(file_content)
        elif file_type == 'edf':
            result = eeg_processor.extract_eeg_from_edf(file_content)
        elif file_type == 'pdf':
            # PDF processing would require specialized libraries
            result = {'success': False, 'error': 'PDF processing requires specialized libraries'}
        else:
            result = {'success': False, 'error': f'Unsupported file type: {file_type}'}
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/analyze-eeg', methods=['POST'])
def analyze_eeg_api():
    """API endpoint to analyze EEG data with specific analysis type"""
    try:
        # Get request data
        data = request.json
        
        if not data or 'eegData' not in data or 'analysisType' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        eeg_data = data['eegData']
        analysis_type = data['analysisType']
        
        # Process the EEG data with the specified analysis
        result = eeg_processor.process_eeg_data(eeg_data, 'json', analysis_type)
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/feature-importance', methods=['GET'])
def feature_importance_api():
    """API endpoint to get feature importance for a specific analysis type"""
    try:
        analysis_type = request.args.get('analysisType', 'anomaly_detection')
        
        # Get feature importance
        result = eeg_processor.get_feature_importance(analysis_type)
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    # Run the Flask app
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)