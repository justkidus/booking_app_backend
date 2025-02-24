const express = require('express');
const Room = require('../rooms/roomModel');

//CREATE ROOM
const CreateRoom = async (req, res) => {
	const newroom = new Room(req.body);
	try {
		const savedRoom = await newroom.save();
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
module.exports = {
	UpdateRoom,
	CreateRoom,
	getAllRoom,
	deleteRoom,
	getARoom,
};
