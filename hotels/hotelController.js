const express = require('express');
const Hotel = require('./hotelModel');
const Room = require('../rooms/roomModel');
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
		const { limit, max, min, ...filters } = req.query;

		const minPrice = parseInt(min);
		const maxPrice = parseInt(max);
		const maxLimit = parseInt(limit);

		const hotels = await Hotel.find({
			...filters,
			cheapestPrice: { $gt: minPrice || 1, $lt: maxPrice || 1000 },
		}).limit(maxLimit || 5);
		res.status(200).json(hotels);
	} catch (error) {
		next(error);
	}
};

//countByType
const countByCity = async (req, res, next) => {
	try {
		const cities = req.query.cities.split(',');
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (error) {
		next(401, 'error on count by city');
	}
};
//countbyType
const countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
		const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
		const resortCount = await Hotel.countDocuments({ type: 'resort' });
		const villaCount = await Hotel.countDocuments({ type: 'villa' });
		const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
		res.status(201).json([
			{ type: 'hotels', count: hotelCount },
			{ type: 'apartments', count: apartmentCount },
			{ type: 'resorts', count: resortCount },
			{ type: 'villas', count: villaCount },
			{ type: 'cabins', count: cabinCount },
		]);
	} catch (err) {
		next(err);
	}
};
//filter by category
const arrangeByCategory = async (req, res) => {
	try {
		const categories = [
			'popularPlaces',
			'islands',
			'surfing',
			'NationalParks',
			'lake',
			'beach',
			'bank',
		];
		const categorizedHotels = await Promise.all(
			categories.map(async (category) => {
				const hotels = await Hotel.find({ category });
				return {
					category,
					hotels,
				};
			})
		);
		res.status(200).json(categorizedHotels);
	} catch (error) {
		next(error);
	}
};

// room By Id

const getHotelRoom = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		if (!hotel) {
			return res
				.status(404)
				.json({ success: false, message: 'Hotel not found' });
		}
		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			})
		);
		res.status(200).json(list);
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
	countByCity,
	countByType,
	getHotelRoom,
	arrangeByCategory,
};
