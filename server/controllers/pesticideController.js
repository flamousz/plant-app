const { Pesticide } = require("../models/index");

class PesticideController {
	static async getPesticide(req, res, next) {
		try {
			const data = await Pesticide.findAll({
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

	static async postPesticide(req, res, next) {
		try {
			let { name, dose, uom, type } = req.body;

			let data = await Pesticide.create({
				name,
				dose,
				uom,
				type,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putPesticide(req, res, next) {
		try {
			let { id } = req.params;
			let { name, dose, uom, type } = req.body;
			let findData = await Pesticide.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Pesticide.update(
				{
					name,
					dose,
					uom,
					type,
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

    static async deletePesticide(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Pesticide.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Pesticide.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = PesticideController;
