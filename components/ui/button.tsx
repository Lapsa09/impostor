import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider font-display relative z-0",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground before:shadow-md before:hover:shadow-[0_0_20px_var(--primary)] before:bg-primary before:absolute before:inset-0 before:-z-10 before:transform before:-skew-x-12 before:transition-all hover:before:bg-primary/90",
        destructive:
          "text-destructive-foreground hover:before:bg-destructive/90 before:bg-destructive before:absolute before:inset-0 before:-z-10 before:transform before:-skew-x-12",
        outline:
          "text-primary hover:text-primary-foreground backdrop-blur-sm before:absolute before:inset-0 before:-z-10 before:transform before:-skew-x-12 before:border before:border-primary before:bg-background/50 hover:before:bg-primary",
        secondary:
          "text-secondary-foreground hover:before:bg-secondary/80 before:shadow-sm before:bg-secondary before:absolute before:inset-0 before:-z-10 before:transform before:-skew-x-12",
        ghost: "hover:text-foreground before:absolute before:inset-0 before:-z-10 before:transform before:-skew-x-12 hover:before:bg-black/40",
        link: "text-primary underline-offset-4 hover:underline normal-case",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-md px-4 text-xs",
        lg: "h-14 rounded-md px-10 text-base",
        icon: "h-12 w-12",
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

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

Button.displayName = "Button"

export { Button, buttonVariants }
