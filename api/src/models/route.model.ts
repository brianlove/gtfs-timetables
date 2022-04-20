import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const Route = sequelize.define(
  "route",
  {
    route_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    agency_id: {
      type: DataTypes.STRING(255),
      references: {
        model: util.makeModelReference(sequelize, 'agency'),
        key: "agency_id"
      }
    },
    route_short_name: DataTypes.STRING(50),
    route_long_name: DataTypes.STRING(255),
    route_desc: DataTypes.TEXT,
    route_type: DataTypes.INTEGER,
    route_url: DataTypes.STRING(255),
    route_color: DataTypes.STRING(255),
    route_text_color: DataTypes.STRING(255)
  },
  {
    timestamps: false,
  }
);

export default Route;
