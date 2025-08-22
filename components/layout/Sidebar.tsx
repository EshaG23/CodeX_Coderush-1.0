"use client"

import { Input } from "@/components/ui/input"

type Patient = { id: number; name: string; age: number; gender: string; status: "online" | "offline" | "away" }

export default function Sidebar({
	patients,
	selectedId,
	onSelect,
	searchTerm,
	onSearch,
}: {
	patients: Patient[]
	selectedId: number
	onSelect: (id: number) => void
	searchTerm: string
	onSearch: (value: string) => void
}) {
	const filtered = patients.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
	return (
		<aside className="w-80 bg-blue-900 text-white flex flex-col">
			<div className="p-6 border-b border-blue-800">
				<h2 className="text-xl font-semibold mb-4">Patient Cohort</h2>
				<div className="relative">
					<Input
						placeholder="Search patients..."
						value={searchTerm}
						onChange={(e) => onSearch(e.target.value)}
						className="pl-3 bg-blue-800 border-blue-700 text-white placeholder-blue-300 focus:border-blue-500"
					/>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto">
				{filtered.map((patient) => (
					<div
						key={patient.id}
						onClick={() => onSelect(patient.id)}
						className={`p-4 border-b border-blue-800 cursor-pointer transition-colors ${
							selectedId === patient.id ? "bg-blue-800" : "hover:bg-blue-800"
						}`}
					>
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-blue-600 rounded-full" />
								<div>
									<h3 className="font-medium">{patient.name}</h3>
									<p className="text-sm text-blue-300">
										{patient.age}, {patient.gender}
									</p>
								</div>
							</div>
							<div
								className={`w-3 h-3 rounded-full ${
									patient.status === "online" ? "bg-green-400" : patient.status === "away" ? "bg-yellow-400" : "bg-red-400"
								}`}
							/>
						</div>
					</div>
				))}
			</div>
		</aside>
	)
}


