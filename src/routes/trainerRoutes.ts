import { Router } from 'express';
import { registerTrainer, loginTrainer, viewTrainerSchedules } from '../controller/trainerController';
import { authenticate } from '../middleware';

const router = Router();

router.post('/trainer-register', registerTrainer);
router.post('/trainer-login', loginTrainer);

router.get('/trainer-schedule', authenticate, viewTrainerSchedules)

export default router;
