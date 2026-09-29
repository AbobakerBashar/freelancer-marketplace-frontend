"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
	useAcceptProposal,
	useRejectProposal,
} from "@/features/proposals/hooks";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { ProposalStatus } from "@/features/proposals/types";

type Props = {
	isClient: boolean;
	proposalId: string;
	proposalStatus: ProposalStatus;
};

function ProposalActions({ isClient, proposalId, proposalStatus }: Props) {
	const { mutateAsync: acceptProposla, isPending: isAccepting } =
		useAcceptProposal();

	const { mutateAsync: rejectProposal, isPending: isRejecting } =
		useRejectProposal();

	const handleAccept = async () => {
		if (isAccepting || isRejecting) return;

		const res = await acceptProposla(proposalId);
		if (res.success) {
			toast.success("Proposal accepted successfully!");
		} else {
			toast.error(res.message);
		}
	};

	const handleReject = async () => {
		if (isAccepting || isRejecting) return;

		const res = await rejectProposal(proposalId);
		if (res.success) {
			toast.success("Proposal rejected successfully!");
		} else {
			toast.error(res.message);
		}
	};

	const disabled = isAccepting || isRejecting || proposalStatus !== "PENDING";

	return (
		<>
			{isClient ? (
				<div className="flex gap-2">
					<Button
						disabled={disabled}
						onClick={handleAccept}
						size="sm"
						className="bg-green-600 hover:bg-green-700"
					>
						{isAccepting ? (
							<>
								<Loader className="w-4 h-4 animate-spin" /> Accepting
							</>
						) : (
							"Accept proposal"
						)}
					</Button>
					<Button
						disabled={disabled}
						onClick={handleReject}
						variant="destructive"
						size="sm"
					>
						{isRejecting ? (
							<>
								<Loader className="w-4 h-4 animate-spin" /> Rejecting
							</>
						) : (
							" Regect project"
						)}
					</Button>
				</div>
			) : (
				<div className="flex gap-2">
					<Link href={`/dashboard/my-proposals/${proposalId}`}>
						<Button variant="default" size="sm">
							Edit proposal
						</Button>
					</Link>
					<Link href={`/projects/${proposalId}`}>
						<Button variant="outline" size="sm">
							View project
						</Button>
					</Link>
				</div>
			)}
		</>
	);
}

export default ProposalActions;
