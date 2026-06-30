import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 focus-visible:ring-[rgb(var(--ring))]",
        destructive:
          "bg-[rgb(var(--destructive))] text-white hover:bg-[rgb(var(--destructive)/0.9)] focus-visible:ring-[rgb(var(--destructive))]",
        outline:
          "border-2 border-[rgb(var(--border))] bg-transparent hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--secondary-foreground))]",
        secondary:
          "bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgb(var(--secondary)/0.8)]",
        ghost:
          "hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--secondary-foreground))]",
        link: "text-[rgb(var(--accent))] underline-offset-4 hover:underline",
        accent:
          "bg-[rgb(var(--accent))] text-white hover:opacity-90 focus-visible:ring-[rgb(var(--accent))]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
