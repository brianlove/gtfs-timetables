import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const Frequency = sequelize.define(
  "frequency",
  {
    trip_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      references: {
        model: util.makeModelReference(sequelize, "trip"),
        key: "trip_id"
      }
    },
    start_time: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    end_time: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    headway_secs: DataTypes.INTEGER,
    exact_times: DataTypes.INTEGER
  },
  {
    freezeTableName: true,
  }
);

export default Frequency;
