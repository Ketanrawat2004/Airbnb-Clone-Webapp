
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:border-rose-400 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
