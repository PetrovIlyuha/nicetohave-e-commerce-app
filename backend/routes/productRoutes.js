import express from 'express';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';
import {
  createProduct,
  getAllProducts,
  getProductsByCategoryId,
} from '../controllers/productController.js';

const router = express.Router();

// routes
router.post('/product', authCheck, adminRoleCheck, createProduct);
router.get('/products/:count', getAllProducts);
router.get('/products-by-category/:id', getProductsByCategoryId);
export default router;
