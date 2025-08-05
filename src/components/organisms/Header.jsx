import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProgressRing from "@/components/molecules/ProgressRing";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ 
  totalTasks, 
  completedTasks, 
  onSearch,
  activeFilter 
}) => {
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getFilterTitle = (filter) => {
    if (filter.startsWith("category-")) {
      return "Category Tasks";
    }
    if (filter.startsWith("priority-")) {
      return `${filter.split("-")[1]} Priority Tasks`.replace(/^\w/, c => c.toUpperCase());
    }
    
    const filterTitles = {
      all: "All Tasks",
      today: "Due Today",
      upcoming: "Upcoming Tasks",
      overdue: "Overdue Tasks",
      completed: "Completed Tasks"
    };
    
    return filterTitles[filter] || "Tasks";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <ApperIcon name="CheckSquare" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                TaskFlow
              </h1>
              <p className="text-gray-600 font-medium">
                {getFilterTitle(activeFilter)}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 pl-8 border-l border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-gray-900">
                {totalTasks}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Tasks
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-success">
                {completedTasks}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Completed
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-primary">
                {totalTasks - completedTasks}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Remaining
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-full lg:w-80">
            <SearchBar onSearch={onSearch} />
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <ProgressRing progress={completionRate} size={64} />
            <div className="hidden xl:block">
              <div className="text-sm font-display font-semibold text-gray-900">
                Daily Progress
              </div>
              <div className="text-xs text-gray-600">
                Keep up the momentum!
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="lg:hidden mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-display font-bold text-gray-900">
              {totalTasks}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              Total
            </div>
          </div>
          
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <div className="text-xl font-display font-bold text-success">
              {completedTasks}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              Done
            </div>
          </div>
          
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="text-xl font-display font-bold text-primary">
              {totalTasks - completedTasks}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              Left
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;