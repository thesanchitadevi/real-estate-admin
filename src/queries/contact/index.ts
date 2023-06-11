import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getContact = (params: any) =>
  instance.get(`v1/contact`, {
    params,
  });

export const useGetContact = (params: any) => {
  return useQuery(["contact", params], () => getContact(params), {
    select(data) {
      return data.data;
    },
  });
};

const updateContact = ({ id }: { id: string | undefined }) => {
  return instance.put(`v1/contact/${id}`);
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(updateContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(["contact"]);
    },
  });
};
