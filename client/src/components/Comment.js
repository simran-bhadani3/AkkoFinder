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
			.post("/api/accomodation/comment/", comment)
			.then((res) => {
				this.setState({ submitted: true });
			})
			.catch((err) => {
				this.setState({ errors: err });
			});
	}

	render() {
		return (
			<div>
				{this.state.submitted ? (
					<div className = "textarea-caption">Comment submitted. Refresh page to view.</div>
				) : (
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
				)}
			</div>
		);
	}
}

export default Comment;
