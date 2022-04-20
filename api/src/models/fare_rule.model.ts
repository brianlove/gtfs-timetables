import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const FareRule = sequelize.define(
  "fare_rule",
  {
    fare_id: {
      type: DataTypes.STRING(255),
      references: {
        model: util.makeModelReference(sequelize, "fare_attribute"),
        key: "fare_id"
      }
    },
    route_id: DataTypes.STRING(255),
    origin_id: DataTypes.STRING(255),
    destination_id: DataTypes.STRING(255),
    contains_id: DataTypes.STRING(255)
  },
  {
    freezeTableName: true,
  }
);

export default FareRule;
