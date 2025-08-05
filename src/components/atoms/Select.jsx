import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className,
  children,
  error,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg font-body text-gray-900 transition-all duration-200 appearance-none pr-10",
          "focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          error && "border-error focus:border-error focus:ring-error/10",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ApperIcon 
        name="ChevronDown" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
      />
    </div>
  );
});

Select.displayName = "Select";

export default Select;