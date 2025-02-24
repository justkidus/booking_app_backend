const express = require('express');
const {
	CreateHotel,
	UpdateHotel,
	deleteHotel,
	getAllHotel,
	getAHotel,
} = require('./hotelController');

const hotelRouter = express.Router();

// CREATE HOTEL
hotelRouter.post('/hotel/createHotel', CreateHotel);
// UPDATE HOTEL
hotelRouter.put('/hotel/updatehotel/:id', UpdateHotel);
// DELETE HOTEL
hotelRouter.delete('/hotel/deletehotel/:id', deleteHotel);
// GET A HOTEL
hotelRouter.get('/hotel/getahotel/:id', getAHotel);
// GET ALL HOTEL
hotelRouter.get('/hotel/getallhotel', getAllHotel);
module.exports = hotelRouter;
