# AuraMind - Mental Health Dashboard

A comprehensive mental health monitoring and analysis dashboard for clinicians to track patient EEG data and provide AI-powered insights.

## Features

### Core Functionality
- **EEG Signal Visualization**: Real-time display of brain wave data with interactive charts
- **File Upload Support**: Upload CSV, TXT, EDF, PDF, DOCX, and XLSX files
- **AI Analysis**: Automated analysis of EEG signals for anomalies, seizure risk, and cognitive patterns
- **Patient Management**: Multi-patient cohort management with status tracking
- **Advanced Filtering**: Band-pass filtering for signal processing

### Analysis Modules
- **Cognitive Tests**: Memory, attention, and executive function assessment
- **Sleep Analysis**: Sleep pattern and quality analysis
- **Treatment Predictor**: AI-powered treatment recommendations
- **Stress Monitor**: Real-time stress level monitoring
- **Genetic Risk**: Genetic predisposition analysis
- **Social Metrics**: Social interaction patterns
- **Med Tracker**: Medication adherence tracking
- **Circadian Health**: Biological rhythm analysis
- **VR Therapy**: Virtual reality therapy sessions
- **Nutrition Impact**: Diet effects on brain health
- **Peer Analysis**: Compare with similar patients
- **Crisis Alert**: Early warning system
- **Remote Consult**: Telemedicine consultations
- **Research Portal**: Access to clinical studies
- **Emergency Alert**: Critical situation alerts
- **Environment Scan**: Environmental factor analysis

## Recent Fixes Applied

### 1. Dependency Compatibility
- Updated `chart.js` to version 4.4.0
- Updated `react-chartjs-2` to version 5.2.0
- Fixed compatibility issues between chart libraries

### 2. File Parsing Improvements
- Added error handling for all file parsers
- Implemented fallback sample data for unsupported file types (PDF, DOCX, XLSX)
- Enhanced CSV and TXT parsing with better error recovery
- Improved EDF file parsing with validation

### 3. EEG Visualization Enhancements
- Added data validation to prevent chart rendering errors
- Implemented fallback to sample data when invalid data is detected
- Enhanced chart responsiveness and performance

### 4. Error Handling
- Added comprehensive error handling throughout the application
- Improved user feedback for file upload errors
- Better handling of edge cases in data processing

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd final
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

### Testing File Upload
1. Use the provided `demo_data.csv` file for testing
2. Upload any CSV, TXT, or EDF file with numerical data
3. PDF, DOCX, and XLSX files will generate sample data for demonstration

## Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Signal Processing**: Custom band-pass filtering implementation

## File Structure

```
final/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── analysis.ts       # EEG analysis algorithms
│   ├── parsers.ts        # File parsing utilities
│   └── signal.ts         # Signal processing functions
└── demo_data.csv         # Sample data for testing
```

## Known Limitations

1. **PDF/DOCX/XLSX Parsing**: Currently generates sample data instead of parsing actual content
2. **EDF Parsing**: Basic implementation - may not handle all EDF file variations
3. **Real-time Data**: Currently processes uploaded files - real-time streaming not implemented
4. **Authentication**: No user authentication system implemented

## Future Enhancements

- Implement real PDF/DOCX/XLSX parsing
- Add real-time EEG data streaming
- Implement user authentication and role-based access
- Add more advanced signal processing algorithms
- Integrate with medical databases for enhanced analysis
- Add export functionality for reports and data

## Support

For issues or questions, please check the console for error messages and ensure all dependencies are properly installed.