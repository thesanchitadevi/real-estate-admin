import handleResponse from "@/utilities/handleResponse";
import { Container } from "@mui/system";
import { Input, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, DialogContent, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import { useGetProjectById, useUpdateProject } from "@/queries/projects";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import BackButton from "@components/BackButton";

const ProjectInfo: React.FC = ({}) => {
  const { pid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: projectData } = useGetProjectById(pid);
  const { mutateAsync: updateUser } = useUpdateProject();

  console.log(projectData, pid);
  
  React.useEffect(() => {
    if (!projectData) return;
    
    reset({
      projectName: projectData?.data?.data.projectName,
      types: projectData?.data?.data.types,
      status: projectData?.data?.data.status,
      orientation: projectData?.data?.data.orientation,
      architect: projectData?.data?.data.architect,
      address: projectData?.data?.data.address,
      city: projectData?.data?.data.city,
      area: projectData?.data?.data.area,
      landSize: projectData?.data?.data.landSize,
      numberUnits: projectData?.data?.data.numberUnits,
      apartmentSize: projectData?.data?.data.apartmentSize,
      numberFloors: projectData?.data?.data.numberFloors,
      numberParkings: projectData?.data?.data.numberParkings,
      handOverDate: projectData?.data?.data.handOverDate,
    });
  }, [projectData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Project Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          id: pid,
          data,
        }),
      [200]
    );
    message.destroy();
    if (res.status) {
      message.success("Information updated successfully!");
    } else {
      message.error(res.message);
    }
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <div className="flex flex-row">
          <BackButton />
          <Typography className="font-bold text-white text-xl mt-1">
            Project
          </Typography>
        </div>
      </Grid>
      <Container maxWidth={"md"}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  mode="multiple"
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
                <Input
                  size="large"
                  placeholder="Enter Handover Date"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
          </DialogContent>
          <Divider />
          <Button
            variant="contained"
            size="large"
            fullWidth
            className="my-4"
            type="submit"
          >
            Update Information
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ProjectInfo;
