const { Crop } = require("../models/index");

class CropController {
	static async getCrop(req, res, next) {
		try {
			const data = await Crop.findAll({
				order: [["createdAt", "DESC"]],
			});
            if (!data) {
                throw {
                    name: 'NotFound'
                }
            }
            res.status(200).json(data)
		} catch (err) {
			next(err)
		}
	}
}


module.exports = CropController