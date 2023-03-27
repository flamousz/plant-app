'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cropArea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cropArea.init({
    name: DataTypes.STRING,
    area: DataTypes.INTEGER,
    type: DataTypes.STRING,
    detailPlace: DataTypes.STRING,
    CropId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cropArea',
  });
  return cropArea;
};