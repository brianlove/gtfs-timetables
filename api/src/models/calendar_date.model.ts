import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const CalendarDate = sequelize.define(
  "calendar_date",
  {
    service_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      references: {
        model: util.makeModelReference(sequelize, "calendar"),
        key: "service_id"
      }
    },
    date: {
      type: DataTypes.STRING(8),
      primaryKey: true
    },
    exception_type: DataTypes.INTEGER
  },
  {
    timestamps: false,
  }
);

export default CalendarDate;
