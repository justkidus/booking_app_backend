const express = require('express');
const { User } = require('./userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//REGISTER
const Register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res
				.status(400)
				.json({ success: false, msg: 'All user input required' });
		}
		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		});
		if (existingUser) {
			return res.status(400).json('User already exists');
		}
		const hash = bcrypt.hashSync(req.body.password, 10);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});

		if (!existingUser) {
			await newUser.save();
			return res.status(201).json({ success: true, user: newUser });
		}
	} catch (error) {
		next(error);
	}
};

//LOGIN

const Login = async (req, res, next) => {
	try {
		const { username } = req.body;
		if (!username) {
			res.status(401).json({
				success: false,
				msg: 'All inputs are neccessity',
			});
		}
		const user = await User.findOne({
			username: req.body.username,
		});
		if (!user) {
			return res.status(401).json({
				success: false,
				msg: 'User is not found',
			});
		}
		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordCorrect) return next(error);

		//generate a JWT token
		const token = jwt.sign(
			{ _id: user._id, isAdmin: user.isAdmin },
			process.env.SECRET_KEY,
			{ expiresIn: '30d' }
		);
		const { password, isAdmin, ...otherDetails } = user._doc;
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json({ ...otherDetails });
	} catch (error) {
		next(error);
	}
};
module.exports = { Register, Login };
