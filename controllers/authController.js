import User from '../models/User.js';
import bcrypt from  'bcryptjs';
import Errors from "../utils/error.js";
import jwt from "jsonwebtoken";

const registerApi = {
	register: async(req, res, next) => {
		let uname    = req.body.username;
		let eMail    = req.body.email;
		let pwd = req.body.password;

		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(pwd, salt);

		try {
			const newUser = new User({ 
				username: uname,
				email: eMail,
				password: hash,
			 });

			await newUser.save();
			res.status(200).send("User has been created.");

		} catch (err) {
			next(err);
		}
	},

	login: async(req, res, next) => {
		let uname = req.body.username;
		let pwd   = req.body.password;
		let secretKey = process.env.JWT;

		try {
			const loginUser = await User.findOne({ username: uname});
			if (!loginUser)
				return next(Errors.createError(404, uname + " User not found in Database!"));

			const isPasswordCorrect = await bcrypt.compare(pwd, loginUser.password);
			if (!isPasswordCorrect)
				return next(Errors.createError(400, " wrong password "));

			const token = jwt.sign( 
				{
					id: loginUser._id, 
					isAdmin: loginUser.isAdmin
				}, secretKey // secret key
			);

			const { password, isAdmin, ...otherDetails } = loginUser._doc;
			res
			.cookie("access_token", token, {
				httpOnly: true
			})
			.status(200)
			.json({...otherDetails});

		} catch (err) {
			next(err);
		}
	}
};

export default registerApi;

// export const register = async (req, res, next) => {
// 	let uname    = req.body.username;
// 	let eMail    = req.body.email;
// 	let pwd = req.body.password;
// 	try {
// 		const newUser = new User({ 
// 			username: uname,
// 			email: eMail,
// 			password: pwd,
// 		 });

// 		await newUser.save();
// 		res.status(200).send("User has been created.");

// 	} catch (err) {
// 		next(err);
// 	}
// };