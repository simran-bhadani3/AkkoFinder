import React from "react";
import Loader from "react-loader-spinner";

//code adapted from https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
const Loading = (props) => {
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
 			Loading...
		</div>
	) : <div></div>;
};

export default Loading;
