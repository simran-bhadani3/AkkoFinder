import React, { Component } from "react";

import axios from "axios";

class Comment extends Component {
	constructor() {
		super();
		this.state = {
			comment: "",
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	onSubmit(event) {
		event.preventDefault();
		const comment = {
			comment: this.state.comment,
			user: this.props.userId,
			reviewId: this.props.reviewId,
		};
		console.log(comment);
		axios
			.post("/api/accomodation/comment/", comment)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				this.setState({ errors: err });
			});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<lable>Comment below</lable>
					<br></br>
					<textarea
						type="text"
						htmlFor="comment"
						id="comment"
						name="comment"
						value={this.state.comment}
						onChange={this.onChange}
					></textarea>
					<br></br>
					<br></br>
					<input type="submit" className="btn btn-primary" value="Comment" />
				</form>
			</div>
		);
	}
}

export default Comment;
