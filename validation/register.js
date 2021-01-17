const validator = require("validator");

module.exports = function validateRegisteration(data) {
	const errors = {};
	errors.valid = true;
	if (!validator.isLength(data.username, { max: 30 })) {
		(errors.username = "Username must not be longer than 30 characters"),
			(errors.valid = false);
	}
	return errors;
};
