const express = require('express');
const db = require('./connection');

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const accomodation = require('./routes/api/accomodation');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//do passport stuff here

//connect to database
db();

app.get('/', (req, res) => {
    res.send("Hello");
})

//routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/accomodation', accomodation);

const port = process.env.PORT || 5000;

//connect to port
app.listen(port, () => console.log(`Server running on port ${port}`));