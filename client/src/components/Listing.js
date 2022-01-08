import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import classnames from "classnames";

import Comment from "./Comment";
import Loading from "./Loading";
import StarRatingComponent from "react-star-rating-component";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Listing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			subject: "",
			year: "",
			review: "",
			rating: "",
			errors: {},
			revLoading: false,
			existingRevLoading: true,
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.updateFromChild = this.updateFromChild.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	onSubmit(event) {
		this.setState({ revLoading: true });
		event.preventDefault();
		const review = {
			accomodation: sessionStorage.getItem("accId"),
			id: this.props.userId,
			subject: this.state.subject,
			year: this.state.year,
			review: this.state.review,
			rating: this.state.rating,
			likes: 0,
		};
		axios
			.post("/api/accomodation/review", review)
			.then((res) => {
				this.setState({ revLoading: false });
				this.setState({ submitted: true });
				axios
					.get("/api/accomodation/reviews/" + sessionStorage.getItem("accId"))
					.then((res) => {
						this.setState({ revData: res.data });
						this.setState({ existingRevLoading: false });
						this.setState({ subject: "", year: "", review: "", rating: "" });
					})
					.catch((err) => {
						this.setState({ errors: err });
						this.setState({ existingRevLoading: false });
					});
			})
			.catch((err) => {
				this.setState({ errors: err.response.data });
				this.setState({ revLoading: false });
			});
	}

	updateFromChild(event) {
		axios
			.get("/api/accomodation/reviews/" + sessionStorage.getItem("accId"))
			.then((res) => {
				this.setState({ revData: res.data });
				this.setState({ existingRevLoading: false });
			})
			.catch((err) => {
				this.setState({ errors: err });
				this.setState({ existingRevLoading: false });
			});
	}

	async componentDidMount() {
		//fetch reviews
		axios
			.get("/api/accomodation/reviews/" + sessionStorage.getItem("accId"))
			.then((res) => {
				this.setState({ revData: res.data });
				this.setState({ existingRevLoading: false });
			})
			.catch((err) => {
				this.setState({ errors: err });
				this.setState({ existingRevLoading: false });
			});
		//fetch details
		axios
			.get(
				"/api/accomodationdata/acc-info/" +
					sessionStorage.getItem("listingId") +
					"/" +
					sessionStorage.getItem("accId")
			)
			.then((res) => {
				this.setState({ info: res.data });
			});
		this.setState({ loading: false });
	}

	render() {
		const errors = this.state.errors;
		return (
			<div className="container-fluid">
				<img
					src={require("../assets/navBg.jpg").default}
					alt="nav background"
					className="nav-bg"
				></img>
				{this.state.loading ? (
					<div>
						<Loading loading={this.state.loading}></Loading>
					</div>
				) : (
					this.state.info && (
						<div>
							<div className="header">
								<hr />
								<p className="heading">{this.state.info.name}</p>
								<hr />
							</div>
							<div className="container-div">
								<div className="infoImgDiv">
									<img
										className="infoImg"
										src={
											require(`../assets/oncampus/${this.state.info.image}.jpg`)
												.default
										}
										alt={this.state.info.image}
									></img>
								</div>
								<div className="infoText word-wrap">
									<div className="info-title">About</div>
									<div className="">
										<br></br>
										<p className="heading-text">Name</p>
										<p className="info-body">{this.state.info.name}</p>
									</div>
									<div className="">
										<br></br>
										<p className="heading-text">Location</p>
										<p className="info-body">
											{this.state.info.address} <br />
										</p>
									</div>
									<div className="">
										<br></br>
										<p className="heading-text">Website</p>
										<a
											className="info-body"
											href={this.state.info.website}
											target="_blank"
											rel="noreferrer"
										>
											{this.state.info.website}
										</a>
										<br />
									</div>
								</div>
							</div>
						</div>
					)
				)}
				{!this.props.authenticated ? (
					<div className="rev-login">
						<Link to="/login">Log in</Link> to leave a review
					</div>
				) : (
					<div>
						<div className="rev-button-div">
							<button
								className="btn btn-primary rev-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#reviewForm"
								aria-expanded="false"
								aria-controls="reviewForm"
							>
								Write a review
							</button>
						</div>

						<div className="collapse" id="reviewForm">
							{this.state.revLoading ? (
								<div>
									<Loading loading={this.state.revLoading}></Loading>
								</div>
							) : (
								<div className="w-75 card review-card">
									<form onSubmit={this.onSubmit}>
										<label htmlFor="subject">Subject</label>
										<br></br>
										<input
											type="text"
											className={classnames("form-control", {
												"is-invalid": errors.subject,
											})}
											id="subject"
											name="subject"
											value={this.state.subject}
											onChange={this.onChange}
										></input>
										{errors.subject && (
											<div className="error-text">{errors.subject}</div>
										)}
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
										{errors.year && (
											<div className="error-text">{errors.year}</div>
										)}
										<br></br>
										<label htmlFor="review">Review</label>
										<br></br>
										<textarea
											className={classnames("form-control review-textarea", {
												"is-invalid": errors.review,
											})}
											id="review"
											name="review"
											value={this.state.review}
											onChange={this.onChange}
										></textarea>
										{errors.review && (
											<div className="error-text">{errors.review}</div>
										)}
										<br></br>
										<label htmlFor="rating">
											Rating (on a scale of 1 to 5)
										</label>
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
										{errors.rating && (
											<div className="error-text">{errors.rating}</div>
										)}
										<br></br>
										<input
											type="submit"
											className="btn btn-primary"
											value="Submit"
										/>
									</form>
								</div>
							)}
						</div>
					</div>
				)}
				<div className="header">
					<hr />
					<p className="heading">Reviews</p>
					<hr />
				</div>

				<div>
					{this.state.existingRevLoading ? (
						<Loading loading={this.state.existingRevLoading}></Loading>
					) : this.state.revData ? (
						this.state.revData.reverse().map((rev) => (
							<div key={rev["_id"]}>
								<div className="card rev-card">
									<div className="user-group">
										<div className="username">
											<FontAwesomeIcon className="user-icon" icon={faUser} />
											{rev.username}
										</div>
										<div className="date">{rev.date.split("T")[0]}</div>
									</div>
									<div className="subject">{rev.subject}</div>
									<div className="star-rating">
										<StarRatingComponent
											name="rating"
											value={rev.rating}
											editing={false}
											starColor={"#295e85"}
											emptyStarColor={"#c0c0c0"}
										/>
									</div>
									<div className="review-body">{rev.review}</div>

									<div>
										<p className="comments-header">Comments</p>
										{rev.comments.length < 1 ? (
											<div className="no-comment">No comments.</div>
										) : null}
										{rev.comments.reverse().map((comment) => (
											<div key={comment._id} className="comment-div">
												<div className="user-group">
													<div className="username">
														<FontAwesomeIcon
															className="user-icon"
															icon={faUser}
														/>
														{comment.username}
													</div>
													<div className="date">
														{comment.date.split("T")[0]}
													</div>
												</div>

												<div className="comment-body">{comment.comment}</div>
											</div>
										))}
									</div>
									{this.props.authenticated ? (
										<div>
											<div id={"commentForm" + rev["_id"]}>
												<Comment
													reviewId={rev["_id"]}
													userId={this.props.userId}
													updateFromChild={this.updateFromChild}
												/>
											</div>
										</div>
									) : (
										<div className="rev-comment">
											<Link to="/login">Log in</Link> to leave a comment.
										</div>
									)}
								</div>
							</div>
						))
					) : (
						<div className="rev-login">No reviews available.</div>
					)}
				</div>
			</div>
		);
	}
}

export default Listing;
