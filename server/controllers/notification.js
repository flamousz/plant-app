const { Notification, User, PlantSchedule } = require("../models/index");

class NotificationController {
	static async getNotification(req, res, next) {
		try {
			const opt = {
				// include: [
				// 	{
				// 		model: User,
				// 	},
				// 	{
				// 		model: PlantSchedule,
				// 	},
				// ],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			};
			const data = await Notification.findAll(opt);
			if (!data) {
				throw { name: "NotFound" };
			}
            res.status(200).json(data)
		} catch (error) {
			next(error);
		}
	}
}

module.exports = NotificationController;
