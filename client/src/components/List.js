import React, { Component } from "react";
import axios from "axios";
import NavigationTab from "./NavigationTab";
import jQuery from "jquery";

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onCampus: true,
		};
	}

	componentDidMount() {
		axios
			.get("/api/accomodationdata/data")
			.then((res) => {
				// console.log(res.data);
				// this.setState({
				// 	name: res.data.data[1].name,
				// 	image: res.data.data[1].image,
				// 	types: res.data.data[1].types,w
				// 	id: res.data.data[1].id,
				// });
				// console.log(this.state);
				this.setState({
					onCampusData: res.data.data.onCampus,
					offCampusData: res.data.data.offCampus,
				});
			})
			.catch((err) => console.log(err));
		jQuery(".tab").click(function () {
			jQuery(".tab").removeClass("active");
			jQuery(this).addClass("active");
		});
	}

	onClick(bool) {
		this.setState({ onCampus: bool });
	}

	render() {
		return (
			<div className="container-fluid">
				<img
					src={require("../assets/landing.jpg").default}
					alt="landing"
					className="landing-img"
				></img>
				<div className="tag-line">
					Find the perfect accomodation for all your needs.
				</div>

				<div className="lists">
					<nav>
						<div className="tab active" onClick={() => this.onClick(true)}>
							On-Campus Accomodation
						</div>

						<div className="tab" onClick={() => this.onClick(false)}>
							Off-Campus Accomodation
						</div>
					</nav>
					<div className="listings">
						<NavigationTab
							onCampus={this.state.onCampus}
							onData={this.state.onCampusData}
							offData={this.state.offCampusData}
							setListingId={this.props.setListingId}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default List;
