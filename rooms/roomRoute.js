const express = require('express');
const {
	CreateRoom,
	UpdateRoom,
	deleteRoom,
	getARoom,
	getAllRoom,
	UpdateRoomAvailability,
} = require('./roomController');
const { verifyAdmin, verifyUser } = require('../utilis/verifyToken');
const roomRoute = express.Router();

roomRoute.post('/room/createroom/:hotelid', CreateRoom),
	roomRoute.put('/room/updateroom/:id', UpdateRoom),
	roomRoute.delete('/room/deleteroom/:hotelid', deleteRoom),
	roomRoute.get('/room/getaroom/:id', getARoom),
	roomRoute.post('/room/getAllroom', getAllRoom);
roomRoute.put('/availability/:id', UpdateRoomAvailability);
module.exports = roomRoute;
