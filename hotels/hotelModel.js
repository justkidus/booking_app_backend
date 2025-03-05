const express = require('express');
const { default: mongoose } = require('mongoose');

const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	distance: {
		type: String,
		required: true,
	},

	image: {
		type: [String],
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	rooms: {
		type: [String],
	},
	cheapestPrice: {
		type: Number,
		required: true,
	},
	featured: {
		type: Boolean,
		default: false,
	},
	category: {
		type: String,
		required: true,
	},
});
const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
