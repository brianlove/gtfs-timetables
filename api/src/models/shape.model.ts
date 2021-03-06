import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const Shape = sequelize.define(
  "shape",
  {
    shape_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    shape_pt_lat: DataTypes.FLOAT(7),
    shape_pt_lon: DataTypes.FLOAT(7),
    shape_pt_sequence: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    shape_dist_traveled: DataTypes.FLOAT
  },
  {
    freezeTableName: true,
  }
);

export default Shape;
