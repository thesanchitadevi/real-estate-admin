import useAuth from "@/hooks/useAuth";
import Iconify from "@components/iconify";
import { useToggle } from "@tam11a/react-use-hooks";
import React, { lazy } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppMenu from "./Menu";
import { Container, IconButton } from "@mui/material";
import { FloatButton } from "antd";
import { CustomerServiceOutlined, CommentOutlined } from "@ant-design/icons";

const AppHeader = lazy(() => import("./Header"));
const AppFooter = lazy(() => import("./Footer"));

const AppLayout: React.FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { state, toggleState } = useToggle(false);

  return auth.isLoggedIn ? (
    <>
      <AppHeader />
      <Container>
        <Outlet />
      </Container>
      <AppFooter />

      <IconButton
        className="fixed bottom-3 right-4 rounded w-20 backdrop-blur "
        onClick={toggleState}
      >
        <Iconify icon={"gg:menu-grid-r"} className="text-5xl h-16" />
      </IconButton>
      <AppMenu open={state} onClose={toggleState} />
    </>
  ) : (
    <Navigate to={`/?to=${location.pathname}`} />
  );
};

export default AppLayout;
