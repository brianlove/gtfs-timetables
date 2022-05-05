
import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Calendar, RouteModel, StopModel, StopTimeModel, TripModel } from '../models';

import type { StopWithTrips, TripStop, StopAndTrip } from '@/types';
import { RawGtfsStop, RawGtfsStopExtended, RawGtfsStopTimeWithTrip, RawGtfsTrip } from '@/types/raw';
import { NonBoundedTime } from '../util-from-gui/time-util';
import { convertRawCalendar } from '../util-from-gui/conversions';


async function findOne(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const rawStop = await StopModel.findByPk(id);

        if ( rawStop === null ) {
            res.status(404).send({
                message: `Cannot find station with id=${id}`,
            });
        } else {
            res.send(rawStop);
        }
    } catch (error) {
        res.status(500).send({
            message: `Error retrieving station with id=${id}`,
            error: error,
        });
    }
}


function findAll(req: Request, res: Response) {
    StopModel.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving stations",
                error: err.message,
            });
        });
}


async function findStationTrains(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const rawStop = await StopModel.findByPk(id, {
            include: [
                {
                    model: StopTimeModel,
                    include: [
                        {
                            model: TripModel,
                            include: [
                                {
                                    model: RouteModel,
                                },
                                {
                                    model: Calendar,
                                    // where: {
                                    //     start_date: {
                                    //         [Op.lte]: '2022-04-27',
                                    //     },
                                    //     end_date: {
                                    //         [Op.gte]: '2022-04-27',
                                    //     },
                                    // },
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if ( rawStop === null ) {
            res.status(404).send({
                message: `Cannot find station '${id}'`,
            });
        } else {
            const jsonStop = rawStop.toJSON() as RawGtfsStopExtended;
            const { stop_times, ...details } = jsonStop;

            const trainArray = stop_times.map((stop_time) => {
                const tripId = parseInt(stop_time.trip.trip_id);
                const routeId = parseInt(stop_time.trip.route_id);

                return {
                    stop: {
                        arrivalTime: new NonBoundedTime(stop_time.arrival_time),
                        departureTime: new NonBoundedTime(stop_time.departure_time),
                        stopId: stop_time.stop_id,
                        sequence: stop_time.stop_sequence,
                        headsign: stop_time.stop_headsign,
                        pickupType: stop_time.pickup_type,
                        dropoffType: stop_time.drop_off_type,
                    },
                    trip: {
                        tripId: tripId,
                        routeId: routeId,
                        serviceStartDate:  stop_time.trip.calendar.start_date,
                        serviceEndDate: stop_time.trip.calendar.end_date,
                        schedule: convertRawCalendar(stop_time.trip.calendar),
                        headsign: stop_time.trip.trip_headsign,
                        shortName: stop_time.trip.trip_short_name,
                        direction: stop_time.trip.direction_id,
                        blockId: stop_time.trip.block_id,
                        // TODO - rest of fields?
                        routeShortName: stop_time.trip.route.route_short_name,
                        routeLongName: stop_time.trip.route.route_long_name,
                    },
                } as StopAndTrip;
            });

            const stop = {
                stopId: details.stop_id,
                code: details.stop_code,
                name: details.stop_name,
                desc: details.stop_desc,
                // lat: details.stop_loc, // TODO
                // lon: details.stop_loc, // TODO
                zoneId: details.zone_id,
                url: details.stop_url,
                type: details.location_type,
                parentStation: details.parent_station,
                trips: trainArray,
                stop_times: stop_times,
            } as StopWithTrips;

            res.send(stop);
        }
    } catch (error) {
        res.status(500).send({
            message: `Error retrieving trains for station '${id}'`,
            error: error,
        });
    }
}


export default {
    findOne,
    findAll,
    findStationTrains,
}
