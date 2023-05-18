import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";

const WebsiteFooter: React.FC = () => {
	return (
		<div className="w-full flex flex-row items-center justify-center">
			<Typography
				variant="caption"
				className="text-center"
			>
				©{moment().format("yyyy")} All Rights Reserved by Real-Estate
			</Typography>
		</div>
	);
};

export default WebsiteFooter;
