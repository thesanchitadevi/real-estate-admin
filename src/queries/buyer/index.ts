import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getBuyer = (params: any) =>
  instance.get(`v1/buyer`, {
    params,
  });

export const useGetBuyer = (params: any) => {
  return useQuery(["buyer", params], () => getBuyer(params), {
    select(data) {
      return data.data;
    },
  });
};

const updateBuyer = ({
  id
}: {
  id: string | undefined;
}) => {
  return instance.put(`v1/buyer/${id}`);
};

export const useUpdateBuyer = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBuyer, {
    onSuccess: () => {
      queryClient.invalidateQueries(["buyer"]);
    },
  });
};
