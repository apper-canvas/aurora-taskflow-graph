import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(cat => cat.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(200);
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      ...categoryData
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(200);
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    const updatedCategory = { ...categories[index], ...categoryData };
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    categories.splice(index, 1);
    return true;
  }
};