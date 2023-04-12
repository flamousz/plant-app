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
						attributes: ["id", "seedid", "plantsheetid"],
						include: {
							model: Item,
							attributes: ["name", "description", "standardqty"],
						},
					},
					{
						model: fertilizerConjunction,
						attributes: ["id", "dose", "fertilizerid", "plantsheetid"],
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
						attributes: ["id", "dose", "pesticideid", "plantsheetid"],
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
						attributes: ["id", "dose", "materialid", "plantsheetid"],
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
			console.log(req.body,'<< ini req.body');
			let {
				plantid,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				planttypeid,
				materialConjunctions,
				PesticideConjunctions,
				fertilizerConjunctions,
				SeedConjunctions,
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

			PesticideConjunctions.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			materialConjunctions.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			fertilizerConjunctions.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			SeedConjunctions.forEach((el) => {
				el.plantsheetid = plantsheet.id;
			});

			if (materialConjunctions[0].materialid !== 0) {
				await materialConjunction.bulkCreate(materialConjunctions);
			}
			if (PesticideConjunctions[0].pesticideid !== 0) {
				await PesticideConjunction.bulkCreate(PesticideConjunctions);
			}
			if (fertilizerConjunctions[0].fertilizerid !== 0) {
				await fertilizerConjunction.bulkCreate(fertilizerConjunctions);
			}
			if (SeedConjunctions[0].seedid !== 0) {
				await SeedConjunction.bulkCreate(SeedConjunctions);
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
			console.log(req.body,'<< ini req.body');
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

			const initialPlantsheet = await PlantSheet.findByPk(id, {
				include: [
					{ model: Item, as: "plant", attributes: ["name", "code"] },
					{
						model: SeedConjunction,
						attributes: ["id", "seedid", "plantsheetid"],
					},
					{
						model: fertilizerConjunction,
						attributes: ["id", "dose", "fertilizerid", "plantsheetid"],
					},
					{
						model: PesticideConjunction,
						attributes: ["id", "dose", "pesticideid", "plantsheetid"],
					},
					{
						model: materialConjunction,
						attributes: ["id", "dose", "materialid", "plantsheetid"],
					},
				],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
			});

			const initialIDofPesticide = initialPlantsheet.PesticideConjunctions.map((el) => el.id);
			const initialIDofMaterial = initialPlantsheet.materialConjunctions.map((el) => el.id)
			const initialIDofFertilizer = initialPlantsheet.fertilizerConjunctions.map((el) => el.id)
			const initialIDofSeed = initialPlantsheet.SeedConjunctions.map((el) => el.id)
			console.log(initialIDofSeed,'<<< initialIDofSeed');
			
			const pesticidesNotDeletedPlan = PesticideConjunctions.map( (el) => el.id );
			const materialsNotDeletedPlan = materialConjunctions.map((el) => el.id)
			const fertilizersNotDeletedPlan = fertilizerConjunctions.map((el) => el.id)
			const seedsNotDeletedPlan = SeedConjunctions.map((el) => el.id)
			console.log(seedsNotDeletedPlan,'<<< seedsNotDeletedPlan');
			
			const pesticidesDeletedPlan = initialIDofPesticide.filter((el) => !pesticidesNotDeletedPlan.includes(el));
			const materialsDeletedPlan = initialIDofMaterial.filter(el => !materialsNotDeletedPlan.includes(el))
			const fertilizersDeletedPlan = initialIDofFertilizer.filter(el => !fertilizersNotDeletedPlan.includes(el))
			const seedsDeletedPlan = initialIDofSeed.filter(el => !seedsNotDeletedPlan.includes(el))
			console.log(seedsDeletedPlan,'<<< seedsDeletedPlan');

			// searching element that not have 'id' key
			const newPesticideWithoutId = PesticideConjunctions.filter((el) => !el.hasOwnProperty("id"))
			const newMaterialsWithoutId = materialConjunctions.filter(el => !el.hasOwnProperty('id'))
			const newFertilizersWithoutId = fertilizerConjunctions.filter(el => !el.hasOwnProperty('id'))
			const newSeedsWithoutId = SeedConjunctions.filter(el => !el.hasOwnProperty('id'))

			// searching element that  have 'id' key
			const newPesticideWithId = PesticideConjunctions.filter((el) => el.hasOwnProperty("id")); 
			const newMaterialsWithId = materialConjunctions.filter(el => el.hasOwnProperty('id'))
			const newFertilizersWithId = fertilizerConjunctions.filter(el => el.hasOwnProperty('id'))
			const newSeedsWithId = SeedConjunctions.filter(el => el.hasOwnProperty('id'))

			await PlantSheet.update(
				{
					plantid,
					seedlingAge,
					harvestAge,
					harvestTime,
					cropAge,
					cropProdWeight,
					planttypeid,
				},
				{
					where: { id },
					returning: true,
				}
			);

			if (pesticidesDeletedPlan[0]) {
				for (const el of pesticidesDeletedPlan) {
					await PesticideConjunction.destroy({
						where: {
							id: el,
						},
					});
				}
			}
			if (materialsDeletedPlan[0]) {
				for (const el of materialsDeletedPlan) {
					await materialConjunction.destroy({
						where: {
							id: el
						}
					})
				}
			}
			if (fertilizersDeletedPlan[0]) {
				for (const el of fertilizersDeletedPlan) {
					await fertilizerConjunction.destroy({
						where: {
							id: el
						}
					})
				}
			}
			if (seedsDeletedPlan[0]) {
				for (const el of seedsDeletedPlan) {
					await SeedConjunction.destroy({
						where: {
							id: el
						}
					})
				}
			}

			if (newPesticideWithId[0]) {
				for (const el of newPesticideWithId) {
					await PesticideConjunction.update(
						{
							dose: el.dose,
							pesticideid: el.pesticideid,
						},
						{
							where: {
								id: el.id,
							},
						}
					);
				}
			}
			if (newMaterialsWithId[0]) {
				for (const el of newMaterialsWithId) {
					await materialConjunction.update({
						dose: el.dose,
						materialid: el.materialid
					}, 
					{
						where: {
							id: el.id
						}
					})
				}
			}
			if (newFertilizersWithId[0]) {
				for (const el of newFertilizersWithId) {
					await fertilizerConjunction.update({
						dose: el.dose,
						fertilizerid: el.fertilizerid
					}, 
					{
						where: {
							id: el.id
						}
					})
				}
			}
			if (newSeedsWithId[0]) {
				for (const el of newSeedsWithId) {
					await SeedConjunction.update({
						seedid: el.seedid
					}, 
					{
						where: {
							id: el.id
						}
					})
				}
			}
			console.log(newSeedsWithoutId, '<< ini newSeedsWithoutId');
			if (newPesticideWithoutId[0]) {
				newPesticideWithoutId.forEach((el) => (el.plantsheetid = id));
				await PesticideConjunction.bulkCreate(newPesticideWithoutId);
			}
			if (newMaterialsWithoutId[0]) {
				newMaterialsWithoutId.forEach(el => el.plantsheetid = id)
				await materialConjunction.bulkCreate(newMaterialsWithoutId)
			}
			if (newFertilizersWithoutId[0]) {
				newFertilizersWithoutId.forEach(el => el.plantsheetid = id)
				await fertilizerConjunction.bulkCreate(newFertilizersWithoutId)
			}
			if (newSeedsWithoutId[0]) {
				newSeedsWithoutId.forEach(el => el.plantsheetid = id)
				await SeedConjunction.bulkCreate(newSeedsWithoutId)
			}

			res.status(200).json(`plantsheet successfully updated`);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = PlantSheetController;
