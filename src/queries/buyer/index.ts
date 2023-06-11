import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getBuyer = (params: any) =>
  instance.get(`v1/Buyer`, {
    params,
  });

export const useGetBuyer = (params: any) => {
  return useQuery(["buyer", params], () => getBuyer(params), {
    select(data) {
      return data.data;
    },
  });
};
