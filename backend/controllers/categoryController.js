import Category from '../models/categoryModel.js';

export const listAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};

export const createCategory = async (req, res) => {};
export const readCategory = (req, res) => {};
export const updateCategory = (req, res) => {};
export const removeCategory = (req, res) => {};
