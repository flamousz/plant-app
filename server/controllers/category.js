const { Category } = require("../models/index");

class CategoryController {
	static async getCategory(req, res, next) {
		try {
			const data = await Category.findAll({
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

	static async getCategoryById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Category.findByPk(id, {
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

	static async postCategory(req, res, next) {
		try {
			let { name, code, description } = req.body;

			let data = await Category.create({
				name,
				code,
				description,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putCategory(req, res, next) {
		try {
			let { id } = req.params;
			let { name, code, description } = req.body;
			let findData = await Category.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Category.update(
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

    static async deleteCategory(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Category.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Category.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CategoryController;
