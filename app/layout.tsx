export const metadata = {
	title: "AuraMind: EEG Analysis Dashboard",
	description: "Unified EEG dashboard with upload, visualization, and AI analysis",
}

import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
		</html>
	)
}


