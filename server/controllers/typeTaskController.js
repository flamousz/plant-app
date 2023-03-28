const {TypeTask}=require('../models/index')

class TypeTaskController{
    static async getTypeTask(req, res, next) {
		try {
			const data = await TypeTask.findAll({
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

    static async postTypeTask(req, res, next) {
		try {
			let { name } = req.body;

			let data = await TypeTask.create({
				name,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

    static async putTypeTask(req, res, next) {
		try {
			let { id } = req.params;
			let { name } = req.body;
			let findData = await TypeTask.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await TypeTask.update(
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

    static async deleteTypeTask(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await TypeTask.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await TypeTask.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}

}


module.exports=TypeTaskController