import EditProposalForm from "@/components/dashboard/EditProposalForm";
import ProposalTips from "@/components/projects/ProposalTips";
import { getUserProposalById } from "@/features/proposals/api";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Edit Proposal",
	description: "Update your submitted proposal",
};

type Props = {
	params: Promise<{
		proposalId: string;
	}>;
};

const EditMyProposalPage = async ({ params }: Props) => {
	const { proposalId } = await params;
	const { proposal } = await getUserProposalById(proposalId);

	if (!proposal) notFound();

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-12">
			<Link
				href="/dashboard/my-proposals"
				className="px-5 py-2 rounded-lg border mb-6 flex items-center w-fit hover:bg-secondary duration-300 gap-1"
			>
				<ArrowLeft className="w-4 h-4" /> Back to My Proposals
			</Link>

			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Edit Proposal</h1>
				<p className="text-foreground/60">
					Update your proposal for {proposal.project.title}
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<EditProposalForm proposal={proposal} />
				<ProposalTips />
			</div>
		</main>
	);
};

export default EditMyProposalPage;
