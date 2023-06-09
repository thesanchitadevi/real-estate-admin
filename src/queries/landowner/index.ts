import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

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
