
import { API_URL } from './config';

import type { Schedule, Trip, TripStop } from '@/types';
import type { RawGtfsStopTime, RawGtfsTripExtended } from '@/types/raw';

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
 * Return an array of `Trip`s representing the specified train
 */
function getTrainDetail(trainId: number) {
    return fetch(`${API_URL}/train/${trainId}`)
        .then(response => response.json())
        .then((rawTrips: Array<RawGtfsTripExtended>) => {
            const trips = rawTrips.map((trip: RawGtfsTripExtended) => {
                const { stop_times, calendar, ...basics } = trip;

                const tripId = parseInt(trip.trip_id);
                const routeId = parseInt(trip.route_id);

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

                // return {
                //     basics,
                //     calendar,
                //     stop_times,
                //     stations: stop_times.map((entry: any) => entry.stop_id),
                // };

                return {
                    tripId: tripId,
                    routeId: routeId,
                    serviceStartDate: calendar.start_date,
                    serviceEndDate: calendar.end_date,
                    schedule: schedule,
                    headsign: trip.trip_headsign,
                    shortName: trip.trip_short_name,
                    direction: trip.direction_id,
                    stops: tripStops,
                } as Trip;
            });

            return {
                routeId: trips[0].routeId,
                direction: trips[0].direction,
                // agencyId,
                trips,
            };
        })
        .then((response) => {
            console.info("getTrainTrips response:", response); // DEBUG
            return response;
        });
}

export {
    getAllRoutes,
    getRoute,
    getTrainDetail,
}
