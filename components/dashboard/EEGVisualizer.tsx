"use client"

import { useEffect, useMemo, useState } from "react"
import { Line } from "react-chartjs-2"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
)

export default function EEGVisualizer({ data }: { data?: number[] }) {
	const chartData = useMemo(() => {
		if (!data || data.length === 0) {
			// Generate sample data for demonstration
			const sampleData = Array.from({ length: 1000 }, (_, i) => 
				Math.sin(i * 0.1) * 0.5 + Math.sin(i * 0.05) * 0.3 + Math.random() * 0.1
			)
			return {
				labels: sampleData.map((_, i) => i),
				datasets: [
					{
						label: "EEG Signal",
						data: sampleData,
						borderColor: "rgb(59, 130, 246)",
						backgroundColor: "rgba(59, 130, 246, 0.1)",
						borderWidth: 2,
						fill: true,
						tension: 0.1,
						pointRadius: 0,
					},
				],
			}
		}

		// Use actual data if available
		const step = Math.max(1, Math.floor(data.length / 1000))
		const sampledData = []
		const labels = []
		for (let i = 0; i < data.length; i += step) {
			const value = data[i]
			if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
				sampledData.push(value)
				labels.push(i)
			}
		}

		// If no valid data points, fall back to sample data
		if (sampledData.length === 0) {
			const sampleData = Array.from({ length: 1000 }, (_, i) => 
				Math.sin(i * 0.1) * 0.5 + Math.sin(i * 0.05) * 0.3 + Math.random() * 0.1
			)
			return {
				labels: sampleData.map((_, i) => i),
				datasets: [
					{
						label: "EEG Signal (Sample)",
						data: sampleData,
						borderColor: "rgb(59, 130, 246)",
						backgroundColor: "rgba(59, 130, 246, 0.1)",
						borderWidth: 2,
						fill: true,
						tension: 0.1,
						pointRadius: 0,
					},
				],
			}
		}

		return {
			labels,
			datasets: [
				{
					label: "EEG Signal",
					data: sampledData,
					borderColor: "rgb(59, 130, 246)",
					backgroundColor: "rgba(59, 130, 246, 0.1)",
					borderWidth: 2,
					fill: true,
					tension: 0.1,
					pointRadius: 0,
				},
			],
		}
	}, [data])

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
			},
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: "Sample Index",
				},
				grid: {
					color: "rgba(0, 0, 0, 0.1)",
				},
			},
			y: {
				display: true,
				title: {
					display: true,
					text: "Amplitude (μV)",
				},
				grid: {
					color: "rgba(0, 0, 0, 0.1)",
				},
			},
		},
		interaction: {
			mode: "nearest" as const,
			axis: "x" as const,
			intersect: false,
		},
	}

	return (
		<div className="h-64 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
			<Line data={chartData} options={options} />
		</div>
	)
}


