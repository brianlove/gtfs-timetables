import type { TimeObject } from "@/util";

interface Station {
    code: string,
    name: string,
}

interface StationStop {
    code: string,
    arrive: TimeObject,
    depart: TimeObject,
    bypass: boolean,
    outOfArea: boolean,
}

interface Timetable {
    trains: Array<TimetableTrain>,
    stations: Array<Station>,
}

interface TimetableTrain {
    name: string,
    id: number,
    stations: {
        [index: string]: StationStop,
    },
}

export type {
    Station,
    StationStop,
    Timetable,
    TimetableTrain,
}
