"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type Props = {
	onFile: (file: File) => Promise<void> | void
}

export default function FileUploader({ onFile }: Props) {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [isBusy, setIsBusy] = useState(false)

	const handlePick = () => inputRef.current?.click()

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		setIsBusy(true)
		try {
			await onFile(file)
		} finally {
			setIsBusy(false)
			e.target.value = ""
		}
	}

	return (
		<div className="flex items-center gap-3">
			<input
				ref={inputRef}
				type="file"
				className="hidden"
				accept=".edf,.csv,.pdf,.txt,.docx,.xlsx"
				onChange={handleChange}
			/>
			<Button variant="outline" size="sm" onClick={handlePick} disabled={isBusy}>
				{isBusy ? "Processing..." : "Upload / Choose File"}
			</Button>
		</div>
	)
}


