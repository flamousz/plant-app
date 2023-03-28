const { SubTask } = require("../models/index");

class SubTaskController {
	static async getSubTask(req, res, next) {
		try {
			const data = await SubTask.findAll({
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

	static async postSubTask(req, res, next) {
		try {
			let { name } = req.body;

			let data = await SubTask.create({
				name,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putSubTask(req, res, next) {
		try {
			let { id } = req.params;
			let { name } = req.body;
			let findData = await SubTask.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await SubTask.update(
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

    static async deleteSubTask(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await SubTask.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await SubTask.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = SubTaskController;
