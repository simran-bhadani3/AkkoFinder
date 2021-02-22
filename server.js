const express = require("express");
const db = require("./connection");
const passport = require("passport");
const path = require("path");

const user = require("./routes/api/user");
const accomodation = require("./routes/api/accomodation");
const accomodationdata = require("./routes/api/accomodationdata");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//connect to database
db();

require("./config/passport.js")(passport);

//routes
app.use("/api/user", user);
app.use("/api/accomodation", accomodation);
app.use("/api/accomodationdata", accomodationdata);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

const port = process.env.PORT || 5000;

//connect to port
app.listen(port, () => console.log(`Server running on port ${port}`));
