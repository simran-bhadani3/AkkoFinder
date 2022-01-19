const express = require("express");
const db = require("./connection");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

const user = require("./routes/api/user");
const accomodation = require("./routes/api/accomodation");
const accomodationdata = require("./routes/api/accomodationdata");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

//connect to database
db();

require("./config/passport.js")(passport);

//routes
app.get("/", (req, res) => {
	res.send("Hello from App Engine!");
});

app.use("/api/user", user);
app.use("/api/accomodation", accomodation);
app.use("/api/accomodationdata", accomodationdata);

const port = process.env.PORT || 8080;

//connect to port
app.listen(port, () => console.log(`Server running on port ${port}`));
