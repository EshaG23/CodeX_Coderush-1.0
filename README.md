# AuraMind: EEG Analysis Dashboard

A comprehensive, real-time EEG signal analysis dashboard built with Next.js, featuring advanced signal processing, AI-powered analysis, and an intuitive user interface for clinicians and researchers.

## 🚀 Features

### Core Functionality
- **EEG Signal Upload & Processing**: Support for CSV, TXT, EDF, PDF, DOCX, and XLSX files
- **Real-time Signal Visualization**: Interactive charts using Chart.js for clear signal representation
- **Advanced Signal Filtering**: Configurable band-pass filters with customizable frequency ranges
- **AI-Powered Analysis**: Automated detection of anomalies, seizure risk, and cognitive patterns

### Analysis Capabilities
- **Power Spectrum Analysis**: Alpha, Beta, Theta, Delta, and Gamma wave analysis
- **Clinical Metrics**: Seizure risk assessment, cognitive load evaluation, stress level monitoring
- **Sleep Stage Analysis**: REM, Deep, and Light sleep stage classification
- **Signal Quality Metrics**: Coherence analysis and hemispheric asymmetry detection

### User Interface
- **Patient Management**: Cohort-based patient organization with search functionality
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **Interactive Modules**: 16 specialized analysis modules for comprehensive brain health assessment
- **Real-time Updates**: Live data processing and visualization

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React
- **Signal Processing**: Custom DSP algorithms for EEG analysis

## 📁 Project Structure

```
final/
├── app/                    # Next.js app directory
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── FileUploader.tsx
│   │   ├── EEGVisualizer.tsx
│   │   └── AnalysisModules.tsx
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   └── ui/               # Reusable UI components
├── lib/                   # Core functionality
│   ├── parsers.ts        # File parsing utilities
│   ├── analysis.ts       # EEG analysis algorithms
│   └── signal.ts         # Signal processing functions
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Usage Guide

### Testing the Application
The application includes a `demo_data.csv` file with sample EEG data for testing purposes. You can use this file to explore all features without needing real EEG data.

### Uploading EEG Data
1. Click "Upload / Choose File" button
2. Select your EEG file (CSV, TXT, EDF, etc.) or use the provided `demo_data.csv`
3. Wait for file processing
4. View the signal visualization

### Running Analysis
1. Upload EEG data
2. Adjust filter settings if needed
3. Click "Run AI Analysis"
4. Review comprehensive results

### Understanding Results
- **Anomalies**: Number of detected signal irregularities
- **Seizure Risk**: Percentage-based risk assessment
- **Cognitive Load**: Low/Moderate/High classification
- **Stress Level**: Normal/Elevated/High assessment
- **Power Spectrum**: Frequency band power distribution
- **Sleep Stages**: REM, Deep, and Light sleep percentages

## 🔧 Configuration

### Filter Settings
- **Low Frequency**: Minimum frequency for band-pass filter (default: 0.5 Hz)
- **High Frequency**: Maximum frequency for band-pass filter (default: 40 Hz)
- **Sample Rate**: Automatically detected from uploaded files

### Analysis Parameters
- **Power Spectrum Bands**: Alpha (8-13 Hz), Beta (13-30 Hz), Theta (4-8 Hz), Delta (0.5-4 Hz), Gamma (30-100 Hz)
- **Anomaly Detection**: Based on signal variance and power distribution
- **Risk Assessment**: Multi-factor analysis including frequency content and signal quality

## 🧪 Testing

The application includes sample data generation for demonstration purposes. When no file is uploaded, the dashboard displays simulated EEG signals to showcase functionality.

## 🔮 Future Enhancements

- **Real-time EEG Streaming**: Live data acquisition from EEG devices
- **Machine Learning Models**: Integration with trained neural networks
- **Multi-channel Support**: Analysis of multiple EEG channels
- **Cloud Integration**: Secure data storage and sharing
- **Mobile App**: Native mobile application for field use
- **API Endpoints**: RESTful API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- Built with Next.js and React
- EEG signal processing algorithms
- Medical device integration concepts
- Clinical workflow optimization

---

**AuraMind** - Advancing brain health through intelligent EEG analysis