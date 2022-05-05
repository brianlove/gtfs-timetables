
import type { NonBoundedTime } from "@/util-from-gui/time-util";

enum LocationType {
    Stop = 1,
    Station,
    EntranceExit,
    GnericNode,
    BoardingArea,
};

interface RouteDetails {
    routeId: number,
    agencyId: number,
    shortName?: string,
    longName?: string,
    desc?: string,
    type: string, // TODO to change
    url?: string,
    color?: string,
    textColor?: string,
};

interface Route extends RouteDetails {
    trains: Array<Train>,
}


interface Schedule {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
};

interface Stop {
    stopId: string,
    code?: string,
    name?: string,
    desc?: string,
    lat?: string,
    lon?: string,
    zoneId?: string,
    url?: string,
    type?: LocationType,
    parentStation?: string,
    // TBD...
};

interface StopAndTrip {
    stop: TripStop,
    trip: TripWithRouteDetails,
}

interface StopWithTrips extends Stop {
    trips: Array<StopAndTrip>,
};

interface TripStop {
    arrivalTime: NonBoundedTime,
    departureTime: NonBoundedTime,
    stopId: string,
    sequence: number,
    headsign?: string,
    pickupType?: string,
    dropoffType?: string,
    // TBD
};

interface Trip {
    tripId: number,
    routeId: number,
    serviceStartDate: string,
    serviceEndDate: string,
    schedule: Schedule,
    headsign?: string,
    shortName?: string,
    direction?: 0 | 1,
    blockId?: number,
    // wheelchairAccessible
    // bikesAllowed
};

interface TripWithRouteDetails extends Trip {
    routeShortName?: string,
    routeLongName?: string,
};

interface TripWithStops extends Trip {
    stops: Array<TripStop>,
};

interface Train {
    trainId: number,
    routeId: number,
    agencyId: number,
    name: string,
    direction: 0 | 1 | undefined,
    trips: Array<TripWithStops>,
};



export type {
    Route,
    RouteDetails,
    Schedule,
    Stop,
    StopAndTrip,
    StopWithTrips,
    Trip,
    TripStop,
    TripWithRouteDetails,
    TripWithStops,
    Train,
};