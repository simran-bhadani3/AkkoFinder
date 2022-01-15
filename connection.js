const mongoose = require("mongoose");
const uri = require("./config/keys.js").mongoURI;

const main = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("MongoDB Connected");
	} catch (err) {
		console.log(uri);
		console.error(err.message);
	}
};

module.exports = main;
