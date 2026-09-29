import { useMutation } from "@tanstack/react-query";
import { createProject, editProject } from "./api";
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
