
import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const Trip = sequelize.define(
  "trip", 
  {
    route_id: {
      type: DataTypes.STRING(255),
      references: {
        model: util.makeModelReference(sequelize, "route"),
        key: "route_id"
      }
    },
    service_id: {
      type: DataTypes.STRING(255),
      references: {
        model: util.makeModelReference(sequelize, "calendar"),
        key: "service_id"
      }
    },
    trip_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    trip_headsign: DataTypes.STRING(255),
    trip_short_name: DataTypes.STRING(100),
    direction_id: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    block_id: DataTypes.STRING(255),
    shape_id: DataTypes.STRING(255),  // association omitted.  See spatial trip model for relation.
    wheelchair_accessible: DataTypes.INTEGER,
    bikes_allowed: DataTypes.INTEGER
  },
  {
    timestamps: false,
  }
);

// Trip.associate = function(models) {
//   console.error("[trip:new] associate()"); // DEBUG
//   console.info("[trip:new] associate()"); // DEBUG
//   Trip.belongsTo(models.route, {
//     foreignKeyConstraint: true,
//     foreignKey: "route_id"
//   });

//   Trip.belongsTo(models.calendar, {
//     foreignKeyConstraint: true,
//     foreignKey: "service_id"
//   });

//   Trip.hasMany(models.stop_time, {
//     foreignKey: 'trip_id'
//   });

//   Trip.hasMany(models.frequency, {
//     foreignKey: 'trip_id'
//   });
// }

export default Trip
