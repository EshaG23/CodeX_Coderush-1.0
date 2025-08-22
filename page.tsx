"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Play, FileText, Download, AlertTriangle, User } from "lucide-react"

const patients = [
  { id: 1, name: "Rudra Kathoke", age: 28, gender: "Male", status: "online" },
  { id: 2, name: "Om Singh", age: 45, gender: "Male", status: "offline" },
  { id: 3, name: "Samrudhi Madankar", age: 34, gender: "Female", status: "online" },
  { id: 4, name: "Esha Ghosh", age: 22, gender: "Female", status: "online" },
  { id: 5, name: "Gunika Bhutani", age: 26, gender: "Female", status: "offline" },
]

const analysisModules = [
  { name: "Cognitive Tests", icon: "📋", color: "bg-blue-50 hover:bg-blue-100" },
  { name: "Sleep Analysis", icon: "🌙", color: "bg-purple-50 hover:bg-purple-100" },
  { name: "Treatment Predictor", icon: "🛡️", color: "bg-green-50 hover:bg-green-100" },
  { name: "Stress Monitor", icon: "📈", color: "bg-red-50 hover:bg-red-100" },
  { name: "Genetic Risk", icon: "🧬", color: "bg-orange-50 hover:bg-orange-100" },
  { name: "Social Metrics", icon: "👥", color: "bg-teal-50 hover:bg-teal-100" },
  { name: "Med Tracker", icon: "💊", color: "bg-indigo-50 hover:bg-indigo-100" },
  { name: "Circadian Health", icon: "☀️", color: "bg-yellow-50 hover:bg-yellow-100" },
  { name: "VR Therapy", icon: "🥽", color: "bg-pink-50 hover:bg-pink-100" },
  { name: "Nutrition Impact", icon: "❤️", color: "bg-rose-50 hover:bg-rose-100" },
  { name: "Peer Analysis", icon: "📊", color: "bg-cyan-50 hover:bg-cyan-100" },
  { name: "Crisis Alert", icon: "⚠️", color: "bg-red-50 hover:bg-red-100" },
  { name: "Remote Consult", icon: "📹", color: "bg-blue-50 hover:bg-blue-100" },
  { name: "Research Portal", icon: "🔬", color: "bg-purple-50 hover:bg-purple-100" },
  { name: "Emergency Alert", icon: "🚨", color: "bg-red-50 hover:bg-red-100" },
  { name: "Environment Scan", icon: "📋", color: "bg-blue-100 border-2 border-blue-300" },
]

export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState("Environment Scan")

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-blue-900 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-blue-800">
          <h2 className="text-xl font-semibold mb-4">Patient Cohort</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-blue-800 border-blue-700 text-white placeholder-blue-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`p-4 border-b border-blue-800 cursor-pointer transition-colors ${
                selectedPatient.id === patient.id ? "bg-blue-800" : "hover:bg-blue-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-blue-300">
                      {patient.age}, {patient.gender}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${patient.status === "online" ? "bg-green-400" : "bg-red-400"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">AuraMind: EEG Analysis Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Dr. Arya Sharma</span>
              <Badge variant="secondary">Clinician</Badge>
            </div>
          </div>
        </header>

        {/* Patient Details */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
              <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                <span>Age: {selectedPatient.age}</span>
                <span>Gender: {selectedPatient.gender}</span>
                <span>Last Checkup: 2023-10-15</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export EEG
              </Button>
              <Button variant="destructive" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Alert
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* EEG Signal Visualization */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">EEG Signal Visualization</h3>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Data
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Run AI Analysis
                  </Button>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-400 rounded" />
                  </div>
                  <p className="text-lg font-medium">EEG Data Visualization</p>
                  <p className="text-sm">Upload EEG data to view signal analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Analysis Modules */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Advanced Analysis Modules</h3>
              <div className="grid grid-cols-4 gap-4">
                {analysisModules.map((module) => (
                  <div
                    key={module.name}
                    onClick={() => setSelectedModule(module.name)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedModule === module.name ? module.color : "bg-white hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{module.icon}</div>
                      <p className="text-sm font-medium text-gray-700">{module.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
