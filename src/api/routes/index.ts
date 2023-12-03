import { Router } from 'express';
import contractsRouter from './contracts';
import jobsRouter from './jobs';
import balanceRouter from './balance';
import adminRouter from './admin';

const router = Router();

router.use('/contracts', contractsRouter);
router.use('/jobs', jobsRouter);
router.use('/balances', balanceRouter);
router.use('/admin', adminRouter);

export default router;
