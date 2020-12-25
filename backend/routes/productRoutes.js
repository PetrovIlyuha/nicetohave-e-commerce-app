import express from 'express';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';
import {
  createProduct,
  getAllProducts,
  getProductsByCategoryId,
  getProductBySlug,
} from '../controllers/productController.js';

const router = express.Router();

// routes
router.post('/product', authCheck, adminRoleCheck, createProduct);
router.get('/products/:count', getAllProducts);
router.get('/products-by-category/:id', getProductsByCategoryId);
router.get('/product-by-slug/:slug', getProductBySlug);
export default router;
