"use client"

import { Badge } from "@/components/ui/badge"

export default function Navbar({ userName = "Guest", role = "Clinician" }: { userName?: string; role?: string }) {
	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
						<div className="w-4 h-4 bg-white rounded-sm" />
					</div>
					<div>
						<h1 className="text-xl font-semibold text-gray-900">AuraMind</h1>
						<p className="text-xs text-gray-500">Schizophrenia Detection, Simplified</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-sm text-gray-600">{userName}</span>
					<Badge variant="secondary">{role}</Badge>
				</div>
			</div>
		</header>
	)
}


