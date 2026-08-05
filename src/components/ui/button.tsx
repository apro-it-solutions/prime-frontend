import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        /* Solid dark-green pill (Contact). */
        brand: "bg-brand text-white hover:bg-brand/90 shadow-sm",
        /* Near-black green pill (Explore Our Services). */
        dark: "bg-brand-dark text-white hover:bg-brand-dark/90 shadow-sm",
        /* White pill with dark text. */
        light: "bg-white text-foreground hover:bg-white/90 shadow-sm",
        outline:
          "border border-white/60 text-white hover:bg-white/10 backdrop-blur-sm",
        ghost: "text-foreground hover:bg-black/5",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-full",
        md: "h-11 px-5 text-sm rounded-full",
        lg: "h-14 pl-6 pr-2 text-base rounded-full",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
