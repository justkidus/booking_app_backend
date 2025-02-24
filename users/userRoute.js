const express = require('express');
const { Register, Login } = require('./userController');
const {
	verifyToken,
	verifyUser,
	verifyAdmin,
} = require('../utilis/verifyToken');
const userRoute = express.Router();
//USER ROUTE
userRoute.post('/user/register', Register);
userRoute.post('/user/login', Login);

// VERIFY TOKEN
userRoute.get('/user/checkauthnitication', verifyToken, (req, res) => {
	res.json({ message: 'you are authniticated user', user: req.user });
});
// verify if user is authnticated or not
userRoute.get('/user/verifyuser/:id', verifyUser, (req, res) => {
	res.json({ message: `Welcome ,User! User Id:${req.params.id}` });
});
// verify if it is ADMiN or not
userRoute.get('/user/verifyadmin/:id', verifyAdmin, (req, res) => {
	res.json({ message: `Welcome ,Admin! Admin Id:${req.params.id}` });
});

module.exports = userRoute;
