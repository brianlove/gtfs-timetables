
import { API_URL } from './config';

import type { Route, StopWithTrips, Train } from '@/types';


function getAllRoutes() {
    console.info("API_URL", API_URL); // DEBUG

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
    // console.info("API_URL", API_URL); // DEBUG

    // return fetch(`${API_URL}/routes/${routeId}/detailsAndTrips`)
    return fetch(`api/routes/${routeId}/detailsAndTrips`)
        .then(response => response.json())
        .then(data => data as Route);
}


function getAllStations() {
    return fetch(`${API_URL}/stations/all`)
        .then(response => response.json());
}


function getStationAndTrains(stationId: string) {
    return fetch(`${API_URL}/stations/${stationId}/trains`)
        .then(response => response.json())
        .then(data => data as StopWithTrips);
}


/**
 * Return the details of a `Train`, including an array of `Trip`s representing
 * the train's schedules.
 */
function getTrainDetail(trainId: number) : Promise<Train> {
    return fetch(`${API_URL}/train/${trainId}`)
        .then(response => response.json())
        .then(data => data as Train);
}


export {
    getAllRoutes,
    getRoute,
    getRouteAndTrips,

    getAllStations,
    getStationAndTrains,

    getTrainDetail,
}
