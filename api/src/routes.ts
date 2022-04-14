
import { Router } from 'express';

import RoutesController from './controllers/routes.controller';
import StopsController from './controllers/stops.controller';

const router = Router();

router.get('/routes/all', RoutesController.findAll);
router.get('/routes/:id', RoutesController.findOne);

router.get('/stations/all', StopsController.findAll);
router.get('/stations/:id', StopsController.findOne);
router.get('/stops/all', StopsController.findAll);
router.get('/stops/:id', StopsController.findOne);

export default router;
