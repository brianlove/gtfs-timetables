
import { Router } from 'express';

import RoutesController from './controllers/routes.controller';

const router = Router();

router.get('/routes/all', RoutesController.findAll);
router.get('/routes/:id', RoutesController.findOne);

export default router;
