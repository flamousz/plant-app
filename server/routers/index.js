const express = require("express");
const { authentication } = require("../middlewares/auth");
const userRouter = require("./user");
const employeeRouter = require("./employee");
const cropAreRouter = require("./cropArea");
const categoryRouter = require("./category");
const uomRouter = require("./uom");
const plantTypeRouter = require("./plantType");
const itemRouter = require("./item");
const plantDataRouter = require("./plantData");
const plantSheetRouter = require("./plantSheet");
const plantScheduleRouter = require("./plantSchedule");
const harvestOutcomeRouter = require("./harvestOutcome");
const seedNurseriesRouter = require("./seedNurseries");
const taskRouter = require("./task");
const router = express.Router();
const {
	EmployeeTaskConjunction,
	Employee,
	TaskConjunction,
	Task,
} = require("../models/index");
const { Op } = require("sequelize");

router.use("/", userRouter);
// router.use(authentication)
router.get("/test", async (req, res, next) => {
	try {
		const selectedDate = new Date("2023-05-23");
		const selectedTask = "menyebor";
		const durationTask = 200;
		const selectedStartHour = "2023-05-23T18:11:00";
		const selectedFinishHour = "2023-05-23T19:11:00";
		let  availTimeFlag = false
		const workingTimeLog = [["2023-05-23T14:10:00","2023-05-23T15:40:00"],["2023-05-23T15:11:00","2023-05-23T17:40:00"],["2023-05-23T18:11:00","2023-05-23T23:23:00"]]

		// can you make logic to searching available time. i have two input, selectedStartHour for starting hour and selectedFinishHour for finish hour. the two input compare with each index array of workingTimeLog with typeof string that have index[0] for selectedStartHour comparisson and index[1] for selectedFinishHour comparisson if there is no match then availTimeFlag become true

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
						workingDate: selectedDate,
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
				"workingDate",
				"workMinuteQuota",
				"offDay",
				"workingTimeLog",
			],
			order: [["workingDate", "ASC"]],
		};

		const data = await EmployeeTaskConjunction.findAll(opt);
		if (!data) {
			throw {
				name: "NotFound",
			};
		}
		res.status(200).json(data);
	} catch (error) {
		console.log(error);
		next(error);
	}
});
router.get("/test/task", async (req, res, next) => {
	try {
		const employeeTaskConjunctionId = 55;
		const startTime = "2023-05-23T03:11:00"; // universal date format
		const finishTime = "2023-05-23T04:23:00";

		// Update the EmployeeTaskConjunction entry
		const employeeTaskConjunction = await EmployeeTaskConjunction.findByPk(
			employeeTaskConjunctionId
		);

		// Retrieve the existing workingTimeLog array from the EmployeeTaskConjunction
		let existingAvailableTime = employeeTaskConjunction.workingTimeLog || [];
		console.log(existingAvailableTime, "<< existingAvailableTime sebelum diparse");
		console.log(typeof existingAvailableTime, "<<typeof existingAvailableTime sebelum diparse");

		// Convert the existingAvailableTime to an array if it's a string
		if (typeof existingAvailableTime === "string") {
			existingAvailableTime = JSON.parse(existingAvailableTime);
		}

		// Add the new start and finish time values to the array
		const updatedAvailableTime = [
			...existingAvailableTime,
			[startTime, finishTime],
		];
		console.log(updatedAvailableTime, "<< updatedAvailableTime");
		console.log(typeof updatedAvailableTime, "<<typeof updatedAvailableTime");

		// Update the EmployeeTaskConjunction entry with the updated workingTimeLog array
		employeeTaskConjunction.workingTimeLog = JSON.stringify(updatedAvailableTime);

		await employeeTaskConjunction.save();

		res.status(200).json("update successfully");
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.use("/employees", employeeRouter);
router.use("/cropareas", cropAreRouter);
router.use("/categories", categoryRouter);
router.use("/uoms", uomRouter);
router.use("/planttypes", plantTypeRouter);
router.use("/items", itemRouter);
router.use("/plantdata", plantDataRouter);
router.use("/plantsheet", plantSheetRouter);
router.use("/plantschedule", plantScheduleRouter);
router.use("/harvestoutcome", harvestOutcomeRouter);
router.use("/seednurseries", seedNurseriesRouter);
router.use("/task", taskRouter);

module.exports = router;
