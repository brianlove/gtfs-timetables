import dbConfig from '../config/db.config';

const Database = require('../models');

const config = {
    database: `postgres://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:5432/${dbConfig.DB}`,
    sequelizeOptions: {},
    spatial: false,
};

const connectToDatabase = function (/*rawModels*/) {
    const db = Database(config.database, config.sequelizeOptions ? config.sequelizeOptions : {})
    // if (!rawModels && config.spatial) {
    //     db.stop = db.sequelize.import('models/spatial/stop.js')
    //     db.shape_gis = db.sequelize.import('models/spatial/shape_gis.js')
    //     db.trip = db.sequelize.import('models/spatial/trip.js')
    //     // reassociate spatially-enable models
    //     db.stop.associate(db)
    //     db.shape_gis.associate(db)
    //     db.trip.associate(db)
    // }
    return db
};

const db = connectToDatabase();

export {
    db,
}
