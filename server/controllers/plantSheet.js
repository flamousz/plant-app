const {
	PlantSheet,
	Item,
	PlantType,
	materialConjunction,
	PesticideConjunction,
	fertilizerConjunction,
	SeedConjunction,
	Category,
	Uom,
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

	static async getPlantSheetById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await PlantSheet.findByPk(id, {
				include: [
					{ model: Item, as: "plant", attributes: ["name", "code"] },
					{
						model: SeedConjunction,
						attributes: ["id", 'seedid', 'plantsheetid'],
						include: {
							model: Item,
							attributes: ["name", "description", "standardqty"],
						},
					},
					{
						model: fertilizerConjunction,
						attributes: ["id", "dose", 'fertilizerid', 'plantsheetid'],
						include: {
							model: Item,
							attributes: ["name", "standardqty", "description"],
							include: [
								{
									model: Uom,
									attributes: ["name"],
								},
							],
						},
					},
					{
						model: PesticideConjunction,
						attributes: ["id", "dose", 'pesticideid', 'plantsheetid'],
						include: {
							model: Item,
							attributes: ["name", "standardqty", "description"],
							include: [
								{
									model: Uom,
									attributes: ["name"],
								},
								{
									model: Category,
									attributes: ["name"],
								},
							],
						},
					},
					{
						model: materialConjunction,
						attributes: ["id", "dose", 'materialid', 'plantsheetid'],
						include: {
							model: Item,
							attributes: ["name", "standardqty", "description"],
							include: [
								{
									model: Uom,
									attributes: ["name"],
								},
							],
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
			let {
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
				materials,
				pesticides,
				fertilizers,
				seeds,
			} = req.body;

			const plantsheet = await PlantSheet.create({
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
			});

			pesticides.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			materials.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			fertilizers.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			seeds.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			if (materials[0].materialid !== 0) {
				await materialConjunction.bulkCreate(materials);
			}
			if (pesticides[0].pesticideid !== 0) {
				await PesticideConjunction.bulkCreate(pesticides);
			}
			if (fertilizers[0].fertilizerid !== 0) {
				await fertilizerConjunction.bulkCreate(fertilizers);
			}
			if (seeds[0].seedid !== 0) {
				await SeedConjunction.bulkCreate(seeds);
			}

			res.status(200).json("new plantsheet has been added");
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

	static async putPlantSheet(req, res, next) {
		try {
			const { id } = req.params;
			let {
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
				PesticideConjunctions,
				SeedConjunctions,
				fertilizerConjunctions,
				materialConjunctions,
			} = req.body;

			await PlantSheet.update({
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
			}, {
				where: {id},
				returning: true
			})

			PesticideConjunction.forEach(el => {
				
			})
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = PlantSheetController;
