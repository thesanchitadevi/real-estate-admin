import ErrorSuffix from "@components/antd/ErrorSuffix";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Input, Select } from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { usePostProjects } from "@/queries/projects";
import DateContext from "@/contexts/DateContext";
import moment from "moment";
import DatePicker from "@components/antd/DatePicker";

const Create: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { mutateAsync: mutateProjectsAsync } = usePostProjects();

   const {
     date,
     setDate,
   } = React.useContext(DateContext);
   const on_Change = (newDate: any) => {
     setDate(newDate ? moment(newDate).toDate() : moment().toDate());
   };

  // Form Handler Hooks from React Use Form
  const { reset, handleSubmit, control } = useForm({
    defaultValues: {
      projectName: "",
      types: "",
      status: "",
      orientation: "",
      architect: "",
      address: "",
      city: "",
      area: "",
      landSize: "",
      numberUnits: "",
      apartmentSize: "",
      numberFloors: "",
      numberParkings: "",
      handOverDate: "",
    },
  });

  // Form On Valid Function
  const onValid = async ({
    projectName,
    types,
    status,
    orientation,
    architect,
    address,
    city,
    area,
    landSize,
    numberUnits,
    apartmentSize,
    numberFloors,
    numberParkings,
    handOverDate,
  }: FieldValues) => {
    message.open({
      type: "loading",
      content: "Creating New Platform..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        mutateProjectsAsync({
          projectName,
          types,
          status,
          orientation,
          architect,
          address,
          city,
          area,
          landSize,
          numberUnits,
          apartmentSize,
          numberFloors,
          numberParkings,
          handOverDate,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      reset();
      message.success(res.message);
      onClose();
    } else message.error(res.message);
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "95vw",
          background: "#070f1f",
        },
      }}
    >
      <DialogTitle className="flex flex-row items-center justify-between">
        <ListItemText primary={"Create"} secondary={"Projects"} />
        <IconButton onClick={onClose}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onValid)}>
        <DialogContent className="flex flex-col gap-2">
          <Typography>Project Name</Typography>
          <Controller
            control={control}
            name={"projectName"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                size="large"
                placeholder="Enter Project Name"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Typography>Types</Typography>
          <Controller
            control={control}
            name={"types"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                popupClassName="z-[1301]"
                className="w-full"
                size="large"
                placeholder={"Select Types"}
                showSearch
                allowClear
                options={[
                  { value: "construction", label: "Construction" },
                  { value: "residential", label: "Residential" },
                ]}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            )}
          />
          <Typography>Status</Typography>
          <Controller
            control={control}
            name={"status"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                popupClassName="z-[1301]"
                className="w-full"
                size="large"
                placeholder={"Select Status"}
                showSearch
                allowClear
                options={[
                  { value: "upcoming", label: "Upcoming" },
                  { value: "ongoing", label: "Ongoing" },
                  { value: "completed", label: "Completed" },
                ]}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            )}
          />
          <Typography>Orientation</Typography>
          <Controller
            control={control}
            name={"orientation"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                popupClassName="z-[1301]"
                allowClear
                className="w-full"
                size="large"
                placeholder={"Select Orientation"}
                showSearch
                options={[
                  { value: "north", label: "north" },
                  { value: "south", label: "south" },
                  { value: "east", label: "east" },
                  { value: "west", label: "west" },
                ]}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            )}
          />
          <Typography>Architect</Typography>
          <Controller
            control={control}
            name={"architect"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                size="large"
                placeholder="Enter Architect"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Typography>Address</Typography>
          <Controller
            control={control}
            name={"address"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                size="large"
                placeholder="Enter Address"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Typography>City</Typography>
              <Controller
                control={control}
                name={"city"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    size="large"
                    placeholder="Enter City"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>
            <div>
              <Typography>Area</Typography>
              <Controller
                control={control}
                name={"area"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    size="large"
                    placeholder="Enter Area"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>
          </div>
          <Typography>Land Size</Typography>
          <Controller
            control={control}
            name={"landSize"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                size="large"
                placeholder="Enter Land Size"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Typography>Apartment Size</Typography>
          <Controller
            control={control}
            name={"apartmentSize"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                size="large"
                placeholder="Enter Apartment Size"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Typography>Number Units</Typography>
              <Controller
                control={control}
                name={"numberUnits"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    size="large"
                    placeholder="Enter Number Units"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    type="number"
                    min="1"
                    max="100"
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>
            <div>
              <Typography>Number Floors</Typography>
              <Controller
                control={control}
                name={"numberFloors"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    size="large"
                    placeholder="Enter Number Floors"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    type="number"
                    min="1"
                    max="100"
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>
          </div>
          <Typography>Number Parkings</Typography>
          <Controller
            control={control}
            name={"numberParkings"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                size="large"
                placeholder="Enter Number Parkings"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                type="number"
                min="1"
                max="100"
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Typography>Handover Date</Typography>
          <Controller
            control={control}
            name={"handOverDate"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <DatePicker
                value={moment(value)}
                onChange={onChange}
              />
            )}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" type="submit">
            Create
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Create;
