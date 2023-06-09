import { useGetLandowner } from "@/queries/landowner";
import { Box, Checkbox, ListItemText } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Landowner: React.FC = () => {
    const columns: GridColDef[] = [
      {
        field: "landownerName",
        headerAlign: "center",
        headerName: "Landowner",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 150,
        minWidth: 150,
        flex: 1,
        align: "center",
        // editable: true,
      },
      {
        field: "landownerEmail",
        headerName: "Email",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "phoneNumber",
        headerName: "Phone",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "alterLandownerName",
        headerName: "Alter",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "locality",
        headerName: "Locality",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "fullAddress",
        headerName: "Full Address",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "landSize",
        headerName: "Land Size",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "width",
        headerName: "Width",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "category",
        headerName: "Category",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "attractiveFeature",
        headerName: "Feature",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: "facing",
        headerName: "Facing",
        width: 150,
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        headerName: "Action",
        field: "read",
        width: 150,
        minWidth: 150,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <Checkbox {...label}  color="success" />
          ),
      },
    ];
  const { limit, setLimit, page, setPage, getQueryParams } = usePaginate();
  const { data, isLoading } = useGetLandowner(getQueryParams());
  console.log(data);

  return (
    <Box sx={{ height: 400, width: "100%" }} className="gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <ListItemText
          primary={"Landowners"}
          primaryTypographyProps={{
            className: "font-bold text-white text-2xl",
          }}
        />
        {/* <Create open={state} onClose={toggleState} /> */}
      </div>
      <DataGrid className="mt-1.5"
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

export default Landowner;
