import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUpdateEmployee } from "./types";

const getEmployees = (params: any) =>
  instance.get(`v1/employee`, {
    params,
  });

export const useGetEmployees = (params: any) => {
  return useQuery(["employees", params], () => getEmployees(params), {
    select(data) {
      return data.data;
    },
  });
};

const postEmployee = (data: {
  firstName: string;
  lastName: string;
  designation: string;
  description: string;
  rank: number;
  isActive: boolean;
}) => instance.post(`v1/employee`, data);

export const usePostEmployee = () => {
  const qc = useQueryClient();
  return useMutation(postEmployee, {
    onSuccess: () => {
      qc.invalidateQueries(["employee"]);
    },
  });
};


const getEmployeesById = (id: any) => {
  return instance.get(`/employee/${id}`, {
    // params: {},
  });
};

export const useGetEmployeesById = (id: any) => {
  return useQuery(["get-employees-by-id", id], () => getEmployeesById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateEmployee = ({
  id,
  data
}: {
  id: string | undefined,
  data: IUpdateEmployee
}) => {
    return instance.patch(`/employee/${id}`,data);
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      queryClient.invalidateQueries(["get-employees-by-id"]);
    },
  });
}

const delEmployee = (id: any) => instance.delete(`v1/employee/${id}`);

export const useDelEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(delEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(["employee"]);
      queryClient.invalidateQueries(["employee-info"]);
    },
  });
};
