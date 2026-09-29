import type { Proposal } from "@/features/proposals/types";
import { currencyFormatter, proposalStatusStyles } from "@/utils/projects";
import { Badge } from "../ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

import { format, formatDistanceToNow } from "date-fns";
import ProposalActions from "./ProposalActions";

type Props = {
	proposals: Proposal[];
	isClient: boolean;
};

const ProposalsList = ({ proposals, isClient }: Props) => {
	return (
		<section className="space-y-4">
			{proposals.map((proposal) => (
				<Card
					key={proposal.id}
					className="border-border/70 bg-card/90 transition-shadow hover:shadow-lg"
				>
					<CardHeader className="pb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
						<div className="space-y-3">
							<div className="flex flex-wrap items-center gap-2">
								<CardTitle className="text-xl">
									{proposal.project.title}
								</CardTitle>
								<Badge
									className={`p-3 ${proposalStatusStyles[proposal.status]}`}
								>
									{proposal.status}
								</Badge>
							</div>
							<CardDescription>
								{proposal.project.client.name} • Submitted{" "}
								{formatDistanceToNow(new Date(proposal.createdAt), {
									addSuffix: true,
								})}
							</CardDescription>
						</div>

						{/* Proposal Actions */}
						<ProposalActions
							isClient={isClient}
							proposalId={proposal.id}
							proposalStatus={proposal.status}
						/>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
							<div className="space-y-4">
								<div>
									<p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
										Cover letter
									</p>
									<p className="leading-7 text-foreground/80">
										{proposal.coverLetter}
									</p>
								</div>

								<div className="flex flex-wrap gap-2">
									{proposal.project.skills.map((skill) => (
										<Badge
											key={skill}
											variant="outline"
											className="rounded-full"
										>
											{skill}
										</Badge>
									))}
								</div>
							</div>

							<div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm sm:grid-cols-2 lg:grid-cols-1">
								<div>
									<p className="text-muted-foreground">Bid amount</p>
									<p className="mt-1 font-semibold">
										{currencyFormatter(proposal.project.currency).format(
											proposal.bidAmount,
										)}
									</p>
								</div>
								<div>
									<p className="text-muted-foreground">Delivery window</p>
									<p className="mt-1 font-semibold">
										{proposal.deliveryDays} days
									</p>
								</div>
								<div>
									<p className="text-muted-foreground">Submitted</p>
									<p className="mt-1 font-semibold">
										{format(new Date(proposal.createdAt), "MMM d, yyyy")}
									</p>
								</div>
								<div>
									<p className="text-muted-foreground">Last updated</p>
									<p className="mt-1 font-semibold">
										{formatDistanceToNow(new Date(proposal.updatedAt), {
											addSuffix: true,
										})}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</section>
	);
};
export default ProposalsList;
