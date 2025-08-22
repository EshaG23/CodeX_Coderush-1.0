"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Eye, EyeOff, Lock, Mail, User } from "lucide-react"

export default function LoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const router = useRouter()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")

		// Simulate login process
		setTimeout(() => {
			if (email && password) {
				// For demo purposes, accept any valid email/password
				if (email.includes("@") && password.length >= 6) {
					router.push("/")
				} else {
					setError("Invalid email or password")
				}
			} else {
				setError("Please fill in all fields")
			}
			setIsLoading(false)
		}, 1000)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Logo and Title */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-4">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
							<Brain className="w-6 h-6 text-white" />
						</div>
						<div className="text-left">
							<h1 className="text-2xl font-bold text-gray-900">AuraMind</h1>
							<p className="text-sm text-gray-600">Schizophrenia Detection, Simplified</p>
						</div>
					</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
					<p className="text-gray-600">Sign in to your account to continue</p>
				</div>

				{/* Login Form */}
				<Card className="shadow-xl border-0">
					<CardHeader className="pb-4">
						<CardTitle className="text-xl text-center">Sign In</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleLogin} className="space-y-4">
							{/* Email Field */}
							<div className="space-y-2">
								<label htmlFor="email" className="text-sm font-medium text-gray-700">
									Email Address
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10 h-12"
										required
									/>
								</div>
							</div>

							{/* Password Field */}
							<div className="space-y-2">
								<label htmlFor="password" className="text-sm font-medium text-gray-700">
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10 pr-10 h-12"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
									<p className="text-sm text-red-600">{error}</p>
								</div>
							)}

							{/* Remember Me & Forgot Password */}
							<div className="flex items-center justify-between">
								<label className="flex items-center gap-2">
									<input type="checkbox" className="rounded border-gray-300" />
									<span className="text-sm text-gray-600">Remember me</span>
								</label>
								<button type="button" className="text-sm text-blue-600 hover:text-blue-700">
									Forgot password?
								</button>
							</div>

							{/* Login Button */}
							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										Signing in...
									</div>
								) : (
									"Sign In"
								)}
							</Button>
						</form>

						{/* Divider */}
						<div className="my-6 flex items-center">
							<div className="flex-1 border-t border-gray-300"></div>
							<span className="px-4 text-sm text-gray-500">or</span>
							<div className="flex-1 border-t border-gray-300"></div>
						</div>

						{/* Sign Up Link */}
						<div className="text-center">
							<p className="text-sm text-gray-600">
								Don't have an account?{" "}
								<button
									onClick={() => router.push("/signup")}
									className="text-blue-600 hover:text-blue-700 font-medium"
								>
									Sign up
								</button>
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Demo Credentials */}
				<div className="mt-6 p-4 bg-blue-50 rounded-lg">
					<p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
					<p className="text-xs text-blue-700">Email: demo@auramind.com</p>
					<p className="text-xs text-blue-700">Password: demo123</p>
				</div>
			</div>
		</div>
	)
}
