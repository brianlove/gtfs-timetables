
import { Stop } from '../models';


function findOne(req, res) {
    const id = req.params.id;

    Stop.findByPk(id)
        .then((data) => {
            if ( data ) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find station with id=${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving station with id=${id}`,
                error: err.message,
            });
        });
}


function findAll(req, res) {
    Stop.findAll()
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


export default {
    findOne,
    findAll,
}
