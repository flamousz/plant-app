const {
	Approval,
	Notification,
	PlantSchedule,
	User,
	Item,
	PlantSheet,
	ApprovalMaster
} = require("../models/index");

class ApprovalController {
	static opt = {
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
		attributes: {
			exclude: ["createdAt", "updatedAt"],
		},
	};
	static async getAllRejectedApproval(req, res, next) {
		try {
			console.log("masuk getAllRejectedApproval di server");
			ApprovalController.opt.where = {
				"$Notification.PlantSchedule.statusPlantSchedule$": 'rejected'
			}
			const data = await Approval.findAll(ApprovalController.opt)
			if (!data) {
				throw{name: 'NotFound'}
			}
			res.status(200).json(data)
		} catch (error) {
			next(error);
		}
	}

	static async getAllApproval(req, res, next) {
		try {
			console.log("masuk getAllApproval di server");
			console.log(req.body, "<<< req body di getAllApproval");
			const { approvalSequence } = req.body;
			ApprovalController.opt.where = { approvalSequence };
			const data = await Approval.findAll(ApprovalController.opt);
			if (!data) {
				throw { name: "NotFound" };
			}
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async getAllApprovalMaster(req, res, next){
		/**
		 * data yang ditampilkan di client 
		 * - no
		 * - sequenceLevel
		 * - pronoun
		 * - User.email
		 */
		try {
			const opt = {
				include: {
					model: User,
					attributes:['id', 'email']
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				},
				order: [['sequenceLevel', 'ASC']]
			}
			const data = await ApprovalMaster.findAll(opt)
			if (!data) {
				throw{name: 'NotFound'}
			}
			res.status(200).json(data)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = ApprovalController;
