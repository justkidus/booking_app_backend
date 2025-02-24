const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return next(createError(401, 'token not found'));
	}
	//this check if the user keyword when created the now key word which implies the SECRET_KEY
	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err)
			return next(
				createError(401, "your token doesn't match with the secret key")
			);
		//If the token is valid, the decoded payload (user) is attached to the req (request) object.
		//This allows subsequent middleware or route handlers to access the user information stored in the token.
		req.user = user;
		if (user) {
			console.log('happy');
		}
		console.log(user);
		next();
	});
};
const verifyUser = async (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user._id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return next(createError(403, 'you are not user or admin'));
		}
	});
};

const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin === true) {
			next();
		} else {
			return next(createError(403, 'you are not admin '));
		}
	});
};
module.exports = { verifyToken, verifyUser, verifyAdmin };
