
import { StopTime, Trip } from '../models';


function findTripsForRoute(req, res) {
    const id = req.params.id;

    Trip.findAll({
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


    Trip.findAll({
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
                    model: StopTime,
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


function findTripsForTrain(req, res) {
    const id = req.params.id;

    Trip.findAll({
            where: {
                trip_short_name: id,
            },
            include: [
                {
                    model: StopTime,
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


function debug(req, res) {
    res.send({
        keys: Object.keys(Trip),
        associations: Trip.associations,
        // tableAttributes: Trip.tableAttributes,
    });
}


export default {
    findTripsForRoute,
    findTripsAndStopTimesForRoute,
    findTripsForTrain,
    debug,
}
