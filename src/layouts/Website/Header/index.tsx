import { Avatar } from "@mui/material";
import React from "react";

const WebsiteHeader: React.FC = () => {
	return (
		<div className="h-72 flex flex-col items-start justify-center">
			<Avatar
				src="/favicon.svg"
				variant="rounded"
				className="h-24 w-24"
			/>
		</div>
	);
};

export default WebsiteHeader;
