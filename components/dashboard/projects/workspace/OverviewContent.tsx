import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Project } from "@/features/projects/types";
import { ProposalStatus } from "@/features/proposals/types";
import { proposalStatusStyles } from "@/utils/projects";
import { format } from "date-fns";
import {
	BriefcaseBusiness,
	CheckCircle2,
	FileText,
	UserRound,
} from "lucide-react";

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

type OverviewContentProps = {
	project: Project;
	proposalStatus?: ProposalStatus;
	proposalCreatedAt?: Date;
	collaboratorName?: string;
	collaboratorEmail?: string;
	currentUserRole: "CLIENT" | "FREELANCER";
};

export default async function OverviewContent({
	project,
	proposalStatus,
	proposalCreatedAt,
	collaboratorName,
	collaboratorEmail,
	currentUserRole,
}: OverviewContentProps) {
	return (
		<TabsContent value="overview" className="space-y-6">
			<div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BriefcaseBusiness className="h-4 w-4" />
							Project Overview
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-5">
						<p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
							{project.description}
						</p>

						<div className="flex flex-wrap gap-2">
							{project.skills.length > 0 ? (
								project.skills.map((skill) => (
									<Badge key={skill} variant="outline">
										{skill}
									</Badge>
								))
							) : (
								<p className="text-sm text-muted-foreground">
									No skills listed.
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CheckCircle2 className="h-4 w-4" />
							Summary
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 text-sm">
						<div className="flex items-center justify-between gap-3">
							<span className="text-muted-foreground">Budget</span>
							<span className="font-medium">
								{project.budgetType === "FIXED"
									? formatCurrency(
											project.budgetMin ?? project.budgetMax,
											project.currency,
										)
									: `${formatCurrency(project.budgetMin, project.currency)} - ${formatCurrency(project.budgetMax, project.currency)}`}
							</span>
						</div>
						<div className="flex items-center justify-between gap-3">
							<span className="text-muted-foreground">Deadline</span>
							<span className="font-medium">
								{formatDate(project.deadline)}
							</span>
						</div>
						<div className="flex items-center justify-between gap-3">
							<span className="text-muted-foreground">Timeline</span>
							<span className="font-medium">
								{project.duration && project.durationUnit
									? `${project.duration} ${project.durationUnit.toLowerCase()}`
									: "Flexible"}
							</span>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<UserRound className="h-4 w-4" />
							{currentUserRole === "CLIENT" ? "Freelancer" : "Client"}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2 text-sm text-muted-foreground">
						<p className="font-medium text-foreground">
							{collaboratorName ?? "Not assigned yet"}
						</p>
						<p>{collaboratorEmail ?? "No contact information yet."}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-4 w-4" />
							Proposal Status
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2 text-sm text-muted-foreground">
						{proposalStatus ? (
							<>
								<Badge className={proposalStatusStyles[proposalStatus]}>
									{proposalStatus}
								</Badge>
								<p className="pt-2 text-foreground">
									Submitted on {formatDate(proposalCreatedAt)}
								</p>
							</>
						) : (
							<p className="text-foreground">
								No proposal has been submitted yet.
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</TabsContent>
	);
}
