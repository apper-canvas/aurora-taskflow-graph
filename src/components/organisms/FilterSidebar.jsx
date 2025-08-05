import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CategoryBadge from "@/components/molecules/CategoryBadge";
import { useCategories } from "@/hooks/useCategories";

const FilterSidebar = ({ 
  activeFilter, 
  onFilterChange, 
  taskCounts = {} 
}) => {
  const { categories } = useCategories();

  const filterSections = [
    {
      title: "Views",
      filters: [
        { key: "all", label: "All Tasks", icon: "List", count: taskCounts.all || 0 },
        { key: "today", label: "Due Today", icon: "Clock", count: taskCounts.today || 0 },
        { key: "upcoming", label: "Upcoming", icon: "Calendar", count: taskCounts.upcoming || 0 },
        { key: "overdue", label: "Overdue", icon: "AlertTriangle", count: taskCounts.overdue || 0 },
        { key: "completed", label: "Completed", icon: "CheckCircle", count: taskCounts.completed || 0 }
      ]
    },
    {
      title: "Priority",
      filters: [
        { key: "priority-high", label: "High Priority", icon: "AlertTriangle", count: taskCounts.high || 0, color: "#EF4444" },
        { key: "priority-medium", label: "Medium Priority", icon: "AlertCircle", count: taskCounts.medium || 0, color: "#F59E0B" },
        { key: "priority-low", label: "Low Priority", icon: "CheckCircle", count: taskCounts.low || 0, color: "#10B981" }
      ]
    }
  ];

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
          <ApperIcon name="Filter" className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-display font-bold text-gray-900">Filters</h2>
      </div>

      <div className="space-y-8">
        {filterSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-display font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.filters.map((filter) => (
                <motion.button
                  key={filter.key}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onFilterChange(filter.key)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ApperIcon 
                      name={filter.icon} 
                      className={`w-5 h-5 ${
                        filter.color ? `text-[${filter.color}]` : ""
                      }`}
                      style={filter.color ? { color: filter.color } : {}}
                    />
                    <span className="font-medium">{filter.label}</span>
                  </div>
                  <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                    activeFilter === filter.key
                      ? "bg-primary/20 text-primary"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {filter.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-display font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <motion.button
                key={category.Id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange(`category-${category.Id}`)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  activeFilter === `category-${category.Id}`
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                    : "hover:bg-gray-50"
                }`}
              >
                <CategoryBadge 
                  category={category} 
                  size="sm"
                  isActive={activeFilter === `category-${category.Id}`}
                />
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  activeFilter === `category-${category.Id}`
                    ? "bg-primary/20 text-primary"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {taskCounts[`category-${category.Id}`] || 0}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange("all")}
            className="w-full justify-center"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;