import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import setAuthToken from "../auth/setAuthToken";
import Loading from "./Loading";
class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
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
			email: this.state.email,
			password: this.state.password,
		};
		axios
			.post("/api/user/login", user)
			.then((res) => {
				setAuthToken(res.data.token);
				this.props.setToken(res.data.token);
				this.props.setUser(res.data.username);
				this.props.setUserId(res.data.id);
				this.props.setAuthenticated(true);
				this.props.history.goBack();
				localStorage.setItem("user", res.data.username);
				localStorage.setItem("token", res.data.token);
				this.setState({ loading: false });
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
				<img
					src={require("../assets/navBg.jpg").default}
					alt="nav background"
					className="nav-bg"
				></img>
				<div className="header">
					<hr />
					<p className="heading">Login</p>
					<hr />
				</div>
				<div className="signup w-75 card signup-card">
					<form onSubmit={this.onSubmit}>
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
						<input type="submit" className="btn btn-primary" value="Login" />
						<Loading loading={this.state.loading} />
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
