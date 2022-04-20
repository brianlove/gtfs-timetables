import { DataTypes } from 'sequelize';

import util from '../lib/util';

import sequelize from '../db/sequelize';

const Calendar = sequelize.define(
  "calendar",
  {
    service_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    monday: DataTypes.INTEGER,
    tuesday: DataTypes.INTEGER,
    wednesday: DataTypes.INTEGER,
    thursday: DataTypes.INTEGER,
    friday: DataTypes.INTEGER,
    saturday: DataTypes.INTEGER,
    sunday: DataTypes.INTEGER,
    start_date: DataTypes.STRING(8),
    end_date: DataTypes.STRING(8)
  },
  {
    freezeTableName: true,
  }
);

export default Calendar;
