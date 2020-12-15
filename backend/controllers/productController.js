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
    const categoryDB = await Category.findById(category);
    let categoryID = categoryDB?._id;
    const subcategoriesDB = await SubCategory.find()
      .where('_id')
      .in(subCategoriesIds);

    const subcatIds = subcategoriesDB.map(sub => sub._id);
    let productBrand;
    const brandDB = await Brand.find({ name: brand });
    if (!brandDB) {
      productBrand = new Brand({ name: brand });
    } else {
      productBrand = brandDB;
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
      brand: productBrand._id,
      shipping,
      images: [image],
    }).save();
    if (newProduct) {
      res.status(200).json(newProduct);
    }
  } catch (error) {
    console.log('Error detector', error);
    if (error.name === 'MongoError') {
      if (error.keyValue.slug) {
        return res.status(403).json({
          err: `Category '${error.keyValue.slug}' can't be duplicated! Creation Forbidden!`,
        });
      }
    } else {
      return res.status(400).json({
        err: 'Product creation had failed! Try later with attuned inputs...',
      });
    }
  }
};
// }
