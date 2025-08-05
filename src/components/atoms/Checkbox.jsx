import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  checked,
  onChange,
  disabled,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type="button"
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={() => !disabled && onChange && onChange(!checked)}
      className={cn(
        "w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
        checked 
          ? "bg-gradient-to-br from-primary to-primary-light border-primary text-white" 
          : "bg-white border-gray-300 hover:border-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ApperIcon name="Check" className="w-4 h-4" />
        </motion.div>
      )}
    </motion.button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;