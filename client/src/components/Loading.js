import React from "react";
import Loader from "react-loader-spinner";

//code adapted from https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
const LoadingIndicator = (props) => {
	return props.loading ? (
		<div
			style={{
				width: "100%",
				height: "100",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
// 			<Loader type="ThreeDots" color="#295e85" height="50" width="50" />
		</div>
	) : <div></div>;
};

export default LoadingIndicator;
