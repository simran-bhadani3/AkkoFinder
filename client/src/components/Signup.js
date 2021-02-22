import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import Loading from "./Loading";

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			confirmpassword: "",
			errors: {},
			loading: false,
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
		this.setState({ loading: true });
		event.preventDefault();
		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmpassword: this.state.confirmpassword,
		};
		axios
			.post("/api/user/register", user)
			.then((res) => {
				this.setState({ user: true });
				this.setState({ loading: false });
				this.props.history.push("/login");
			})
			.catch((err) => {
				this.setState({ errors: err.response.data });
				this.setState({ loading: false });
			});
	}

	render() {
		const errors = this.state.errors;
		return (
			<div className="container-fluid">
				<div className="header">
					<hr />
					<p className="heading">Sign Up</p>
					<hr />
				</div>
				<img
					src={require("../assets/navBg.jpg").default}
					alt="nav background"
					className="nav-bg"
				></img>
				<div className="signup w-75 card signup-card">
					<form onSubmit={this.onSubmit}>
						<label htmlFor="username">Username</label>
						<br></br>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.username,
							})}
							id="username"
							name="username"
							value={this.state.username}
							onChange={this.onChange}
						></input>
						{errors.username && (
							<div className="error-text">{errors.username}</div>
						)}
						<br></br>
						<label htmlFor="email">Email</label>
						<br></br>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.email,
							})}
							id="email"
							name="email"
							value={this.state.email}
							onChange={this.onChange}
						></input>
						{errors.email && <div className="error-text">{errors.email}</div>}
						<br></br>
						<label htmlFor="password">Password</label>
						<br></br>
						<input
							type="password"
							className={classnames("form-control", {
								"is-invalid": errors.password,
							})}
							id="password"
							name="password"
							value={this.state.password}
							onChange={this.onChange}
						></input>
						{errors.password && (
							<div className="error-text">{errors.password}</div>
						)}
						<br></br>
						<label htmlFor="confirmpassword">Confirm password</label>
						<br></br>
						<input
							type="password"
							className={classnames("form-control", {
								"is-invalid": errors.confirmpassword,
							})}
							id="confirmpassword"
							name="confirmpassword"
							value={this.state.confirmpassword}
							onChange={this.onChange}
						></input>
						{errors.confirmpassword && (
							<div className="error-text">{errors.confirmpassword}</div>
						)}
						<br></br>
						<input type="submit" className="btn btn-primary" value="Register" />
						<Loading loading={this.state.loading} />
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(Signup);
