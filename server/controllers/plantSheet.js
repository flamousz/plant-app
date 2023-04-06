const {
	PlantSheet,
	Item,
	PlantType,
	materialConjunction,
	PesticideConjunction,
	fertilizerConjunction,
	SeedConjunction,
} = require("../models/index");

class PlantSheetController {
	static async getPlantSheet(req, res, next) {
		try {
			const data = await PlantSheet.findAll({
				include: [
					{ model: Item, as: "plant", attributes: ["name"] },
					{
						model: SeedConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: fertilizerConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: PesticideConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: materialConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: PlantType,
						attributes: ["name"],
					},
				],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
			});
			if (!data) {
				throw {
					name: "NotFound",
				};
			}
			res.status(200).json(data);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	// static async getPlantSheet(req, res, next) {
	// 	try {
	// 		const data = await PlantSheet.findAll({
	// 			include: [
	// 				{ model: Item, as: "plant", attributes: ["name"] },
	// 				{ model: Item, as: "material", attributes: ["name"] },
	// 				{ model: Item, as: "pesticide", attributes: ["name"] },
	// 				{ model: Item, as: "fertilizer", attributes: ["name"] },
	// 				{ model: Item, as: "seed", attributes: ["name"] },
	// 				{
	// 					model: PlantType,
	// 					attributes: ["name"],
	// 				},
	// 			],
	// 			attributes: {
	// 				exclude: ["createdAt", "updatedAt"],
	// 			},
	// 			order: [["createdAt", "DESC"]],
	// 		});
	// 		if (!data) {
	// 			throw {
	// 				name: "NotFound",
	// 			};
	// 		}
	// 		res.status(200).json(data);
	// 	} catch (err) {
	// 		console.log(err);
	// 		next(err);
	// 	}
	// }

	static async getPlantSheetById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await PlantSheet.findByPk(id, {
				include: [
					{ model: Item, as: "plant", attributes: ["name"] },
					{
						model: SeedConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: fertilizerConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: PesticideConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: materialConjunction,
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name"],
						},
					},
					{
						model: PlantType,
						attributes: ["name"],
					},
				],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
			});

			if (!data) {
				throw {
					name: "NotFound",
				};
			}

			res.status(200).json(data);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async postPlantSheet(req, res, next) {
		try {
			const {
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
				materialid,
				pesticideid,
				fertilizerid,
				seedid,
			} = req.body;

			await PlantSheet.create({
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
				materialid,
				pesticideid,
				fertilizerid,
				seedid,
			});

			res.status(201).json(`successfully added new plant data`);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async putPlantSheet(req, res, next) {
		try {
			const { id } = req.params;
			const {
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
				materialid,
				pesticideid,
				fertilizerid,
				seedid,
			} = req.body;
			let findData = await PlantSheet.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await PlantSheet.update(
				{
					plantid,
					seedlingAge,
					harvestAge,
					harvestTime,
					cropAge,
					cropProdWeight,
					planttypeid,
					materialid,
					pesticideid,
					fertilizerid,
					seedid,
				},
				{
					where: { id },
					returning: true,
				}
			);
			res.status(200).json(`updated successfully`);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async deletePlantSheet(req, res, next) {
		try {
			const { id } = req.params;
			const data = await PlantSheet.findByPk(id, {
				include: [{ model: Item, as: "plant", attributes: ["name"] }],
			});
			if (!data) {
				throw {
					name: "NotFound",
				};
			}

			await PlantSheet.destroy({
				where: { id },
			});

			res.status(200).json(`${data.plant.name} has been deleted`);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = PlantSheetController;
