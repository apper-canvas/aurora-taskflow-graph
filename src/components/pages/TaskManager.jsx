import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { isToday, parseISO, isPast } from "date-fns";
import Header from "@/components/organisms/Header";
import QuickAddBar from "@/components/organisms/QuickAddBar";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import TaskList from "@/components/organisms/TaskList";
import TaskEditModal from "@/components/organisms/TaskEditModal";
import { useTasks } from "@/hooks/useTasks";

const TaskManager = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Determine filter configuration
  const filterConfig = useMemo(() => {
    if (activeFilter.startsWith("category-")) {
      return { category: parseInt(activeFilter.split("-")[1]) };
    }
    if (activeFilter.startsWith("priority-")) {
      return { priority: activeFilter.split("-")[1] };
    }
    if (activeFilter === "completed") {
      return { completed: true };
    }
    if (activeFilter === "today") {
      return { view: "today" };
    }
    if (activeFilter === "upcoming") {
      return { view: "upcoming" };
    }
    if (activeFilter === "overdue") {
      return { view: "overdue" };
    }
    if (searchQuery) {
      return { search: searchQuery };
    }
    return { completed: false }; // Default to active tasks
  }, [activeFilter, searchQuery]);

  const { 
    tasks, 
    loading, 
    error, 
    loadTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleComplete 
  } = useTasks(filterConfig);

  // All tasks for stats (separate hook call)
  const { tasks: allTasks } = useTasks({});

  // Calculate task counts for sidebar
  const taskCounts = useMemo(() => {
    if (!allTasks.length) return {};

    const counts = {
      all: allTasks.filter(t => !t.completed).length,
      completed: allTasks.filter(t => t.completed).length,
      today: allTasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)) && !t.completed).length,
      upcoming: allTasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = parseISO(t.dueDate);
        return !isPast(dueDate) || isToday(dueDate);
      }).length,
      overdue: allTasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = parseISO(t.dueDate);
        return isPast(dueDate) && !isToday(dueDate);
      }).length,
      high: allTasks.filter(t => t.priority === "high" && !t.completed).length,
      medium: allTasks.filter(t => t.priority === "medium" && !t.completed).length,
      low: allTasks.filter(t => t.priority === "low" && !t.completed).length
    };

    // Category counts
    allTasks.forEach(task => {
      if (!task.completed) {
        const key = `category-${task.categoryId}`;
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return counts;
  }, [allTasks]);

  const handleTaskAdded = async (taskData) => {
    await createTask(taskData);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveTask = async (taskId, taskData) => {
    await updateTask(taskId, taskData);
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setActiveFilter("all");
    }
  };

  const handleAddTaskFromEmpty = () => {
    // Scroll to top to focus on quick add bar
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto p-6">
        <Header
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          onSearch={handleSearch}
          activeFilter={activeFilter}
        />

        <div className="mb-8">
          <QuickAddBar onTaskAdded={handleTaskAdded} />
        </div>

        <div className="flex gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <FilterSidebar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
          </motion.div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TaskList
                tasks={tasks}
                loading={loading}
                error={error}
                onToggleComplete={toggleComplete}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onRetry={loadTasks}
                onAddTask={handleAddTaskFromEmpty}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <TaskEditModal
        task={editingTask}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default TaskManager;