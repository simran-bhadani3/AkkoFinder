const express = require("express");
const db = require("./connection");
const passport = require("passport");

const user = require("./routes/api/user");
const accomodation = require("./routes/api/accomodation");
const oncampus = require("./routes/api/oncampus");



const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//connect to database
db();

app.use(passport.initialize());

require("./config/passport.js")(passport);

//routes
app.use("/api/user", user);
app.use("/api/accomodation", accomodation);
app.use("/api/oncampus", oncampus);


const port = process.env.PORT || 5000;

//connect to port
app.listen(port, () => console.log(`Server running on port ${port}`));
