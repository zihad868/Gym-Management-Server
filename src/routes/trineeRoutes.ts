import { Router } from 'express';
import { registerTrainee, loginTrainee, joinClass, cancelBooking } from '../controller/traineeController';
import { authenticate } from '../middleware';

const router = Router();

router.post('/trainee-register', registerTrainee);
router.post('/trainee-login', loginTrainee);

router.post('/join-class', authenticate, joinClass);
router.post('/cancel-booking', authenticate, cancelBooking);

export default router;
