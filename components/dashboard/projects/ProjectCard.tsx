import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Project } from "@/features/projects/types";
import {
	currencyFormatter,
	formatStatus,
	getStatusColor,
} from "@/utils/projects";
import { format } from "date-fns";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
	const hasRange = project.budgetMin !== null && project.budgetMax !== null;
	const hasMinOnly = project.budgetMin !== null && project.budgetMax === null;
	const hasMaxOnly = project.budgetMin === null && project.budgetMax !== null;

	return (
		<Card className="border-border/70 bg-card/90 transition-shadow hover:shadow-lg">
			<CardHeader className="pb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<div className="space-y-3">
					<div className="flex flex-wrap items-center gap-2">
						<CardTitle className="text-xl">{project.title}</CardTitle>
						<Badge className={`p-3 ${getStatusColor(project.status)}`}>
							{formatStatus(project.status)}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						Posted {format(new Date(project.createdAt), "MMM d, yyyy")}
					</p>
				</div>
				<div className="flex gap-2">
					<Link href={`/dashboard/my-projects/${project.id}/edit`}>
						<Button size="sm">Edit project</Button>
					</Link>
					<Link href={`/dashboard/my-projects/${project.id}`}>
						<Button size="sm" variant="outline">
							View details
						</Button>
					</Link>
				</div>
			</CardHeader>

			<CardContent className="space-y-5">
				<p className="leading-7 text-foreground/80 line-clamp-3">
					{project.description}
				</p>

				<div className="flex flex-wrap gap-2">
					{project.skills.map((skill) => (
						<Badge key={skill} variant="outline" className="rounded-full">
							{skill}
						</Badge>
					))}
				</div>

				<div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<p className="text-muted-foreground">Budget</p>
						<p className="mt-1 font-semibold">
							{hasRange
								? `${currencyFormatter(project.currency).format(project.budgetMin as number)} - ${currencyFormatter(project.currency).format(project.budgetMax as number)}`
								: hasMinOnly
									? `From ${currencyFormatter(project.currency).format(project.budgetMin as number)}`
									: hasMaxOnly
										? `Up to ${currencyFormatter(project.currency).format(project.budgetMax as number)}`
										: "Not specified"}
						</p>
					</div>
					<div>
						<p className="text-muted-foreground">Type</p>
						<p className="mt-1 font-semibold">{project.budgetType}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Deadline</p>
						<p className="mt-1 font-semibold">
							{project.deadline
								? format(new Date(project.deadline), "MMM d, yyyy")
								: "No deadline"}
						</p>
					</div>
					<div>
						<p className="text-muted-foreground">Duration</p>
						<p className="mt-1 font-semibold">
							{project.duration && project.durationUnit
								? `${project.duration} ${project.durationUnit.toLowerCase()}`
								: "Flexible"}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
export default ProjectCard;
