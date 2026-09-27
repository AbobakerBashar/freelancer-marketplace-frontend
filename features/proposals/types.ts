import { proposalSchema } from "@/schemas/proposal";
import z from "zod";

export type ProposalInput = z.infer<typeof proposalSchema>;

export type Proposal = {
	id: string;
	projectId: string;
	userId: string;
	coverLetter: string;
	bidAmount: number;
	deliveryDays: number;
	createdAt: Date;
	updatedAt: Date;
};

export type SubmitProposalResponse = {
	success: boolean;
	message?: string;
	proposal?: Proposal;
	errors?: Record<string, string>;
};
