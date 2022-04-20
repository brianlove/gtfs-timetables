import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const Transfer = sequelize.define(
  "transfer",
  {
    from_stop_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      references: {
        model: util.makeModelReference(sequelize, "stop"),
        key: "stop_id"
      }
    },
    to_stop_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      references: {
        model: util.makeModelReference(sequelize, "stop"),
        key: "stop_id"
      }
    },
    transfer_type: DataTypes.INTEGER,
    min_transfer_time: DataTypes.INTEGER
  },
  {
    timestamps: false,
  }
);

export default Transfer;
