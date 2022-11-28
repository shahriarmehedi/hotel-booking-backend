
const express = require('express');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000;

// import swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./helper/documentation');


// use swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// MIDDLEWARE
const cors = require('cors');
app.use(cors());
app.use(express.json());


// USER ROUTES
const userRoutes = require('./routes/User');

// login routes
const loginRoutes = require('./routes/Login');

// signup routes
const signupRoutes = require('./routes/Signup');

// hotel routes
const hotelRoutes = require('./routes/Hotel');

// hotel review routes
const hotelReviewRoutes = require('./routes/HotelReview');

// Amenities routes
const amenitiesRoutes = require('./routes/Amenities');

// Hotel Room routes
const hotelRoomRoutes = require('./routes/HotelRoom');

// Room Type routes
const roomTypeRoutes = require('./routes/RoomType');

// Halal Rating routes
const halalRatingRoutes = require('./routes/HalalRating');

// Booking routes
// const bookingRoutes = require('./routes/Booking');

// Activity routes
const activityRoutes = require('./routes/Activities');

// Transfers routes
const transfersRoutes = require('./routes/Transfers');

// Holiday Packages routes
const holidayPackagesRoutes = require('./routes/HolidayPackages');

// Insurance routes
const insuranceRoutes = require('./routes/Insurances');


// USE ALL ROUTES

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/hotel', hotelRoutes);
app.use('/hotelReview', hotelReviewRoutes);
app.use('/amenities', amenitiesRoutes);
app.use('/hotelRoom', hotelRoomRoutes);
app.use('/hotelRoomType', roomTypeRoutes);
app.use('/halalRating', halalRatingRoutes);
app.use('/activities', activityRoutes);
app.use('/transfers', transfersRoutes);
app.use('/holidayPackages', holidayPackagesRoutes);
app.use('/insurances', insuranceRoutes);

// app.use('/booking', bookingRoutes);



// MIDDLEWARE
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))



app.get('/', (req, res) => {
    res.send('Greetings from Hotel booking application backend');
});

app.listen(port, () => {
    console.log('Listening to', port)
});