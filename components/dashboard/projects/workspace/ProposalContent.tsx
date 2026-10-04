import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Proposal } from "@/features/proposals/types";
import { proposalStatusStyles } from "@/utils/projects";
import { format } from "date-fns";
import { FileText } from "lucide-react";

const formatCurrency = (
	amount: number | null | undefined,
	currency?: string,
) => {
	if (amount === null || amount === undefined) return "Not specified";
	if (!currency) return `$${amount.toLocaleString()}`;

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);
};

const formatDate = (value: Date | string | null | undefined) => {
	if (!value) return "Not specified";
	return format(new Date(value), "MMM d, yyyy");
};

type ProposalContentProps = {
	proposal: Proposal | null;
	currency: string;
};

const ProposalContent = ({ proposal, currency }: ProposalContentProps) => {
	return (
		<TabsContent value="proposal" className="space-y-6">
			{proposal ? (
				<Card>
					<CardHeader className="flex flex-row items-center justify-between gap-3">
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-4 w-4" />
							Proposal
						</CardTitle>
						<Badge className={proposalStatusStyles[proposal.status]}>
							{proposal.status}
						</Badge>
					</CardHeader>
					<CardContent className="space-y-5">
						<div className="grid gap-4 md:grid-cols-3">
							<div className="rounded-lg border bg-muted/30 p-4">
								<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
									Bid Amount
								</p>
								<p className="font-medium">
									{formatCurrency(proposal.bidAmount, currency)}
								</p>
							</div>
							<div className="rounded-lg border bg-muted/30 p-4">
								<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
									Delivery
								</p>
								<p className="font-medium">{proposal.deliveryDays} days</p>
							</div>
							<div className="rounded-lg border bg-muted/30 p-4">
								<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
									Submitted
								</p>
								<p className="font-medium">{formatDate(proposal.createdAt)}</p>
							</div>
						</div>

						<div className="rounded-lg border bg-muted/30 p-4">
							<p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								Cover Letter
							</p>
							<p className="whitespace-pre-wrap leading-7 text-foreground/80">
								{proposal.coverLetter || "No cover letter provided."}
							</p>
						</div>
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-4 w-4" />
							No Proposal Submitted
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							This project does not have a proposal attached yet.
						</p>
					</CardContent>
				</Card>
			)}
		</TabsContent>
	);
};

export default ProposalContent;
