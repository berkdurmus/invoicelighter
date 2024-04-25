import { Router } from 'express';
import workflowRoutes from './workflow.route';

const router = Router();

// Use the workflow routes under a specific base path
router.use('/workflow', workflowRoutes);

export default router;