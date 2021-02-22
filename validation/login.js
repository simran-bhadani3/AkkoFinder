const validator = require("validator");
module.exports = function validateLogin(data) {
	let errors = {};
	errors.valid = "true";
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

	if (
		data.password == undefined ||
		data.password == null ||
		(typeof data.password == "string" && data.password.trim().length === 0)
	) {
		(errors.password = "Password is required"), (errors.valid = "false");
	}
	return errors;
};
