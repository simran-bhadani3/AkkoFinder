import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

class NavigationTab extends Component {
	constructor() {
		super();
		this.state = {
			redirect: false,
		};
		this.redirect = this.redirect.bind(this);
	}

	redirect(id) {
		sessionStorage.setItem("listingId", id);
		this.setState({ redirect: true });
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/info" />;
		} else if (this.props.onCampus) {
			return (
				<div>
					<br></br>
					<br></br>
					<br></br>
					<div className="header">
						<hr />
						<p className="heading">On-Campus Accomodation</p>
						<hr />
					</div>
					<div className="container">
						<div className="row">
							{this.props.onData &&
								this.props.onData.map((acc) => (
									<div
										className="col col-lg-4 col-md-6 col-sm-12 col-xs-12 py-4"
										key={acc.id}
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
											</div>
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
													View options
												</div>
											)}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<br></br>
					<br></br>
					<br></br>
					<div className="header">
						<hr />
						<p className="heading">Off-Campus Accomodation</p>
						<hr />
					</div>
					<div className="container">
						<div className="row">
							{this.props.offData &&
								this.props.offData.map((acc) => (
									<div
										className="col col-lg-4 col-md-6 col-sm-12 col-xs-12 py-4"
										key={acc.id}
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
											</div>
											<div className="text-center imgText card-body">
												<p className="card-text">{acc.name}</p>
											</div>
											{acc.comingSoon ? (
												<div>
													<div className="text-center comingSoon">
														Coming soon!
													</div>
												</div>
											) : (
												<div>
													<div className="text-center optionText card-link">
														View options
													</div>
												</div>
											)}
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

export default withRouter(NavigationTab);
