const {Seed} = require('../models/index')

class SeedController{
    static async getSeed(req, res, next) {
		try {
			const data = await Seed.findAll({
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

    static async postSeed(req, res, next) {
		try {
			let { name, brand } = req.body;

			let data = await Seed.create({
				name,
				brand
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

    static async putSeed(req, res, next) {
		try {
			let { id } = req.params;
			let { name, brand } = req.body;
			let findData = await Seed.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Seed.update(
				{
					name,
					brand
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

    static async deleteSeed(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Seed.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Seed.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}


module.exports = SeedController