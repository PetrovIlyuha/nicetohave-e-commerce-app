import Category from '../models/categoryModel.js';
import SubCategory from '../models/subCategoryModel.js';
import slugify from 'slugify';

export const listAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(subcategories);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const { name, image, parentCategoryId } = req.body;
    const parentCategory = await Category.findById(parentCategoryId);
    const subcategory = await new SubCategory({
      name,
      image,
      parent: parentCategory._id,
      slug: slugify(name),
    }).save();
    res.status(200).json(subcategory);
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

export const readSubCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const subCategoryBySlug = await SubCategory.findOne({ slug });
    res.status(200).json(subCategoryBySlug);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { slug } = req.params;
    console.log(slug);
    const subCategoryUpdated = await SubCategory.findOneAndUpdate(
      { slug },
      { name, image, slug: slugify(name) },
      { new: true },
    );
    res.status(200).json(subCategoryUpdated);
  } catch (err) {
    res.status(400).json({ error: `SubCategory update failed: ${err}` });
  }
};

export const removeSubCategory = async (req, res) => {
  try {
    const subCategoryToDelete = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(200).json({
      message: `Category ${subCategoryToDelete.name} successfully removed!`,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Category ${subCategoryToDelete.name} can't be removed!`,
      error: err,
    });
  }
};
