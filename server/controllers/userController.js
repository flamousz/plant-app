const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class UserController {
	static async register(req, res, next) {
		try {
			const { name, role, email, password } = req.body;
			const userRegister = await User.create({
				name,
				role,
				email,
				password,
			});
			res.status(201).json({
				message: `new account with ${userRegister.email} has been created`,
			});
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw { name: "EmailorPasswordRequired" };
			}
			const user = await User.findOne({
				where: { email },
			});

			if (!user) {
				throw { name: "InvalidEmailorPassword" };
			}
			const comparePassword = compareHash(password, user.password);
			if (!comparePassword) {
				throw { name: "InvalidEmailorPassword" };
			}

			const payload = {
				id: user.id,
			};
			const role = user.role;
			const access_token = createToken(payload);
			res.status(200).json({ access_token, email, role });
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = UserController;
