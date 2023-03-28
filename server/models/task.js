'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.TypeTask)
      Task.belongsTo(models.SubTask)
      Task.belongsTo(models.Terrain)
    }
  }
  Task.init({
    TypeTaskId: DataTypes.INTEGER,
    SubTaskId: DataTypes.INTEGER,
    TerrainId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};