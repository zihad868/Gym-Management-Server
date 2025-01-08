import { Router } from 'express';
import { registerTrainee, loginTrainee } from '../controller/traineeController';

const router = Router();

router.post('/trainee-register', registerTrainee);
router.post('/trainee-login', loginTrainee);

export default router;
