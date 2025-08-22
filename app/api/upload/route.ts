import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
	const formData = await req.formData()
	const file = formData.get("file") as unknown as File | null
	if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

	const name = file.name
	const ext = name.split(".").pop()?.toLowerCase() || ""

	// We return the file back to client to parse in-browser for now.
	// For large files, move parsing here with Node/WASM libs.
	return NextResponse.json({ fileName: name, type: ext })
}


