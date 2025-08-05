const tableName = 'task_c';

export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          {
            fieldName: "createdAt_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI field names for backward compatibility
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c === "true" || task.completed_c === true || task.completed_c === "1",
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        tags: task.Tags
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks:", error.message);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Task not found");
      }

      // Map database fields to UI field names for backward compatibility
      return {
        Id: response.data.Id,
        title: response.data.title_c,
        description: response.data.description_c,
        categoryId: response.data.categoryId_c?.Id || response.data.categoryId_c,
        priority: response.data.priority_c,
        dueDate: response.data.dueDate_c,
        completed: response.data.completed_c === "true" || response.data.completed_c === true || response.data.completed_c === "1",
        createdAt: response.data.createdAt_c,
        completedAt: response.data.completedAt_c,
        tags: response.data.Tags
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map UI field names to database field names and include only Updateable fields
      const params = {
        records: [{
          Name: taskData.title || taskData.title_c,
          title_c: taskData.title || taskData.title_c,
          description_c: taskData.description || taskData.description_c || "",
          priority_c: taskData.priority || taskData.priority_c || "medium",
          dueDate_c: taskData.dueDate || taskData.dueDate_c || null,
          completed_c: taskData.completed || taskData.completed_c || false,
          createdAt_c: taskData.createdAt || taskData.createdAt_c || new Date().toISOString(),
          completedAt_c: taskData.completedAt || taskData.completedAt_c || null,
          categoryId_c: parseInt(taskData.categoryId || taskData.categoryId_c),
          Tags: taskData.tags || taskData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const createdRecord = successfulRecords[0].data;
          // Map database fields to UI field names for backward compatibility
          return {
            Id: createdRecord.Id,
            title: createdRecord.title_c,
            description: createdRecord.description_c,
            categoryId: createdRecord.categoryId_c?.Id || createdRecord.categoryId_c,
            priority: createdRecord.priority_c,
            dueDate: createdRecord.dueDate_c,
            completed: createdRecord.completed_c === "true" || createdRecord.completed_c === true || createdRecord.completed_c === "1",
            createdAt: createdRecord.createdAt_c,
            completedAt: createdRecord.completedAt_c,
            tags: createdRecord.Tags
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error("Error creating task:", error.message);
      }
      throw error;
    }
  },

  async update(id, taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map UI field names to database field names and include only Updateable fields
      const updateData = {
        Id: parseInt(id)
      };

      if (taskData.title !== undefined) updateData.title_c = taskData.title;
      if (taskData.description !== undefined) updateData.description_c = taskData.description;
      if (taskData.priority !== undefined) updateData.priority_c = taskData.priority;
      if (taskData.dueDate !== undefined) updateData.dueDate_c = taskData.dueDate;
      if (taskData.categoryId !== undefined) updateData.categoryId_c = parseInt(taskData.categoryId);
      if (taskData.tags !== undefined) updateData.Tags = taskData.tags;
      
      if (taskData.completed !== undefined) {
        updateData.completed_c = taskData.completed;
        updateData.completedAt_c = taskData.completed ? new Date().toISOString() : null;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updatedRecord = successfulUpdates[0].data;
          // Map database fields to UI field names for backward compatibility
          return {
            Id: updatedRecord.Id,
            title: updatedRecord.title_c,
            description: updatedRecord.description_c,
            categoryId: updatedRecord.categoryId_c?.Id || updatedRecord.categoryId_c,
            priority: updatedRecord.priority_c,
            dueDate: updatedRecord.dueDate_c,
            completed: updatedRecord.completed_c === "true" || updatedRecord.completed_c === true || updatedRecord.completed_c === "1",
            createdAt: updatedRecord.createdAt_c,
            completedAt: updatedRecord.completedAt_c,
            tags: updatedRecord.Tags
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error("Error updating task:", error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error("Error deleting task:", error.message);
      }
      throw error;
    }
  },

  async getByCategory(categoryId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "categoryId_c",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ],
        orderBy: [
          {
            fieldName: "createdAt_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI field names for backward compatibility
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c === "true" || task.completed_c === true || task.completed_c === "1",
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        tags: task.Tags
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks by category:", error.message);
      }
      throw error;
    }
  },

  async getByPriority(priority) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "priority_c",
            Operator: "EqualTo",
            Values: [priority]
          }
        ],
        orderBy: [
          {
            fieldName: "createdAt_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI field names for backward compatibility
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c === "true" || task.completed_c === true || task.completed_c === "1",
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        tags: task.Tags
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by priority:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks by priority:", error.message);
      }
      throw error;
    }
  },

  async getUpcoming() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const today = new Date().toISOString().split('T')[0];

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "dueDate_c",
            Operator: "GreaterThanOrEqualTo",
            Values: [today]
          },
          {
            FieldName: "completed_c",
            Operator: "EqualTo",
            Values: [false]
          }
        ],
        orderBy: [
          {
            fieldName: "dueDate_c",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI field names for backward compatibility
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c === "true" || task.completed_c === true || task.completed_c === "1",
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        tags: task.Tags
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upcoming tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching upcoming tasks:", error.message);
      }
      throw error;
    }
  },

  async getOverdue() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const today = new Date().toISOString().split('T')[0];

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "dueDate_c",
            Operator: "LessThan",
            Values: [today]
          },
          {
            FieldName: "completed_c",
            Operator: "EqualTo",
            Values: [false]
          }
        ],
        orderBy: [
          {
            fieldName: "dueDate_c",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI field names for backward compatibility
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c === "true" || task.completed_c === true || task.completed_c === "1",
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        tags: task.Tags
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching overdue tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching overdue tasks:", error.message);
      }
      throw error;
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "Tags" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title_c",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description_c",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "createdAt_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI field names for backward compatibility
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c === "true" || task.completed_c === true || task.completed_c === "1",
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        tags: task.Tags
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error searching tasks:", error.message);
      }
      throw error;
    }
  }
};