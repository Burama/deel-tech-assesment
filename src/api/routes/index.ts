import { Router } from 'express'
import contractsRouter from './contracts';
import jobsRouter from './jobs';

const router = Router();

router.use('/contracts', contractsRouter);
router.use('/jobs', jobsRouter);

export default router;
