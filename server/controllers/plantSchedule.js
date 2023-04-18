const { Op } = require("sequelize");
const {
	PlantSchedule,
	PlantSheet,
	CropArea,
	Item,
} = require("../models/index");

class PlantScheduleController {
	static async getSchedule(req, res, next) {
		try {
			const { filterPlant, filterLocation } = req.query;
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
				typeof filterLocation !== "undefined"
			) {
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
				const query = filterLocation.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					"$CropArea.name$": {
						[Op.or]: query,
					},
				};
			} else if (filterPlant !== "" && typeof filterPlant !== "undefined") {
				const query = filterPlant.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					"$PlantSheet.plant.name$": {
						[Op.or]: query,
					},
				};
			}

			const data = await PlantSchedule.findAll(opt);
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
}

module.exports = PlantScheduleController;
