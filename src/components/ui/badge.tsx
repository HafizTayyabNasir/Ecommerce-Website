import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]",
        secondary:
          "bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]",
        accent: "bg-[rgb(var(--accent))] text-white",
        destructive: "bg-[rgb(var(--destructive))] text-white",
        success: "bg-[rgb(var(--success))] text-white",
        warning: "bg-[rgb(var(--warning))] text-white",
        outline:
          "border border-[rgb(var(--border))] text-[rgb(var(--foreground))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
