
import { API_URL } from './config';

import type { Route, Schedule, Train, Trip, TripStop } from '@/types';
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


interface TrainMapping {
    [index: string]: Train,
}


/**
 * Return the details of a `Route`, including an array of `Train`s and the
 * `Trip`s that form them.
 */
function getRouteAndTrips(routeId: number) : Promise<Route> {
    return fetch(`${API_URL}/routes/${routeId}/detailsAndTrips`)
        .then(response => response.json())
        .then((rawResults: RawGtfsRouteAndTrips) => {
            const { trips, ...details } = rawResults;

            const agencyId = parseInt(details.agency_id || '');
            const convertedTrips = trips.map(convertRawTrip);

            const trainMapping = {} as TrainMapping;
            convertedTrips.forEach((trip: Trip) => {
                const trainId = parseInt(trip.shortName || '');

                if ( trainMapping.hasOwnProperty(trainId) ) {
                    trainMapping[trainId].trips.push(trip);
                } else {
                    trainMapping[trainId] = {
                        trainId,
                        routeId,
                        agencyId,
                        name: details.route_short_name || details.route_long_name || '',
                        direction: trip.direction,
                        trips: [trip],
                    } as Train;
                }
            });

            console.info("Train mapping:", trainMapping); // DEBUG

            const trains = Object.values(trainMapping);

            console.info("Converted to array:", trains); // DEBUG

            return {
                routeId,
                agencyId,
                shortName: details.route_short_name,
                longName: details.route_long_name,
                desc: details.route_desc,
                type: details.route_type,
                url: details.route_url,
                color: details.route_color,
                textColor: details.route_text_color,
                trains: Object.values(trainMapping),
            } as Route;
        })
        .then((response) => {
            console.info("getRouteAndTrips response:", response); // DEBUG
            return response;
        });
}


/**
 * Convert the GTFS/database format of a trip into our internal `Trip` format.
 */
function convertRawTrip(rawTrip: RawGtfsTripExtended) : Trip {
    const { stop_times, calendar, ...basics } = rawTrip;

    const tripId = parseInt(basics.trip_id);
    const routeId = parseInt(basics.route_id);

    const tripStops = stop_times.map((entry: RawGtfsStopTime) => {
        return {
            arrivalTime: new NonBoundedTime(entry.arrival_time),
            departureTime: new NonBoundedTime(entry.departure_time),
            stopId: entry.stop_id,
            sequence: entry.stop_sequence,
            headsign: entry.stop_headsign || '',
            pickupType: entry.pickup_type,
            dropoffType: entry.drop_off_type,
        } as TripStop;
    });

    const schedule = {
        monday: calendar.monday == 'available',
        tuesday: calendar.tuesday == 'available',
        wednesday: calendar.wednesday == 'available',
        thursday: calendar.thursday == 'available',
        friday: calendar.friday == 'available',
        saturday: calendar.saturday == 'available',
        sunday: calendar.sunday == 'available',
    } as Schedule;

    return {
        tripId: tripId,
        routeId: routeId,
        serviceStartDate: calendar.start_date,
        serviceEndDate: calendar.end_date,
        schedule: schedule,
        headsign: basics.trip_headsign,
        shortName: basics.trip_short_name,
        direction: basics.direction_id,
        stops: tripStops,
    } as Trip;
}


/**
 * Return the details of a `Train`, including an array of `Trip`s representing
 * the train's schedules.
 */
function getTrainDetail(trainId: number) : Promise<Train> {
    return fetch(`${API_URL}/train/${trainId}`)
        .then(response => response.json())
        .then((rawTrips: Array<RawGtfsTripExtended>) => {
            const trips = rawTrips.map(convertRawTrip);

            return {
                routeId: trips[0].routeId,
                direction: trips[0].direction,
                name: trips[0].shortName,
                // agencyId,
                trips,
            } as Train;
        })
        .then((response) => {
            console.info("getTrainTrips response:", response); // DEBUG
            return response;
        });
}

export {
    getAllRoutes,
    getRoute,
    getRouteAndTrips,
    getTrainDetail,
}
