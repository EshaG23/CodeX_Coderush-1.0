"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Eye, EyeOff, Lock, Mail, User, Building, Phone } from "lucide-react"

export default function SignupPage() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		organization: "",
		phone: ""
	})
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const router = useRouter()

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")

		// Validation
		if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
			setError("Please fill in all required fields")
			setIsLoading(false)
			return
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match")
			setIsLoading(false)
			return
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long")
			setIsLoading(false)
			return
		}

		// Simulate signup process
		setTimeout(() => {
			// For demo purposes, accept any valid registration
			if (formData.email.includes("@")) {
				router.push("/")
			} else {
				setError("Invalid email address")
			}
			setIsLoading(false)
		}, 1500)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
			<div className="w-full max-w-lg">
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
					<h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
					<p className="text-gray-600">Join AuraMind to start analyzing EEG data</p>
				</div>

				{/* Signup Form */}
				<Card className="shadow-xl border-0">
					<CardHeader className="pb-4">
						<CardTitle className="text-xl text-center">Sign Up</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSignup} className="space-y-4">
							{/* Name Fields */}
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="firstName" className="text-sm font-medium text-gray-700">
										First Name *
									</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											id="firstName"
											type="text"
											placeholder="First name"
											value={formData.firstName}
											onChange={(e) => handleInputChange("firstName", e.target.value)}
											className="pl-10 h-12"
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label htmlFor="lastName" className="text-sm font-medium text-gray-700">
										Last Name *
									</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											id="lastName"
											type="text"
											placeholder="Last name"
											value={formData.lastName}
											onChange={(e) => handleInputChange("lastName", e.target.value)}
											className="pl-10 h-12"
											required
										/>
									</div>
								</div>
							</div>

							{/* Email Field */}
							<div className="space-y-2">
								<label htmlFor="email" className="text-sm font-medium text-gray-700">
									Email Address *
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										className="pl-10 h-12"
										required
									/>
								</div>
							</div>

							{/* Organization and Phone */}
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="organization" className="text-sm font-medium text-gray-700">
										Organization
									</label>
									<div className="relative">
										<Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											id="organization"
											type="text"
											placeholder="Hospital/Clinic"
											value={formData.organization}
											onChange={(e) => handleInputChange("organization", e.target.value)}
											className="pl-10 h-12"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label htmlFor="phone" className="text-sm font-medium text-gray-700">
										Phone Number
									</label>
									<div className="relative">
										<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											id="phone"
											type="tel"
											placeholder="+1 (555) 123-4567"
											value={formData.phone}
											onChange={(e) => handleInputChange("phone", e.target.value)}
											className="pl-10 h-12"
										/>
									</div>
								</div>
							</div>

							{/* Password Field */}
							<div className="space-y-2">
								<label htmlFor="password" className="text-sm font-medium text-gray-700">
									Password *
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Create a password"
										value={formData.password}
										onChange={(e) => handleInputChange("password", e.target.value)}
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
								<p className="text-xs text-gray-500">Must be at least 6 characters long</p>
							</div>

							{/* Confirm Password Field */}
							<div className="space-y-2">
								<label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
									Confirm Password *
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirm your password"
										value={formData.confirmPassword}
										onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
										className="pl-10 pr-10 h-12"
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
									<p className="text-sm text-red-600">{error}</p>
								</div>
							)}

							{/* Terms and Conditions */}
							<label className="flex items-start gap-2">
								<input type="checkbox" className="mt-1 rounded border-gray-300" required />
								<span className="text-sm text-gray-600">
									I agree to the{" "}
									<button type="button" className="text-blue-600 hover:text-blue-700">
										Terms of Service
									</button>{" "}
									and{" "}
									<button type="button" className="text-blue-600 hover:text-blue-700">
										Privacy Policy
									</button>
								</span>
							</label>

							{/* Signup Button */}
							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										Creating account...
									</div>
								) : (
									"Create Account"
								)}
							</Button>
						</form>

						{/* Divider */}
						<div className="my-6 flex items-center">
							<div className="flex-1 border-t border-gray-300"></div>
							<span className="px-4 text-sm text-gray-500">or</span>
							<div className="flex-1 border-t border-gray-300"></div>
						</div>

						{/* Sign In Link */}
						<div className="text-center">
							<p className="text-sm text-gray-600">
								Already have an account?{" "}
								<button
									onClick={() => router.push("/login")}
									className="text-blue-600 hover:text-blue-700 font-medium"
								>
									Sign in
								</button>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
