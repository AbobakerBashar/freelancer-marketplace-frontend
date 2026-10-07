"use server";

import api from "@/utils/api";
import { getAuthToken } from "@/utils/auth";
import axios from "axios";
import { redirect } from "next/navigation";
import type { MessagesResponse, ProjectConversationResponse } from "./types";

export const getConversation = async (
	projectId: string,
): Promise<ProjectConversationResponse> => {
	try {
		const res = await api.get(`/projects/${projectId}/conversation`, {
			headers: {
				cookie: `jwt=${await getAuthToken()}`,
			},
		});

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("Axios Error Response:", error);

			return {
				success: false,
				statusCode: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"Error occurred while fetching messages.",
			};
		} else
			return {
				success: false,
				statusCode: 500,
				message: "Something went wrong!",
			};
	}
};

export const getMessages = async (
	projectId: string,
): Promise<MessagesResponse> => {
	try {
		const token = await getAuthToken();
		if (!token) redirect("/auth/signin");

		const res = await api.get(`/conversations/${projectId}/messages`, {
			headers: {
				cookie: `jwt=${await getAuthToken()}`,
			},
		});
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("Axios Error Response:", error.response?.data);

			return {
				success: false,
				statusCode: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"Error occurred while fetching messages.",
			};
		} else
			return {
				success: false,
				statusCode: 500,
				message: "Something went wrong!",
			};
	}
};
