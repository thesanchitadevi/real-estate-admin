import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getContact = (params: any) =>
  instance.get(`v1/Contact`, {
    params,
  });

export const useGetContact = (params: any) => {
  return useQuery(["contact", params], () => getContact(params), {
    select(data) {
      return data.data;
    },
  });
};
