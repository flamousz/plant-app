'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pesticide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pesticide.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    dose: DataTypes.NUMERIC,
    uom: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Pesticide',
  });
  return Pesticide;
};