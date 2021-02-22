const validator = require("validator");
module.exports = function validateReview(data) {
	let errors = {};
	errors.valid = "true";

	if (
		data.subject == undefined ||
		data.subject == null ||
		(typeof data.subject == "string" && data.subject.trim().length === 0)
	) {
		errors.subject = "Subject is required";
		errors.valid = "false";
	}

	if (
		data.year == undefined ||
		data.year == null ||
		(typeof data.year == "string" && data.year.trim().length === 0)
	) {
		(errors.year = "Year of stay is required"), (errors.valid = "false");
	}

	if (
		(parseInt(data.year) > 2021 || parseInt(data.year) < 1990)
	) {
		(errors.year = "Year of stay is invalid. It should be between 1990 and 2021."), (errors.valid = "false");
	}

	if (
		data.review == undefined ||
		null ||
		(typeof data.review == "string" && data.review.trim().length === 0)
	) {
		(errors.review = "Review is required"), (errors.valid = "false");
	}

	if (
		(parseFloat(data.rating) < 0 || parseFloat(data.rating) > 5)
	) {
		(errors.rating = "Rating is invalid"), (errors.valid = "false");
	}

	if (
		data.rating == undefined ||
		null ||
		(typeof data.rating == "string" && data.rating.trim().length === 0)
	) {
		(errors.rating = "Rating is required"), (errors.valid = "false");
	}
	

	return errors;
};
