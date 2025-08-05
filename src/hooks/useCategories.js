import { useState, useEffect } from "react";
import { categoryService } from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const loadedCategories = await categoryService.getAll();
      setCategories(loadedCategories);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err.message || "Failed to create category");
      throw err;
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await categoryService.update(id, categoryData);
      setCategories(prev => prev.map(cat => 
        cat.Id === parseInt(id) ? updatedCategory : cat
      ));
      return updatedCategory;
    } catch (err) {
      setError(err.message || "Failed to update category");
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(cat => cat.Id !== parseInt(id)));
    } catch (err) {
      setError(err.message || "Failed to delete category");
      throw err;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};