import { DataTypes } from 'sequelize';

// import util from '../lib/util';

import sequelize from '../db/sequelize';

const FareAttribute = sequelize.define(
  "fare_attribute",
  {
    fare_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    price: DataTypes.FLOAT,
    currency_type: DataTypes.STRING(3),
    payment_method: DataTypes.INTEGER,
    transfers: DataTypes.INTEGER,
    transfer_duration: DataTypes.INTEGER
  },
  {
    freezeTableName: true,
  }
);

export default FareAttribute;
