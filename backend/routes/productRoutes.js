import express from 'express';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';
import {
  createProduct,
  getAllProducts,
} from '../controllers/productController.js';

const router = express.Router();

// routes
router.post('/product', authCheck, adminRoleCheck, createProduct);
router.get('/products', getAllProducts);
export default router;
