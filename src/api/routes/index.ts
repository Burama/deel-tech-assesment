import { Router } from 'express'
import contractsRouter from './contracts';
import jobsRouter from './jobs';
import balanceRouter from './balance';

const router = Router();

router.use('/contracts', contractsRouter);
router.use('/jobs', jobsRouter);
router.use('/balance', balanceRouter);

export default router;
