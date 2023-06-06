import { Icon } from "@iconify/react";
import {  Chip, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FiEdit2 } from "react-icons/fi";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "projectName",
    headerName: "Project Name",
    width: 150,
    editable: true,
  },
  {
    field: "types",
    headerName: "Types",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
  },
  {
    field: "orientation",
    headerName: "Orientation",
    width: 150,
    editable: true,
  },
  {
    field: "architect",
    headerName: "Architect",
    width: 150,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
    editable: true,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
    editable: true,
  },
  {
    field: "area",
    headerName: "Area",
    width: 150,
    editable: true,
  },
  {
    field: "landSize",
    headerName: "Land Size",
    width: 150,
    editable: true,
  },
  {
    field: "numberUnits",
    headerName: "Number Units",
    width: 150,
    editable: true,
  },
  {
    field: "apartmentSize",
    headerName: "Apartment Size",
    width: 150,
    editable: true,
  },
  {
    field: "numberFloors",
    headerName: "Number Floors",
    width: 150,
    editable: true,
  },
  {
    field: "numberParkings",
    headerName: "Number Parkings",
    width: 150,
    editable: true,
  },
  {
    field: "handOverDate",
    headerName: "Handover Date",
    width: 150,
    editable: true,
  },
  {
    headerName: "Created by",
    field: "createdBy",
    width: 170,
    headerAlign: "center",
    align: "center",
    renderCell: (data: any) =>
      data?.row?.createdBy?.username ? (
        <Chip label={data?.row?.createdBy?.username} />
      ) : (
        "-"
      ),
  },
  {
    headerName: "Action",
    field: "action",
    width: 150,
    minWidth: 150,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (data: any) => (
      <>
        <IconButton
          sx={{ fontSize: "large" }}
          color="primary"
        //   onClick={() => navigate(`/app/product/${data.row?._id}`)}
          // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
        >
          <FiEdit2 />
        </IconButton>
        <IconButton
          sx={{ fontSize: "large" }}
          color="error"
          disabled
          // onClick={() =>
          //   open(<>Are you sure you want to delete this employee?</>)
          // }
          // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
        >
          <Icon icon="ci:trash-full" />
        </IconButton>
      </>
    ),
  },
];

export default columns;
