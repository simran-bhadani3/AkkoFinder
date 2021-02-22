const validator = require("validator");

module.exports = function validateRegisteration(data) {
	let errors = {};
	errors.valid = "true";
	if (!validator.isLength(data.username, { max: 30 })) {
		(errors.username = "Username must not be longer than 30 characters"),
			(errors.valid = "false");
	}
	if (
		data.username == undefined ||
		data.username == null ||
		(typeof data.username == "string" && data.username.trim().length === 0)
	) {
		(errors.username = "Username is required"), (errors.valid = "false");
	}

	if (!validator.isEmail(data.email)) {
		(errors.email = "Email is not valid"), (errors.valid = "false");
	}

	if (
		data.email == undefined ||
		data.email == null ||
		(typeof data.email == "string" && data.email.trim().length === 0)
	) {
		(errors.email = "Email is required"), (errors.valid = "false");
	}
	if (!validator.isLength(data.password, { min: 6 })) {
		(errors.password = "Password must be at least 6 characters"),
			(errors.valid = "false");
	}
	if (
		data.password == undefined ||
		data.password == null ||
		(typeof data.password == "string" && data.password.trim().length === 0)
	) {
		(errors.password = "Password is required"), (errors.valid = "false");
	}
	if (!validator.equals(data.password, data.confirmpassword)) {
		(errors.confirmpassword = "Passwords must match"), (errors.valid = "false");
	}
	if (
		data.confirmpassword == undefined ||
		data.confirmpassword == null ||
		(typeof data.confirmpassword == "string" &&
			data.confirmpassword.trim().length === 0)
	) {
		(errors.confirmpassword = "Confirm Password is required"),
			(errors.valid = "false");
	}

	return errors;
};
