
import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Calendar, RouteModel, StopTime, TripModel } from '../models';

import type { Route, Schedule, Train, Trip, TripStop } from '@/types';
import { RawGtfsRouteAndTrips } from '@/types/raw';
import { convertRawTrip } from '../util-from-gui/conversions';


function findOne(req, res) {
    const id = req.params.id;

    RouteModel.findByPk(id)
        .then((data) => {
            if ( data ) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find route with id=${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving route with id=${id}`,
                error: err.message,
            });
        });
}


function findAll(req, res) {
    RouteModel.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving routes",
                error: err.message,
            });
        });
}


function findRouteStations(req, res) {
    const id = req.params.id;

    // TODO - need to pull station information up to top level
    //        (don't need anything about specific Trips)
    RouteModel.findByPk(id, {
            include: [
                {
                    model: TripModel,
                    include: [
                        {
                            model: StopTime,
                        },
                    ],
                }
            ],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving route stations",
                error: err.message,
            });
        });
}


interface TrainMapping {
    [index: string]: Train,
}


async function findRouteTrips(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const rawRoute = await RouteModel.findByPk(id, {
            include: [
                {
                    model: TripModel,
                    include: [
                        {
                            model: StopTime,
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
                },
            ],
        });

        if ( rawRoute === null ) {
            res.status(404).send({
                message: `No route found: ${id}`,
            });
        } else {
            const jsonRoute = rawRoute.toJSON() as RawGtfsRouteAndTrips;
            const { trips, ...details } = jsonRoute;

            const routeId = parseInt(id);
            const agencyId = parseInt(details.agency_id || '');
            const convertedTrips = trips.map(convertRawTrip);

            const trainMapping = {} as TrainMapping;
            convertedTrips.forEach((trip: Trip) => {
                const trainId = parseInt(trip.shortName || '');

                if ( trainMapping.hasOwnProperty(trainId) ) {
                    trainMapping[trainId].trips.push(trip);
                } else {
                    trainMapping[trainId] = {
                        trainId,
                        routeId,
                        agencyId,
                        name: details.route_short_name || details.route_long_name || '',
                        direction: trip.direction,
                        trips: [trip],
                    } as Train;
                }
            });

            const route = {
                routeId,
                agencyId,
                shortName: details.route_short_name,
                longName: details.route_long_name,
                desc: details.route_desc,
                type: details.route_type,
                url: details.route_url,
                color: details.route_color,
                textColor: details.route_text_color,
                trains: Object.values(trainMapping),
            } as Route;

            res.send(route);
        }
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving route trips",
            error: error,
        });
    }
}


function debug(req, res) {
    res.send({
        keys: Object.keys(RouteModel),
        associations: RouteModel.associations,
    });
}


export default {
    findOne,
    findAll,
    findRouteStations,
    findRouteTrips,
    debug,
}
