const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = require("./User");

const ReviewSchema = new Schema({
	accomodation: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: users,
	},
	title: {
		type: String,
		required: true,
	},
	year: {
		required: true,
		type: Number,
	},
	review: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: {
		type: Number,
		required: true,
	},
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: users,
			},
			comment: {
				type: String,
				required: true,
			},
			likes: {
				type: Number,
				required: true,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = Reviews = mongoose.model("review", ReviewSchema);
