"use client"

import { useMemo, useState } from "react"
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FileUploader from "@/components/dashboard/FileUploader"
import EEGVisualizer from "@/components/dashboard/EEGVisualizer"
import AnalysisModules from "@/components/dashboard/AnalysisModules"
import { parseCSV, parseEDF, parseTXT, parseDOCX, parsePDF, parseXLSX } from "@/lib/parsers"
import { runBasicAnalysis, type AnalysisResult } from "@/lib/analysis"
import { bandpass } from "@/lib/signal"
import { Activity, Brain, Heart, Zap, AlertTriangle, TrendingUp } from "lucide-react"

type Patient = { id: number; name: string; age: number; gender: string; status: "online" | "offline" | "away" }

const cohort: Patient[] = [
	{ id: 1, name: "Rudra Kathoke", age: 28, gender: "Male", status: "online" },
	{ id: 2, name: "Om Singh", age: 45, gender: "Male", status: "offline" },
	{ id: 3, name: "Samrudhi Madankar", age: 34, gender: "Female", status: "online" },
	{ id: 4, name: "Esha Ghosh", age: 22, gender: "Female", status: "online" },
	{ id: 5, name: "Gunika Bhutani", age: 26, gender: "Female", status: "offline" },
]

export default function Dashboard() {
	const [selectedId, setSelectedId] = useState<number>(cohort[0].id)
	const [search, setSearch] = useState("")
	const [selectedModule, setSelectedModule] = useState("Environment Scan")
	const [samples, setSamples] = useState<number[] | undefined>(undefined)
	const [sampleRate, setSampleRate] = useState<number | undefined>(256)
	const [filterOn, setFilterOn] = useState(true)
	const [lowHz, setLowHz] = useState(0.5)
	const [highHz, setHighHz] = useState(40)
	const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
	const [uploadInfo, setUploadInfo] = useState<{ fileName: string; type: string; dataPreview?: string } | null>(null)
	const [isAnalyzing, setIsAnalyzing] = useState(false)

	const selectedPatient = useMemo(() => cohort.find((p) => p.id === selectedId)!, [selectedId])

	async function onUploaded(payload: { fileName: string; type: string }) {
		setUploadInfo(payload)
	}

	async function handleFileObject(file: File) {
		const ext = file.name.split(".").pop()?.toLowerCase()
		if (!ext) return
		
		try {
			let parsed: any
			if (ext === "csv") {
				parsed = await parseCSV(file)
			} else if (ext === "txt") {
				parsed = await parseTXT(file)
			} else if (ext === "edf") {
				parsed = await parseEDF(file)
			} else if (ext === "pdf") {
				parsed = await parsePDF(file)
			} else if (ext === "docx") {
				parsed = await parseDOCX(file)
			} else if (ext === "xlsx") {
				parsed = await parseXLSX(file)
			} else {
				return
			}

			if (parsed.samples && parsed.samples.length > 0) {
				setSamples(parsed.samples)
				setSampleRate(parsed.sampleRate || 256)
			}
			setUploadInfo({ 
				fileName: file.name, 
				type: ext, 
				dataPreview: parsed.dataPreview || parsed.textPreview 
			})
		} catch (error) {
			console.error("Error parsing file:", error)
			alert("Error parsing file. Please try again.")
		}
	}

	async function onRunAnalysis() {
		if (!samples || samples.length === 0) return
		
		setIsAnalyzing(true)
		try {
			// Simulate analysis delay
			await new Promise(resolve => setTimeout(resolve, 2000))
			const result = await runBasicAnalysis(samples)
			setAnalysis(result)
		} finally {
			setIsAnalyzing(false)
		}
	}

	const filteredData = useMemo(() => {
		if (!samples || !filterOn) return samples
		return bandpass(samples, sampleRate ?? 256, lowHz, highHz)
	}, [samples, filterOn, lowHz, highHz, sampleRate])

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar
				patients={cohort}
				selectedId={selectedId}
				onSelect={setSelectedId}
				searchTerm={search}
				onSearch={setSearch}
			/>
			<div className="flex-1 flex flex-col">
				<Navbar userName="Dr. Arya Sharma" role="Clinician" />
				
				{/* Patient Header */}
				<div className="bg-white border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
							<div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
								<span>Age: {selectedPatient.age}</span>
								<span>Gender: {selectedPatient.gender}</span>
								<span>Last Checkup: 2023-10-15</span>
								<span className={`flex items-center gap-1 ${
									selectedPatient.status === "online" ? "text-green-600" : 
									selectedPatient.status === "away" ? "text-yellow-600" : "text-red-600"
								}`}>
									<div className={`w-2 h-2 rounded-full ${
										selectedPatient.status === "online" ? "bg-green-500" : 
										selectedPatient.status === "away" ? "bg-yellow-500" : "bg-red-500"
									}`} />
									{selectedPatient.status}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Button 
								variant="outline" 
								size="sm"
								onClick={() => {
									if (analysis) {
										const report = `AuraMind EEG Analysis Report
Patient: ${selectedPatient.name}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

ANALYSIS RESULTS:
- Anomalies Detected: ${analysis.anomalies}
- Seizure Risk: ${analysis.seizureRiskPct}%
- Cognitive Load: ${analysis.cognitiveLoad}
- Stress Level: ${analysis.stressLevel}
- Schizophrenia Risk: ${analysis.schizophreniaRisk}% (${analysis.schizophreniaRiskLevel})

POWER SPECTRUM:
- Alpha Power: ${analysis.alphaPower}%
- Beta Power: ${analysis.betaPower}%
- Theta Power: ${analysis.thetaPower}%
- Delta Power: ${analysis.deltaPower}%
- Gamma Power: ${analysis.gammaPower}%

SLEEP STAGES:
- REM: ${analysis.sleepStages.rem}%
- Deep: ${analysis.sleepStages.deep}%
- Light: ${analysis.sleepStages.light}%

SIGNAL QUALITY:
- Coherence: ${analysis.coherence}%
- Hemispheric Asymmetry: ${analysis.asymmetry}%

RECOMMENDATIONS:
${analysis.schizophreniaRisk > 50 ? '- IMMEDIATE: Schedule psychiatric evaluation' : ''}
${analysis.schizophreniaRisk > 25 ? '- MONITOR: Regular follow-up appointments recommended' : ''}
- Continue current treatment plan
- Monitor for any behavioral changes
- Maintain regular sleep schedule

Generated by AuraMind - Schizophrenia Detection, Simplified`
										
										const blob = new Blob([report], { type: 'text/plain' })
										const url = URL.createObjectURL(blob)
										const a = document.createElement('a')
										a.href = url
										a.download = `EEG_Report_${selectedPatient.name}_${new Date().toISOString().split('T')[0]}.txt`
										document.body.appendChild(a)
										a.click()
										document.body.removeChild(a)
										URL.revokeObjectURL(url)
									}
								}}
								disabled={!analysis}
							>
								Generate Report
							</Button>
							<Button 
								variant="outline" 
								size="sm" 
								className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
								onClick={() => {
									if (samples && samples.length > 0) {
										const csvData = samples.map((sample, index) => `${index},${sample}`).join('\n')
										const csvContent = `Sample Index,Amplitude\n${csvData}`
										const blob = new Blob([csvContent], { type: 'text/csv' })
										const url = URL.createObjectURL(blob)
										const a = document.createElement('a')
										a.href = url
										a.download = `EEG_Data_${selectedPatient.name}_${new Date().toISOString().split('T')[0]}.csv`
										document.body.appendChild(a)
										a.click()
										document.body.removeChild(a)
										URL.revokeObjectURL(url)
									}
								}}
								disabled={!samples || samples.length === 0}
							>
								Export EEG
							</Button>
							<Button variant="destructive" size="sm">Emergency Alert</Button>
						</div>
					</div>
				</div>

				<div className="flex-1 p-6 overflow-y-auto">
					{/* EEG Signal Visualization */}
					<Card className="mb-6">
						<CardContent className="p-6 space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold">EEG Signal Visualization</h3>
								<div className="flex items-center gap-3">
									<FileUploader onFile={handleFileObject} />
									<Button 
										onClick={onRunAnalysis} 
										size="sm" 
										disabled={!samples || isAnalyzing}
										className="min-w-[120px]"
									>
										{isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
									</Button>
								</div>
							</div>
							
							{/* Filter Controls */}
							<div className="flex items-center gap-3 text-sm bg-gray-50 p-3 rounded-lg">
								<label className="inline-flex items-center gap-2">
									<input 
										type="checkbox" 
										checked={filterOn} 
										onChange={(e) => setFilterOn(e.target.checked)} 
									/>
									<span className="text-gray-700">Band-pass Filter</span>
								</label>
								<label className="inline-flex items-center gap-2">
									<span>Low (Hz)</span>
									<input 
										className="w-20 border rounded px-2 py-1" 
										type="number" 
										step="0.1" 
										value={lowHz} 
										onChange={(e) => setLowHz(parseFloat(e.target.value) || 0.5)} 
									/>
								</label>
								<label className="inline-flex items-center gap-2">
									<span>High (Hz)</span>
									<input 
										className="w-20 border rounded px-2 py-1" 
										type="number" 
										step="0.1" 
										value={highHz} 
										onChange={(e) => setHighHz(parseFloat(e.target.value) || 40)} 
									/>
								</label>
								<span className="text-gray-500">Sample Rate: {sampleRate ?? 256} Hz</span>
							</div>
							
							<EEGVisualizer data={filteredData} />
							
							{/* Upload Info */}
							{uploadInfo && (
								<div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
									<strong>Uploaded:</strong> {uploadInfo.fileName} ({uploadInfo.type})
									{uploadInfo.dataPreview && (
										<pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap bg-white p-2 rounded border text-xs">
											{uploadInfo.dataPreview}
										</pre>
									)}
								</div>
							)}
						</CardContent>
					</Card>

					{/* Analysis Results */}
					{analysis && (
						<Card className="mb-6">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
									<Brain className="w-5 h-5 text-blue-600" />
									AI Analysis Results
								</h3>
								
								{/* Primary Metrics */}
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
									<div className="p-4 rounded-lg border bg-gradient-to-br from-red-50 to-red-100 border-red-200">
										<div className="flex items-center gap-2 mb-2">
											<AlertTriangle className="w-4 h-4 text-red-600" />
											<span className="font-medium text-red-800">Anomalies</span>
										</div>
										<div className="text-2xl font-bold text-red-700">{analysis.anomalies}</div>
									</div>
									
									<div className="p-4 rounded-lg border bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
										<div className="flex items-center gap-2 mb-2">
											<Zap className="w-4 h-4 text-orange-600" />
											<span className="font-medium text-orange-800">Seizure Risk</span>
										</div>
										<div className="text-2xl font-bold text-orange-700">{analysis.seizureRiskPct}%</div>
									</div>
									
									<div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
										<div className="flex items-center gap-2 mb-2">
											<Brain className="w-4 h-4 text-blue-600" />
											<span className="font-medium text-blue-800">Cognitive Load</span>
										</div>
										<div className="text-lg font-bold text-blue-700">{analysis.cognitiveLoad}</div>
									</div>
									
									<div className="p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
										<div className="flex items-center gap-2 mb-2">
											<Activity className="w-4 h-4 text-purple-600" />
											<span className="font-medium text-purple-800">Stress Level</span>
										</div>
										<div className="text-lg font-bold text-purple-700">{analysis.stressLevel}</div>
									</div>
									
									<div className="p-4 rounded-lg border bg-gradient-to-br from-green-50 to-green-100 border-green-200">
										<div className="flex items-center gap-2 mb-2">
											<Heart className="w-4 h-4 text-green-600" />
											<span className="font-medium text-green-800">Sleep Stages</span>
										</div>
										<div className="space-y-1 text-sm">
											<div className="flex justify-between">
												<span>REM:</span>
												<span className="font-medium">{analysis.sleepStages.rem}%</span>
											</div>
											<div className="flex justify-between">
												<span>Deep:</span>
												<span className="font-medium">{analysis.sleepStages.deep}%</span>
											</div>
											<div className="flex justify-between">
												<span>Light:</span>
												<span className="font-medium">{analysis.sleepStages.light}%</span>
											</div>
										</div>
									</div>
									
									<div className="p-4 rounded-lg border bg-gradient-to-br from-red-50 to-red-100 border-red-200">
										<div className="flex items-center gap-2 mb-2">
											<AlertTriangle className="w-4 h-4 text-red-600" />
											<span className="font-medium text-red-800">Schizophrenia Risk</span>
										</div>
										<div className="text-2xl font-bold text-red-700 mb-1">{analysis.schizophreniaRisk}%</div>
										<div className="text-sm text-red-600 font-medium">{analysis.schizophreniaRiskLevel}</div>
										<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
											<div 
												className={`h-2 rounded-full ${
													analysis.schizophreniaRisk < 25 ? "bg-green-500" :
													analysis.schizophreniaRisk < 50 ? "bg-yellow-500" :
													analysis.schizophreniaRisk < 75 ? "bg-orange-500" : "bg-red-500"
												}`} 
												style={{ width: `${analysis.schizophreniaRisk}%` }}
											></div>
										</div>
									</div>
								</div>

								{/* Power Spectrum */}
								<div className="mb-6">
									<h4 className="text-md font-semibold mb-3 text-gray-700">Power Spectrum Analysis</h4>
									<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
										<div className="p-3 rounded-lg border bg-indigo-50 border-indigo-200">
											<div className="text-xs text-indigo-600 font-medium mb-1">Alpha (8-13 Hz)</div>
											<div className="text-lg font-bold text-indigo-700">{analysis.alphaPower}%</div>
										</div>
										<div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
											<div className="text-xs text-blue-600 font-medium mb-1">Beta (13-30 Hz)</div>
											<div className="text-lg font-bold text-blue-700">{analysis.betaPower}%</div>
										</div>
										<div className="p-3 rounded-lg border bg-green-50 border-green-200">
											<div className="text-xs text-green-600 font-medium mb-1">Theta (4-8 Hz)</div>
											<div className="text-lg font-bold text-green-700">{analysis.thetaPower}%</div>
										</div>
										<div className="p-3 rounded-lg border bg-yellow-50 border-yellow-200">
											<div className="text-xs text-yellow-600 font-medium mb-1">Delta (0.5-4 Hz)</div>
											<div className="text-lg font-bold text-yellow-700">{analysis.deltaPower}%</div>
										</div>
										<div className="p-3 rounded-lg border bg-red-50 border-red-200">
											<div className="text-xs text-red-600 font-medium mb-1">Gamma (30-100 Hz)</div>
											<div className="text-lg font-bold text-red-700">{analysis.gammaPower}%</div>
										</div>
									</div>
								</div>

								{/* Additional Metrics */}
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									<div className="p-3 rounded-lg border bg-teal-50 border-teal-200">
										<div className="text-xs text-teal-600 font-medium mb-1">Signal Coherence</div>
										<div className="text-lg font-bold text-teal-700">{analysis.coherence}%</div>
									</div>
									<div className="p-3 rounded-lg border bg-pink-50 border-pink-200">
										<div className="text-xs text-pink-600 font-medium mb-1">Hemispheric Asymmetry</div>
										<div className="text-lg font-bold text-pink-700">{analysis.asymmetry}%</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Advanced Analysis Modules */}
					<Card>
						<CardContent className="p-6">
							<h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
								<TrendingUp className="w-5 h-5 text-blue-600" />
								Advanced Analysis Modules
							</h3>
							<AnalysisModules selected={selectedModule} onSelect={setSelectedModule} analysisData={analysis} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
