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
} from "@mui/material";
import { Input} from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { usePostEmployee } from "@/queries/employee";
import Label from "@components/Label";

const Create: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { mutateAsync: mutateEmployeeAsync } = usePostEmployee();

  // Form Handler Hooks from React Use Form
  const { reset, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      designation: "",
      description: "",
      rank: "",
      isActive: "",
    },
  });

  // Form On Valid Function
  const onValid = async ({
    firstName,
    lastName,
    designation,
    description,
    rank,
    isActive,
  }: FieldValues) => {
    message.open({
      type: "loading",
      content: "Creating New Platform..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        mutateEmployeeAsync({
          firstName,
          lastName,
          designation,
          description,
          rank,
          isActive,
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
        <ListItemText primary={"Add"} secondary={"New Employee"} />
        <IconButton onClick={onClose}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onValid)}>
        <DialogContent className="flex flex-col gap-2">
          <Label isRequired>Full Name</Label>
          <Input.Group compact>
            <Controller
              control={control}
              name={"firstName"}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  className="w-1/2"
                  placeholder="First Name"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
            <Controller
              control={control}
              name={"lastName"}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  className="w-1/2"
                  placeholder="Last Name"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
          </Input.Group>
          <Label isRequired>Designation</Label>
          <Controller
            control={control}
            name={"designation"}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                placeholder="Designation"
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Label isRequired>Description</Label>
          <Controller
            control={control}
            name={"description"}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input.TextArea
                placeholder="Enter Description"
                showCount
                maxLength={1000}
                autoSize={{ minRows: 4 }}
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            )}
          />
          <Label isRequired>Rank</Label>
          <Controller
            control={control}
            name={"rank"}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                placeholder="Rank"
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                type="number"
                min="1"
                max="10"
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
