import { usePostRegister } from "@/queries/mods";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { message } from "@components/antd/message";
import { Button, Typography } from "@mui/material";
import { Input } from "antd";
import React from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";

const Mods: React.FC = () => {
  const { control, handleSubmit, reset } = useForm();
  const {mutateAsync: adminRegister} = usePostRegister();

  const onSubmit = async (data: FieldValues) => {
    message.open({
      type: "loading",
      content: `Updating information..`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        adminRegister({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          username: data.username,
          password: data.password
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      reset()
      message.success(res.message)
    }
    else message.error(res.message);
    
  }

  return (
    <>
      <Typography className="font-bold text-white text-2xl mb-3 flex items-center justify-center">
        Moderator
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-4">
        <Label isRequired>Email</Label>
        <Controller
          control={control}
          name={"email"}
          rules={{
            required: true,
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Email"
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Input.Group compact>
          <Label isRequired>Full Name</Label>
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
        <Controller
          control={control}
          name={"password"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Typography
                variant="overline"
                className="flex flex-row items-center gap-1"
              >
                Password <ErrorSuffix error={error} size="small" />
              </Typography>
              <Input.Password
                placeholder={"Password"}
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            </>
          )}
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          className="my-4"
          type="submit"
        >
          Create Admin
        </Button>
      </form>
    </>
  );
};

export default Mods;
