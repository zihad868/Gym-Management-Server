import { Router } from 'express';
import { registerAdmin, loginAdmin, createClassSchedule } from '../controller/adminController';
import { authenticate } from '../middleware';

const router = Router();

router.post('/admin-register', registerAdmin);
router.post('/admin-login', loginAdmin);
router.post('/assign-trainer', authenticate, createClassSchedule);

export default router;
