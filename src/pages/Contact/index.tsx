import { useGetContact, useUpdateContact } from "@/queries/contact";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { Box, Checkbox, ListItemText } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";

const Contact: React.FC = () => {
  const { mutateAsync } = useUpdateContact();

  const columns: GridColDef[] = [
    {
      field: "contactName",
      headerAlign: "center",
      headerName: "Contact",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      flex: 1,
      align: "center",
      // editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      flex: 1,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 250,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: "message",
      headerName: "Message",
      width: 150,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      headerName: "Action",
      field: "isRead",
      width: 150,
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.isRead}
          onChange={async () => {
            message.open({
              type: "loading",
              content: "Marking..",
              duration: 0,
            });
            const res = await handleResponse(
              () =>
                mutateAsync({
                  id: params.row.id,
                }),
              [200]
            );
            message.destroy();
            if (res.status) {
              message.success(res.message);
            } else {
              message.error(res.message);
            }
          }}
        />
      ),
    },
  ];
  const { limit, setLimit, page, setPage, getQueryParams } = usePaginate();
  const { data, isLoading } = useGetContact(getQueryParams());
  console.log(data);

  return (
    <Box sx={{ height: 400, width: "100%" }} className="gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <ListItemText
          primary={"Contacts"}
          primaryTypographyProps={{
            className: "font-bold text-white text-2xl",
          }}
        />
        {/* <Create open={state} onClose={toggleState} /> */}
      </div>
      <DataGrid
        className="mt-1.5"
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

export default Contact;
