import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Project } from "@/features/projects/types";

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

type DeatailsContentProps = {
	project: Project;
};

const DeatailsContent = ({ project }: DeatailsContentProps) => {
	return (
		<TabsContent value="details" className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Project Details</CardTitle>
				</CardHeader>
				<CardContent className="space-y-5">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="rounded-lg border bg-muted/30 p-4">
							<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								Category
							</p>
							<p className="font-medium">{project.category}</p>
						</div>
						<div className="rounded-lg border bg-muted/30 p-4">
							<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								Budget Type
							</p>
							<p className="font-medium">{project.budgetType}</p>
						</div>
						<div className="rounded-lg border bg-muted/30 p-4">
							<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								Budget
							</p>
							<p className="font-medium">
								{project.budgetMin || project.budgetMax
									? `${formatCurrency(project.budgetMin, project.currency)} - ${formatCurrency(project.budgetMax, project.currency)}`
									: "Not specified"}
							</p>
						</div>
						<div className="rounded-lg border bg-muted/30 p-4">
							<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								Duration
							</p>
							<p className="font-medium">
								{project.duration && project.durationUnit
									? `${project.duration} ${project.durationUnit}`
									: "Flexible timeline"}
							</p>
						</div>
						<div className="rounded-lg border bg-muted/30 p-4 md:col-span-2">
							<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								Description
							</p>
							<p className="whitespace-pre-wrap leading-7 text-foreground/80">
								{project.description}
							</p>
						</div>
						<div className="rounded-lg border bg-muted/30 p-4 md:col-span-2">
							<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								Required Skills
							</p>
							<div className="mt-2 flex flex-wrap gap-2">
								{project.skills.length > 0 ? (
									project.skills.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))
								) : (
									<span className="text-sm text-muted-foreground">
										No skills listed.
									</span>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default DeatailsContent;
