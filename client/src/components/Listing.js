import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Route, BrowserRouter } from "react-router-dom";
import Comment from "./Comment";

class Listing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			title: "",
			year: "",
			review: "",
			rating: "",
			errors: {},
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
		const review = {
			accomodation: sessionStorage.getItem("listingId"),
			id: this.props.userId,
			title: this.state.title,
			year: this.state.year,
			review: this.state.review,
			rating: this.state.rating,
			likes: 0,
		};
		axios
			.post("/api/accomodation/review", review)
			.then((res) => {
				console.log("review submitted");
			})
			.catch((err) => {
				console.log(err);
				this.setState({ errors: err });
			});
	}

	async componentDidMount() {
		const data = await axios.get(
			"/api/oncampus/accomodation/" + sessionStorage.getItem("listingId")
		);
		this.setState({ data: data, loading: false });
		axios
			.get("/api/accomodation/reviews/" + sessionStorage.getItem("listingId"))
			.then((res) => {
				this.setState({ revData: res.data });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ errors: err });
			});
	}

	render() {
		const errors = this.state.errors;
		return (
			<div>
				{this.state.loading ? (
					<div> loading </div>
				) : (
					<div> {this.state.data.data[1].name}</div>
				)}
				{!this.props.authenticated ? (
					<div>log in</div>
				) : (
					<div>
						<form onSubmit={this.onSubmit}>
							<label htmlFor="title">Subject</label>
							<br></br>
							<input
								type="text"
								className={classnames("form-control", {
									"is-invalid": errors.email,
								})}
								id="title"
								name="title"
								value={this.state.title}
								onChange={this.onChange}
							></input>
							{errors.title && <div>{errors.title}</div>}
							<br></br>
							<label htmlFor="year">Year of Stay</label>
							<br></br>
							<input
								type="number"
								className={classnames("form-control", {
									"is-invalid": errors.year,
								})}
								id="year"
								name="year"
								value={this.state.year}
								onChange={this.onChange}
							></input>
							{errors.year && <div>{errors.year}</div>}
							<br></br>
							<label htmlFor="review">Review</label>
							<br></br>
							<textarea
								type="text"
								className={classnames("form-control", {
									"is-invalid": errors.review,
								})}
								id="review"
								name="review"
								value={this.state.review}
								onChange={this.onChange}
							></textarea>
							{errors.review && <div>{errors.review}</div>}
							<br></br>
							<label htmlFor="title">Rating</label>
							<br></br>
							<input
								type="rating"
								className={classnames("form-control", {
									"is-invalid": errors.rating,
								})}
								id="rating"
								name="rating"
								value={this.state.rating}
								onChange={this.onChange}
							></input>
							{errors.rating && <div>{errors.rating}</div>}
							<br></br>
							<input type="submit" className="btn btn-primary" value="Submit" />
						</form>
					</div>
				)}
				<div>
					{this.state.revData ? (
						this.state.revData.map((rev) => (
							<div key={rev["_id"]}>
								Review:
								<div>{rev.user}</div>
								<div>{rev.review}</div>
								<div>{rev.rating}</div>
								<div>
									Comments:
									<br></br>
									{rev.comments.map((comment) => (
										<div>
											{comment.comment}
											<br></br>
											{comment.likes}
											<br></br>
											{comment.user}
											<br></br>
											{comment.date.split("T")[0]}
											<br></br>
											{comment.date.split("T")[1].split(".")[0]}
										</div>
									))}
								</div>
								{this.props.authenticated ? (
									<>
										<BrowserRouter>
											<Link to="/comment">Leave a comment</Link>
											<Route
												path="/comment"
												render={() => (
													<Comment
														reviewId={rev["_id"]}
														userId={this.props.userId}
													/>
												)}
												exact={true}
											/>
										</BrowserRouter>
									</>
								) : (
									<div>Log in to leave a comment</div>
								)}
							</div>
						))
					) : (
						<div>no reviews</div>
					)}
				</div>
			</div>
		);
	}
}

export default Listing;
