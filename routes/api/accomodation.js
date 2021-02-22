const express = require("express");
const { validate } = require("../../models/Review");
const router = express.Router();
const Review = require("../../models/Review");
const User = require("../../models/User");
const validateReview = require("../../validation/review");

router.post("/review", (req, res) => {
	let errors = validateReview(req.body);
	if (errors.valid == "false") {
		return res.status(400).json(errors);
	}
	User.findById(req.body.id).then((usr) => {
		const username = usr.username;
		const newReview = new Review({
			accomodation: req.body.accomodation,
			username: username,
			subject: req.body.subject,
			year: req.body.year,
			review: req.body.review,
			rating: req.body.rating,
			likes: 0,
		});
		newReview
			.save()
			.then((rev) => res.json(rev))
			.catch((err) => console.log(err));
	});
});

router.get("/reviews/:id", (req, res) => {
	Review.find({ accomodation: req.params.id })
		.then((reviews) => {
			res.json(reviews);
		})
		.catch((err) => console.log(err));
});

router.post("/comment", (req, res) => {
	Review.findById(req.body.reviewId)
		.then((review) => {
			User.findById(req.body.user).then((usr) => {
				const username = usr.username;
				review.comments.unshift({
					username: username,
					comment: req.body.comment,
					likes: 0,
				});
				review.save();
				res.json("successful");
			});
		})
		.catch((err) => console.log(err));
});

module.exports = router;
