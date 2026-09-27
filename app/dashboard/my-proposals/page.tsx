import ProposalsList from "@/components/dashboard/ProposalsList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	getUserProposals,
	getUserProposalsStats,
} from "@/features/proposals/api";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "My Proposals",
	description: "Review the proposals you have submitted to clients",
};

const fetchData = async () => {
	const [proposalsRes, statsRes] = await Promise.all([
		getUserProposals(),
		getUserProposalsStats(),
	]);

	const proposals = proposalsRes.proposals || [];
	const stats = statsRes.stats;

	return {
		proposals,
		stats,
	};
};

const MyProposalsPage = async () => {
	const { proposals, stats } = await fetchData();

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-12">
			<section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				<div className="max-w-2xl">
					<Badge variant="outline" className="mb-3 flex items-center gap-2 p-3">
						<CalendarDays className="size-3.5" />
						Updated {format(new Date(), "MMM d, yyyy")}
					</Badge>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						My Proposals
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						Track every proposal you have sent, review client responses, and
						follow up on the ones that matter most.
					</p>
				</div>

				<div className="flex flex-wrap gap-3 lg:justify-end">
					<Link href="/projects">
						<Button variant="outline" size="lg">
							Browse projects
						</Button>
					</Link>
					<Link href="/projects">
						<Button size="lg">Back to dashboard</Button>
					</Link>
				</div>
			</section>

			<section className="mb-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-5">
				<StatCard
					label="Total proposals"
					value={stats?.totalCount || proposals.length}
				/>
				<StatCard label="Accepted" value={stats?.accepted || 0} />
				<StatCard label="Pending" value={stats?.pending || 0} />
				<StatCard label="Rejected" value={stats?.rejected || 0} />
				<StatCard label="Withdrawn" value={stats?.withdrawn || 0} />
			</section>

			<ProposalsList proposals={proposals} />
		</main>
	);
};

export default MyProposalsPage;

function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<Card className="border-border/70 bg-card/90">
			<CardContent className="flex items-start gap-4 justify-between pt-6">
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="text-2xl font-semibold tracking-tight">{value}</p>
			</CardContent>
		</Card>
	);
}
