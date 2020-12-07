import express from 'express';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';
import { createProduct } from '../controllers/productController.js';

const router = express.Router();

// routes
router.post('/product', authCheck, adminRoleCheck, createProduct);

export default router;
