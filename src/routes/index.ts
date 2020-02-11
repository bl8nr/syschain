import { Router } from 'express';

import LogsRouter from './Logs';

// Init router and path
const router = Router();

/* ***************************************** */
/* sub-routes for log transaction submission */
/* ***************************************** */
router.use('/logs', LogsRouter);

// Export the base-router
export default router;
