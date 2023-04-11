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
						attributes: ["id"],
						include: {
							model: Item,
							attributes: ["name", "description", "standardqty"],
						},
					},
					{
						model: fertilizerConjunction,
						attributes: ["id", 'dose'],
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
						attributes: ["id", 'dose'],
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
									attributes: ['name']
								}
							],
						},
					},
					{
						model: materialConjunction,
						attributes: ["id", 'dose'],
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
			
			console.log(pesticides,'<< INI PESTICIDES');
			// fertilizers.pop();
			// fungiPesticide.pop();
			// materials.pop();
			// insecticidePesticide.pop();
			// zptPesticide.pop();
			// perekatPesticide.pop();
			// seeds.pop()

			const plantsheet = await PlantSheet.create({
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
			});

			// materials.forEach((el) => {
			// 	el.plantsheetid = plantsheet.id;
			// });

			pesticides.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			// seeds.forEach((el) => {
			// 	el.plantsheetid = plantsheet.id
			// })
			
			// fertilizers.forEach((el) => {
			// 	el.plantsheetid = plantsheet.id;
			// });

			// await materialConjunction.bulkCreate(materials);
			await PesticideConjunction.bulkCreate(pesticides);
			// await SeedConjunction.bulkCreate(seeds)
			// await fertilizerConjunction.bulkCreate(fertilizers);

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
}

module.exports = PlantSheetController;
