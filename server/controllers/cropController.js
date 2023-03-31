const { Crop } = require("../models/index");

class CropController {
	static async getCrop(req, res, next) {
		try {
			const data = await Crop.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
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

	static async postCrop(req, res, next) {
		try {
			let {
				name,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				type
			} = req.body;

			let data = await Crop.create({
				name,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
				type
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putCrop(req, res, next) {
		try {
			let { id } = req.params;
			let {
				name,
				seedlingAge,
				harvestAge,
				harvestTime,
				cropAge,
				cropProdWeight,
			} = req.body;
			let findData = await Crop.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Crop.update(
				{
					name,
					seedlingAge,
					harvestAge,
					harvestTime,
					cropAge,
					cropProdWeight,
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

	static async deleteCrop(req, res, next) {
		try {
			const { id } = req.params;
			console.log(id,'<< ini id');
			let findData = await Crop.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Crop.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = CropController;
