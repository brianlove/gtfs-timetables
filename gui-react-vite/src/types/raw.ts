
interface RawGtfsCalendar {
    service_id: string,
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string,
    start_date: string,
    end_date: string,
};

interface RawGtfsRoute {
    route_id: string,
    agency_id?: string,
    route_short_name?: string | null,
    route_long_name?: string | null,
    route_desc?: string | null,
    route_type?: string | null,
    route_url?: string | null,
    route_color?: string | null,
    route_text_color?: string | null,
    route_sort_order?: string | null,
    continuous_pickup?: string | null,
    continuous_drop_off?: string | null,
};

interface RawGtfsRouteAndTrips extends RawGtfsRoute {
    trips: Array<RawGtfsTripExtended>,
};

interface RawGtfsStop {
    stop_id: string,
    stop_code?: string | null,
    stop_name: string,
    stop_desc?: string | null,
    stop_loc?: any, // TODO - location
    zone_id?: string | null,
    stop_url?: string,
    location_type?: string | null,
    parent_station?: string | null,
    stop_timezone?: string | null,
    wheelchair_accessible?: string | null,
};

interface RawGtfsStopExtended extends RawGtfsStop {
    stop_times: Array<RawGtfsStopTimeWithTrip>,
};

interface RawGtfsStopTime {
    trip_id: string,
    arrival_time: {
        hours: number,
        minutes: number
    },
    departure_time: {
        hours: number,
        minutes: number
    },
    stop_id: string,
    stop_sequence: number,
    stop_headsign?: string | null,
    pickup_type: string,
    drop_off_type: string,
    shape_dist_traveled?: string | null,
    timepoint?: string | null,
};

interface RawGtfsStopTimeWithTrip extends RawGtfsStopTime {
    trip: RawGtfsTripWithRoute,
}

interface RawGtfsTrip {
    route_id: string,
    service_id: string,
    trip_id: string,
    trip_headsign: string,
    trip_short_name: string,
    direction_id: 0 | 1,
    block_id?: string | null,
    shape_id?: string | null,
    wheelchair_accessible?: string | null,
    bikes_allowed?: string | null,
};

interface RawGtfsTripExtended extends RawGtfsTrip {
    stop_times: Array<RawGtfsStopTime>,
    calendar: RawGtfsCalendar,
};

interface RawGtfsTripWithRoute extends RawGtfsTrip {
    calendar: RawGtfsCalendar,
    route: RawGtfsRoute,
}


export type {
    RawGtfsCalendar,
    RawGtfsRoute,
    RawGtfsRouteAndTrips,
    RawGtfsStop,
    RawGtfsStopExtended,
    RawGtfsStopTime,
    RawGtfsStopTimeWithTrip,
    RawGtfsTrip,
    RawGtfsTripExtended,
    RawGtfsTripWithRoute,
};
