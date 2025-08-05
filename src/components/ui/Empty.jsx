import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onAddTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="CheckSquare" className="w-12 h-12 text-primary" />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
        Ready to get productive?
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        Your task list is empty. Add your first task and start building momentum towards your goals.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddTask}
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-display font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        <ApperIcon name="Plus" className="w-5 h-5" />
        Add Your First Task
      </motion.button>
      
      <div className="mt-8 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="Zap" className="w-4 h-4" />
            Quick add with Ctrl+Enter
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Filter" className="w-4 h-4" />
            Organize by category
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;