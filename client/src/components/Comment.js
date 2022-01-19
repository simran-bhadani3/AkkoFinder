import React, { Component } from "react";

import axios from "axios";

class Comment extends Component {
	constructor() {
		super();
		this.state = {
			comment: "",
			submitted: false,
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

		axios
			.post("https://backend-dot-akkofinder.as.r.appspot.com/api/accomodation/comment/", comment)
			.then((res) => {
				this.setState({ comment: "" });
				this.props.updateFromChild();
			})
			.catch((err) => {
				this.setState({ errors: err });
			});
	}

	render() {
		return (
			<div>
				<form className="comment-form" onSubmit={this.onSubmit}>
					<div className="textarea-caption">Leave a comment below:</div>
					<textarea
						className="comment-textarea"
						type="text"
						htmlFor="comment"
						name="comment"
						value={this.state.comment}
						onChange={this.onChange}
					></textarea>
					<div>
						<input type="submit" className="btn btn-primary" value="Submit" />
					</div>
				</form>
			</div>
		);
	}
}

export default Comment;
