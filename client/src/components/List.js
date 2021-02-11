import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			img: "",
			types: "",
		};
	}

	componentDidMount() {
		axios
			.get("/api/oncampus/data")
			.then((res) => {
				console.log(res.data);
				this.setState({
					name: res.data.data[1].name,
					img: res.data.data[1].image,
					types: res.data.data[1].types,
					id: res.data.data[1].id,
				});
				console.log(this.state);
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className="container-fluid">
				<p className="heading">ON-CAMPUS ACCOMODATION</p>
				<hr></hr>
				<br></br>
				<br></br>
				<div className="row">
					<div className="col .col-3 text-center">
						<img
							className="accImg"
							src={require("../assets/oncampus/NUS.jpg").default}
							alt="NUS"
						></img>
						<p className="imgText">{this.state.name}</p>
						<p className="imgText">{this.state.types}</p>
						{this.props.setListingId(this.state.id)}
						{sessionStorage.setItem("listingId", this.state.id)}
						<Link to="/listing"> Click here </Link>
					</div>
					<div className="col .col-3 text-center">
						<img
							className="accImg"
							src={require("../assets/oncampus/NUS.jpg").default}
							alt="NUS"
						></img>
						<p className="imgText">{this.state.name}</p>
					</div>
					<div className="col .col-3 text-center">
						<img
							className="accImg"
							src={require("../assets/oncampus/NUS.jpg").default}
							alt="NUS"
						></img>
						<p className="imgText">{this.state.name}</p>
					</div>
					<div className="col .col-3 text-center">
						<img
							className="accImg"
							src={require("../assets/oncampus/NUS.jpg").default}
							alt="NUS"
						></img>
						<p className="imgText">{this.state.name}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default List;
