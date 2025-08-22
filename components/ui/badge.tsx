import * as React from "react"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
	variant?: "default" | "secondary"
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
	const base = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
	const variants = {
		default: "bg-blue-600 text-white",
		secondary: "bg-gray-100 text-gray-900",
	}
	return <span className={`${base} ${variants[variant]} ${className}`} {...props} />
}


