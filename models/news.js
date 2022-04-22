'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.hasMany(models.User, {
        foreignKey: 'news_id',
        as: 'users',
      });
    }
  }
  News.init({
    news_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};