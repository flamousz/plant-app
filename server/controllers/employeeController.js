const { Op } = require("sequelize");
const {
	Employee,
	EmployeeTaskConjunction,
	TaskConjunction,
	Task,
	Item,
	ToolConjunction,
} = require("../models/index");

class EmployeeController {
	static async getEmployeeAtTaskSheet(req, res, next) {
		try {
			const {
				selectedDate,
				selectedTask,
				startWorkHour,
				finishWorkHour,
				durationTask,
			} = req.body;
			const opt = {
				include: {
					model: Employee,
					as: "employee",
					include: {
						model: TaskConjunction,
						as: "taskConjunction",
						include: {
							model: Task,
							as: "task",
							attributes: ["id", "name"],
						},
						attributes: ["EmployeeId", "TaskId"],
					},
					attributes: ["id", "name"],
				},
				where: {
					[Op.and]: [
						{
							initialDate: selectedDate,
						},
						{
							"$employee.taskConjunction.task.name$": selectedTask,
						},
						{
							offDay: false,
						},
						{
							workMinuteQuota: {
								[Op.gte]: durationTask,
							},
						},
					],
				},
				attributes: [
					"id",
					"initialDate",
					"workMinuteQuota",
					"offDay",
					"workingTimeLog",
				],
				order: [["initialDate", "ASC"]],
			};

			const data = await EmployeeTaskConjunction.findAll(opt);
			if (!data) {
				throw {
					name: "NotFound",
				};
			}
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
	static async getEmployee(req, res, next) {
		try {
			const { filter } = req.query;
			const opt = {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
			};

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
				include: {
					model: TaskConjunction,
					include: {
						model: Task,
						include: {
							model: ToolConjunction,
							include: {
								model: Item,
								attributes: ["name"],
								order: [["createdAt", "DESC"]],
							},
							attributes: ["id", "TaskId"],
						},
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
					attributes: ["id", "EmployeeId", "TaskId"],
				},
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
			let { name, nik, gender, TaskConjunctions } = req.body;
			let status = "draft";
			let arcStatus = "avail";
			const data = await Employee.create({
				name,
				nik,
				gender,
				status,
				arcStatus,
			});

			TaskConjunctions.forEach((el) => {
				el.EmployeeId = data.id;
			});
			console.log(TaskConjunctions, "<< TaskConjunction in controller");
			if (TaskConjunctions[0].EmployeeId !== 0) {
				await TaskConjunction.bulkCreate(TaskConjunctions);
			}
			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
			next(err);
		}
	}

	static async putEmployee(req, res, next) {
		try {
			let { id } = req.params;
			let { name, nik, gender, status, TaskConjunctions } = req.body;
			console.log(req.body, `<<<< req.body dari putEmployee store`);
			let findData = await Employee.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			const initialEmployee = await Employee.findByPk(id, {
				include: {
					model: TaskConjunction,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
			});

			const initialIDofEmployee = initialEmployee.TaskConjunctions.map(
				(el) => el.id
			);
			const EmployeeNotDeletedPlan = TaskConjunctions.map((el) => el.id);
			const EmployeeDeletedPlan = initialIDofEmployee.filter(
				(el) => !EmployeeNotDeletedPlan.includes(el)
			);

			// searching element that not have 'id' key
			const newEmployeeWithoutId = TaskConjunctions.filter(
				(el) => !el.hasOwnProperty("id")
			);
			12;
			// searching element that  have 'id' key
			const newEmployeeWithId = TaskConjunctions.filter((el) =>
				el.hasOwnProperty("id")
			);

			await Employee.update(
				{
					name,
					nik,
					gender,
					status,
				},
				{
					where: { id },
					returning: true,
				}
			);

			if (EmployeeDeletedPlan[0]) {
				for (const el of EmployeeDeletedPlan) {
					await TaskConjunction.destroy({
						where: {
							id: el,
						},
					});
				}
			}

			if (newEmployeeWithId[0]) {
				for (const el of newEmployeeWithId) {
					await TaskConjunction.update(
						{
							TaskId: el.TaskId,
						},
						{
							where: {
								id: el.id,
							},
						}
					);
				}
			}

			if (newEmployeeWithoutId[0]) {
				newEmployeeWithoutId.forEach((el) => (el.EmployeeId = id));
				await TaskConjunction.bulkCreate(newEmployeeWithoutId);
			}

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
