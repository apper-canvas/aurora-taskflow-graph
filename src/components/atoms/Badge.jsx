import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-gray-100 text-gray-700 border-gray-200",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    accent: "bg-accent/10 text-accent border-accent/20"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-medium",
    md: "px-3 py-1.5 text-sm font-medium",
    lg: "px-4 py-2 text-base font-semibold"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 border rounded-full font-display",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;