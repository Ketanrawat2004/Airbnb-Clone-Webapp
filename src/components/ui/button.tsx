
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md active:scale-[.98] duration-150 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 focus:from-pink-700 focus:to-red-700 shadow-lg hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-pink-300 bg-white hover:bg-pink-50 text-pink-700 hover:text-pink-800",
        secondary:
          "bg-gradient-to-r from-pink-600 to-rose-700 text-white hover:from-pink-700 hover:to-rose-800 shadow-lg hover:shadow-xl",
        ghost: "hover:bg-pink-100 hover:text-pink-800",
        link: "underline text-pink-600 hover:text-pink-800 px-2 bg-transparent shadow-none",
        airbnb: "bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white hover:from-pink-600 hover:via-red-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      },
      size: {
        default: "h-11 rounded-xl px-6 py-2 text-base",
        sm: "h-9 rounded-md px-4 py-1.5 text-sm",
        lg: "h-12 rounded-xl px-8 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
