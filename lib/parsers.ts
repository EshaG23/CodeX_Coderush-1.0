// NOTE: Lightweight client-safe stubs. Replace with real parsers (Node or WASM) later.

export async function parseCSV(file: File): Promise<{ dataPreview: string; samples: number[]; sampleRate?: number }> {
	try {
		const text = await file.text()
		const lines = text.trim().split(/\r?\n/)
		const preview = lines.slice(0, 5).join("\n")
		const numbers: number[] = []
		for (const line of lines.slice(1)) {
			const cells = line.split(/,|;|\t/).map((c) => Number(c))
			for (const n of cells) if (!Number.isNaN(n)) numbers.push(n)
		}
		return { dataPreview: preview, samples: numbers.slice(0, 8000), sampleRate: 256 }
	} catch (error) {
		console.error("Error parsing CSV:", error)
		return { dataPreview: "Error parsing CSV file", samples: [], sampleRate: 256 }
	}
}

export async function parseTXT(file: File): Promise<{ dataPreview: string; samples: number[]; sampleRate?: number }> {
	try {
		const text = await file.text()
		const lines = text.trim().split(/\r?\n/)
		const preview = lines.slice(0, 5).join("\n")
		const numbers: number[] = lines
			.map((l) => Number(l.trim()))
			.filter((n) => !Number.isNaN(n))
		return { dataPreview: preview, samples: numbers.slice(0, 8000), sampleRate: 256 }
	} catch (error) {
		console.error("Error parsing TXT:", error)
		return { dataPreview: "Error parsing TXT file", samples: [], sampleRate: 256 }
	}
}

export async function parseEDF(_file: File): Promise<{ dataPreview: string; samples: number[]; sampleRate?: number }> {
	try {
		// Minimal EDF reader for simple signals. Replace with robust parser for production.
		const buf = await _file.arrayBuffer()
		const bytes = new Uint8Array(buf)
		const dec = new TextDecoder("ascii")

		if (bytes.length < 256) return { dataPreview: "File too small for EDF", samples: [] }
		const header = dec.decode(bytes.slice(0, 256))
		if (!header.includes("EDF")) return { dataPreview: "Not an EDF file (magic not found)", samples: [] }

		const numSignals = parseInt(dec.decode(bytes.slice(252, 256)).trim() || "1") || 1
		const perSignalHeader = 256 * numSignals
		const dataStart = 256 + perSignalHeader
		if (bytes.length <= dataStart) return { dataPreview: "EDF: no data section", samples: [] }

		// Attempt to read interleaved 16-bit samples, taking first channel only
		const dv = new DataView(buf, dataStart)
		const samplePairs = Math.floor((bytes.length - dataStart) / 2)
		const totalByChannels = Math.floor(samplePairs / Math.max(1, numSignals))
		const samples: number[] = []
		for (let i = 0; i < totalByChannels && samples.length < 8000; i++) {
			const idx = i * numSignals
			samples.push(dv.getInt16(idx * 2, true))
		}

		const preview = dec.decode(bytes.slice(0, Math.min(bytes.length, 256 + Math.min(perSignalHeader, 512))))
		// Heuristic sampleRate: many EDFs are 128-512 Hz. We approximate by constraining to 256 if unknown.
		const sampleRate = 256
		return { dataPreview: preview, samples, sampleRate }
	} catch (error) {
		console.error("Error parsing EDF:", error)
		return { dataPreview: "Error parsing EDF file", samples: [], sampleRate: 256 }
	}
}

export async function parsePDF(_file: File): Promise<{ textPreview: string; samples?: number[]; sampleRate?: number }> {
	// Generate sample data for PDF files since parsing is not implemented
	const sampleData = Array.from({ length: 1000 }, (_, i) => 
		Math.sin(i * 0.1) * 0.5 + Math.sin(i * 0.05) * 0.3 + Math.random() * 0.1
	)
	return { 
		textPreview: "PDF text extraction not implemented - using sample data", 
		samples: sampleData,
		sampleRate: 256
	}
}

export async function parseDOCX(_file: File): Promise<{ textPreview: string; samples?: number[]; sampleRate?: number }> {
	// Generate sample data for DOCX files since parsing is not implemented
	const sampleData = Array.from({ length: 1000 }, (_, i) => 
		Math.sin(i * 0.08) * 0.4 + Math.sin(i * 0.03) * 0.2 + Math.random() * 0.15
	)
	return { 
		textPreview: "DOCX parsing not implemented - using sample data", 
		samples: sampleData,
		sampleRate: 256
	}
}

export async function parseXLSX(_file: File): Promise<{ dataPreview: string; samples?: number[]; sampleRate?: number }> {
	// Generate sample data for XLSX files since parsing is not implemented
	const sampleData = Array.from({ length: 1000 }, (_, i) => 
		Math.sin(i * 0.12) * 0.6 + Math.sin(i * 0.06) * 0.4 + Math.random() * 0.2
	)
	return { 
		dataPreview: "XLSX parsing not implemented - using sample data", 
		samples: sampleData,
		sampleRate: 256
	}
}


