import React from "react";
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const DateDisplay = ({ date, className = "" }) => {
  if (!date) return null;

  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  const isOverdue = isPast(parsedDate) && !isToday(parsedDate);
  
  let displayText;
  let iconName = "Calendar";
  let textColor = "text-gray-600";

  if (isToday(parsedDate)) {
    displayText = "Today";
    iconName = "Clock";
    textColor = "text-accent";
  } else if (isTomorrow(parsedDate)) {
    displayText = "Tomorrow";
    iconName = "Calendar";
    textColor = "text-primary";
  } else if (isOverdue) {
    displayText = format(parsedDate, "MMM d");
    iconName = "AlertTriangle";
    textColor = "text-error";
  } else {
    displayText = format(parsedDate, "MMM d");
    textColor = "text-gray-600";
  }

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${textColor} ${className}`}>
      <ApperIcon name={iconName} className="w-4 h-4" />
      {displayText}
    </div>
  );
};

export default DateDisplay;