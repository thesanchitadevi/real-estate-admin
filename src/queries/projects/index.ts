import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProjects = (params: any) =>
  instance.get(`v1/projects`, {
    params,
  });

export const useGetProjects = (params: any) => {
  return useQuery(["projects", params], () => getProjects(params), {
    select(data) {
      return data.data;
    },
  });
};

const postProjects = (data: {
  projectName: string;
  types: number[];
  status: number[];
  orientation: number[];
  architect: string;
  address: string;
  city: string;
  area: string;
  landSize: string;
  numberUnits: number;
  apartmentSize: string;
  numberFloors: number;
  numberParkings: number;
  handOverDate: string;
}) => instance.post(`v1/projects`, data);

export const usePostProjects = () => {
  const qc = useQueryClient();
  return useMutation(postProjects, {
    onSuccess: () => {
      qc.invalidateQueries(["projects"]);
    },
  });
};
