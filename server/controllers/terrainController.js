const { Terrain } = require("../models/index");

class TerrainController {
	static async getTerrain(req, res, next) {
		try {
			const data = await Terrain.findAll({
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

	static async postTerrain(req, res, next) {
		try {
			let { name } = req.body;

			let data = await Terrain.create({
				name,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putTerrain(req, res, next) {
		try {
			let { id } = req.params;
			let { name } = req.body;
			let findData = await Terrain.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Terrain.update(
				{
					name,
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

    static async deleteTerrain(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Terrain.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Terrain.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = TerrainController;
