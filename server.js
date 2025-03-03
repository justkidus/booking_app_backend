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

app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow credentials (e.g., cookies)
app.use(cookieparser());
app.use(express.json());

//USER ROUTE
app.use('/api', userRoute);

// HOTEL ROUTE
app.use('/api', hotelRouter);

//ROOM ROUTE
app.use('/api', roomRoute);

const port = process.env.port;

app.listen(port, () => {
	connect();
	console.log(`Server is running on http://localhost:${process.env.port}`);
});
