import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import setAuthToken from "../auth/setAuthToken";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {}
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
		const user = {
			email: this.state.email,
			password: this.state.password,
		};
		axios
			.post("/api/user/login", user)
			.then((res) => {
				// console.log(res.data);
				setAuthToken(res.data.token);
				this.props.setToken(res.data.token);
				this.props.setUser(res.data.username);
				this.props.setUserId(res.data.id);
				this.props.setAuthenticated(true);
				this.props.history.push("/");
				localStorage.setItem('user', res.data.username);
				localStorage.setItem('token', res.data.token);
			})
			.catch((err) => {
				console.log(err);
				this.setState({ errors: err });
			});
	}

	render() {
		const errors = this.state.errors;
		console.log(errors);
		return (
			<div>
				<h1>Log in</h1>
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
					{errors.email && <div>{errors.email}</div>}
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
					{errors.password && <div>{errors.password}</div>}
					<br></br>
					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
