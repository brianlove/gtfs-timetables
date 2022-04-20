import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const StopTime = sequelize.define(
  "stop_time",
  {
    trip_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      references: {
        model: util.makeModelReference(sequelize, 'trip'),
        key: 'trip_id'
      }
    },
    arrival_time: DataTypes.INTEGER,
    departure_time: DataTypes.INTEGER,
    stop_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      references: {
        model: util.makeModelReference(sequelize, 'stop'),
        key: 'stop_id'
      }
    },
    stop_sequence: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    stop_headsign: DataTypes.STRING(255),
    pickup_type: DataTypes.INTEGER,
    drop_off_type: DataTypes.INTEGER,
    shape_dist_traveled: DataTypes.FLOAT,
    timepoint: DataTypes.INTEGER
  },
  {
    timestamps: false,
  }
);

export default StopTime;
