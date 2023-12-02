import { Router } from 'express'
import contractsRouter from './contracts';

const router = Router();

router.use('/contracts', contractsRouter);

export default router;
