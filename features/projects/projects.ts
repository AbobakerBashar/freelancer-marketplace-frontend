import api from "@/lib/utils";
import { CategoriesRes, ProjectResponse, ProjectsResponse } from "./types";

export const getPopularCategories = async () => {
	try {
		const res = await api.get("/projects/popular-categories");
		return res.data as CategoriesRes;
	} catch (error) {
		console.error("Error fetching popular categories:", error);
	}
};

export const getProjects = async (limit: number) => {
	try {
		const res = await api.get(`/projects?limit=${limit}&status=OPEN`);
		return res.data as ProjectsResponse;
	} catch (error) {
		console.error("Error fetching popular categories:", error);
	}
};

export const getProjectById = async (projectId: string) => {
	try {
		const res = await api.get(`/projects/${projectId}`);
		return res.data as ProjectResponse;
	} catch (error) {
		console.error("Error fetching project by ID:", error);
	}
};
