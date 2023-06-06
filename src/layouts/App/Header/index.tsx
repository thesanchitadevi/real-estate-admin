import useUser from "@/hooks/useUser";
import { AppBar, Avatar, Container, ListItemText } from "@mui/material";
import React from "react";

const AppHeader: React.FC = () => {
	const user = useUser();

	return (
    <>
      <AppBar
        className="shadow-none bg-[#070f1f]"
        sx={{ background: "transparent" }}
      >
        <Container className="flex flex-row items-center justify-between p-2 px-6">
          <ListItemText
            primary={"Real-estate"}
            secondary={"Admin Portal"}
            className="hidden sm:block"
          />
          <ListItemText
            primary={user.fullName}
            secondary={user.username}
            className="ml-3 text-right"
          />
        </Container>
      </AppBar>
      <div className="mb-20" />
    </>
  );
};

export default AppHeader;
