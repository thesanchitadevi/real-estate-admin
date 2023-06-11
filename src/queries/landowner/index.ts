import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getLandowner = (params: any) =>
  instance.get(`v1/Landowner`, {
    params,
  });

export const useGetLandowner = (params: any) => {
  return useQuery(["landowner", params], () => getLandowner(params), {
    select(data) {
      return data.data;
    },
  });
};

const updateLandowner = ({ id }: { id: string | undefined }) => {
  return instance.put(`v1/landowner/${id}`);
};

export const useUpdateLandowner = () => {
  const queryClient = useQueryClient();
  return useMutation(updateLandowner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["landowner"]);
    },
  });
};
