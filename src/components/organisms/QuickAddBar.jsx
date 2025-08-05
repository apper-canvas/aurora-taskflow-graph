import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import { useCategories } from "@/hooks/useCategories";

const QuickAddBar = ({ onTaskAdded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { categories } = useCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setIsLoading(true);

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        categoryId: parseInt(categoryId),
        priority,
        dueDate: dueDate || null
      };

      await onTaskAdded(taskData);
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategoryId("");
      setPriority("medium");
      setDueDate("");
      setIsExpanded(false);
      
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          <ApperIcon name="Plus" className="w-6 h-6 text-primary" />
          
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task... (Ctrl+Enter to save)"
            className="flex-1"
          />
          
          {isExpanded && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setDescription("");
                setCategoryId("");
                setPriority("medium");
                setDueDate("");
              }}
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          )}
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 space-y-4"
          >
            <FormField label="Description">
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task description (optional)"
                onKeyDown={handleKeyPress}
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Category" required>
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.Id} value={category.Id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Priority">
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormField>

              <FormField label="Due Date">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </FormField>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Press Ctrl+Enter to quickly add task
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsExpanded(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!title.trim() || !categoryId || isLoading}
                >
                  {isLoading ? (
                    <>
                      <ApperIcon name="Loader" className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Plus" className="w-4 h-4" />
                      Add Task
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuickAddBar;