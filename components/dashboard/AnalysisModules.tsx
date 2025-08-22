"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
	Brain, 
	Activity, 
	Zap, 
	Heart, 
	AlertTriangle, 
	TrendingUp,
	Clock,
	Users,
	Pill,
	Sun,
	Glasses,
	Apple,
	BarChart3,
	Bell,
	Phone,
	BookOpen,
	Shield,
	MapPin
} from "lucide-react"

const modules = [
	{ 
		name: "Cognitive Tests", 
		description: "Assess memory, attention, and executive function",
		icon: Brain,
		color: "blue"
	},
	{ 
		name: "Sleep Analysis", 
		description: "Analyze sleep patterns and quality",
		icon: Heart,
		color: "purple"
	},
	{ 
		name: "Treatment Predictor", 
		description: "AI-powered treatment recommendations",
		icon: TrendingUp,
		color: "green"
	},
	{ 
		name: "Stress Monitor", 
		description: "Real-time stress level monitoring",
		icon: Activity,
		color: "orange"
	},
	{ 
		name: "Genetic Risk", 
		description: "Genetic predisposition analysis",
		icon: Shield,
		color: "red"
	},
	{ 
		name: "Social Metrics", 
		description: "Social interaction patterns",
		icon: Users,
		color: "pink"
	},
	{ 
		name: "Med Tracker", 
		description: "Medication adherence tracking",
		icon: Pill,
		color: "indigo"
	},
	{ 
		name: "Circadian Health", 
		description: "Biological rhythm analysis",
		icon: Sun,
		color: "yellow"
	},
	{ 
		name: "VR Therapy", 
		description: "Virtual reality therapy sessions",
		icon: Glasses,
		color: "cyan"
	},
	{ 
		name: "Nutrition Impact", 
		description: "Diet effects on brain health",
		icon: Apple,
		color: "emerald"
	},
	{ 
		name: "Peer Analysis", 
		description: "Compare with similar patients",
		icon: BarChart3,
		color: "violet"
	},
	{ 
		name: "Crisis Alert", 
		description: "Early warning system",
		icon: Bell,
		color: "rose"
	},
	{ 
		name: "Remote Consult", 
		description: "Telemedicine consultations",
		icon: Phone,
		color: "teal"
	},
	{ 
		name: "Research Portal", 
		description: "Access to clinical studies",
		icon: BookOpen,
		color: "slate"
	},
	{ 
		name: "Emergency Alert", 
		description: "Critical situation alerts",
		icon: AlertTriangle,
		color: "red"
	},
	{ 
		name: "Environment Scan", 
		description: "Environmental factor analysis",
		icon: MapPin,
		color: "lime"
	},
]

type AnalysisModuleProps = {
	selected: string
	onSelect: (name: string) => void
	analysisData?: any
}

export default function AnalysisModules({ selected, onSelect, analysisData }: AnalysisModuleProps) {
	const [activeModule, setActiveModule] = useState<string | null>(null)
	const [stressLevel, setStressLevel] = useState(65)
	const [isRunningTest, setIsRunningTest] = useState(false)
	const [testProgress, setTestProgress] = useState(0)

	// Generate dynamic data based on EEG analysis
	const generateDynamicData = (baseValue: number, variance: number = 0.2) => {
		const randomFactor = 0.8 + Math.random() * 0.4 // 0.8 to 1.2
		return Math.min(100, Math.max(0, baseValue * randomFactor))
	}

	// Simulate real-time stress monitoring
	useEffect(() => {
		if (activeModule === "Stress Monitor") {
			const interval = setInterval(() => {
				setStressLevel(prev => {
					const change = (Math.random() - 0.5) * 10
					return Math.max(0, Math.min(100, prev + change))
				})
			}, 3000)
			return () => clearInterval(interval)
		}
	}, [activeModule])

	// Simulate cognitive test progress
	useEffect(() => {
		if (isRunningTest) {
			const interval = setInterval(() => {
				setTestProgress(prev => {
					if (prev >= 100) {
						setIsRunningTest(false)
						return 100
					}
					return prev + 10
				})
			}, 500)
			return () => clearInterval(interval)
		}
	}, [isRunningTest])

	const handleModuleClick = (moduleName: string) => {
		onSelect(moduleName)
		setActiveModule(moduleName)
	}

	const startCognitiveTest = () => {
		setIsRunningTest(true)
		setTestProgress(0)
	}

	const getModuleContent = (moduleName: string) => {
		// Use analysis data to generate dynamic results
		const alphaPower = analysisData?.alphaPower || 25
		const betaPower = analysisData?.betaPower || 30
		const thetaPower = analysisData?.thetaPower || 20
		const deltaPower = analysisData?.deltaPower || 15
		const gammaPower = analysisData?.gammaPower || 10
		const anomalies = analysisData?.anomalies || 3
		const seizureRisk = analysisData?.seizureRiskPct || 15

		switch (moduleName) {
			case "Cognitive Tests":
				const memoryScore = generateDynamicData(85 - anomalies * 5)
				const attentionScore = generateDynamicData(88 - anomalies * 3)
				const workingMemoryScore = generateDynamicData(92 - anomalies * 4)
				
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-blue-700">Cognitive Assessment Results</h4>
						
						{isRunningTest ? (
							<Card>
								<CardContent className="p-6 text-center">
									<Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
									<h5 className="font-medium text-gray-700 mb-2">Running Cognitive Battery</h5>
									<div className="w-full bg-gray-200 rounded-full h-3 mb-2">
										<div 
											className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
											style={{ width: `${testProgress}%` }}
										></div>
									</div>
									<p className="text-sm text-gray-600">{testProgress}% Complete</p>
								</CardContent>
							</Card>
						) : (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Card>
										<CardContent className="p-4">
											<h5 className="font-medium text-gray-700 mb-2">Memory Test</h5>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm text-gray-600">Short-term Memory:</span>
													<span className="font-medium text-blue-600">{Math.round(memoryScore)}%</span>
												</div>
												<div className="flex justify-between">
													<span className="text-sm text-gray-600">Long-term Memory:</span>
													<span className="font-medium text-blue-600">{Math.round(memoryScore * 0.9)}%</span>
												</div>
												<div className="flex justify-between">
													<span className="text-sm text-gray-600">Working Memory:</span>
													<span className="font-medium text-blue-600">{Math.round(workingMemoryScore)}%</span>
												</div>
											</div>
										</CardContent>
									</Card>
									<Card>
										<CardContent className="p-4">
											<h5 className="font-medium text-gray-700 mb-2">Attention Test</h5>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm text-gray-600">Sustained Attention:</span>
													<span className="font-medium text-green-600">{Math.round(attentionScore)}%</span>
												</div>
												<div className="flex justify-between">
													<span className="text-sm text-gray-600">Selective Attention:</span>
													<span className="font-medium text-green-600">{Math.round(attentionScore * 0.93)}%</span>
												</div>
												<div className="flex justify-between">
													<span className="text-sm text-gray-600">Divided Attention:</span>
													<span className="font-medium text-yellow-600">{Math.round(attentionScore * 0.85)}%</span>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
								<Button 
									className="w-full bg-blue-600 hover:bg-blue-700"
									onClick={startCognitiveTest}
								>
									Run Full Cognitive Battery
								</Button>
							</>
						)}
					</div>
				)

			case "Sleep Analysis":
				const sleepEfficiency = generateDynamicData(87 - anomalies * 2)
				const remSleep = generateDynamicData(22 + thetaPower * 0.5)
				const deepSleep = generateDynamicData(15 + deltaPower * 0.8)
				
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-purple-700">Sleep Pattern Analysis</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Card>
								<CardContent className="p-4 text-center">
									<Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
									<h5 className="font-medium text-gray-700">Sleep Efficiency</h5>
									<div className="text-2xl font-bold text-purple-600">{Math.round(sleepEfficiency)}%</div>
									<p className="text-sm text-gray-500">{sleepEfficiency > 85 ? "Excellent" : sleepEfficiency > 75 ? "Good" : "Fair"}</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4 text-center">
									<Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
									<h5 className="font-medium text-gray-700">Total Sleep Time</h5>
									<div className="text-2xl font-bold text-blue-600">{(7.2 + (sleepEfficiency - 87) * 0.02).toFixed(1)}h</div>
									<p className="text-sm text-gray-500">Optimal</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4 text-center">
									<Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
									<h5 className="font-medium text-gray-700">REM Sleep</h5>
									<div className="text-2xl font-bold text-green-600">{Math.round(remSleep)}%</div>
									<p className="text-sm text-gray-500">Normal</p>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-purple-600 hover:bg-purple-700">
							View Detailed Sleep Report
						</Button>
					</div>
				)

			case "Treatment Predictor":
				const successRate = generateDynamicData(78 - anomalies * 3 + (alphaPower > 25 ? 5 : 0))
				
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-green-700">AI Treatment Recommendations</h4>
						<div className="space-y-3">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-2">
										<TrendingUp className="w-5 h-5 text-green-600" />
										<h5 className="font-medium text-gray-700">Recommended Treatment</h5>
									</div>
									<p className="text-sm text-gray-600 mb-3">
										Based on EEG analysis and cognitive assessment, we recommend:
									</p>
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-green-500 rounded-full"></div>
											<span className="text-sm">Cognitive Behavioral Therapy (CBT)</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
											<span className="text-sm">Mindfulness Meditation Training</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
											<span className="text-sm">Sleep Hygiene Optimization</span>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-2">Success Probability</h5>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div className="bg-green-600 h-2 rounded-full" style={{ width: `${successRate}%` }}></div>
									</div>
									<p className="text-sm text-gray-600 mt-1">{Math.round(successRate)}% predicted success rate</p>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-green-600 hover:bg-green-700">
							Generate Treatment Plan
						</Button>
					</div>
				)

			case "Stress Monitor":
				const dynamicStressLevel = stressLevel + (betaPower > 35 ? 10 : 0) - (alphaPower > 25 ? 5 : 0)
				const stressColor = dynamicStressLevel > 70 ? "red" : dynamicStressLevel > 40 ? "orange" : "green"
				const stressLabel = dynamicStressLevel > 70 ? "High" : dynamicStressLevel > 40 ? "Moderate" : "Low"
				
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-orange-700">Real-time Stress Monitoring</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4 text-center">
									<Activity className={`w-12 h-12 text-${stressColor}-600 mx-auto mb-3 animate-pulse`} />
									<h5 className="font-medium text-gray-700 mb-2">Current Stress Level</h5>
									<div className={`text-3xl font-bold text-${stressColor}-600 mb-2`}>{stressLabel}</div>
									<div className="w-full bg-gray-200 rounded-full h-3">
										<div 
											className={`bg-${stressColor}-500 h-3 rounded-full transition-all duration-1000`} 
											style={{ width: `${Math.min(100, Math.max(0, dynamicStressLevel))}%` }}
										></div>
									</div>
									<p className="text-sm text-gray-600 mt-2">{Math.round(dynamicStressLevel)}% stress level</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Stress Triggers</h5>
									<div className="space-y-2">
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Work pressure</span>
											<span className="text-sm font-medium text-red-600">High</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Sleep quality</span>
											<span className="text-sm font-medium text-yellow-600">Medium</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Social interactions</span>
											<span className="text-sm font-medium text-green-600">Low</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-orange-600 hover:bg-orange-700">
							Start Stress Reduction Session
						</Button>
					</div>
				)

			case "Genetic Risk":
				const depressionRisk = generateDynamicData(45 + anomalies * 5)
				const anxietyRisk = generateDynamicData(25 + anomalies * 3)
				const adhdRisk = generateDynamicData(10 + anomalies * 2)
				
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-red-700">Genetic Risk Assessment</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Shield className="w-6 h-6 text-red-600" />
										<h5 className="font-medium text-gray-700">Risk Factors</h5>
									</div>
									<div className="space-y-3">
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Depression Risk</span>
												<span className="text-sm font-medium text-red-600">{depressionRisk > 50 ? "High" : depressionRisk > 30 ? "Medium" : "Low"}</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(100, depressionRisk)}%` }}></div>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Anxiety Risk</span>
												<span className="text-sm font-medium text-yellow-600">{anxietyRisk > 40 ? "Medium" : "Low"}</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${Math.min(100, anxietyRisk)}%` }}></div>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">ADHD Risk</span>
												<span className="text-sm font-medium text-green-600">{adhdRisk > 20 ? "Low" : "Very Low"}</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, adhdRisk)}%` }}></div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Recommendations</h5>
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
											<span className="text-sm">Regular mental health screening</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-green-500 rounded-full"></div>
											<span className="text-sm">Lifestyle modifications</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
											<span className="text-sm">Preventive therapy sessions</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-red-600 hover:bg-red-700">
							Schedule Genetic Counseling
						</Button>
					</div>
				)

			case "Social Metrics":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-pink-700">Social Interaction Analysis</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Users className="w-6 h-6 text-pink-600" />
										<h5 className="font-medium text-gray-700">Social Engagement</h5>
									</div>
									<div className="space-y-3">
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Daily Interactions</span>
												<span className="text-sm font-medium text-green-600">Good</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Social Support</span>
												<span className="text-sm font-medium text-blue-600">Strong</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Communication Skills</span>
												<span className="text-sm font-medium text-purple-600">Excellent</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Social Network</h5>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Close Friends</span>
											<span className="text-sm font-medium text-pink-600">8</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Family Members</span>
											<span className="text-sm font-medium text-pink-600">5</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Colleagues</span>
											<span className="text-sm font-medium text-pink-600">12</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Support Groups</span>
											<span className="text-sm font-medium text-pink-600">2</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-pink-600 hover:bg-pink-700">
							View Social Network Map
						</Button>
					</div>
				)

			case "Med Tracker":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-indigo-700">Medication Adherence Tracking</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Pill className="w-6 h-6 text-indigo-600" />
										<h5 className="font-medium text-gray-700">Current Medications</h5>
									</div>
									<div className="space-y-3">
										<div className="p-3 border rounded-lg">
											<div className="flex justify-between items-center mb-2">
												<span className="font-medium text-gray-700">Sertraline</span>
												<span className="text-sm text-green-600">✓ Taken</span>
											</div>
											<div className="text-sm text-gray-600">50mg - Daily (Morning)</div>
											<div className="text-xs text-gray-500 mt-1">Last taken: Today 8:30 AM</div>
										</div>
										<div className="p-3 border rounded-lg">
											<div className="flex justify-between items-center mb-2">
												<span className="font-medium text-gray-700">Melatonin</span>
												<span className="text-sm text-yellow-600">⏰ Due</span>
											</div>
											<div className="text-sm text-gray-600">3mg - Daily (Evening)</div>
											<div className="text-xs text-gray-500 mt-1">Due: Today 9:00 PM</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Adherence Statistics</h5>
									<div className="space-y-4">
										<div className="text-center">
											<div className="text-3xl font-bold text-indigo-600 mb-1">94%</div>
											<div className="text-sm text-gray-600">This Week</div>
										</div>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">This Month:</span>
												<span className="text-sm font-medium text-green-600">91%</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Last Month:</span>
												<span className="text-sm font-medium text-blue-600">88%</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Missed Doses:</span>
												<span className="text-sm font-medium text-red-600">2</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-indigo-600 hover:bg-indigo-700">
							Log Medication Taken
						</Button>
					</div>
				)

			case "Circadian Health":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-yellow-700">Biological Rhythm Analysis</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Sun className="w-6 h-6 text-yellow-600" />
										<h5 className="font-medium text-gray-700">Sleep-Wake Cycle</h5>
									</div>
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Bedtime</span>
											<span className="text-sm font-medium text-blue-600">10:30 PM</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Wake Time</span>
											<span className="text-sm font-medium text-green-600">6:45 AM</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Sleep Duration</span>
											<span className="text-sm font-medium text-purple-600">8h 15m</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Sleep Quality</span>
											<span className="text-sm font-medium text-green-600">Good</span>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Circadian Rhythm Score</h5>
									<div className="text-center mb-4">
										<div className="text-3xl font-bold text-yellow-600 mb-1">82/100</div>
										<div className="text-sm text-gray-600">Excellent Rhythm</div>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-sm text-gray-600">Consistency:</span>
											<span className="text-sm font-medium text-green-600">85%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm text-gray-600">Energy Levels:</span>
											<span className="text-sm font-medium text-blue-600">78%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm text-gray-600">Mood Stability:</span>
											<span className="text-sm font-medium text-purple-600">80%</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-yellow-600 hover:bg-yellow-700">
							Optimize Sleep Schedule
						</Button>
					</div>
				)

			case "VR Therapy":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-cyan-700">Virtual Reality Therapy Sessions</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Glasses className="w-6 h-6 text-cyan-600" />
										<h5 className="font-medium text-gray-700">Available Sessions</h5>
									</div>
									<div className="space-y-3">
										<div className="p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
											<div className="font-medium text-gray-700 mb-1">Anxiety Relief</div>
											<div className="text-sm text-gray-600 mb-2">Calming beach environment</div>
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-500">Duration: 15 min</span>
												<Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">Start</Button>
											</div>
										</div>
										<div className="p-3 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
											<div className="font-medium text-gray-700 mb-1">Stress Reduction</div>
											<div className="text-sm text-gray-600 mb-2">Forest meditation walk</div>
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-500">Duration: 20 min</span>
												<Button size="sm" className="bg-green-600 hover:bg-green-700">Start</Button>
											</div>
										</div>
										<div className="p-3 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
											<div className="font-medium text-gray-700 mb-1">Exposure Therapy</div>
											<div className="text-sm text-gray-600 mb-2">Gradual social scenarios</div>
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-500">Duration: 25 min</span>
												<Button size="sm" className="bg-purple-600 hover:bg-purple-700">Start</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Session Progress</h5>
									<div className="space-y-4">
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">This Week</span>
												<span className="text-sm font-medium text-cyan-600">3/5</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Total Sessions</span>
												<span className="text-sm font-medium text-blue-600">24</span>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Success Rate</span>
												<span className="text-sm font-medium text-green-600">87%</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-cyan-600 hover:bg-cyan-700">
							Schedule VR Session
						</Button>
					</div>
				)

			case "Nutrition Impact":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-emerald-700">Diet Effects on Brain Health</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Apple className="w-6 h-6 text-emerald-600" />
										<h5 className="font-medium text-gray-700">Nutrition Score</h5>
									</div>
									<div className="text-center mb-4">
										<div className="text-3xl font-bold text-emerald-600 mb-1">76/100</div>
										<div className="text-sm text-gray-600">Good Nutrition</div>
									</div>
									<div className="space-y-3">
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Omega-3 Intake</span>
												<span className="text-sm font-medium text-green-600">Good</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Antioxidants</span>
												<span className="text-sm font-medium text-yellow-600">Fair</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
											</div>
										</div>
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">B Vitamins</span>
												<span className="text-sm font-medium text-green-600">Excellent</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Recommendations</h5>
									<div className="space-y-3">
										<div className="p-2 bg-green-50 border border-green-200 rounded">
											<div className="font-medium text-green-700 mb-1">✓ Increase</div>
											<div className="text-sm text-green-600">Fatty fish, nuts, leafy greens</div>
										</div>
										<div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
											<div className="font-medium text-yellow-700 mb-1">⚠ Moderate</div>
											<div className="text-sm text-yellow-600">Processed foods, caffeine</div>
										</div>
										<div className="p-2 bg-red-50 border border-red-200 rounded">
											<div className="font-medium text-red-700 mb-1">✗ Avoid</div>
											<div className="text-sm text-red-600">Excessive sugar, alcohol</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-emerald-600 hover:bg-emerald-700">
							Generate Meal Plan
						</Button>
					</div>
				)

			case "Peer Analysis":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-violet-700">Compare with Similar Patients</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<BarChart3 className="w-6 h-6 text-violet-600" />
										<h5 className="font-medium text-gray-700">Peer Comparison</h5>
									</div>
									<div className="space-y-4">
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Your Score</span>
												<span className="text-sm font-medium text-violet-600">78%</span>
											</div>
											<div className="flex justify-between mb-1">
												<span className="text-sm text-gray-600">Peer Average</span>
												<span className="text-sm font-medium text-gray-600">72%</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-violet-500 h-2 rounded-full" style={{ width: '78%' }}></div>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											<div className="text-center p-2 bg-green-50 rounded">
												<div className="text-lg font-bold text-green-600">+6%</div>
												<div className="text-xs text-green-600">Above Average</div>
											</div>
											<div className="text-center p-2 bg-blue-50 rounded">
												<div className="text-lg font-bold text-blue-600">85th</div>
												<div className="text-xs text-blue-600">Percentile</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Similar Cases</h5>
									<div className="space-y-3">
										<div className="p-2 border rounded">
											<div className="flex justify-between items-center mb-1">
												<span className="text-sm font-medium text-gray-700">Case #1247</span>
												<span className="text-xs text-green-600">95% Match</span>
											</div>
											<div className="text-xs text-gray-600">Age 28, Similar symptoms, Good recovery</div>
										</div>
										<div className="p-2 border rounded">
											<div className="flex justify-between items-center mb-1">
												<span className="text-sm font-medium text-gray-700">Case #0893</span>
												<span className="text-xs text-blue-600">87% Match</span>
											</div>
											<div className="text-xs text-gray-600">Age 31, Similar treatment, Positive outcome</div>
										</div>
										<div className="p-2 border rounded">
											<div className="flex justify-between items-center mb-1">
												<span className="text-sm font-medium text-gray-700">Case #2156</span>
												<span className="text-xs text-yellow-600">82% Match</span>
											</div>
											<div className="text-xs text-gray-600">Age 26, Similar background, Successful therapy</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-violet-600 hover:bg-violet-700">
							View Detailed Comparison
						</Button>
					</div>
				)

			case "Crisis Alert":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-rose-700">Early Warning System</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Bell className="w-6 h-6 text-rose-600" />
										<h5 className="font-medium text-gray-700">Risk Assessment</h5>
									</div>
									<div className="space-y-4">
										<div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
											<div className="text-2xl font-bold text-green-600 mb-1">LOW RISK</div>
											<div className="text-sm text-green-600">No immediate concerns detected</div>
										</div>
										<div className="space-y-3">
											<div>
												<div className="flex justify-between mb-1">
													<span className="text-sm text-gray-600">Suicide Risk</span>
													<span className="text-sm font-medium text-green-600">Very Low</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div>
												</div>
											</div>
											<div>
												<div className="flex justify-between mb-1">
													<span className="text-sm text-gray-600">Self-Harm Risk</span>
													<span className="text-sm font-medium text-green-600">Very Low</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div className="bg-green-500 h-2 rounded-full" style={{ width: '3%' }}></div>
												</div>
											</div>
											<div>
												<div className="flex justify-between mb-1">
													<span className="text-sm text-gray-600">Crisis Indicators</span>
													<span className="text-sm font-medium text-green-600">None</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Safety Measures</h5>
									<div className="space-y-3">
										<div className="flex items-center gap-3 p-2 bg-green-50 rounded">
											<div className="w-3 h-3 bg-green-500 rounded-full"></div>
											<span className="text-sm text-green-700">24/7 Crisis Hotline Available</span>
										</div>
										<div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
											<span className="text-sm text-blue-700">Emergency Contact Notified</span>
										</div>
										<div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
											<div className="w-3 h-3 bg-purple-500 rounded-full"></div>
											<span className="text-sm text-purple-700">Therapist Alert System Active</span>
										</div>
										<div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
											<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
											<span className="text-sm text-yellow-700">Weekly Safety Check-ins</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-rose-600 hover:bg-rose-700">
							Contact Crisis Support
						</Button>
					</div>
				)

			case "Remote Consult":
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-teal-700">Telemedicine Consultations</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-4">
									<div className="flex items-center gap-3 mb-3">
										<Phone className="w-6 h-6 text-teal-600" />
										<h5 className="font-medium text-gray-700">Upcoming Sessions</h5>
									</div>
									<div className="space-y-3">
										<div className="p-3 border rounded-lg bg-gradient-to-r from-teal-50 to-blue-50">
											<div className="flex justify-between items-start mb-2">
												<div>
													<div className="font-medium text-gray-700">Dr. Sarah Chen</div>
													<div className="text-sm text-gray-600">Psychiatrist</div>
												</div>
												<span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">Today</span>
											</div>
											<div className="text-sm text-gray-600 mb-2">Follow-up consultation</div>
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-500">2:30 PM - 3:15 PM</span>
												<Button size="sm" className="bg-teal-600 hover:bg-teal-700">Join</Button>
											</div>
										</div>
										<div className="p-3 border rounded-lg">
											<div className="flex justify-between items-start mb-2">
												<div>
													<div className="font-medium text-gray-700">Dr. Michael Rodriguez</div>
													<div className="text-sm text-gray-600">Therapist</div>
												</div>
												<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Tomorrow</span>
											</div>
											<div className="text-sm text-gray-600 mb-2">Cognitive behavioral therapy</div>
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-500">10:00 AM - 11:00 AM</span>
												<Button size="sm" variant="outline">Reschedule</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h5 className="font-medium text-gray-700 mb-3">Consultation History</h5>
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">This Month</span>
											<span className="text-sm font-medium text-teal-600">4 sessions</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Attendance Rate</span>
											<span className="text-sm font-medium text-green-600">100%</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Average Duration</span>
											<span className="text-sm font-medium text-blue-600">45 min</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">Satisfaction Score</span>
											<span className="text-sm font-medium text-purple-600">4.8/5</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Button className="w-full bg-teal-600 hover:bg-teal-700">
							Schedule New Consultation
						</Button>
					</div>
				)

			default:
				return (
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-gray-700">{moduleName} Analysis</h4>
						<Card>
							<CardContent className="p-6 text-center">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Brain className="w-8 h-8 text-gray-400" />
								</div>
								<h5 className="font-medium text-gray-700 mb-2">{moduleName} Module</h5>
								<p className="text-sm text-gray-500 mb-4">
									This module is currently under development. Advanced analysis features will be available soon.
								</p>
								<Button variant="outline" className="w-full">
									Coming Soon
								</Button>
							</CardContent>
						</Card>
					</div>
				)
		}
	}

	return (
		<div className="space-y-6">
			{/* Module Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{modules.map((module) => {
					const IconComponent = module.icon
					const isSelected = selected === module.name
					
					return (
						<button
							key={module.name}
							onClick={() => handleModuleClick(module.name)}
							className={`p-4 rounded-lg border text-left transition-all hover:shadow-md ${
								isSelected 
									? "bg-blue-50 border-blue-300 shadow-md" 
									: "bg-white hover:bg-gray-50 border-gray-200"
							}`}
						>
							<div className="flex items-center gap-3 mb-2">
								<IconComponent className="w-5 h-5 text-blue-600" />
								<div className="text-sm font-medium text-gray-700">{module.name}</div>
							</div>
							<div className="text-xs text-gray-500">{module.description}</div>
						</button>
					)
				})}
			</div>

			{/* Active Module Content */}
			{activeModule && (
				<Card>
					<CardContent className="p-6">
						{getModuleContent(activeModule)}
					</CardContent>
				</Card>
			)}
		</div>
	)
}


