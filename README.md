# AuraMind: EEG Analysis Dashboard

AuraMind is a web-based dashboard for EEG data analysis and visualization with sound filtering capabilities.

## Features

- Upload and process various file formats (.csv, .edf, .pdf, .txt)
- Extract and filter sound data from uploaded files
- Visualize EEG signals and audio waveforms
- Patient management and cohort analysis
- Advanced analysis modules

## Quick Start Guide

### Option 1: Using Startup Scripts (Recommended)

#### Windows Users
1. Install Python 3.8 or higher if not already installed
2. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Double-click the `start_servers.bat` file or run it from the command line:
   ```
   start_servers.bat
   ```
   This will start both the frontend and backend servers and open the dashboard in your browser.

#### Linux/Mac Users
1. Install Python 3.8 or higher if not already installed
2. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Make the startup script executable and run it:
   ```
   chmod +x start_servers.sh
   ./start_servers.sh
   ```
   This will start both the frontend and backend servers.

### Option 2: Manual Startup

#### Step 1: Start the Frontend
1. Start a local web server in the project directory:
   ```
   python -m http.server 8000
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8000/index%20(1).html
   ```

#### Step 2: Start the Backend (for sound processing)
1. Install Python 3.8 or higher if not already installed
2. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Start the Python Flask server:
   ```
   python sound_processor.py
   ```
   This will start the backend server on port 5000 by default.

## Detailed Setup Instructions

### Frontend Setup

The frontend consists of HTML, CSS, and JavaScript files:
- `index (1).html`: Main dashboard interface
- `styles.css`: Styling for the dashboard
- `script.js`: JavaScript functionality

No build process is required - simply serve these files using any web server.

### Backend Setup (for sound processing)

1. Ensure Python 3.8+ is installed
2. Install dependencies from requirements.txt:
   ```
   pip install -r requirements.txt
   ```
3. Configure environment variables in `.env` file (sample values provided):
   ```
   SOUND_FILTER_MIN_FREQUENCY=20
   SOUND_FILTER_MAX_FREQUENCY=20000
   SOUND_FILTER_SAMPLE_RATE=44100
   PORT=5000
   STORAGE_REGION=us-east-1
   ```
4. Start the Flask server:
   ```
   python sound_processor.py
   ```

## Connecting Frontend to Backend

The frontend JavaScript (`script.js`) connects to the backend through the `filterSoundData` function, which makes API calls to the Flask server at:
```
http://localhost:5000/api/filter-sound
```

Ensure both servers are running simultaneously for full functionality.

## File Upload Functionality

The dashboard supports uploading and processing the following file types:

- CSV files (.csv): For tabular data
- EDF files (.edf): For EEG recordings
- PDF files (.pdf): For documents with embedded data
- Text files (.txt): For plain text data

## Sound Filtering

The application includes functionality to extract and filter sound data from uploaded files. The filtering process:

1. Extracts numeric data from the uploaded file
2. Applies a bandpass filter to isolate frequencies within the specified range
3. Visualizes the filtered sound data as a waveform

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- Data Processing: NumPy, Pandas, SciPy
- Visualization: Custom JavaScript rendering

## License

This project is licensed under the MIT License - see the LICENSE file for details.