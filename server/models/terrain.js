'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Terrain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Terrain.hasMany(models.Task)
    }
  }
  Terrain.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Terrain',
  });
  return Terrain;
};