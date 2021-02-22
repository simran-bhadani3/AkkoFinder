import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			id: "",
			data: "",
		};
		this.redirect = this.redirect.bind(this);
	}

	redirect(id) {
		sessionStorage.setItem("accId", id);
		this.setState({ redirect: true });
	}
	async componentDidMount() {
		const data = await axios.get(
			"/api/accomodationdata/info/" + sessionStorage.getItem("listingId")
		);
		this.setState({ data: data.data, loading: false });
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/listing" />;
		} else {
			return (
				<div className="container-fluid">
					<img
						src={require("../assets/navBg.jpg").default}
						alt="nav background"
						className="nav-bg"
					></img>
					<div className="header">
						<hr />
						<p className="heading">Available Options</p>
						<hr />
					</div>
					<div className="container">
						<div className="row">
							{!this.state.loading &&
								this.state.data.map((acc) => (
									<div
										className="col col-lg-4 col-md-6 col-sm-12 col-xs-12 py-4"
										id={acc.id}
									>
										<div className="card acc-card h-100 mb-6">
											<div className="text-center">
												<img
													className="accImg card-img-top"
													src={
														require(`../assets/oncampus/${acc.image}.jpg`)
															.default
													}
													alt={acc.image}
												></img>
												<div className="text-center imgText card-body">
													<p className="card-text">{acc.name}</p>
												</div>
												{acc.comingSoon ? (
													<div className="text-center comingSoon">
														Coming soon!
													</div>
												) : (
													<div
														className="text-center optionText card-link"
														onClick={() => this.redirect(acc.id)}
													>
														See reviews
													</div>
												)}
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Info;
