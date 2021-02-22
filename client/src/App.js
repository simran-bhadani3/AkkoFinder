import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Listing from "./components/Listing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Info from "./components/Info";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import setAuthToken from "./auth/setAuthToken";
import jwt_decode from "jwt-decode";
import Loading from "./components/Loading";
import LoginTwo from "./components/LoginTwo";

const PageNotFound = () => <div>404 Page Not Found</div>;

function App() {
	const [token, setToken] = useState();
	const [user, setUser] = useState();
	const [userId, setUserId] = useState();
	const [authenticated, setAuthenticated] = useState(false);
	const [listingId, setListingId] = useState();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setToken(localStorage.getItem("token"));
			setUser(localStorage.getItem("user"));
			setAuthenticated(true);
			const decoded = jwt_decode(localStorage.getItem("token"));
			setUserId(decoded.id);
			setAuthToken(token);
		}
	}, [token]);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			const currentTime = Date.now() / 1000;
			const decoded = jwt_decode(localStorage.getItem("token"));
			if (decoded.exp < currentTime) {
				setAuthenticated(false);
				setUser("");
				localStorage.clear();
			}
		}
	}, []);

	return (
		<BrowserRouter>
			<div>
				<Navbar
					authenticated={authenticated}
					user={user}
					setUser={setUser}
					setAuthenticated={setAuthenticated}
				/>
				<Switch>
					<Route
						path="/"
						render={() => <List setListingId={setListingId} />}
						exact={true}
					/>
					<Route
						path="/register"
						render={() => (
							<Signup
								authenticated={authenticated}
								user={user}
								setUser={setUser}
								setAuthenticated={setAuthenticated}
							/>
						)}
					/>
					<Route
						path="/login"
						render={() => (
							<Login
								setToken={setToken}
								setUser={setUser}
								setUserId={setUserId}
								setAuthenticated={setAuthenticated}
							/>
						)}
					/>
					<Route
						path="/login2"
						render={() => (
							<LoginTwo
								setToken={setToken}
								setUser={setUser}
								setUserId={setUserId}
								setAuthenticated={setAuthenticated}
							/>
						)}
					/>
					<Route
						path="/listing"
						render={() => (
							<Listing authenticated={authenticated} userId={userId} />
						)}
					/>
					<Route
						path="/comment"
						render={() => (
							<Listing authenticated={authenticated} userId={userId} />
						)}
					/>
					<Route path="/info" render={() => <Info />} />
					<Route component={PageNotFound} />
				</Switch>
			</div>
			<Loading />
		</BrowserRouter>
	);
}

export default App;
