import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import { useCategories } from "@/hooks/useCategories";

const TaskEditModal = ({ task, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { categories } = useCategories();

  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId?.toString() || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate || ""
      });
      setErrors({});
    }
  }, [task, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const updatedData = {
        ...formData,
        categoryId: parseInt(formData.categoryId)
      };

      await onSave(task.Id, updatedData);
      toast.success("Task updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                      <ApperIcon name="Edit3" className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Edit Task
                    </h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <ApperIcon name="X" className="w-5 h-5" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormField 
                    label="Task Title" 
                    required 
                    error={errors.title}
                  >
                    <Input
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter task title"
                      error={!!errors.title}
                    />
                  </FormField>

                  <FormField 
                    label="Description"
                    helperText="Optional description for additional context"
                  >
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Enter task description"
                      rows={4}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField 
                      label="Category" 
                      required 
                      error={errors.categoryId}
                    >
                      <Select
                        value={formData.categoryId}
                        onChange={(e) => handleChange("categoryId", e.target.value)}
                        error={!!errors.categoryId}
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
                        value={formData.priority}
                        onChange={(e) => handleChange("priority", e.target.value)}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </Select>
                    </FormField>
                  </div>

                  <FormField 
                    label="Due Date"
                    helperText="Optional due date for better task planning"
                  >
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleChange("dueDate", e.target.value)}
                    />
                  </FormField>

                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <ApperIcon name="Loader" className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <ApperIcon name="Save" className="w-4 h-4" />
                          Update Task
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskEditModal;