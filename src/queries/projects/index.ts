import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUpdateProject } from "./types";

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


const getProjectById = (id: any) => {
  return instance.get(`v1/projects/${id}`, {
    // params: {},
  });
};

export const useGetProjectById = (id: any) => {
  return useQuery(["get-projects-by-id", id], () => getProjectById(id), {
    enabled: !!id,
    // select: (data: string) => data?.data || [],
  });
};

const updateProject = ({
  id,
  data,
}: {
  id: string | undefined;
  data: IUpdateProject;
}) => {
  return instance.patch(`v1/projects/${id}`, data);
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["get-employees-by-id"]);
    },
  });
};


const delProjects = (id: any) => instance.delete(`v1/projects/${id}`);

export const useDelProjects = () => {
  const queryClient = useQueryClient();
  return useMutation(delProjects, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["projects-info"]);
    },
  });
};
