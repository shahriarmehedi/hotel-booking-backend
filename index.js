
const express = require('express');
const app = express();
const port = 5000;

// MIDDLEWARE
const cors = require('cors');
app.use(cors());
app.use(express.json());


// USER ROUTES
const userRoutes = require('./routes/User');

app.use('/user', userRoutes);





app.get('/', (req, res) => {
    res.send('Hello from my Server Home Page')
});

app.listen(port, () => {
    console.log('Listening to', port)
});