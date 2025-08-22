"use client"

import * as React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
	return (
		<input
			ref={ref}
			className={`h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
			{...props}
		/>
	)
})
Input.displayName = "Input"

export default Input


