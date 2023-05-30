const {
	Approval,
	Notification,
	PlantSchedule,
	User,
	Item,
	PlantSheet,
} = require("../models/index");

class ApprovalController {
	static async getAllApproval(req, res, next) {
		try {
			console.log("masuk getAllApproval di server");
			console.log(req.body, "<<< req body di getAllApproval");
			const { approvalSequence } = req.body;
			const opt = {
				include: {
					model: Notification,
					include: [
						{
							model: PlantSchedule,
							include: {
								model: PlantSheet,
								include: {
									model: Item,
									as: "plant",
									attributes: ["name", "id"],
								},
								attributes: ["id"],
							},
							attributes: ["id", "code", "statusPlantSchedule"],
						},
						{
							model: User,
							attributes: ["email"],
						},
					],
					attributes: ["id", "description", "isRead"],
				},
				where: { approvalSequence },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			};

			const data = await Approval.findAll(opt);
			if (!data) {
				throw { name: "NotFound" };
			}
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ApprovalController;
