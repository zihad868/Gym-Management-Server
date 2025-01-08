import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../controller/adminController';

const router = Router();

router.post('/admin-register', registerAdmin);
router.post('/admin-login', loginAdmin);

export default router;
