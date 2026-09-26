import api from "@/lib/utils";
import { CategoriesRes, ProjectResponse, ProjectsResponse } from "./types";
import axios from "axios";

export const getPopularCategories = async () => {
	try {
		const res = await api.get("/projects/popular-categories");
		return res.data as CategoriesRes;
	} catch (error) {
		console.error("Error fetching popular categories:", error);
	}
};

export const getProjects = async (limit: number, queryString: string = "") => {
	try {
		const queryParams = queryString ? `&${queryString}` : "";

		const res = await api.get(`/projects?limit=${limit}${queryParams}`);
		return res.data as ProjectsResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Error fetching projects:", error.response?.data);
		}
	}
};

export const getProjectById = async (projectId: string) => {
	try {
		const res = await api.get(`/projects/${projectId}`);
		return res.data as ProjectResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Error fetching projects:", error.response?.data);
		} else console.error("Error fetching project by ID:", error);
	}
};
