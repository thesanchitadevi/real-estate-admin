import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import { useGetEmployeesById, useUpdateEmployee } from "@/queries/employee";

const EmployeeInfo: React.FC = ({}) => {
  const { eid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: employeeData } = useGetEmployeesById(eid);
  const { mutateAsync: updateUser } = useUpdateEmployee();

  React.useEffect(() => {
    if (!employeeData) return;
    reset({
      firstName: employeeData?.data?.data?.firstName,
      lastName: employeeData?.data?.data?.lastName,
      designation: employeeData?.data?.data?.designation,
      description: employeeData?.data?.data?.description,
      rank: employeeData?.data?.data?.rank,
    });
  }, [employeeData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Employee Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          id: eid,
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
      <Typography className="font-bold text-white text-xl text-center">
        Update Employee Information
      </Typography>
      <Container maxWidth={"xs"}>
        <form
          className="py-3 grid grid-cols-1 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label isRequired>First Name</Label>
              <Controller
                control={control}
                name={"firstName"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="First Name"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <Label isRequired>Last Name</Label>
              <Controller
                control={control}
                name={"lastName"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Last Name"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <Label isRequired>Designation</Label>
              <Controller
                control={control}
                name={"designation"}
                rules={{ required: true }}
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
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <Label isRequired>Description</Label>
              <Controller
                control={control}
                name={"description"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="Description"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label>Rank</Label>
            <Controller
              control={control}
              name={"rank"}
              rules={{ required: true }}
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
                  type="number"
                  min="1"
                  max="10"
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>

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

export default EmployeeInfo;
