import WithdrawButton from "@/components/dashboard/proposals/WithdrawButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getProposalById } from "@/features/proposals/api";
import { proposalStatusStyles } from "@/utils/projects";
import { format } from "date-fns";
import {
	ArrowLeft,
	CalendarDays,
	Clock3,
	DollarSign,
	Pencil,
	UserRound,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Proposal Details",
	description: "Review the details of your submitted proposal",
};

type Props = {
	params: Promise<{
		proposalId: string;
	}>;
};

const fetchProposal = async (proposalId: string) => {
	const res = await getProposalById(proposalId);

	if (!res.success || !res.proposal) {
		if (res.statusCode === 404) return notFound();
		else throw new Error(res.message);
	}

	return res.proposal;
};

const ViewProposalPage = async ({ params }: Props) => {
	const { proposalId } = await params;
	const proposal = await fetchProposal(proposalId);

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-10 sm:py-12">
			<div className="mb-8 flex flex-wrap items-center justify-between gap-3">
				<Link
					href="/dashboard/my-proposals"
					className="inline-flex items-center gap-2 rounded-lg border px-2.5 lg:px-4 py-2 text-sm transition-colors hover:bg-secondary"
				>
					<ArrowLeft className="size-4" />
					Back to my proposals
				</Link>
				<div className="space-x-3">
					<Link href={`/dashboard/my-proposals/${proposalId}/edit`}>
						<Button variant="outline">
							<Pencil className="size-4" />
							Edit proposal
						</Button>
					</Link>
					<WithdrawButton proposalId={proposalId} />
				</div>
			</div>

			<section className="mb-8 max-w-3xl">
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<Badge
						className={`${proposalStatusStyles[proposal.status]} border border-border p-3`}
					>
						{proposal.status}
					</Badge>
					<span className="text-sm text-muted-foreground">{proposal.id}</span>
				</div>
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
					{proposal.project.title}
				</h1>
				<p className="mt-3 flex items-center gap-2 text-muted-foreground">
					<UserRound className="size-4" />
					Proposal submitted to {proposal.project.client.name}
				</p>
			</section>

			<section className="mb-6 grid gap-3 sm:grid-cols-3">
				<SummaryCard
					icon={<DollarSign />}
					label="Your bid"
					value={proposal.bidAmount.toString()}
				/>
				<SummaryCard
					icon={<Clock3 />}
					label="Delivery time"
					value={`${proposal.deliveryDays} days`}
				/>
				<SummaryCard
					icon={<CalendarDays />}
					label="Submitted"
					value={format(proposal.createdAt, "MMMM d, yyyy")}
				/>
			</section>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)]">
				<Card>
					<CardHeader>
						<CardTitle>Your proposal</CardTitle>
						<CardDescription>
							Your cover letter and the approach you shared with the client.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="whitespace-pre-line leading-7 text-foreground/80">
							{proposal.coverLetter}
						</p>
					</CardContent>
				</Card>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Project snapshot</CardTitle>
							<CardDescription>What the client is looking for.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5">
							<p className="text-sm leading-6 text-muted-foreground">
								{proposal.project.description}
							</p>
							<div className="flex flex-wrap gap-2">
								{proposal.project.skills.map((skill) => (
									<Badge key={skill} variant="outline" className="rounded-full">
										{skill}
									</Badge>
								))}
							</div>
							<div className="border-t pt-4 text-sm">
								<p className="text-muted-foreground">Client budget</p>
								<p className="mt-1 font-semibold">{`${proposal.project.budgetMax ? proposal.project.budgetMax + " - " : ""}${proposal.project.budgetMin ? proposal.project.budgetMin : ""}`}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="space-y-3 pt-6 text-sm">
							<div className="flex justify-between gap-4">
								<span className="text-muted-foreground">Last updated</span>
								<span className="font-medium">
									{format(proposal.updatedAt, "MMMM d, yyyy")}
								</span>
							</div>
							<div className="flex justify-between gap-4">
								<span className="text-muted-foreground">Status</span>
								<span className="font-medium">Awaiting client response</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
};

function SummaryCard({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<Card>
			<CardContent className="flex items-start gap-3 pt-5">
				<div className="rounded-lg bg-secondary p-2 text-secondary-foreground">
					{icon}
				</div>
				<div className="min-w-0">
					<p className="text-sm text-muted-foreground">{label}</p>
					<p className="mt-1 truncate font-semibold">{value}</p>
				</div>
			</CardContent>
		</Card>
	);
}

export default ViewProposalPage;
