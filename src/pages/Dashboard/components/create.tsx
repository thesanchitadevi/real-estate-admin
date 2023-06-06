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
import { Input, Select, Upload, UploadProps } from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import handleResponse from "@/utilities/handleResponse";
import { usePostProjects } from "@/queries/projects";
import { usePaginate } from "@tam11a/react-use-hooks";

const Create: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const {data: projectData, mutateAsync: mutateProjectsAsync } = usePostProjects();

  // Types Query Params
  const { search: typesSearch, setSearch: setTypesSearch } = usePaginate({
    defaultParams: {
      limit: 30,
    },
  });

  // Types for Options in Select
  const [typesOptions, setTypesOptions] = React.useState<
    { value: any; label: any }[]
  >([]);
  React.useEffect(() => {
    setTypesOptions(
      Array.from(projectData?.data || [], (types: any) => ({
        value: types.id,
        label: types.keyword,
      }))
    );
  }, [projectData]);
    
  // Status Query Params
  const { search: statusSearch, setSearch: setStatusSearch } = usePaginate({
    defaultParams: {
      limit: 30,
    },
  });

  // Status for Options in Select
  const [statusOptions, setStatusOptions] = React.useState<
    { value: any; label: any }[]
  >([]);
  React.useEffect(() => {
    setStatusOptions(
      Array.from(projectData?.data || [], (status: any) => ({
        value: status.id,
        label: status.keyword,
      }))
    );
  }, [projectData]);

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
                mode="multiple"
                className="w-full"
                size="large"
                placeholder={"Select Types"}
                showSearch
                options={typesOptions}
                searchValue={typesSearch}
                onSearch={(v) => setTypesSearch(v)}
                // loading={isPlatformLoading}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
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
                mode="multiple"
                className="w-full"
                size="large"
                placeholder={"Select Status"}
                showSearch
                options={statusOptions}
                searchValue={statusSearch}
                onSearch={(v) => setStatusSearch(v)}
                // loading={isPlatformLoading}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
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
              <Input
                size="large"
                placeholder="Enter Orientation"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
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
