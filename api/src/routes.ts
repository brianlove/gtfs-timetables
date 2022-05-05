
import { Router } from 'express';

import RoutesController from './controllers/routes.controller';
import StopsController from './controllers/stops.controller';
import TripsController from './controllers/trips.controller';

const router = Router();

router.get('/routes/all', RoutesController.findAll);
// router.get('/routes/debug', RoutesController.debug);
router.get('/routes/:id', RoutesController.findOne);
router.get('/routes/:id/stations', RoutesController.findRouteStations);
router.get('/routes/:id/trips', TripsController.findTripsForRoute);
router.get('/routes/:id/detailsAndTrips', RoutesController.findRouteTrips);
// router.get('/routes/:id/tripsAndStops', TripsController.findTripsAndStopTimesForRoute);

// router.get('/trips/debug', TripsController.debug);
router.get('/train/:id', TripsController.findTripsForTrain);

router.get('/stations/all', StopsController.findAll);
router.get('/stations/:id', StopsController.findOne);
router.get('/stations/:id/trains', StopsController.findStationTrains);
router.get('/stops/all', StopsController.findAll);
router.get('/stops/:id', StopsController.findOne);

export default router;
