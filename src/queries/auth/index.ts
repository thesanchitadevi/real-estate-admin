// Instance
import instance, { updateInstanceAuthorization } from "@/services";

// Third Party
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
import { ILogin, IUpdateUser } from "./types";

// Login function with instance
const login = (data: ILogin) => {
	return instance.post("/v1/admin/login", { ...data });
};
export const useLogin = () => {
	return useMutation(login);
};

// Validation function with instance
const getValidateUser = () => {
	updateInstanceAuthorization();
	return instance.get("/v1/admin/validate");
};

export const useGetValidation = (token: string | null) => {
	return useQuery(["validate", token], getValidateUser, {
		enabled: !!token,
		retry: 1,
		onError: async (error: { request: { status: number } }) => {
			return error.request.status;
		},
		// networkMode: "offlineFirst",
	});
};

// User information update
const updateUserInfo = ({ data }: { data: IUpdateUser | any }) => {
	return instance.patch(`/v1/admin/update-profile`, {
		...data,
	});
};

export const useUpdateUserInfo = () => {
	const query = useQueryClient();
	return useMutation([], updateUserInfo, {
		onSuccess: () => {
			query.invalidateQueries(["validate"]);
		},
	});
};
