const express = require('express');
const Room = require('../rooms/roomModel');
const Hotel = require('../hotels/hotelModel');

//CREATE ROOM
const CreateRoom = async (req, res) => {
	const hotelId = req.params.hotelid;
	const newroom = new Room(req.body);
	try {
		const savedRoom = await newroom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json(savedRoom);
	} catch (error) {
		res.status(500).json(error);
	}
};

//UPDATE ROOM
const UpdateRoom = async (req, res, next) => {
	try {
		const updatedroom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedroom);
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

// DELETE ROOM
const deleteRoom = async (req, res, next) => {
	try {
		await Room.findOneAndDelete(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.id },
			});
		} catch (error) {
			return error;
		}
		res.status(200).json('Room deleted successfully');
	} catch (error) {
		next(error);
	}
};

//GET A SINGLE ROOM
const getARoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (error) {
		next(error);
	}
};

// GET ROOM
const getAllRoom = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
};

const UpdateRoomAvailability = async (req, res, next) => {
	try {
		await Room.updateOne(
			{ 'roomNumbers._id': req.params.id },
			{
				$push: {
					'roomNumbers.$.unavailableDates': req.body.dates,
				},
			}
		);
		res.status(200).json('Room status has been Updates');
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};
module.exports = {
	UpdateRoom,
	CreateRoom,
	getAllRoom,
	deleteRoom,
	getARoom,
	UpdateRoomAvailability,
};
