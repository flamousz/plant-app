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
			Item.hasMany(models.PlantData, {
				foreignKey: "itemid",
			});
			Item.hasMany(models.materialConjunction, {
				foreignKey: "materialid",
			});
			Item.hasMany(models.PesticideConjunction, {
				foreignKey: "pesticideid",
			});
			Item.hasMany(models.fertilizerConjunction, {
				foreignKey: "fertilizerid",
			});
			Item.hasMany(models.SeedConjunction, {
				foreignKey: "seedid",
			});
			Item.hasMany(models.PlantSheet, {
				foreignKey: "plantid",
				as: "plant",
			});
			Item.hasMany(models.PlantSheet, {
				foreignKey: "materialid",
				as: "material",
			});
			Item.hasMany(models.PlantSheet, {
				foreignKey: "pesticideid",
				as: "pesticide",
			});
			Item.hasMany(models.PlantSheet, {
				foreignKey: "fertilizerid",
				as: "fertilizer",
			});
			Item.hasMany(models.PlantSheet, {
				foreignKey: "seedid",
				as: "seed",
			});
		}
	}
	Item.init(
		{
			name: DataTypes.STRING,
			code: {
				type: DataTypes.STRING,
				unique: {
					msg: "Code has been exists",
				},
			},
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
