import React from "react";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  error, 
  required, 
  children, 
  className,
  helperText 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 font-display">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {helperText && !error && (
        <p className="text-sm text-gray-600">{helperText}</p>
      )}
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};

export default FormField;