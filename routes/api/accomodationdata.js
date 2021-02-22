const express = require("express");
const router = express.Router();
const data = {
	onCampus: [
		{
			name: "National University of Singapore",
			image: "NUS",
			id: 1,
			comingSoon: false,
			entry: [
				{
					name: "Residential College 4",
					id: 1,
					image: "RC4",
					comingSoon: false,
					address:
						"6 College Avenue East, #01-01, University Town, National University of Singapore, 138614",
					website: "https://rc4.nus.edu.sg/",
				},
				{
					name: "College of Alice & Peter Tan",
					id: 2,
					image: "CAPT",
					comingSoon: true,
				},
				{
					name: "Tembusu College",
					id: 3,
					image: "Tembusu",
					comingSoon: true,
				},
				{
					name: "Ridge View Residential College",
					id: 4,
					image: "RVRC",
					comingSoon: true,
				},
				{
					name: "Cinnamon College",
					id: 5,
					image: "Cinnamon",
					comingSoon: true,
				},
			],
		},
		{
			name: "Nanyang Technological University",
			image: "NTU",
			id: 2,
			comingSoon: true,
		},
		{
			name: "Singapore Management University",
			image: "SMU",
			id: 3,
			comingSoon: true,
		},
		{
			name: "Singapore University of Technology and Design",
			image: "SUTD",
			id: 4,
			comingSoon: true,
		},
		{
			name: "Singapore Institute of Technology",
			image: "SIT",
			id: 5,
			comingSoon: true,
		},
		{
			name: "Singapore Institute of Management",
			image: "SIM",
			id: 6,
			comingSoon: true,
		},
	],
	offCampus: [
		{
			name: "Dwell Selegie",
			image: "Dwell",
			id: 1,
			comingSoon: true,
		},
		{
			name: "Balestier Student Hostel",
			image: "BSH",
			id: 2,
			comingSoon: true,
		},
		{
			name: "yo:HA@Henderson",
			image: "Henderson",
			id: 3,
			comingSoon: true,
		},
	],
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

router.get("/info/:acc", (req, res) => {
	const acc = req.params.acc;
	if (data.onCampus[acc - 1]) {
		res.json(data.onCampus[acc - 1].entry);
	} else {
		res.json("no data");
	}
});

router.get("/acc-info/:id/:accId", (req, res) => {
	const id = req.params.id;
	const accId = req.params.accId;
	if (data.onCampus[id - 1]) {
		res.json(data.onCampus[id - 1].entry[accId - 1]);
	} else {
		res.json("no data");
	}
});

module.exports = router;
