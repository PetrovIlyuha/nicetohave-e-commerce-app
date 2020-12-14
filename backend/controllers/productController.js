import Product from '../models/productModel.js';
import SubCategory from '../models/subCategoryModel.js';
import Category from '../models/categoryModel.js';
import Brand from '../models/brandModel.js';
import slugify from 'slugify';

export const createProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    quantity,
    sold,
    brand,
    shipping,
    image,
    subcategories,
    category,
  } = req.body;
  try {
    const productSlug = slugify(title);
    const subCategoriesIds = subcategories.map(c => c._id);
    await Category.findById(category).exec((err, category) => {
      let categoryID = category._id;
      SubCategory.find()
        .where('_id')
        .in(subCategoriesIds)
        .exec((err, subcategories) => {
          if (err) {
            console.error(err);
          }
          const subcatIds = subcategories.map(sub => sub._id);
          let productBrand;
          Brand.find({ name: brand }).then(async (err, data) => {
            if (err) {
              console.log(err);
              productBrand = new Brand({ name: brand });
            } else {
              productBrand = data;
            }
            const newProduct = await new Product({
              title,
              slug: productSlug,
              description,
              quantity,
              category: categoryID,
              subcategories: subcatIds,
              price,
              sold,
              brand: productBrand,
              shipping,
              images: [image],
            }).save();
            return res.status(200).json(newProduct);
          });
        });
    });
  } catch (error) {
    if (error.name === 'MongoError') {
      if (error.keyValue.slug) {
        return res.status(403).json({
          error: `Category '${error.keyValue.slug}' can't be duplicated! Creation Forbidden!`,
        });
      }
    } else {
      return res.status(400).json({
        error: 'Product creation had failed! Try later with attuned inputs...',
      });
    }
  }
};
