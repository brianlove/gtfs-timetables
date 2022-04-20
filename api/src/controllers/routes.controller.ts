
import { Route } from '../models';


function findOne(req, res) {
    const id = req.params.id;

    Route.findByPk(id)
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
    Route.findAll()
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

    Route.findByPk(id)
        .then((data) => {
            //
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving route stations",
                error: err.message,
            });
        });
}


function debug(req, res) {
    res.send({
        keys: Object.keys(Route),
        associations: Route.associations,
        // tableAttributes: Route.tableAttributes,
    });
}


export default {
    findOne,
    findAll,
    findRouteStations,
    debug,
}
