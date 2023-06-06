import { useGetProjects } from "@/queries/projects";
import { Box, ListItemText } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import columns from "./columns";
import { DataGrid } from "@mui/x-data-grid";
import { Input } from "antd";
import Create from "./components/create";

const Dashboard: React.FC = () => {
const { limit, setLimit, page, setPage, search, setSearch, getQueryParams } =
  usePaginate();
const { data, isLoading } = useGetProjects(getQueryParams());
console.log(data);
const { state, toggleState } = useToggle(false);

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
    <DataGrid
      loading={isLoading}
      rows={data?.data || []}
      columns={columns}
      disableSelectionOnClick
      rowCount={data?.total || 0}
      page={page}
      paginationMode={"server"}
      onPageChange={setPage}
      pageSize={limit}
      onPageSizeChange={setLimit}
      // disableRowSelectionOnClick
    />
  </Box>
);
};



export default Dashboard;
