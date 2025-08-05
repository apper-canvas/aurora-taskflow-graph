import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";

export const useTasks = (filters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      
      let loadedTasks;
      
      if (filters.category) {
        loadedTasks = await taskService.getByCategory(filters.category);
      } else if (filters.priority) {
        loadedTasks = await taskService.getByPriority(filters.priority);
      } else if (filters.view === "upcoming") {
        loadedTasks = await taskService.getUpcoming();
      } else if (filters.view === "overdue") {
        loadedTasks = await taskService.getOverdue();
      } else if (filters.search) {
        loadedTasks = await taskService.search(filters.search);
      } else {
        loadedTasks = await taskService.getAll();
      }
      
      // Apply additional filters
      if (filters.completed !== undefined) {
        loadedTasks = loadedTasks.filter(task => task.completed === filters.completed);
      }
      
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err.message || "Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      setError(err.message || "Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)));
    } catch (err) {
      setError(err.message || "Failed to delete task");
      throw err;
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(t => t.Id === parseInt(id));
      if (!task) return;
      
      const updatedTask = await taskService.update(id, { 
        completed: !task.completed 
      });
      
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ));
      
      return updatedTask;
    } catch (err) {
      setError(err.message || "Failed to toggle task completion");
      throw err;
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters.category, filters.priority, filters.view, filters.search, filters.completed]);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete
  };
};