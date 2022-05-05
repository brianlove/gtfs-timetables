
import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Calendar, StopTimeModel, TripModel } from '../models';

import type { Route, Schedule, Train, Trip, TripStop } from '@/types';
import { convertRawTrip } from '../util-from-gui/conversions';


function findTripsForRoute(req, res) {
    const id = req.params.id;

    TripModel.findAll({
            where: {
                route_id: id,
            },
            // attributes: [
            //     'route_id',
            //     'service_id',
            //     'trip_id',
            //     'trip_headsign',
            //     'trip_short_name',
            //     'direction_id',
            // ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving trips",
                error: err.message,
            });
        });
}


function findTripsAndStopTimesForRoute(req, res) {
    const id = req.params.id;

    // <route> HAS MANY <trip>
    // <trip> HAS MANY <stop_time>
    // <stop_time> HAS ONE <stop>

    // 1) Get a `route_id`
    // 2) Determine the trips for that route
    // 3) Determine the stop_times for each trip
    // 4) Determine the stop for that stop_time


    TripModel.findAll({
            where: {
                route_id: id,
            },
            // attributes: [
            //     'route_id',
            //     'service_id',
            //     'trip_id',
            //     'trip_short_name',
            // ],
            include: [
                {
                    model: StopTimeModel,
                    // through: {
                    //     as: 'stops',
                    // },
                },
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving trips",
                error: err.message,
            });
        });
}


async function findTripsForTrain(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const rawTrips = await TripModel.findAll({
            where: {
                trip_short_name: id,
            },
            include: [
                {
                    model: StopTimeModel,
                },
                {
                    model: Calendar,
                    where: {
                        start_date: {
                            [Op.lte]: '2022-04-27',
                        },
                        end_date: {
                            [Op.gte]: '2022-04-27',
                        },
                    },
                },
            ],
        });

        const trips = rawTrips.map(trip => convertRawTrip(trip.toJSON()));
        const train = {
            routeId: trips[0].routeId,
            direction: trips[0].direction,
            name: trips[0].shortName,
            // agencyId,
            trips,
        } as Train;

        res.send(train);
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving trips",
            error: error,
        });
    }
}


function debug(req, res) {
    res.send({
        keys: Object.keys(TripModel),
        associations: TripModel.associations,
        // tableAttributes: Trip.tableAttributes,
    });
}


export default {
    findTripsForRoute,
    findTripsAndStopTimesForRoute,
    findTripsForTrain,
    debug,
}
