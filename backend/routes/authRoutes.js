import express from 'express';
import {
  createOrUpdateUser,
  getCurrentUser,
} from '../controllers/authControllers.js';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, getCurrentUser);
router.post('/current-admin-user', authCheck, adminRoleCheck, getCurrentUser);

export default router;
