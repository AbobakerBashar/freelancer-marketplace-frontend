import { useMutation } from "@tanstack/react-query";
import { createProject, deleteProject, editProject } from "./api";
import { ProjectFormOutput } from "./types";

export const usePostProject = () => {
  return useMutation({
    mutationFn: (projectData: ProjectFormOutput) => createProject(projectData),
  });
};

export const useEditProject = () => {
  return useMutation({
    mutationFn: ({
      projectData,
      projectId,
    }: {
      projectData: Partial<ProjectFormOutput>;
      projectId: string;
    }) => editProject(projectData, projectId),
  });
};

export const useDeleteProject = () => {
  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
  });
};
