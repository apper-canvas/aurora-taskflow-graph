import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CategoryBadge = ({ category, size = "md", onClick, isActive = false }) => {
  if (!category) return null;

  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <Badge
        size={size}
        className={`transition-all duration-200 ${
          isActive 
            ? "bg-gradient-to-r from-primary/20 to-accent/20 border-primary text-primary" 
            : ""
        }`}
        style={{
          backgroundColor: isActive ? undefined : `${category.color}15`,
          borderColor: `${category.color}40`,
          color: category.color
        }}
      >
        <ApperIcon name={category.icon} className="w-4 h-4" />
        {category.name}
      </Badge>
    </Component>
  );
};

export default CategoryBadge;