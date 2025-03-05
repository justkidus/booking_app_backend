const express = require('express');
const {
	CreateRoom,
	UpdateRoom,
	deleteRoom,
	getARoom,
	getAllRoom,
	bookRoom,
} = require('./roomController');
const { verifyAdmin, verifyUser } = require('../utilis/verifyToken');
const roomRoute = express.Router();

roomRoute.post('/room/createroom/:hotelid', verifyAdmin, CreateRoom),
	roomRoute.put('/room/updateroom/:id', verifyAdmin, UpdateRoom),
	roomRoute.delete('/room/deleteroom/:hotelid', verifyAdmin, deleteRoom),
	roomRoute.get('/room/getaroom/:id', getARoom),
	roomRoute.post('/room/getAllroom', getAllRoom);
roomRoute.put('/room/availability/:id', bookRoom);
module.exports = roomRoute;
