import Category from '../models/categoryModel.js';
import slugify from 'slugify';

export const listAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await new Category({
      name,
      image,
      slug: slugify(name),
    }).save();
    res.status(200).json(category);
  } catch (error) {
    if (error.name === 'MongoError') {
      if (error.keyValue.slug) {
        return res.status(403).json({
          error: `Category '${error.keyValue.slug}' can't be duplicated! Creation Forbidden!`,
        });
      }
    } else {
      return res.status(400).json({ error: error });
    }
  }
};

export const readCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const categoryBySlug = await Category.findOne({ slug });
    res.status(200).json(categoryBySlug);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;
    const categoryUpdated = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true },
    );
    res.status(200).json(categoryUpdated);
  } catch (err) {
    res.status(400).json({ error: `Category update failed: ${err}` });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const categoryToDelete = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(200).json({
      message: `Category ${categoryToDelete.name} successfully removed!`,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Category ${categoryToDelete.name} can't be removed!`,
      error: err,
    });
  }
};
