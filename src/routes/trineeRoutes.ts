import { Router } from 'express';
import { registerTrainee, loginTrainee, joinClass } from '../controller/traineeController';
import { authenticate } from '../middleware';

const router = Router();

router.post('/trainee-register', registerTrainee);
router.post('/trainee-login', loginTrainee);

router.post('/join-class', authenticate, joinClass);

export default router;
