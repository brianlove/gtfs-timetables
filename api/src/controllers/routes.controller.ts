
import { Op } from 'sequelize';

import { Calendar, RouteModel, StopTime, TripModel } from '../models';


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


function findRouteTrips(req, res) {
    const id = req.params.id;

    RouteModel.findByPk(id, {
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
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving route trips",
                error: err.message,
            });
        });
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
