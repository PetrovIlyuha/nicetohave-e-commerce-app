import express from 'express';
const router = express.Router();
import {
  removeImage,
  uploadImages,
} from '../controllers/cloudinaryController.js';
import { adminRoleCheck, authCheck } from '../middlewares/auth.js';

router.post('/upload-images', authCheck, adminRoleCheck, uploadImages);
router.delete('/remove-image', authCheck, adminRoleCheck, removeImage);

export default router;
