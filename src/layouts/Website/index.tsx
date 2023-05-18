import useAuth from "@/hooks/useAuth";
import React, { lazy } from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const WebsiteHeader = lazy(() => import("./Header"));
const WebsiteFooter = lazy(() => import("./Footer"));

const WebsiteLayout: React.FC = () => {
	const auth = useAuth();
	let [searchParams] = useSearchParams();

	return auth.isLoggedIn ? (
		<Navigate to={searchParams.get("to") || "/app"} />
	) : (
		<div className="flex flex-col items-center w-full min-h-screen justify-between py-3">
			<WebsiteHeader />
			<Outlet />
			<WebsiteFooter />
		</div>
	);
};

export default WebsiteLayout;
