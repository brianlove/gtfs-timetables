
enum PickupDropoffPattern {
    Continuous = 0,
    NotContinuous = 1,
    PhoneAgency = 2,
    CoordinateDriver = 3,
};

enum VehicleType {
    Tram = 0,
    Metro = 1,
    Rail = 2,
    Bus = 3,
    Ferry = 4,
    CableTram = 5,
    AerialLift = 6,
    Funicular = 7,
    TrolleyBus = 11,
    Monorail = 12,
};

interface Route {
    routeId: number,
    agencyId: number,
    shortName?: string,
    longName?: string,
    desc?: string,
    type: VehicleType,
    url?: string,
    color?: string,
    textColor?: string,
    sortOrder?: number,
    continuousPickup?: PickupDropoffPattern | "", // Default is NotContinuous
    continuousDropoff?: PickupDropoffPattern | "",
};

interface Trip {
    routeId: number,
    serviceId: number,
    tripId: number,
    headsign: string | null,
    shortName: string | null,
    directionId: 0 | 1,
};




export type {
    PickupDropoffPattern,
    Route,
    Trip,
    VehicleType,
};
