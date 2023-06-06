import React from "react";
import { useDelEmployee, useGetEmployees } from "@/queries/employee";
import { Avatar, Box, IconButton, ListItemText } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { GridColDef, DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import Create from "./components/Create/create";
import { FiEdit2 } from "react-icons/fi";
import { Icon } from "@iconify/react";
import { MdDelete } from "react-icons/md";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "image",
    headerName: "Image",
    flex: 1,
    renderCell: (params) => {
      console.log(params);
      return (
        <>
          <Avatar src={params.value.avatar} className="w-8 h-8"/>
          {params.value.username}
        </>
      );
    },
  },
  {
    field: "fullName",
    headerAlign: "center",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    align: "center",
    width: 200,
    // editable: true,
    valueGetter: (data: GridValueGetterParams) =>
      `${data?.row?.firstName || ""} ${data?.row?.lastName || ""}`,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 150,
    editable: false,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    editable: false,
  },
  {
    field: "rank",
    headerName: "Rank",
    width: 150,
    editable: false,
  },
  {
    field: "isActive",
    headerName: "isActive",
    width: 150,
    editable: false,
  },
  {
    headerName: "Action",
    field: "action",
    width: 150,
    minWidth: 150,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (data: any) => {
      const { mutateAsync: delEmployee } = useDelEmployee();

      const onDelete = async (id: any) => {
        message.open({
          type: "loading",
          content: "Deleting Review..",
          duration: 0,
        });
        const res = await handleResponse(() => delEmployee(id), [200]);
        message.destroy();
        if (res.status) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      };

      const { contextHolder: delContextHolder, open: openClose } =
        useAreYouSure({
          title: "WANT TO Delte?",
          okText: "Delete",
          cancelText: "Cancel",
        });

      const navigate = useNavigate();
      return (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/employee/${data.row?.id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>
          {delContextHolder}
          <IconButton
            sx={{ fontSize: "large" }}
            color="error"
            onClick={() =>
              openClose(
                () => onDelete(data.row.id),
                <>
                  Are you sure you want to delete this{" "}
                  {`${data?.row?.firstName || ""} ${data?.row?.lastName || ""}`}
                  ?
                </>
              )
            }
          >
            <MdDelete />
          </IconButton>
        </>
      );
    },
  },
];

const Employee: React.FC = () => {
  const { limit, setLimit, page, setPage, search, setSearch, getQueryParams } =
    usePaginate();
  const { data, isLoading } = useGetEmployees(getQueryParams());
  console.log(data);
  const { state, toggleState } = useToggle(false);

  return (
    <Box sx={{ height: 400, width: "100%" }} className="gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <ListItemText
          primary={"Management Team"}
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

export default Employee;
