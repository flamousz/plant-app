'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Crop.init({
    name: DataTypes.STRING,
    seedlingAge: DataTypes.INTEGER,
    harvestAge: DataTypes.INTEGER,
    harvestTime: DataTypes.INTEGER,
    cropAge: DataTypes.INTEGER,
    cropProdWeight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Crop',
  });
  return Crop;
};