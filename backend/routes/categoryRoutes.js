import express from 'express';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';
import {
  createCategory,
  readCategory,
  updateCategory,
  removeCategory,
  listAllCategories,
} from '../controllers/categoryController.js';

const router = express.Router();

// routes
router.get('/categories', listAllCategories);
router.post('/category', authCheck, adminRoleCheck, createCategory);
router.post('/category/:slug', authCheck, adminRoleCheck, readCategory);
router.put('/category/:slug', authCheck, adminRoleCheck, updateCategory);
router.delete('/category/:slug', authCheck, adminRoleCheck, removeCategory);

export default router;
