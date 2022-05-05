
import { API_URL } from './config';

import type { Route, Schedule, StopWithTrips, Train, Trip, TripStop } from '@/types';
import type { RawGtfsRouteAndTrips, RawGtfsStopTime, RawGtfsTripExtended } from '@/types/raw';

import { NonBoundedTime } from '@/util';


function getAllRoutes() {
    return fetch(`${API_URL}/routes/all`)
        .then(response => response.json());
}

function getRoute(routeId: string) {
    return fetch(`${API_URL}/routes/${routeId}`)
        .then(response => response.json());
}


/**
 * Return the details of a `Route`, including an array of `Train`s and the
 * `Trip`s that form them.
 */
function getRouteAndTrips(routeId: number) : Promise<Route> {
    return fetch(`${API_URL}/routes/${routeId}/detailsAndTrips`)
        .then(response => response.json())
        .then(data => data as Route)
        .then((response) => {
            console.info("getRouteAndTrips response:", response); // DEBUG
            return response;
        });
}


function getStationAndTrains(stationId: string) {
    return fetch(`${API_URL}/stations/${stationId}/trains`)
        .then(response => response.json())
        .then(data => data as StopWithTrips)
        .then((response) => {
            console.info("getStationAndTrains response:", response); // DEBUG
            return response;
        });
}


/**
 * Return the details of a `Train`, including an array of `Trip`s representing
 * the train's schedules.
 */
function getTrainDetail(trainId: number) : Promise<Train> {
    return fetch(`${API_URL}/train/${trainId}`)
        .then(response => response.json())
        .then(data => data as Train)
        .then((response) => {
            console.info("getTrainTrips response:", response); // DEBUG
            return response;
        });
}

export {
    getAllRoutes,
    getRoute,
    getRouteAndTrips,
    getStationAndTrains,
    getTrainDetail,
}
