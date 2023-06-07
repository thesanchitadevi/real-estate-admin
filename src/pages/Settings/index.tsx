import useUser from "@/hooks/useUser";
import { useUpdateUserInfo } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { message } from "@components/antd/message";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Input } from "antd";
import React, { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

const Settings: React.FC = () => {
  const user = useUser();
  console.log(user);

  const { control, handleSubmit, reset } = useForm();
  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    });
  }, [user.firstName, user.lastName, user.username]);

  const { mutateAsync: updateUser } = useUpdateUserInfo();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    message.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
          },
        }),
      [201]
    );
    message.destroy();
    if (res.status) message.success("Information updated successfully!");
    else message.error(res.message);
  };

  return (
    <>
      <Typography className="font-bold text-white text-xl text-center">
        Settings
      </Typography>
      <Container maxWidth={"lg"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mt-4"
        >
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
          <div>
            <Label isRequired>Username</Label>
            <Controller
              control={control}
              name={"username"}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="username"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  suffix={<ErrorSuffix error={error} />}
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

export default Settings;
