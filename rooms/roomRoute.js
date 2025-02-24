const express = require('express');
const {
	CreateRoom,
	UpdateRoom,
	deleteRoom,
	getARoom,
	getAllRoom,
} = require('./roomController');
const roomRoute = express.Router();

roomRoute.post('/room/createroom', CreateRoom),
	roomRoute.put('/room/updateroom', UpdateRoom),
	roomRoute.delete('/room/deleteroom', deleteRoom),
	roomRoute.get('/room/getaroom', getARoom),
	roomRoute.post('/room/getAllroom', getAllRoom);
module.exports = roomRoute;
