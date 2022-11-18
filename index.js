
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


app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/hotel', hotelRoutes);


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