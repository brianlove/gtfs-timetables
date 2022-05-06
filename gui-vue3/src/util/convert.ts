
import type { Train } from '@/types';
import type { Timetable, TimetableTrain } from '@/types/timetable';

import { NonBoundedTime } from '@/util';

function createTimetableTrain(train: Train): TimetableTrain {
    const result = {
        name: train.name,
        id: train.trainId,
        stations: {},
    } as TimetableTrain;

    train.trips[0].stops.forEach((stop) => {
        result.stations[stop.stopId] = {
            code: stop.stopId,
            arrive: stop.arrivalTime,
            depart: stop.departureTime,
            bypass: false,
            outOfArea: false,
        };
    });

    return result;
}


function generateTimetable(trains: Array<Train>, sortStation?: string): Timetable {
    const timetable = {
        trains: [],
        stations: [],
    } as Timetable;

    trains.forEach((train) => {
        timetable.trains.push(createTimetableTrain(train));
    });

    if ( sortStation ) {
        timetable.trains.sort((trainA, trainB) => {
            if ( !trainA.stations?.[sortStation] ) {
                return -1;
            } else if ( !trainB.stations?.[sortStation] ) {
                return 1;
            } else {
                const departureA = new NonBoundedTime(trainA.stations[sortStation].depart);
                const departureB = new NonBoundedTime(trainB.stations[sortStation].depart);
                return departureA.compare(departureB);
            }
        });
    }

    return timetable;
}

export {
    createTimetableTrain,
    generateTimetable,
}
