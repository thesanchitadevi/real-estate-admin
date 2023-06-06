import { useDelProjects, useGetProjects } from "@/queries/projects";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
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

const Dashboard: React.FC = () => {
  const { getQueryParams } = usePaginate();
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
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {data?.data.map((project: any) => (
          <>
            {delContextHolder}
            <Card key={project.id} style={{ width: 300 }} className="mb-4">
              <CardHeader
                // action={}
                title={project.projectName}
                subheader={project.architect}
              />
              <Grid item xs={1.7} md={1.9}>
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Types: <span className="text-white">{project.types}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Status: <span className="text-white">{project.status}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Orientation:{" "}
                    <span className="text-white">{project.orientation}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Address:{" "}
                    <span className="text-white">{project.address}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    City: <span className="text-white">{project.city}</span>
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Area: <span className="text-white">{project.area}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Land Size:{" "}
                    <span className="text-white">{project.landSize}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Number Units:{" "}
                    <span className="text-white">{project.numberUnits}</span>
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Number Floors:{" "}
                    <span className="text-white">{project.numberFloors}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Number Parkings:{" "}
                    <span className="text-white">{project.numberParkings}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Apartment Size:{" "}
                    <span className="text-white">{project.apartmentSize}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    color="text.secondary"
                  >
                    Handover Date:{" "}
                    <span className="text-white">{project.handOverDate}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CreatedBy: <Chip label={project.createdBy?.username} />
                  </Typography>
                </CardContent>
              </Grid>
              <CardActions disableSpacing>
                <IconButton
                  sx={{ fontSize: "large" }}
                  color="error"
                  onClick={() =>
                    openClose(
                      () => onDelete(data.row.id),
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
            </Card>
          </>
        ))}
      </div>
    </Box>
  );
};

export default Dashboard;
