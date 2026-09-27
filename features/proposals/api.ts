"use server";

import { getAuthToken } from "@/utils/auth";
import type { SubmitProposalResponse, ProposalInput } from "./types";
import axios from "axios";
import { redirect } from "next/navigation";
import api from "@/utils/api";

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
