import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import CategoryBadge from "@/components/molecules/CategoryBadge";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import DateDisplay from "@/components/molecules/DateDisplay";
import { useCategories } from "@/hooks/useCategories";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { categories } = useCategories();
  
  const category = categories.find(cat => cat.Id === task.categoryId);

  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.Id);
      if (!task.completed) {
        toast.success("Task completed! Great job! 🎉");
      }
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(task.Id);
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.1)" }}
      className={`bg-white rounded-xl shadow-lg border transition-all duration-300 ${
        task.completed 
          ? "border-success/20 bg-gradient-to-r from-success/3 to-success/1" 
          : "border-gray-100 task-card-gradient"
      } ${isDeleting ? "opacity-50" : ""}`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-1"
          >
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={isDeleting}
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className={`text-lg font-display font-semibold transition-all ${
                task.completed 
                  ? "text-gray-500 line-through" 
                  : "text-gray-900"
              }`}>
                {task.title}
              </h3>
              
              <div className="flex items-center gap-2 ml-4">
                <PriorityBadge priority={task.priority} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  disabled={isDeleting}
                >
                  <ApperIcon name="Edit3" className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  {isDeleting ? (
                    <ApperIcon name="Loader" className="w-4 h-4 animate-spin" />
                  ) : (
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {task.description && (
              <p className={`text-sm mb-4 transition-all ${
                task.completed 
                  ? "text-gray-400 line-through" 
                  : "text-gray-600"
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {category && (
                  <CategoryBadge category={category} size="sm" />
                )}
              </div>
              
              {task.dueDate && (
                <DateDisplay date={task.dueDate} />
              )}
            </div>
          </div>
        </div>
      </div>

      {task.completed && (
        <div className="h-1 completion-gradient"></div>
      )}
    </motion.div>
  );
};

export default TaskCard;