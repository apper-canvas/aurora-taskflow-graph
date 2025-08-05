import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(250);
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...tasks[index],
      ...taskData
    };
    
    // Handle completion status
    if (taskData.completed !== undefined) {
      updatedTask.completedAt = taskData.completed ? new Date().toISOString() : null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
    return true;
  },

  async getByCategory(categoryId) {
    await delay(250);
    return tasks.filter(task => task.categoryId === parseInt(categoryId));
  },

  async getByPriority(priority) {
    await delay(250);
    return tasks.filter(task => task.priority === priority);
  },

  async getUpcoming() {
    await delay(300);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate >= today;
    });
  },

  async getOverdue() {
    await delay(300);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  },

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  }
};