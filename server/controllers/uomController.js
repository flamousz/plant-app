const {Uom}=require('../models/index')

class UomController{
    static async getUom(req, res, next) {
		try {
			const data = await Uom.findAll({
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

    static async getUomById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Uom.findByPk(id, {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
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

    static async postUom(req, res, next) {
		try {
			let { name, code, description } = req.body;

			let data = await Uom.create({
				name,
				code,
				description,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

    static async putUom(req, res, next) {
		try {
			let { id } = req.params;
			let { name, code, description } = req.body;
			let findData = await Uom.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Uom.update(
				{
					name,
					code,
					description,
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

    static async deleteUom(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Uom.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Uom.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports=UomController