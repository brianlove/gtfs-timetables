
import { db } from '../db/gtfs-sequelize';


function findOne(req, res) {
    const id = req.params.id;

    db.route.findByPk(id)
        .then((data) => {
            if ( data ) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Route with id=${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving Route with id=${id}`,
                error: err.message,
            });
        });
}


function findAll(req, res) {
    db.route
        .findAll()
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

export default {
    findOne,
    findAll,
}
