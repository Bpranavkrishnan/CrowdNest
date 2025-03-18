import { Router } from 'express';
import { updateUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
const router = Router();

router.put('/:id', protect, updateUserProfile);

export default router;