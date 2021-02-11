const express = require("express");
const router = express.Router();
const data = {
	1: {
		name: "National University of Singapore",
		image: "../assets/oncampus/NUS.jpg",
		types: "5",
		id: 1,
	},
};
router.get("/data", (req, res) =>
	res.json({
		data,
	})
);

router.get("/accomodation/:acc", (req, res) => {
	const acc = req.params.acc;
	if (data[acc]) {
		res.json(data);
	} else {
		res.json("no data");
	}
});

module.exports = router;
