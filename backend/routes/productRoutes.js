import express from 'express';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';
import {
  createProduct,
  getAllProducts,
  getProductsByCategoryId,
  getProductBySlug,
  deleteProductById,
} from '../controllers/productController.js';

const router = express.Router();

// routes
router.post('/product', authCheck, adminRoleCheck, createProduct);
router.get('/products/:count', getAllProducts);
router.get('/products-by-category/:id', getProductsByCategoryId);
router.get('/product-by-slug/:slug', getProductBySlug);
router.delete(
  '/delete-product/:id',
  authCheck,
  adminRoleCheck,
  deleteProductById,
);
export default router;
