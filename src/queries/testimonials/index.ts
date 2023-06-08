import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const getTestimonials = (params: any) =>
  instance.get(`v1/testimonials`, {
    params,
  });

export const useGetTestimonials = (params: any) => {
  return useQuery(["testimonials", params], () => getTestimonials(params), {
    select(data) {
      return data.data;
    },
  });
};

const postTestimonials = (data: {
  firstName: string;
  lastName: string;
  testimonial: string;
}) => instance.post(`v1/testimonials`, data);

export const usePostTestimonials = () => {
  const qc = useQueryClient();
  return useMutation(postTestimonials, {
    onSuccess: () => {
      qc.invalidateQueries(["testimonials"]);
    },
  });
};

const delTestimonial = (id: any) => instance.delete(`v1/testimonials/${id}`);

export const useDelTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation(delTestimonial, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tsetimonials"]);
    },
  });
};
