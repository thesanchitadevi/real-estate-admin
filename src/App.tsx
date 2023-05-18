import React, { lazy } from "react";

import theme from "@styles/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { ConfigProvider, theme as antdTheme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const BaseRoutes = lazy(() => import("./routes"));

const query = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const App: React.FC = () => {
	return (
		<QueryClientProvider client={query}>
			<ThemeProvider theme={theme}>
				<ConfigProvider
					theme={{
						algorithm: antdTheme.darkAlgorithm,
						token: {
							colorPrimary: theme.palette.primary.main,
							borderRadius: 4,
							fontFamily: theme.typography.fontFamily,
							colorBgBase: "#242933",
						},
					}}
				>
					<CssBaseline />
					<BrowserRouter>
						<AuthProvider>
							<BaseRoutes />
						</AuthProvider>
					</BrowserRouter>
				</ConfigProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
