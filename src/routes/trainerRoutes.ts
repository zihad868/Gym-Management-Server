import { Router } from 'express';
import { registerTrainer, loginTrainer } from '../controller/trainerController';

const router = Router();

router.post('/trainer-register', registerTrainer);
router.post('/trainer-login', loginTrainer);

export default router;
