'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApprovalMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ApprovalMaster.init({
    sequenceLevel: {
      type: DataTypes.INTEGER,
      unique: {
        msg: 'Approval sequence has been exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Sequence Level cannot be empty'
        },
        notNull: {
          msg: 'Sequence Level cannot be empty'
        }
      }
    },
    pronoun: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Pronoun has been exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Pronoun cannot be empty'
        },
        notNull: {
          msg: 'Pronoun cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ApprovalMaster',
  });
  return ApprovalMaster;
};