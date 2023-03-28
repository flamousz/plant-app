const { CropArea, Crop } = require("../models/index");

class CropAreaController {
	static async getCropArea(req, res, next) {
		try {
			const data = await CropArea.findAll({
                include: {
                    model: Crop,
                    attributes: ['name']
                },
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

	static async postCropArea(req, res, next) {
		try {
			let { name, area, type, detailPlace, CropId } = req.body;

			let data = await CropArea.create({
				name,
				area,
				type,
				detailPlace,
				CropId,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putCropArea(req, res, next) {
		try {
			let { id } = req.params;
			let { name, area, type, detailPlace, CropId } = req.body;
			let findData = await CropArea.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await CropArea.update(
				{
					name,
					area,
					type,
					detailPlace,
					CropId,
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

    static async deleteCropArea(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await CropArea.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await CropArea.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CropAreaController;
