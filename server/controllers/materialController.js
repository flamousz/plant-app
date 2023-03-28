const { Material } = require("../models/index");

class MaterialController {
	static async getMaterial(req, res, next) {
		try {
			const data = await Material.findAll({
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

	static async postMaterial(req, res, next) {
		try {
			let { name, dose, uom } = req.body;

			let data = await Material.create({
				name,
				dose,
				uom,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putMaterial(req, res, next) {
		try {
			let { id } = req.params;
			let { name, dose, uom } = req.body;
			let findData = await Material.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Material.update(
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

    static async deleteMaterial(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Material.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Material.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = MaterialController;
