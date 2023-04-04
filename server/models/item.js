"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Item extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Item.belongsTo(models.Category, {
				foreignKey: "categoryid",
			});
			Item.belongsTo(models.Uom, {
				foreignKey: "uomid",
			});
		}
	}
	Item.init(
		{
			name: {
				type: DataTypes.STRING,
				unique: {
					msg: "Code has been exists",
				},
			},
			code: DataTypes.STRING,
			description: DataTypes.STRING,
			categoryid: DataTypes.INTEGER,
			uomid: DataTypes.INTEGER,
			standardqty: DataTypes.NUMERIC,
		},
		{
			sequelize,
			modelName: "Item",
		}
	);
	return Item;
};
