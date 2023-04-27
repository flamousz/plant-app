const { Op } = require("sequelize");
const {
	PlantSchedule,
	PlantSheet,
	CropArea,
	Item,
	sequelize,
	HarvestOutcome,
	PlantType,
	SeedConjunction,
	fertilizerConjunction,
	PesticideConjunction,
	materialConjunction,
	Uom,
	Category,
} = require("../models/index");

class PlantScheduleController {
	static async getSchedule(req, res, next) {
		try {
			const { filterPlant, filterLocation, commonDate, filterDate } =
				req.query;
			console.log(commonDate, "<< commonDate");
			console.log(filterDate, "<< filterDate");
			console.log(filterPlant, "<< filterPlant");
			console.log(filterLocation, "<< filterLocation");
			const opt = {
				include: [
					{
						model: CropArea,
						attributes: ["name"],
					},
					{
						model: PlantSheet,
						include: {
							model: Item,
							as: "plant",
							attributes: ["name"],
						},
						attributes: ["seedlingAge", "harvestAge", "harvestTime"],
					},
				],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["seedlingDate", "ASC"]],
			};

			if (
				filterPlant !== "" &&
				typeof filterPlant !== "undefined" &&
				filterLocation !== "" &&
				typeof filterLocation !== "undefined" &&
				commonDate !== "" &&
				typeof commonDate !== "undefined"
			) {
				console.log("masuk ke if 3 perbandingan");
				const query = filterPlant.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				const queryLocation = filterLocation.split(",").map((item) => ({
					[Op.eq]: item,
				}));

				if (commonDate.length > 1) {
					console.log(
						"masuk ke if 3 perbandingan dengan commonDate.length > 1"
					);
					opt.where = {
						"$PlantSheet.plant.name$": {
							[Op.or]: query,
						},
						"$CropArea.name$": {
							[Op.or]: queryLocation,
						},
						[Op.and]: [
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								">=",
								commonDate[0]
							),
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								"<=",
								commonDate[1]
							),
						],
					};
				} else {
					console.log(
						"masuk ke if 3 perbandingan dengan commonDate.length < 2"
					);
					opt.where = {
						"$PlantSheet.plant.name$": {
							[Op.or]: query,
						},
						"$CropArea.name$": {
							[Op.or]: queryLocation,
						},
						[Op.and]: sequelize.where(
							sequelize.fn("DATE", sequelize.col(filterDate)),
							"=",
							commonDate[0]
						),
					};
				}
			} else if (
				filterPlant !== "" &&
				typeof filterPlant !== "undefined" &&
				commonDate !== "" &&
				typeof commonDate !== "undefined"
			) {
				console.log(
					"masuk ke if 2 perbandingan antara filterPlant dan commonDate"
				);
				const query = filterPlant.split(",").map((item) => ({
					[Op.eq]: item,
				}));

				if (commonDate.length > 1) {
					console.log(
						"masuk ke if 2 perbandingan antara filterPlant dan commonDate dengan commonDate.length > 1"
					);
					opt.where = {
						"$PlantSheet.plant.name$": {
							[Op.or]: query,
						},
						[Op.and]: [
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								">=",
								commonDate[0]
							),
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								"<=",
								commonDate[1]
							),
						],
					};
				} else {
					console.log(
						"masuk ke if 2 perbandingan antara filterLocation dan commonDate dengan commonDate.length < 2"
					);
					opt.where = {
						"$PlantSheet.plant.name$": {
							[Op.or]: query,
						},
						[Op.and]: sequelize.where(
							sequelize.fn("DATE", sequelize.col(filterDate)),
							"=",
							commonDate[0]
						),
					};
				}
			} else if (
				filterLocation !== "" &&
				typeof filterLocation !== "undefined" &&
				commonDate !== "" &&
				typeof commonDate !== "undefined"
			) {
				console.log(
					"masuk ke if 2 perbandingan antara filterLocation dan commonDate"
				);
				const queryLocation = filterLocation.split(",").map((item) => ({
					[Op.eq]: item,
				}));

				if (commonDate.length > 1) {
					console.log(
						"masuk ke if 2 perbandingan dengan commonDate.length > 1"
					);

					opt.where = {
						"$CropArea.name$": {
							[Op.or]: queryLocation,
						},
						[Op.and]: [
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								">=",
								commonDate[0]
							),
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								"<=",
								commonDate[1]
							),
						],
					};
				} else {
					console.log(
						"masuk ke if 2 perbandingan dengan commonDate.length < 2"
					);
					opt.where = {
						"$CropArea.name$": {
							[Op.or]: queryLocation,
						},
						[Op.and]: sequelize.where(
							sequelize.fn("DATE", sequelize.col(filterDate)),
							"=",
							commonDate[0]
						),
					};
				}
			} else if (
				filterPlant !== "" &&
				typeof filterPlant !== "undefined" &&
				filterLocation !== "" &&
				typeof filterLocation !== "undefined"
			) {
				console.log(
					"masuk ke if 2 perbandingan antara filterLocation dan filterPlant"
				);
				const query = filterPlant.split(",").map((item) => ({
					[Op.eq]: item,
				}));

				const queryLocation = filterLocation.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					"$PlantSheet.plant.name$": {
						[Op.or]: query,
					},
					"$CropArea.name$": {
						[Op.or]: queryLocation,
					},
				};
			} else if (
				filterLocation !== "" &&
				typeof filterLocation !== "undefined"
			) {
				console.log("masuk ke perbandingan hanya location");
				const query = filterLocation.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					"$CropArea.name$": {
						[Op.or]: query,
					},
				};
			} else if (filterPlant !== "" && typeof filterPlant !== "undefined") {
				console.log("masuk ke perbandingan hanya filterPlant");
				const query = filterPlant.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					"$PlantSheet.plant.name$": {
						[Op.or]: query,
					},
				};
			} else if (
				commonDate !== "" &&
				typeof commonDate !== "undefined" &&
				filterDate !== "" &&
				typeof filterDate !== "undefined"
			) {
				// const query = commonDate.split(",").map((item) => ({
				// 	[Op.eq]: item,
				// }));
				// console.log(query, "<<< INI QUERY");
				console.log("masuk ke perbandingan hanya tanggal");
				console.log(commonDate.length, "<<< INI commonDate.length");
				console.log(commonDate, "<<< INI commonDate original");
				console.log(
					typeof commonDate,
					"<<< typeof commonDate sebelum di convert"
				);

				if (commonDate.length > 1) {
					opt.where = {
						[Op.and]: [
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								">=",
								commonDate[0]
							),
							sequelize.where(
								sequelize.fn("DATE", sequelize.col(filterDate)),
								"<=",
								commonDate[1]
							),
						],
					};
				} else {
					opt.where = {
						[Op.and]: sequelize.where(
							sequelize.fn("DATE", sequelize.col(filterDate)),
							"=",
							commonDate[0]
						),
					};
				}
				// const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
				// const newDates = commonDate.map((date) => {
				// 	const oldDate = new Date(date);
				// 	const newDate = new Date(oldDate.getTime() + oneDay);
				// 	return newDate.toISOString();
				// });
			}

			const data = await PlantSchedule.findAll(opt);
			// console.log(data[5].dataValues.seedlingDate,'<<< dataValues seedlingDate');
			if (!data) {
				throw {
					name: "NotFound",
				};
			}

			res.status(200).json(data);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async postSchedule(req, res, next) {
		try {
			console.log(req.body, "<< ini req.body");
			const {
				seedlingDate,
				plantingDate,
				harvestDate,
				unloadDate,
				PlantsheetId,
				CropAreaId,
				totalPopulation,
			} = req.body;

			await PlantSchedule.create({
				seedlingDate,
				plantingDate,
				harvestDate,
				unloadDate,
				PlantsheetId,
				CropAreaId,
				totalPopulation,
			});
			res.status(201).json("New Plant Schedule successfully added");
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async getScheduleById(req, res, next) {
		try {
			const { id } = req.params;
			const opt = {
				include: [
					{
						model: PlantSheet,
						include: [
							{
								model: Item,
								as: "plant",
								attributes: ["name", "code"],
							},
							{
								model: PlantType,
								attributes: ["name"],
							},
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
								attributes: [
									"id",
									"dose",
									"fertilizerid",
									"plantsheetid",
								],
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
								attributes: [
									"id",
									"dose",
									"pesticideid",
									"plantsheetid",
								],
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
								attributes: [
									"id",
									"dose",
									"materialid",
									"plantsheetid",
								],
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
						],
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
					{
						model: HarvestOutcome,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			};
			const data = await PlantSchedule.findByPk(id, opt);

			res.status(200).json(data);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = PlantScheduleController;
