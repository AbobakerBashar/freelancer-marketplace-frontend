"use server";

import api from "@/utils/api";
import { getAuthToken } from "@/utils/auth";
import axios from "axios";
import { redirect } from "next/navigation";
import type {
	ProposalInput,
	ProposalResponse,
	ProposalsResponse,
	SubmitProposalResponse,
	UpdateProposalResponse,
	UserProposalsResponse,
	UserProposalsStats,
} from "./types";
import { getUser } from "../auth/api";

export async function submitProposal(
	projectId: string,
	data: ProposalInput,
): Promise<SubmitProposalResponse> {
	try {
		const token = await getAuthToken();

		if (!token) redirect("/auth/signin");

		const res = await api.post(`/proposals/${projectId}`, data, {
			headers: {
				cookie: `jwt=${token}`,
			},
		});
		return res.data as SubmitProposalResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.errors) return error.response.data.errors;
			else if (error.response?.data?.message)
				return { success: false, message: error.response.data.message };
			else
				return {
					success: false,
					message: "An error occurred while submitting the proposal.",
				};
		} else
			return {
				success: false,
				message: "An error occurred while submitting the proposal.",
			};
	}
}

export const getUserProposals = async (): Promise<UserProposalsResponse> => {
	try {
		const token = await getAuthToken();

		if (!token) redirect("/auth/signin");

		const res = await api.get("/proposals/my", {
			headers: {
				cookie: `jwt=${token}`,
			},
		});
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.errors) return error.response.data.errors;
			else if (error.response?.data?.message)
				return { success: false, message: error.response.data.message };
			else
				return {
					success: false,
					message: "An error occurred while fetching the proposals.",
				};
		} else
			return {
				success: false,
				message: "An error occurred while fetching the proposals.",
			};
	}
};

export const getUserProposalsStats = async (): Promise<UserProposalsStats> => {
	try {
		const token = await getAuthToken();

		if (!token) redirect("/auth/signin");

		const res = await api.get("/proposals/my/states", {
			headers: {
				cookie: `jwt=${token}`,
			},
		});
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.errors) return error.response.data.errors;
			else if (error.response?.data?.message)
				return { success: false, message: error.response.data.message };
			else
				return {
					success: false,
					message: "An error occurred while fetching the proposals stats.",
				};
		} else
			return {
				success: false,
				message: "An error occurred while fetching the proposals stats.",
			};
	}
};

export const getProposalById = async (
	proposalId: string,
): Promise<ProposalResponse> => {
	try {
		const user = await getUser();

		if (!user.user) redirect("/auth/signin");

		const res = await api.get(
			`/proposals/${proposalId}?freelancerId=${user.user.id}`,
		);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.message)
				return {
					statusCode: error.response?.status || 500,
					success: false,
					message: error.response.data.message,
				};
			else
				return {
					statusCode: error.response?.status || 500,
					success: false,
					message: "An error occurred while fetching the proposal.",
				};
		} else
			return {
				success: false,
				message: "An error occurred while fetching the proposal.",
			};
	}
};

export const getProjectProposals = async (
	projectId: string,
): Promise<ProposalsResponse> => {
	try {
		const res = await api.get(`/projects/${projectId}/proposals`);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				statusCode: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"An error occurred while fetching the proposals.",
			};
		} else
			return {
				statusCode: 500,
				success: false,
				message: "An error occurred while fetching the proposals.",
			};
	}
};

export const updateProposal = async (
	proposalId: string,
	data: ProposalInput & { projectId: string },
): Promise<UpdateProposalResponse> => {
	try {
		const token = await getAuthToken();

		if (!token) redirect("/auth/signin");

		const res = await api.patch(`/proposals/${proposalId}`, data, {
			headers: {
				cookie: `jwt=${token}`,
			},
		});

		return res.data as UpdateProposalResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Error updating proposal:", error.response?.data);
			if (error.response?.data?.errors) return error.response.data.errors;
			else if (error.response?.data?.message)
				return { success: false, message: error.response.data.message };
			else
				return {
					success: false,
					message: "An error occurred while updating the proposal.",
				};
		} else
			return {
				success: false,
				message: "An error occurred while updating the proposal.",
			};
	}
};

export const acceptProposal = async (
	proposalId: string,
): Promise<ProposalResponse> => {
	try {
		const token = await getAuthToken();

		const res = await api.post(
			`/proposals/${proposalId}/accept`,
			{},
			{
				headers: {
					Cookie: `jwt=${token}`,
				},
			},
		);

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				message: error.response?.data?.message || "",
				statusCode: error.response?.status || 500,
			};
		} else
			return {
				success: false,
				message: "",
				statusCode: 500,
			};
	}
};

export const rejectProposal = async (
	proposalId: string,
): Promise<ProposalResponse> => {
	try {
		const token = await getAuthToken();
		if (!token) if (!token) redirect("/auth/signin");

		const res = await api.post(
			`/proposals/${proposalId}/reject`,
			{},
			{
				headers: {
					cookie: `jwt=${token}`,
				},
			},
		);

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				message: error.response?.data?.message || "",
				statusCode: error.response?.status || 500,
			};
		} else
			return {
				success: false,
				message: "",
				statusCode: 500,
			};
	}
};

export const withdraw = async (
	proposalId: string,
): Promise<ProposalResponse> => {
	try {
		const token = await getAuthToken();
		if (!token) if (!token) redirect("/auth/signin");

		const res = await api.post(
			`/proposals/${proposalId}/withdraw`,
			{},
			{
				headers: {
					cookie: `jwt=${token}`,
				},
			},
		);

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				message: error.response?.data?.message || "",
				statusCode: error.response?.status || 500,
			};
		} else
			return {
				success: false,
				message: "",
				statusCode: 500,
			};
	}
};
