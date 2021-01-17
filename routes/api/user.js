const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//registration validation
const validateRegisteration = require("../../validation/register");

const validateLogin = require("../../validation/login");

const User = require("../../models/User");

const keys = require("../../config/keys");

//POST request to api/user/register
router.post("/register", (req, res) => {
	console.log("1");
	let errors = validateRegisteration(req.body);
	console.log(errors);
	if (errors.valid == "false") {
		return res.status(400).json(errors);
	} else {
		console.log("reached");
		User.findOne({ email: req.body.email }).then((user) => {
			if (user) {
				console.log("here");
				errors.email = "Email already exists";
				errors.valid = "false";
				console.log(errors.valid == "false");
			} else {
				User.findOne({ username: req.body.username }).then((user) => {
					if (user) {
						errors.username = "Username already exists";
						errors.valid = "false";
					}
				});

				if (errors.valid == "false") {
					return res.status(400).json(errors);
				} else {
					const newUser = new User({
						username: req.body.username,
						email: req.body.email,
						password: req.body.password,
					});

					bcrypt.genSalt(15, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) {
								throw err;
							} else {
								newUser.password = hash;
								newUser
									.save()
									.then((user) => res.json(user))
									.catch((err) => console.log(err));
							}
						});
					});
				}
			}
			if (errors.valid === "false") {
				return res.status(400).json(errors);
			}
		});
	}
});

//POST route login page
router.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	let errors = validateLogin(req.body);
	if (errors.valid != "false") {
		User.findOne({ email: email }).then((user) => {
			if (!user) {
				errors.valid = "false";
				errors.email = "User does not exist";
			} else {
				bcrypt.compare(password, user.password).then((match) => {
					if (match) {
						const payload = { id: user.id, email: user.email };
						jwt.sign(
							payload,
							keys.jwtKey,
							{ expiresIn: 24 * 60 * 60 },
							(err, token) => {
								res.json({
									token: token,
								});
							}
						);
					} else {
						errors.password = "Password is incorrect";
						errors.valid = "false";
					}
				});
			}
		});
	}
	if (errors.valid == "false") {
		return res.status(400).json(errors);
	}
});

//get current user
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json(req.user.username);
	}
);

module.exports = router;
