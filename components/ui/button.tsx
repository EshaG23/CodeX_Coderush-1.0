"use client"

import * as React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "default" | "outline" | "destructive" | "secondary"
	size?: "sm" | "md" | "lg"
}

const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
	sm: "h-9 px-3 text-sm",
	md: "h-10 px-4 text-sm",
	lg: "h-11 px-6 text-base",
}
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
	default: "bg-blue-600 text-white hover:bg-blue-700",
	outline: "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50",
	destructive: "bg-red-600 text-white hover:bg-red-700",
	secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className = "", variant = "default", size = "md", ...props }, ref) => (
		<button ref={ref} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props} />
	)
)
Button.displayName = "Button"

export default Button


