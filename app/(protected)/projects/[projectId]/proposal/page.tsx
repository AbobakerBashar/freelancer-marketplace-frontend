import ProposalForm from "@/components/projects/ProposalForm";
import ProposalTips from "@/components/projects/ProposalTips";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Submit Proposal",
	description: "Submit your proposal for the project",
};

type ProposalPageProps = {
	params: Promise<{
		projectId: string;
	}>;
};

const ProposalPage = async ({ params }: ProposalPageProps) => {
	const { projectId } = await params;

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-12">
			{/* Back Button */}
			<Link
				href={`/projects/${projectId}`}
				className="px-5 py-2 rounded-lg border mb-6 flex items-center w-fit hover:bg-secondary duration-300 gap-1"
			>
				<ArrowLeft className="w-4 h-4" /> Back to Project
			</Link>

			{/* Page Header */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Submit Your Proposal</h1>
				<p className="text-foreground/60">
					Tell the client why you&apos;re the best fit for this project
				</p>
			</div>

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Form Card */}
				<ProposalForm projectId={projectId} />

				{/* Sidebar - Proposal Tips */}
				<ProposalTips />
			</div>
		</main>
	);
};

export default ProposalPage;
