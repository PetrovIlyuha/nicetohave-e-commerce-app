import express from 'express';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';
import {
  createSubCategory,
  readSubCategory,
  updateSubCategory,
  removeSubCategory,
  listAllSubCategories,
} from '../controllers/subCategoriesController.js';

const router = express.Router();

// routes
router.get('/subcategories', listAllSubCategories);
router.get('/subcategory/:slug', readSubCategory);
router.post('/subcategory', authCheck, adminRoleCheck, createSubCategory);
router.put('/subcategory/:slug', authCheck, adminRoleCheck, updateSubCategory);
router.delete(
  '/subcategory/:slug',
  authCheck,
  adminRoleCheck,
  removeSubCategory,
);

export default router;
