import { Avatar } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
	return (
		<div className="mt-[20vh]">
			<Avatar
				src="/404.svg"
				variant="square"
				className="w-[70vw] h-auto max-w-lg mx-auto"
			/>
		</div>
	);
};

export default NotFound;
