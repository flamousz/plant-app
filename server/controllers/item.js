const { Op } = require("sequelize");
const { Item, Category, Uom } = require("../models/index");

class ItemController {
	static async getItem(req, res, next) {
		try {
			const { filter, search, page } = req.query;

			let limit = 5;
			let offset = 0;

			const opt = {
				include: [
					{
						model: Category,
						attributes: ["name"],
					},
					{
						model: Uom,
						attributes: ["name"],
					},
				],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
			};

			if (filter !== "" && typeof filter !== "undefined" && search) {
				const query = filter.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					categoryid: {
						[Op.or]: query,
					},
					name: {
						[Op.iLike]: `%${search}%`,
					},
				};
			} else if (filter !== "" && typeof filter !== "undefined") {
				const query = filter.split(",").map((item) => ({
					[Op.eq]: item,
				}));
				opt.where = {
					categoryid: {
						[Op.or]: query,
					},
				};
			} else if (search) {
				opt.where = {
					name: {
						[Op.iLike]: `%${search}%`,
					},
				};
			}

			if (page !== "" && typeof page !== "undefined") {
				offset = page * limit - limit;
				opt.offset = offset;
			}
			opt.limit = limit;

			let data = await Item.findAndCountAll(opt);
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

	static async getItemById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Item.findByPk(id, {
				include: [
					{
						model: Category,
						attributes: ["name"],
					},
					{
						model: Uom,
						attributes: ["name"],
					},
				],
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
			next(err);
		}
	}

	static async postItem(req, res, next) {
		try {
			let { name, code, description, categoryid, uomid, standardqty } =
				req.body;

			let data = await Item.create({
				name,
				code,
				description,
				categoryid,
				uomid,
				standardqty,
			});

			res.status(201).json(`${data.name} has been added`);
		} catch (err) {
            console.log(err);
			next(err);
		}
	}

	static async putItem(req, res, next) {
		try {
			let { id } = req.params;
			let { name, code, description, categoryid, uomid, standardqty } =
				req.body;
			let findData = await Item.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}
			await Item.update(
				{
					name,
					code,
					description,
					categoryid,
					uomid,
					standardqty,
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

	static async deleteItem(req, res, next) {
		try {
			const { id } = req.params;

			let findData = await Item.findByPk(id);
			if (!findData) {
				throw {
					name: "NotFound",
				};
			}

			await Item.destroy({
				where: { id },
			});

			res.status(200).json(`${findData.name} has been deleted`);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = ItemController;
