const express = require('express');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./users/userRoute');
const hotelRouter = require('./hotels/hotelRoute');
const roomRoute = require('./rooms/roomRoute');
const cors = require('cors');
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB);
		console.log('DB CONNECTED SUCCESSULLY');
	} catch (error) {
		throw error;
	}
};
const allowedOrigins = [
	'https://booking-app-backend-three.vercel.app', // Production
	'http://localhost:5173', // Local development
];
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);
app.get('/', (req, res) => {
	res.send('hello');
});
app.use(cookieparser());
app.use(express.json());

//USER ROUTE
app.use('/api', userRoute);

// HOTEL ROUTE
app.use('/api', hotelRouter);

//ROOM ROUTE
app.use('/api', roomRoute);

const port = process.env.PORT;

app.listen(port, () => {
	connect();
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
