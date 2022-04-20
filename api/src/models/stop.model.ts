import { DataTypes } from 'sequelize';

// import util from '../lib/util';

import sequelize from '../db/sequelize';

const Stop = sequelize.define(
  "stop",
  {
    stop_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    stop_code: DataTypes.STRING(20),
    stop_name: DataTypes.STRING(255),
    stop_desc: DataTypes.TEXT,
    // stop_lat: DataTypes.FLOAT(7),
    // stop_lon: DataTypes.FLOAT(7),
    stop_loc: DataTypes.GEOGRAPHY,
    zone_id: DataTypes.STRING(255),
    stop_url: DataTypes.STRING(255),
    location_type: DataTypes.INTEGER,
    parent_station: DataTypes.STRING(255),
    stop_timezone: DataTypes.STRING(100),
    wheelchair_boarding: DataTypes.INTEGER
  },
  {
    timestamps: false,
  }
);

export default Stop;
