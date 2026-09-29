import { useMutation } from "@tanstack/react-query";
import {
	acceptProposal,
	rejectProposal,
	submitProposal,
	updateProposal,
} from "./api";
import { ProposalInput } from "./types";

export const useSubmitProposal = () => {
	return useMutation({
		mutationKey: ["submitProposal"],
		mutationFn: async ({
			data,
			projectId,
		}: {
			data: ProposalInput;
			projectId: string;
		}) => submitProposal(projectId, data),
	});
};

export const useUpdateProposal = () => {
	return useMutation({
		mutationKey: ["updateProposal"],
		mutationFn: async ({
			data,
			proposalId,
		}: {
			data: ProposalInput & { projectId: string };
			proposalId: string;
		}) => updateProposal(proposalId, data),
	});
};

export const useAcceptProposal = () => {
	return useMutation({
		mutationFn: async (proposalId: string) => await acceptProposal(proposalId),
	});
};

export const useRejectProposal = () => {
	return useMutation({
		mutationFn: async (proposalId: string) => await rejectProposal(proposalId),
	});
};
