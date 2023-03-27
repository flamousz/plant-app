const { Fertilizer } = require("../models/index");

class FertilizerController {
	static async getFertilizer(req, res, next) {
		try {
			const data = await Fertilizer.findAll({
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
			next(err);
		}
	}

	static async postFertilizer(req, res, next) {
		try {
			let { name, dose, uom } = req.body;

			let data = await Fertilizer.create({
				name,
				dose,
				uom,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putFertilizer(req, res, next) {
		try {
			let { id } = req.params;
			let { name, dose, uom } = req.body;
			let findData = await Fertilizer.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Fertilizer.update(
				{
					name,
					dose,
					uom,
				},
				{
					where: { id },
					returning: true,
				}
			);
			res.status(200).json(`${findData.name} updated successfully`);
		} catch (err) {
			next(err);
		}
	}

	static async deleteFertilizer(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Fertilizer.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Fertilizer.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = FertilizerController;
