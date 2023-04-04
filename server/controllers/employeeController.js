const { Employee } = require("../models/index");

class EmployeeController {
    static async getEmployee(req, res, next) {
		try {
			const data = await Employee.findAll({
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
	static async getEmployeeById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Employee.findByPk(id, {
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
			console.log(err);
			next(err);
		}
	}

	static async postEmployee(req, res, next) {
		try {
			let { name, nik, gender } = req.body;

			let data = await Employee.create({
				name,
				nik,
				gender
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putEmployee(req, res, next) {
		try {
			let { id } = req.params;
			let { name, nik, gender } = req.body;
			let findData = await Employee.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Employee.update(
				{
					name,
					nik,
					gender
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

	static async deleteEmployee(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Employee.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Employee.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}

}

module.exports = EmployeeController;
