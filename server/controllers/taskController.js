const {Task, SubTask, TypeTask, Terrain} = require('../models/index')

class TaskController{
    static async getTask(req, res, next) {
		try {
			const data = await Task.findAll({
                include: [
                    {
                        model: TypeTask,
                        attributes: ['name']
                    },
                    {
                        model: SubTask,
                        attributes: ['name']
                    },
                    {
                        model: Terrain,
                        attributes: ['name']
                    }
                ],
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
            console.log(err);
			next(err);
		}
	}

}

module.exports=TaskController