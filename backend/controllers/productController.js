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
    images,
    subcategories,
    category,
  } = req.body;
  try {
    const brandDB = await Brand.findOne({ name: brand });
    let productBrand;
    if (!brandDB) {
      productBrand = await Brand.create({ name: brand });
    } else {
      productBrand = brandDB;
    }

    const productSlug = slugify(title);
    const subCategoriesIds = subcategories.map(c => c._id);
    const categoryDB = await Category.findById(category);
    let categoryID = categoryDB?._id;
    const subcategoriesDB = await SubCategory.find()
      .where('_id')
      .in(subCategoriesIds);

    const subcatIds = subcategoriesDB.map(sub => sub._id);

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
      images: images,
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

export const updateProduct = async (req, res) => {};

export const getAllProducts = async (req, res) => {
  let products = await Product.find({})
    .populate('category subcategories')
    .populate('brand')
    .limit(+req.params.count)
    .sort({ createdAt: -1 });
  res.status(200).json(products);
};

export const getProductsByCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  let productsByCategory = await Product.find({ category: categoryId });
  res.json(productsByCategory);
};

export const getProductBySlug = async (req, res) => {
  const slug = req.params.slug;
  let product = await Product.find({ slug }).populate('category subcategories');
  res.json(product);
};

export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let productToDelete = await Product.findOneAndRemove({ _id: id }).exec();
    res.status(200).json({ product: productToDelete });
  } catch (err) {
    console.error(err);
    return res.status(400).send('Product deletion failed!');
  }
};
