import { DataTypes } from 'sequelize';

// import util from '../lib/util';

import sequelize from '../db/sequelize';

const FeedInfo = sequelize.define(
  "feed_info",
  {
    feed_publisher_name: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    feed_publisher_url: DataTypes.STRING(255),
    feed_lang: DataTypes.STRING(255),
    feed_start_date: DataTypes.DATE,
    feed_end_date: DataTypes.DATE,
    feed_version: DataTypes.STRING(255)
  },
  {
    freezeTableName: true,
  }
);

export default FeedInfo;
