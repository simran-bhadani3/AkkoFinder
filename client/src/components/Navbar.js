import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

	onLogout(event) {
		event.preventDefault();
		this.props.setAuthenticated(false);
		this.props.setUser("");
		localStorage.clear();
	}

	render() {
		const isAuthenticated = this.props.authenticated;
		console.log(this.props.authenticated);
		const user = this.props.user;

		const loginLinks = (
			<ul className="nav navbar-right">
				<li className="nav-item">
					<Link to="/register">Sign Up</Link>
				</li>
				<li className="nav-item">
					<Link to="/login">Login</Link>
				</li>
			</ul>
		);

		const logoutLinks = (
			<ul className="nav navbar-right">
				<li className="nav-item">
					{this.props.user}
					{console.log(this.props.user)}
				</li>
				<li className="nav-item">
					<a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
				</li>
			</ul>
		);
		

		return (
			<nav className="navbar">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">
							AkkoFinder
						</Link>
					</div>
					{console.log(isAuthenticated)}
					{isAuthenticated ? logoutLinks : loginLinks}
				</div>
			</nav>
		);
	}
}

export default Navbar;
