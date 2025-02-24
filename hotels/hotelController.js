const express = require('express');
const Hotel = require('./hotelModel');
//CREATE User
const CreateHotel = async (req, res) => {
	const newhotel = new Hotel(req.body);
	try {
		const savedHotel = await newhotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		res.status(500).json(error);
	}
};

//UPDATE USER

const UpdateHotel = async (req, res, next) => {
	try {
		const updatedhotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedhotel);
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

// DELETE HOTEL

const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findOneAndDelete(req.params.id);
		res.status(200).json('Hotel deleted successfully');
	} catch (error) {
		next(error);
	}
};

//GET A SINGLE HOTEL
const getAHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};
// GET HOTEL

const getAllHotel = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (error) {
		next(error);
	}
};
module.exports = {
	UpdateHotel,
	CreateHotel,
	getAllHotel,
	deleteHotel,
	getAHotel,
};
