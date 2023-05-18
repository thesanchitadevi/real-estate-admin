import useAuth from "@/hooks/useAuth";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { Button, Typography } from "@mui/material";
import { Input } from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

const Home: React.FC = () => {
	const { login, isLoginLoading } = useAuth();
	console.log(login);

	const {
		// reset,
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			remember: true,
		},
	});

	const onValid = async ({ email, password, remember }: FieldValues) => {
		login(email, password, remember);
	};

	return (
		<form
			className="max-w-xs flex flex-col gap-2 w-full"
			onSubmit={handleSubmit(onValid)}
		>
			<Typography
				variant="h5"
				className="w-full text-center font-bold"
			>
				"Real-estate"
			</Typography>
			<Typography
				variant="h6"
				className="w-full text-center font-bold mb-6 text-slate-500"
			>
				Admin Portal
			</Typography>
			<Typography variant="overline">Email</Typography>
			<Controller
				control={control}
				name={"email"}
				rules={{ required: true }}
				render={({
					field: { onChange, onBlur, value },
					fieldState: { error },
				}) => (
					<Input
						size="large"
						className="border-none"
						placeholder={"Email"}
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
							Password{" "}
							<ErrorSuffix
								error={error}
								size="small"
							/>
						</Typography>
						<Input.Password
							placeholder={"Password"}
							size="large"
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							className="border-none"
						/>
					</>
				)}
			/>
			<Button
				variant="contained"
				size="large"
				className="mt-5"
				type="submit"
				disabled={isLoginLoading}
			>
				Login
			</Button>
		</form>
	);
};

export default Home;
