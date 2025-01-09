import { Router } from 'express';
import { registerAdmin, loginAdmin, createClassSchedule } from '../controller/adminController';

const router = Router();

router.post('/admin-register', registerAdmin);
router.post('/admin-login', loginAdmin);
router.post('/assign-trainer', createClassSchedule);

export default router;
