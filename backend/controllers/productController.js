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
          Brand.find({ name: brand }).then((err, data) => {
            if (err) {
              console.log(err);
              productBrand = new Brand({ name: brand });
            } else {
              productBrand = data;
            }
            const newProduct = new Product({
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
            res.status(200).json(newProduct);
          });
        });
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Product 'create' operation have failed");
  }
};
