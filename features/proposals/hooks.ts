import { useMutation } from "@tanstack/react-query";
import { submitProposal } from "./api";
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
