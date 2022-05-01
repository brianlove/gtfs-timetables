
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

interface RawGtfsRouteAndTrips {
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
    trips: Array<RawGtfsTripExtended>,
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


export type {
    RawGtfsCalendar,
    RawGtfsRouteAndTrips,
    RawGtfsStopTime,
    RawGtfsTrip,
    RawGtfsTripExtended,
};
