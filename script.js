// Dashboard functionality
class EEGDashboard {
  constructor() {
    this.currentPatient = null
    this.init()
  }

  init() {
    this.bindEvents()
    this.loadPatientData()
    this.initializeModules()
  }

  bindEvents() {
    try {
      // Patient selection
      const patientItems = document.querySelectorAll(".patient-item")
      if (patientItems.length > 0) {
        patientItems.forEach((item) => {
          item.addEventListener("click", (e) => {
            this.selectPatient(e.currentTarget)
          })
        })
      } else {
        console.warn('No patient items found to bind events')
      }

      // Search functionality
      const searchInput = document.querySelector(".search-input")
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          this.searchPatients(e.target.value)
        })
      } else {
        console.warn('Search input not found')
      }

      // Action buttons
      const reportBtn = document.querySelector(".btn-primary")
      if (reportBtn) {
        reportBtn.addEventListener("click", () => {
          this.generateReport()
        })
      } else {
        console.warn('Report button not found')
      }

      const exportBtn = document.querySelector(".btn-success")
      if (exportBtn) {
        exportBtn.addEventListener("click", () => {
          this.exportEEG()
        })
      } else {
        console.warn('Export button not found')
      }

      const alertBtn = document.querySelector(".btn-danger")
      if (alertBtn) {
        alertBtn.addEventListener("click", () => {
          this.triggerEmergencyAlert()
        })
      } else {
        console.warn('Alert button not found')
      }

      // EEG section buttons
      const uploadBtn = document.querySelector(".btn-outline")
      if (uploadBtn) {
        uploadBtn.addEventListener("click", () => {
          this.uploadData()
        })
      } else {
        console.warn('Upload button not found')
      }

      const aiButtons = document.querySelectorAll(".btn-primary")
      if (aiButtons.length > 1) {
        aiButtons[1].addEventListener("click", () => {
          this.runAIAnalysis()
        })
      } else {
        console.warn('AI analysis button not found')
      }

      // Module cards
      const moduleCards = document.querySelectorAll(".module-card")
      if (moduleCards.length > 0) {
        moduleCards.forEach((card) => {
          card.addEventListener("click", (e) => {
            this.openModule(e.currentTarget)
          })
        })
      } else {
        console.warn('No module cards found')
      }
    } catch (error) {
      console.error('Error binding events:', error)
      this.showNotification("Error initializing dashboard", "error")
    }
  }

  selectPatient(patientElement) {
    try {
      if (!patientElement) {
        console.error('No patient element provided')
        return
      }
      
      // Remove active class from all patients
      document.querySelectorAll(".patient-item").forEach((item) => {
        item.classList.remove("active")
      })

      // Add active class to selected patient
      patientElement.classList.add("active")

      // Get patient data
      const nameElement = patientElement.querySelector("h4")
      const infoElement = patientElement.querySelector("p")
      
      if (!nameElement || !infoElement) {
        console.error('Patient element missing name or info')
        this.showNotification("Error loading patient data", "error")
        return
      }
      
      const patientName = nameElement.textContent
      const patientInfo = infoElement.textContent

      // Update main content
      this.updatePatientDetails(patientName, patientInfo)
    } catch (error) {
      console.error('Error selecting patient:', error)
      this.showNotification("Error selecting patient", "error")
    }
  }

  updatePatientDetails(name, info) {
    try {
      if (!name || !info) {
        console.error('Missing patient name or info')
        return
      }
      
      const [age, gender] = info.split(", ")
      
      const headerElement = document.querySelector(".patient-header h2")
      if (!headerElement) {
        console.error('Patient header element not found')
        return
      }
      headerElement.textContent = name

      const metaElements = document.querySelectorAll(".patient-meta span")
      if (metaElements.length < 3) {
        console.error('Patient meta elements not found or incomplete')
        return
      }
      
      metaElements[0].textContent = `Age: ${age || 'Unknown'}`
      metaElements[1].textContent = `Gender: ${gender || 'Unknown'}`

      // Simulate last checkup date
      const lastCheckup = this.generateRandomDate()
      metaElements[2].textContent = `Last Checkup: ${lastCheckup}`
    } catch (error) {
      console.error('Error updating patient details:', error)
      this.showNotification("Error updating patient details", "error")
    }
  }

  searchPatients(query) {
    try {
      if (query === undefined) {
        console.warn('Search query is undefined')
        query = ''
      }
      
      const patients = document.querySelectorAll(".patient-item")
      if (patients.length === 0) {
        console.warn('No patient items found for search')
        return
      }
      
      const searchQuery = query.toLowerCase()
      
      patients.forEach((patient) => {
        try {
          const nameElement = patient.querySelector("h4")
          const infoElement = patient.querySelector("p")
          
          if (!nameElement || !infoElement) {
            console.warn('Patient element missing name or info')
            return
          }
          
          const name = nameElement.textContent.toLowerCase()
          const info = infoElement.textContent.toLowerCase()

          if (name.includes(searchQuery) || info.includes(searchQuery)) {
            patient.style.display = "flex"
          } else {
            patient.style.display = "none"
          }
        } catch (patientError) {
          console.warn('Error processing patient in search:', patientError)
        }
      })
    } catch (error) {
      console.error('Error searching patients:', error)
    }
  }

  generateReport() {
    this.showNotification("Generating comprehensive EEG report...", "info")

    // Simulate report generation
    setTimeout(() => {
      this.showNotification("Report generated successfully!", "success")
    }, 2000)
  }

  exportEEG() {
    this.showNotification("Exporting EEG data...", "info")

    // Simulate export
    setTimeout(() => {
      this.showNotification("EEG data exported successfully!", "success")
    }, 1500)
  }

  triggerEmergencyAlert() {
    if (confirm("Are you sure you want to trigger an emergency alert?")) {
      this.showNotification("Emergency alert sent to medical team!", "warning")
    }
  }

  uploadData() {
    // Create file input
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".edf,.csv,.txt,.pdf"
    input.multiple = true
    input.onchange = (e) => {
      const files = e.target.files
      if (files.length > 0) {
        Array.from(files).forEach(file => {
          this.processEEGFile(file)
        })
      }
    }
    input.click()
  }

  processEEGFile(file) {
    if (!file || !file.name) {
      this.showNotification("Invalid file", "error")
      return
    }
    
    this.showNotification(`Processing ${file.name}...`, "info")
    
    // Check file type
    const fileExtension = file.name.split('.').pop().toLowerCase()
    const supportedTypes = ['csv', 'edf', 'pdf', 'txt']
    
    if (!supportedTypes.includes(fileExtension)) {
      this.showNotification(`Unsupported file type: ${fileExtension}`, "error")
      return
    }
    
    // Read the file
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result
        
        if (!fileContent) {
          throw new Error('Empty file content')
        }
        
        // Process based on file type
        switch(fileExtension) {
          case 'csv':
            this.processCSVData(fileContent, file.name)
            break
          case 'edf':
            this.processEDFData(fileContent, file.name)
            break
          case 'pdf':
            this.processPDFData(fileContent, file.name)
            break
          case 'txt':
            this.processTXTData(fileContent, file.name)
            break
          default:
            throw new Error(`Unsupported file type: ${fileExtension}`)
        }
        
        // Extract and filter sound data
        this.filterSoundData(fileContent, fileExtension)
        
        // Display visualization
        this.displayEEGVisualization()
        this.showNotification(`${file.name} loaded successfully!`, "success")
      } catch (error) {
        console.error('Error processing file:', error)
        this.showNotification(`Error processing file: ${error.message}`, "error")
      }
    }
    
    reader.onerror = (error) => {
      console.error('File reading error:', error)
      this.showNotification(`Error reading file: ${file.name}`, "error")
    }
    
    // Read file as appropriate format
    try {
      if (fileExtension === 'pdf') {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file)
      }
    } catch (error) {
      console.error('Error initiating file read:', error)
      this.showNotification(`Error reading file: ${error.message}`, "error")
    }
  }

  displayEEGVisualization() {
    try {
      const placeholder = document.querySelector(".eeg-placeholder")
      if (!placeholder) {
        console.error('EEG placeholder not found')
        this.showNotification("Error: EEG placeholder not found", "error")
        return
      }
      
      placeholder.innerHTML = `
            <div class="eeg-chart">
                <canvas id="eegCanvas" width="800" height="200"></canvas>
                <div class="eeg-controls">
                    <button class="btn btn-outline">Play</button>
                    <button class="btn btn-outline">Pause</button>
                    <button class="btn btn-outline">Reset</button>
                </div>
            </div>
        `

      this.drawEEGSignal()
    } catch (error) {
      console.error('Error displaying EEG visualization:', error)
      this.showNotification("Error displaying EEG visualization", "error")
    }
  }

  drawEEGSignal() {
    try {
      const canvas = document.getElementById("eegCanvas")
      if (!canvas) {
        console.error('EEG canvas element not found')
        return
      }

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        console.error('Could not get canvas context')
        return
      }
      
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw EEG-like signal
      ctx.strokeStyle = "#4a6cf7"
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * 0.02) * 30 + Math.sin(x * 0.05) * 20 + Math.random() * 10
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    } catch (error) {
      console.error('Error drawing EEG signal:', error)
    }
  }

  runAIAnalysis() {
    try {
      // Check if EEG visualization exists
      const eegSection = document.querySelector(".eeg-visualization")
      if (!eegSection) {
        throw new Error("EEG visualization section not found")
      }
      
      this.showNotification("Running AI analysis on EEG data...", "info")

      // Simulate AI analysis
      setTimeout(() => {
        try {
          this.showAnalysisResults()
          this.showNotification("AI analysis completed!", "success")
        } catch (error) {
          console.error('Error in AI analysis completion:', error)
          this.showNotification("Error completing AI analysis: " + error.message, "error")
        }
      }, 4000)
    } catch (error) {
      console.error('Error starting AI analysis:', error)
      this.showNotification("Error starting AI analysis: " + error.message, "error")
    }
  }

  showAnalysisResults() {
    try {
      const results = {
        "Anomaly Detection": {
          value: "2 anomalies detected",
          icon: "fa-exclamation-triangle",
          color: "#ff6b6b",
          details: [
            { label: "Location", value: "Frontal Lobe" },
            { label: "Severity", value: "Moderate" },
            { label: "Frequency", value: "12-15 Hz" }
          ]
        },
        "Sleep Stages": {
          value: "REM: 23%, Deep: 18%, Light: 59%",
          icon: "fa-moon",
          color: "#4a6cf7",
          details: [
            { label: "REM Duration", value: "1.8 hours" },
            { label: "Deep Sleep", value: "1.4 hours" },
            { label: "Light Sleep", value: "4.7 hours" }
          ]
        },
        "Seizure Risk": {
          value: "Low (12%)",
          icon: "fa-chart-line",
          color: "#51cf66",
          details: [
            { label: "Baseline", value: "8%" },
            { label: "Trend", value: "Stable" },
            { label: "Next Assessment", value: "2 weeks" }
          ]
        },
        "Cognitive Load": {
          value: "Moderate",
          icon: "fa-brain",
          color: "#ffd43b",
          details: [
            { label: "Attention Score", value: "72/100" },
            { label: "Memory Load", value: "Medium" },
            { label: "Processing Speed", value: "Normal" }
          ]
        },
        "Stress Level": {
          value: "Elevated",
          icon: "fa-heartbeat",
          color: "#ff922b",
          details: [
            { label: "Cortisol Indicator", value: "High" },
            { label: "HRV Analysis", value: "Below normal" },
            { label: "Recommendation", value: "Stress management" }
          ]
        }
      }

    // Create structured analysis results container
    let resultsHTML = `
      <div class="analysis-results">
        <h4>AI Analysis Results</h4>
        <div class="analysis-summary">
          <div class="summary-icon">
            <i class="fas fa-brain"></i>
          </div>
          <div class="summary-content">
            <h5>Analysis Summary</h5>
            <p>EEG analysis complete with 5 key metrics evaluated. Overall patient condition appears stable with moderate stress levels and normal cognitive function. Two minor anomalies detected in frontal lobe region.</p>
            <div class="summary-metrics">
              <div class="metric" style="color: #51cf66">Normal: 3</div>
              <div class="metric" style="color: #ffd43b">Moderate: 1</div>
              <div class="metric" style="color: #ff6b6b">Severe: 0</div>
            </div>
          </div>
        </div>
        <div class="results-grid">
    `
    
    // Add each result as a card with expandable details
    for (const [key, data] of Object.entries(results)) {
      resultsHTML += `
        <div class="result-card">
          <div class="result-header" style="border-left: 4px solid ${data.color}">
            <div class="result-icon" style="background-color: ${data.color}">
              <i class="fas ${data.icon}"></i>
            </div>
            <div class="result-main">
              <h5>${key}</h5>
              <p>${data.value}</p>
            </div>
            <div class="result-expand">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div class="result-details">
      `
      
      // Add detailed metrics
      for (const detail of data.details) {
        resultsHTML += `
          <div class="detail-item">
            <span class="detail-label">${detail.label}:</span>
            <span class="detail-value">${detail.value}</span>
          </div>
        `
      }
      
      resultsHTML += `
          </div>
        </div>
      `
    }
    
    resultsHTML += `
        </div>
      </div>
    `

    // Add results to EEG section
    const eegSection = document.querySelector(".eeg-visualization")
    if (!eegSection) {
      console.error('EEG visualization section not found')
      this.showNotification("Error displaying analysis results", "error")
      return
    }
    
    // Remove any existing analysis results before adding new ones
    const existingResults = eegSection.querySelector('.analysis-results')
    if (existingResults) {
      eegSection.removeChild(existingResults)
    }
    
    eegSection.innerHTML += resultsHTML
    
    // Add event listeners for expandable cards
    document.querySelectorAll('.result-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.parentElement;
        const details = card.querySelector('.result-details');
        const icon = header.querySelector('.result-expand i');
        
        // Toggle details visibility
        if (details.style.maxHeight) {
          details.style.maxHeight = null;
          details.classList.remove('expanded');
          icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
          details.classList.add('expanded');
          details.style.maxHeight = details.scrollHeight + 'px';
          icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
      });
    });
    } catch (error) {
      console.error('Error showing analysis results:', error)
      this.showNotification(`Error showing analysis results: ${error.message}`, "error")
    }
  }

  openModule(moduleElement) {
    const moduleName = moduleElement.querySelector("h4").textContent
    this.showNotification(`Opening ${moduleName} module...`, "info")

    // Highlight selected module
    document.querySelectorAll(".module-card").forEach((card) => {
      card.classList.remove("highlighted")
    })
    moduleElement.classList.add("highlighted")

    // Simulate module loading
    setTimeout(() => {
      this.showNotification(`${moduleName} module loaded!`, "success")
    }, 1000)
  }

  loadPatientData() {
    // Simulate loading patient data
    console.log("Loading patient data...")
  }

  initializeModules() {
    // Initialize analysis modules
    console.log("Initializing analysis modules...")
  }

  generateRandomDate() {
    const start = new Date(2023, 0, 1)
    const end = new Date()
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return randomDate.toISOString().split("T")[0]
  }

  // Process CSV data
  processCSVData(content, filename) {
    console.log(`Processing CSV data from ${filename}`)
    try {
      // Basic CSV parsing
      const lines = content.split('\n')
      const headers = lines[0].split(',')
      
      // Log the headers for debugging
      console.log('CSV Headers:', headers)
      
      // Here you would implement actual CSV processing logic
      // For demonstration, we'll just count the data points
      const dataPoints = lines.length - 1
      console.log(`CSV contains ${dataPoints} data points`)
      
      return { headers, dataPoints }
    } catch (error) {
      console.error('Error processing CSV:', error)
      this.showNotification(`Error processing CSV: ${error.message}`, "error")
      return null
    }
  }
  
  // Process EDF data
  processEDFData(content, filename) {
    console.log(`Processing EDF data from ${filename}`)
    // EDF processing would require a specialized library
    // This is a placeholder for demonstration
    this.showNotification("EDF processing requires specialized libraries", "info")
    
    // In a real implementation, you would use a library like EDFlib.js
    return { type: 'edf', size: content.length }
  }
  
  // Process PDF data
  processPDFData(content, filename) {
    console.log(`Processing PDF data from ${filename}`)
    // PDF processing would require a specialized library like pdf.js
    this.showNotification("PDF data detected, extracting content", "info")
    
    // In a real implementation, you would use a library like pdf.js
    return { type: 'pdf', size: content.byteLength }
  }
  
  // Process TXT data
  processTXTData(content, filename) {
    console.log(`Processing TXT data from ${filename}`)
    try {
      // Simple text processing
      const lines = content.split('\n')
      const wordCount = content.split(/\s+/).length
      
      console.log(`Text file contains ${lines.length} lines and ${wordCount} words`)
      
      return { lines: lines.length, words: wordCount }
    } catch (error) {
      console.error('Error processing TXT:', error)
      this.showNotification(`Error processing text file: ${error.message}`, "error")
      return null
    }
  }
  
  // Filter sound data from the file content
  filterSoundData(content, fileType) {
    if (!content) {
      console.error('No content provided for filtering')
      this.showNotification("No content to filter", "error")
      this.createDefaultAudioVisualization()
      return
    }
    
    this.showNotification("Filtering sound data...", "info")
    console.log(`Filtering sound data from ${fileType} file`)
    
    // Prepare data for API call
    const apiData = {
      fileContent: typeof content === 'string' ? content : 'Binary content',
      fileType: fileType
    }
    
    // Call the Python backend API
    fetch('http://localhost:5000/api/filter-sound', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      if (data.success) {
        // Create audio visualization with the filtered data
        this.createAudioVisualization(data.filtered_data, data.metadata)
        this.showNotification("Sound data extracted and filtered", "success")
      } else {
        console.error('Error filtering sound:', data.error)
        this.showNotification(`Error filtering sound: ${data.error}`, "error")
        
        // Create a default visualization anyway for demonstration
        this.createDefaultAudioVisualization()
      }
    })
    .catch(error => {
      console.error('API call failed:', error)
      this.showNotification(`API call failed: ${error.message}`, "error")
      
      // Create a default visualization for demonstration
      this.createDefaultAudioVisualization()
    })
  }
  
  // Create audio visualization with filtered data
  createAudioVisualization(filteredData, metadata) {
    try {
      if (!metadata) {
        console.error('Missing metadata for audio visualization')
        this.createDefaultAudioVisualization()
        return
      }
      
      // Create a simple audio visualization
      const audioContainer = document.createElement('div')
      audioContainer.className = 'audio-visualization'
      
      // Generate waveform based on actual filtered data
      const waveformHTML = this.generateWaveformFromData(filteredData)
      
      // Ensure metadata has all required fields with fallbacks
      const min_freq = metadata.min_freq || '0'
      const max_freq = metadata.max_freq || '0'
      const sample_rate = metadata.sample_rate || '0'
      const file_type = metadata.file_type ? metadata.file_type.toUpperCase() : 'UNKNOWN'
      
      audioContainer.innerHTML = `
        <h4>Sound Data Extracted</h4>
        <div class="audio-metadata">
          <span>Frequency Range: ${min_freq} - ${max_freq} Hz</span>
          <span>Sample Rate: ${sample_rate} Hz</span>
          <span>File Type: ${file_type}</span>
        </div>
        <div class="audio-waveform">
          ${waveformHTML}
        </div>
        <div class="audio-controls">
          <button class="btn btn-outline"><i class="fas fa-play"></i> Play</button>
          <button class="btn btn-outline"><i class="fas fa-pause"></i> Pause</button>
          <div class="audio-progress">
            <div class="progress-bar" style="width: 0%"></div>
          </div>
        </div>
      `
      
      // Add to the EEG visualization section
      const eegSection = document.querySelector(".eeg-visualization")
      if (!eegSection) {
        console.error('EEG visualization section not found')
        return
      }
      
      // Remove existing audio visualization if present
      const existingAudio = document.querySelector('.audio-visualization')
      if (existingAudio) {
        existingAudio.parentNode.removeChild(existingAudio)
      }
      
      eegSection.appendChild(audioContainer)
      
      // Add event listeners to buttons
      const playButton = audioContainer.querySelector('button:first-child')
      if (playButton) {
        playButton.addEventListener('click', () => {
          this.simulateAudioPlayback(audioContainer)
        })
      }
    } catch (error) {
      console.error('Error creating audio visualization:', error)
      this.showNotification(`Error creating visualization: ${error.message}`, "error")
      this.createDefaultAudioVisualization()
    }
  }
  
  // Create default audio visualization when API fails
  createDefaultAudioVisualization() {
    try {
      // Create a simple audio visualization
      const audioContainer = document.createElement('div')
      audioContainer.className = 'audio-visualization'
      audioContainer.innerHTML = `
        <h4>Sound Data Extracted (Demo Mode)</h4>
        <div class="audio-metadata">
          <span>Frequency Range: 20 - 20000 Hz</span>
          <span>Sample Rate: 44100 Hz</span>
          <span>File Type: DEMO</span>
        </div>
        <div class="audio-waveform">
          ${this.generateWaveformHTML()}
        </div>
        <div class="audio-controls">
          <button class="btn btn-outline"><i class="fas fa-play"></i> Play</button>
          <button class="btn btn-outline"><i class="fas fa-pause"></i> Pause</button>
          <div class="audio-progress">
            <div class="progress-bar" style="width: 0%"></div>
          </div>
        </div>
      `
      
      // Add to the EEG visualization section
      const eegSection = document.querySelector(".eeg-visualization")
      if (!eegSection) {
        console.error('EEG visualization section not found')
        return
      }
      
      // Remove existing audio visualization if present
      const existingAudio = document.querySelector('.audio-visualization')
      if (existingAudio) {
        existingAudio.parentNode.removeChild(existingAudio)
      }
      
      eegSection.appendChild(audioContainer)
      
      // Add event listeners to buttons
      const playButton = audioContainer.querySelector('button:first-child')
      if (playButton) {
        playButton.addEventListener('click', () => {
          this.simulateAudioPlayback(audioContainer)
        })
      }
    } catch (error) {
      console.error('Error creating default audio visualization:', error)
      this.showNotification("Error creating visualization", "error")
    }
  }
  
  // Generate waveform from actual data
  generateWaveformFromData(data) {
    let html = ''
    const maxBars = 100
    
    // If data is too large, sample it
    let sampledData = data
    if (data && data.length > maxBars) {
      const sampleRate = Math.floor(data.length / maxBars)
      sampledData = []
      for (let i = 0; i < data.length; i += sampleRate) {
        sampledData.push(data[i])
      }
    }
    
    // Handle case where data is undefined or empty
    if (!sampledData || sampledData.length === 0) {
      return this.generateWaveformHTML()
    }
    
    // Normalize data to 0-100 range for visualization
    const min = Math.min(...sampledData)
    const max = Math.max(...sampledData)
    const range = max - min
    
    // Generate bars
    for (let i = 0; i < sampledData.length && i < maxBars; i++) {
      // Normalize to 20-100% height
      const normalizedValue = range === 0 ? 50 : ((sampledData[i] - min) / range) * 80 + 20
      html += `<div class="waveform-bar" style="height: ${normalizedValue}%"></div>`
    }
    
    return html
  }
  
  // Generate HTML for a waveform visualization
  generateWaveformHTML() {
    let html = ''
    const bars = 50
    
    for (let i = 0; i < bars; i++) {
      const height = Math.random() * 80 + 20
      html += `<div class="waveform-bar" style="height: ${height}%"></div>`
    }
    
    return html
  }
  
  // Simulate audio playback
  simulateAudioPlayback(container) {
    const progressBar = container.querySelector('.progress-bar')
    let width = 0
    
    // Clear any existing intervals
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }
    if (this.waveformIntervals && this.waveformIntervals.length > 0) {
      this.waveformIntervals.forEach(interval => clearInterval(interval))
    }
    
    // Reset progress bar
    progressBar.style.width = '0%'
    
    // Animate progress bar
    this.progressInterval = setInterval(() => {
      if (width >= 100) {
        clearInterval(this.progressInterval)
      } else {
        width++
        progressBar.style.width = width + '%'
      }
    }, 100)
    
    // Animate waveform bars
    const bars = container.querySelectorAll('.waveform-bar')
    this.waveformIntervals = []
    
    bars.forEach(bar => {
      const interval = setInterval(() => {
        const height = Math.random() * 80 + 20
        bar.style.height = `${height}%`
      }, 200)
      this.waveformIntervals.push(interval)
    })
    
    // Clear all intervals after 10 seconds to prevent memory leaks
    setTimeout(() => {
      if (this.progressInterval) {
        clearInterval(this.progressInterval)
      }
      if (this.waveformIntervals && this.waveformIntervals.length > 0) {
        this.waveformIntervals.forEach(interval => clearInterval(interval))
      }
    }, 10000)
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Style notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px 20px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "1000",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
    })

    // Set background color based on type
    const colors = {
      info: "#4a6cf7",
      success: "#51cf66",
      warning: "#ffd43b",
      error: "#ff6b6b",
    }
    notification.style.backgroundColor = colors[type] || colors.info

    // Add to DOM
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new EEGDashboard()
})

// Additional utility functions
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

function generatePatientId() {
  return "PAT-" + Math.random().toString(36).substr(2, 9).toUpperCase()
}

// Simulate real-time data updates
setInterval(() => {
  // Update status indicators randomly
  const indicators = document.querySelectorAll(".status-indicator")
  indicators.forEach((indicator) => {
    const statuses = ["online", "offline", "away"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    indicator.className = `status-indicator ${randomStatus}`
  })
}, 30000) // Update every 30 seconds
