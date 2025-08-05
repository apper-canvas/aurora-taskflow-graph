import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className,
  error,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg font-body text-gray-900 placeholder-gray-500 transition-all duration-200 resize-none",
        "focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none",
        "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
        error && "border-error focus:border-error focus:ring-error/10",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;