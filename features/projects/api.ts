"use server";

import api from "@/utils/api";
import type {
	ActiveProjectsResponse,
	CategoriesRes,
	ProjectFormInput,
	ProjectResponse,
	ProjectsResponse,
	ProjectStatistics,
} from "./types";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";
import { redirect } from "next/navigation";

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
export const getProjectsStatics = async (
	queryString: string = "",
): Promise<ProjectStatistics> => {
	try {
		const queryParams = queryString ? `?${queryString}` : "";

		const res = await api.get(`/projects/stats${queryParams}`);
		return res.data as ProjectsResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.message)
				return {
					success: false,
					message: error.response.data.message,
				};
			else
				return {
					success: false,
					message: "An error occurred while fetching project statistics.",
				};
		} else
			return {
				success: false,
				message: "An error occurred while fetching project statistics.",
			};
	}
};

export const getProjectsProposalsCount = async (queryString: string = "") => {
	try {
		const queryParams = queryString ? `?${queryString}` : "";

		const res = await api.get(`/projects/proposals-count${queryParams}`);
		return res.data as ProjectsResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.message)
				return {
					success: false,
					message: error.response.data.message,
				};
			else
				return {
					success: false,
					message: "An error occurred while fetching project proposals count.",
				};
		} else
			return {
				success: false,
				message: "An error occurred while fetching project proposals count.",
			};
	}
};

export const getProjectById = async (
	projectId: string,
): Promise<ProjectResponse> => {
	try {
		const res = await api.get(`/projects/${projectId}`);
		return res.data as ProjectResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				message:
					error.response?.data?.message ||
					"An error occurred while retrieving the project.",
				statusCode: error.response?.status || 500,
				success: false,
			};
		} else
			return {
				message: "An error occurred while retrieving the project.",
				statusCode: 500,
				success: false,
			};
	}
};

export const createProject = async (
	projectData: ProjectFormInput,
): Promise<ProjectResponse> => {
	try {
		const res = await api.post("/projects", projectData);
		return res.data as ProjectResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.errors)
				return {
					success: false,
					errors: error.response.data.errors,
					statusCode: error.response?.status || 500,
				};
			return {
				success: false,
				message:
					error.response?.data?.message ||
					"An error occurred while creating the project.",
				statusCode: error.response?.status || 500,
			};
		} else {
			return {
				success: false,
				message: "An error occurred while creating the project.",
				statusCode: 500,
			};
		}
	}
};

export const editProject = async (
	projectData: Partial<ProjectFormInput>,
	projectId: string,
): Promise<ProjectResponse> => {
	try {
		const res = await api.put(`/projects/${projectId}`, projectData);
		return res.data as ProjectResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.errors)
				return {
					success: false,
					errors: error.response.data.errors,
					statusCode: error.response?.status || 500,
				};
			return {
				success: false,
				message:
					error.response?.data?.message ||
					"An error occurred while creating the project.",
				statusCode: error.response?.status || 500,
			};
		} else {
			return {
				success: false,
				message: "An error occurred while creating the project.",
				statusCode: 500,
			};
		}
	}
};

export const deleteProject = async (
	projectId: string,
): Promise<ProjectResponse> => {
	try {
		const token = await getAuthToken();
		// Redirect to signin if no token
		if (!token) redirect("/auth/signin");

		const res = await api.delete(`/projects/${projectId}`, {
			headers: {
				cookie: `jwt=${token}`,
			},
		});
		return res.data as ProjectResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				message:
					error.response?.data?.message ||
					"An error occurred while deleting the project.",
				statusCode: error.response?.status || 500,
				success: false,
			};
		} else
			return {
				message: "An error occurred while deleting the project.",
				statusCode: 500,
				success: false,
			};
	}
};

export const getActiveProjects = async (): Promise<ActiveProjectsResponse> => {
	try {
		const token = await getAuthToken();
		// Redirect to signin if no token
		if (!token) redirect("/auth/signin");

		const res = await api.get("/projects/active", {
			headers: {
				cookie: `jwt=${token}`,
			},
		});
		return res.data as ActiveProjectsResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				message:
					error.response?.data?.message ||
					"An error occurred while retrieving the active projects.",
				statusCode: error.response?.status || 500,
				success: false,
			};
		} else
			return {
				message: "An error occurred while retrieving the active projects.",
				statusCode: 500,
				success: false,
			};
	}
};
