const express = require("express");
const router = express.Router();
const Review = require("../../models/Review");

router.get("/test", (req, res) => res.json({ hello: "hi" }));

router.post("/review", (req, res) => {
	const newReview = new Review({
		accomodation: req.body.accomodation,
		user: req.body.id,
		title: req.body.title,
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

router.get("/reviews/:id", (req, res) => {
	Review.find({ accomodation: req.params.id })
		.then((reviews) => res.json(reviews))
		.catch((err) => console.log(err));
});

router.post("/comment", (req, res) => {
	// console.log("review");
	// console.log(req.body);

	Review.findById(req.body.reviewId)
		.then((review) => {
			review.comments.unshift({
				user: req.body.user,
				comment: req.body.comment,
				likes: 0,
			});
			console.log(review);
			review.save();
		})
		.catch((err) => console.log(err));
});



module.exports = router;
