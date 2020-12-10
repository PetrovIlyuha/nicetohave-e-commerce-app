import Product from '../models/productModel.js';
import slugify from 'slugify';

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).send("Product 'create' operation have failed");
  }
};
