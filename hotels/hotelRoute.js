const express = require('express');
const {
	CreateHotel,
	UpdateHotel,
	deleteHotel,
	getAllHotel,
	getAHotel,
	countByCity,
	countByType,
	getHotelRoom,
	arrangeByCategory,
} = require('./hotelController');
const { verifyUser, verifyAdmin } = require('../utilis/verifyToken');
const hotelRouter = express.Router();

// CREATE HOTEL
hotelRouter.post('/hotel/createHotel', verifyAdmin, CreateHotel);
// UPDATE HOTEL
hotelRouter.put('/hotel/updatehotel/:id', verifyAdmin, UpdateHotel);
// DELETE HOTEL
hotelRouter.delete('/hotel/deletehotel/:id', verifyAdmin, deleteHotel);
// GET A HOTEL
hotelRouter.get('/hotel/getahotel/:id', getAHotel);
// GET ALL HOTEL
hotelRouter.get('/hotel/getallhotel', getAllHotel);
//count by city
hotelRouter.get('/hotel/countByCity', countByCity);
//count by type
hotelRouter.get('/hotel/countByType', countByType);
//rome by Id
hotelRouter.get('/hotel/room/:id', getHotelRoom);
//categorized Hotels
hotelRouter.get('/hotel/categorized', arrangeByCategory);
module.exports = hotelRouter;
