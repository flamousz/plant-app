const { Op } = require("sequelize");
const { Employee } = require("../models/index");

class EmployeeController {
    static async getEmployee(req, res, next) {
		try {
			const { filter } = req.query;
			const opt = {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
			}
			
			if (filter !== "" && typeof filter !== "undefined") {
				const query = filter.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					arcStatus: { [Op.or]: query },
				};
			}

			let data = await Employee.findAndCountAll(opt);
			if (!data) {
				throw { name: "NotFound" };
			}
			res.status(200).json(data);
		} catch (err) {
			console.log(err);
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
			let status = "draft";
			let arcStatus = "avail";
			let data = await Employee.create({
				name,
				nik,
				gender,
				status,
				arcStatus
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putEmployee(req, res, next) {
		try {
			let { id } = req.params;
			let { name, nik, gender, status } = req.body;
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
					gender,
					status
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

	static async patchArcStatusEmployee(req, res, next) {
		try {
			console.log(req.body, "<<< ini req.body");
			const { id } = req.params;
			const { arcStatus } = req.body;
			const data = await Employee.findByPk(id);
			if (!data) {
				throw {
					name: "NotFound",
				};
			}

			await Employee.update(
				{ arcStatus },
				{
					where: { id },
				}
			);

			res.status(200).json("Employee status successfully changed ");
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = EmployeeController;
