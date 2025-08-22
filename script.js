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
    // Patient selection
    document.querySelectorAll(".patient-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        this.selectPatient(e.currentTarget)
      })
    })

    // Search functionality
    const searchInput = document.querySelector(".search-input")
    searchInput.addEventListener("input", (e) => {
      this.searchPatients(e.target.value)
    })

    // Action buttons
    document.querySelector(".btn-primary").addEventListener("click", () => {
      this.generateReport()
    })

    document.querySelector(".btn-success").addEventListener("click", () => {
      this.exportEEG()
    })

    document.querySelector(".btn-danger").addEventListener("click", () => {
      this.triggerEmergencyAlert()
    })

    // EEG section buttons
    document.querySelector(".btn-outline").addEventListener("click", () => {
      this.uploadData()
    })

    document.querySelectorAll(".btn-primary")[1].addEventListener("click", () => {
      this.runAIAnalysis()
    })

    // Module cards
    document.querySelectorAll(".module-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        this.openModule(e.currentTarget)
      })
    })
  }

  selectPatient(patientElement) {
    // Remove active class from all patients
    document.querySelectorAll(".patient-item").forEach((item) => {
      item.classList.remove("active")
    })

    // Add active class to selected patient
    patientElement.classList.add("active")

    // Get patient data
    const patientName = patientElement.querySelector("h4").textContent
    const patientInfo = patientElement.querySelector("p").textContent

    // Update main content
    this.updatePatientDetails(patientName, patientInfo)
  }

  updatePatientDetails(name, info) {
    const [age, gender] = info.split(", ")
    document.querySelector(".patient-header h2").textContent = name

    const metaElements = document.querySelectorAll(".patient-meta span")
    metaElements[0].textContent = `Age: ${age}`
    metaElements[1].textContent = `Gender: ${gender}`

    // Simulate last checkup date
    const lastCheckup = this.generateRandomDate()
    metaElements[2].textContent = `Last Checkup: ${lastCheckup}`
  }

  searchPatients(query) {
    const patients = document.querySelectorAll(".patient-item")
    patients.forEach((patient) => {
      const name = patient.querySelector("h4").textContent.toLowerCase()
      const info = patient.querySelector("p").textContent.toLowerCase()

      if (name.includes(query.toLowerCase()) || info.includes(query.toLowerCase())) {
        patient.style.display = "flex"
      } else {
        patient.style.display = "none"
      }
    })
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
    input.accept = ".edf,.csv,.txt"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        this.processEEGFile(file)
      }
    }
    input.click()
  }

  processEEGFile(file) {
    this.showNotification(`Processing ${file.name}...`, "info")

    // Simulate file processing
    setTimeout(() => {
      this.displayEEGVisualization()
      this.showNotification("EEG data loaded successfully!", "success")
    }, 3000)
  }

  displayEEGVisualization() {
    const placeholder = document.querySelector(".eeg-placeholder")
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
  }

  drawEEGSignal() {
    const canvas = document.getElementById("eegCanvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
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
  }

  runAIAnalysis() {
    this.showNotification("Running AI analysis on EEG data...", "info")

    // Simulate AI analysis
    setTimeout(() => {
      this.showAnalysisResults()
      this.showNotification("AI analysis completed!", "success")
    }, 4000)
  }

  showAnalysisResults() {
    const results = {
      "Anomaly Detection": "2 anomalies detected",
      "Sleep Stages": "REM: 23%, Deep: 18%, Light: 59%",
      "Seizure Risk": "Low (12%)",
      "Cognitive Load": "Moderate",
      "Stress Level": "Elevated",
    }

    let resultsHTML = '<div class="analysis-results"><h4>AI Analysis Results:</h4>'
    for (const [key, value] of Object.entries(results)) {
      resultsHTML += `<div class="result-item"><strong>${key}:</strong> ${value}</div>`
    }
    resultsHTML += "</div>"

    // Add results to EEG section
    const eegSection = document.querySelector(".eeg-visualization")
    eegSection.innerHTML += resultsHTML
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
