import useAreYouSure from "@/hooks/useAreYouSure";
import { useDelTestimonial, useGetTestimonials } from "@/queries/testimonials";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { Box, IconButton, ListItemText } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import { MdDelete } from "react-icons/md";
import Create from "./components/create";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "fullName",
    headerAlign: "center",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    align: "center",
    // editable: true,
    valueGetter: (data: GridValueGetterParams) =>
      `${data?.row?.firstName || ""} ${data?.row?.lastName || ""}`,
  },
  {
    field: "testimonial",
    headerName: "Testimonial",
    width: 550,
    editable: false,
  },
  {
    headerName: "Action",
    field: "action",
    width: 50,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (data: any) => {
      const { mutateAsync: delTestimonial } = useDelTestimonial();

      const onDelete = async (id: any) => {
        message.open({
          type: "loading",
          content: "Deleting Review..",
          duration: 0,
        });
        const res = await handleResponse(() => delTestimonial(id), [200]);
        message.destroy();
        if (res.status) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      };

      const { contextHolder: delContextHolder, open: openClose } =
        useAreYouSure({
          title: "WANT TO Delete?",
          okText: "Delete",
          cancelText: "Cancel",
        });

      return (
        <>
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

const Testimonials: React.FC = () => {
  const { limit, setLimit, page, setPage, getQueryParams } =
    usePaginate();
  const { data, isLoading } = useGetTestimonials(getQueryParams());
  console.log(data);
  const { state, toggleState } = useToggle(false);

  return (
    <Box sx={{ height: 400, width: "100%" }} className="gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <ListItemText
          primary={"Testimonials"}
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

export default Testimonials;
