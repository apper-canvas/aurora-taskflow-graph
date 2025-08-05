import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, size = "sm" }) => {
  const priorityConfig = {
    high: {
      variant: "error",
      icon: "AlertTriangle",
      label: "High"
    },
    medium: {
      variant: "warning",
      icon: "AlertCircle",
      label: "Medium"
    },
    low: {
      variant: "success",
      icon: "CheckCircle",
      label: "Low"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.low;

  return (
    <Badge variant={config.variant} size={size}>
      <ApperIcon name={config.icon} className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

export default PriorityBadge;