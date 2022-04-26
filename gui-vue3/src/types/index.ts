
import type { NonBoundedTime } from "@/util";

enum LocationType {
    Stop = 1,
    Station,
    EntranceExit,
    GnericNode,
    BoardingArea,
};


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
    // serviceId: number, // start/end date come from the services (calendar) table - do we really need this?
    serviceStartDate: string,
    serviceEndDate: string,
    schedule: Schedule,
    headsign?: string,
    shortName?: string,
    direction?: 0 | 1,
    blockId?: number,
    // wheelchairAccessible
    // bikesAllowed
    stops: Array<TripStop>,
};

interface Train {
    routeId: number,
    agencyId: number,
    trips: Array<Trip>,
};



export type {
    Schedule,
    Stop,
    Trip,
    TripStop,
    Train,
};