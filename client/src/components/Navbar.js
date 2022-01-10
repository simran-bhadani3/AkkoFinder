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

		const loginLinks = (
			<ul className="nav navbar-right">
				<li className="nav-item">
					<Link to="/login" className="link-text">
						Login
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/register" className="link-text">
						Sign Up
					</Link>
				</li>
			</ul>
		);

		const logoutLinks = (
			<ul className="nav navbar-right">
				<li className="nav-item">
					{this.props.user}
				</li>
				<li className="nav-item">
					<a href="#" className="link-text" onClick={this.onLogout.bind(this)}>
						Logout
					</a>
				</li>
			</ul>
		);

		return (
			<nav className="navbar">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">
							AKKOFINDER
						</Link>
					</div>
					{isAuthenticated ? logoutLinks : loginLinks}
				</div>
			</nav>
		);
	}
}

export default Navbar;
