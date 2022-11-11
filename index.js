
const express = require('express');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser')
const port = 5000;


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

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);




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
    res.send('Hello from my Server Home Page')
});

app.listen(port, () => {
    console.log('Listening to', port)
});