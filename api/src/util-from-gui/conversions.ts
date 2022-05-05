
import type { Route, Schedule, Stop, Train, TripWithStops, TripStop } from '@/types';
import type { RawGtfsCalendar, RawGtfsStopExtended, RawGtfsStopTime, RawGtfsTripExtended } from '@/types/raw';

import { NonBoundedTime } from './time-util';


/**
 * Convert the GTFS/database format of a service schedule into our internal
 * `Schedule` format.
 */
function convertRawCalendar(calendar: RawGtfsCalendar): Schedule {
    return {
        monday: calendar.monday == 'available',
        tuesday: calendar.tuesday == 'available',
        wednesday: calendar.wednesday == 'available',
        thursday: calendar.thursday == 'available',
        friday: calendar.friday == 'available',
        saturday: calendar.saturday == 'available',
        sunday: calendar.sunday == 'available',
    } as Schedule;
}


/**
 * Convert the GTFS/database format of a trip into our internal `Trip` format.
 */
function convertRawTrip(rawTrip: RawGtfsTripExtended) : TripWithStops {
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

    return {
        tripId: tripId,
        routeId: routeId,
        serviceStartDate: calendar.start_date,
        serviceEndDate: calendar.end_date,
        schedule: convertRawCalendar(calendar),
        headsign: basics.trip_headsign,
        shortName: basics.trip_short_name,
        direction: basics.direction_id,
        stops: tripStops,
    } as TripWithStops;
}

export {
    convertRawCalendar,
    convertRawTrip,
};
