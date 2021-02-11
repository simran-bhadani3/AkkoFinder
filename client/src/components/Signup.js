import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			confirmpassword: "",
			errors: {},
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
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmpassword: this.state.confirmpassword,
		};
        console.log(user);
        axios.post("/api/user/register", user)
			.then(res => {
				console.log(res);
				this.setState({ user: true });
				this.props.history.push("/login")
			})
            .catch(err => this.setState({ errors: err.response.data }));
	}

    render() {
		const errors = this.state.errors;
		console.log(errors);
		return (
			<div>
				<h1>Sign up</h1>
				{/* <form action="/api/user/register" method="post"> */}
				<form onSubmit={this.onSubmit}>
					{/* {user && this.state.username} */}
					<label htmlFor="username">Username</label>
					<br></br>
					<input
                        type="text"
                        className={classnames("form-control", {"is-invalid": errors.username})}
						id="username"
						name="username"
						value={this.state.username}
						onChange={this.onChange}
                    ></input>
                    {(errors.username) &&
                        <div>{errors.username}</div>  
                    }
					<br></br>
					<label htmlFor="email">Email</label>
					<br></br>
					<input
                        type="text"
                        className={classnames("form-control", {"is-invalid": errors.email})}
						id="email"
						name="email"
						value={this.state.email}
						onChange={this.onChange}
                    ></input>
                    {(errors.email) &&
                        <div>{errors.email}</div>  
                    }
					<br></br>
					<label htmlFor="password">Password</label>
					<br></br>
					<input
                        type="password"
                        className={classnames("form-control", {"is-invalid": errors.password})}
						id="password"
						name="password"
						value={this.state.password}
						onChange={this.onChange}
                    ></input>
                    {(errors.password) &&
                        <div>{errors.password}</div>  
                    }
					<br></br>
					<label htmlFor="confirmpassword">Confirm password</label>
					<br></br>
					<input
                        type="password"
                        className={classnames("form-control", {"is-invalid": errors.confirmpassword})}
						id="confirmpassword"
						name="confirmpassword"
						value={this.state.confirmpassword}
						onChange={this.onChange}
                    ></input>
                    {(errors.confirmpassword) &&
                        <div>{errors.confirmpassword}</div>  
                    }
					<br></br>
					<input type="submit" className="btn btn-primary" value="Register" />
				</form>
			</div>
		);
	}
}

export default withRouter(Signup);
