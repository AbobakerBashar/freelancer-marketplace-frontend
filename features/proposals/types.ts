import { proposalSchema } from "@/schemas/proposal";
import z from "zod";

export type ProposalInput = z.infer<typeof proposalSchema>;

export type ProposalStatus =
	| "PENDING"
	| "ACCEPTED"
	| "REJECTED"
	| "REJECTED"
	| "WITHDRAWN";

export type Proposal = {
	id: string;
	projectId: string;
	userId: string;
	coverLetter: string;
	bidAmount: number;
	status: ProposalStatus;
	deliveryDays: number;
	createdAt: Date;
	updatedAt: Date;
	project: {
		title: string;
		currency: string;
		skills: string[];
		client: {
			name: string;
		};
	};
};

export type SubmitProposalResponse = {
	success: boolean;
	message?: string;
	proposal?: Proposal;
	errors?: Record<string, string>;
};

export type UpdateProposalResponse = {
	success: boolean;
	message?: string;
	proposal?: Proposal;
	errors?: Record<string, string>;
};

export type UserProposalsResponse = {
	success: boolean;
	message?: string;
	proposals?: Proposal[];
	errors?: Record<string, string>;
};

export type UserProposalsStats = {
	success: boolean;
	message: string;

	stats?: {
		pending: number;
		accepted: number;
		rejected: number;
		withdrawn: number;
		totalCount: number;
	};
};

export type ProposalsResponse = {
	statusCode?: number;
	success: boolean;
	message: string;
	proposals?: Proposal[];
};

export type ProposalResponse = {
	statusCode?: number;
	success: boolean;
	message: string;
	proposal?: Proposal;
};
