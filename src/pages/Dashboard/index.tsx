import { useDelProjects, useGetProjects } from "@/queries/projects";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import Create from "./components/create";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

const Dashboard: React.FC = () => {
  const { search, setSearch, getQueryParams } = usePaginate();
  const { data, isLoading } = useGetProjects(getQueryParams());
  console.log(data);
  const { state, toggleState } = useToggle(false);

  const { mutateAsync: delProject } = useDelProjects();

  const onDelete = async (id: any) => {
    message.open({
      type: "loading",
      content: "Deleting Review..",
      duration: 0,
    });
    const res = await handleResponse(() => delProject(id), [200]);
    message.destroy();
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  const { contextHolder: delContextHolder, open: openClose } = useAreYouSure({
    title: "WANT TO Delete?",
    okText: "Delete",
    cancelText: "Cancel",
  });

  const navigate = useNavigate();

  return (
    <Box sx={{ height: 400, width: "100%" }} className="gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <ListItemText
          primary={"Projects"}
          secondary={"+ Add New"}
          primaryTypographyProps={{
            className: "font-bold text-white text-2xl",
          }}
          secondaryTypographyProps={{
            component: "button",
            className: "my-2 primary-main font-bold",
            onClick: toggleState,
          }}
        />
        <Create open={state} onClose={toggleState} />
        <Input
          size="large"
          className="max-w-xs"
          allowClear
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-5">
        {data?.data.map((project: any) => (
          <>
            {delContextHolder}
            <Box
              key={project.id}
              className="bg-none"
              sx={{
                width: "80%",
                mb: 1,
              }}
            >
              <div className="flex flex-row">
                <ListItemText
                  primary={project.projectName}
                  secondary={project.architect}
                  primaryTypographyProps={{
                    className: "font-semibold text-white text-xl",
                  }}
                />
                <CardActions disableSpacing className="">
                  <IconButton
                    sx={{ fontSize: "large" }}
                    color="primary"
                    onClick={() => navigate(`/app/projects/${project?.id}`)}
                  >
                    <FiEdit2 />
                  </IconButton>
                  <IconButton
                    sx={{ fontSize: "large" }}
                    color="error"
                    onClick={() =>
                      openClose(
                        () => onDelete(project.id),
                        <>
                          Are you sure you want to delete this{" "}
                          {`${project.projectName || ""} `}?
                        </>
                      )
                    }
                  >
                    <MdDelete />
                  </IconButton>
                </CardActions>
              </div>
              <Divider />
              <CardContent className="grid grid-cols-3 ">
                <Typography variant="body2" color="text.secondary">
                  Types: <span className="text-white">{project.types}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: <span className="text-white">{project.status}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Orientation:{" "}
                  <span className="text-white">{project.orientation}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: <span className="text-white">{project.address}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  City: <span className="text-white">{project.city}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Area: <span className="text-white">{project.area}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Land Size:{" "}
                  <span className="text-white">{project.landSize}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number Units:{" "}
                  <span className="text-white">{project.numberUnits}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number Floors:{" "}
                  <span className="text-white">{project.numberFloors}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number Parkings:{" "}
                  <span className="text-white">{project.numberParkings}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Apartment Size:{" "}
                  <span className="text-white">{project.apartmentSize}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Handover Date:{" "}
                  <span className="text-white">{project.handOverDate}</span>
                </Typography>
              </CardContent>
            </Box>
          </>
        ))}
      </div>
    </Box>
  );
};

export default Dashboard;
