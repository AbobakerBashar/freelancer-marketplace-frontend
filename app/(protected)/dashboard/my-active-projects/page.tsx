import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/features/auth/api";
import { getActiveProjects } from "@/features/projects/api";
import type { ActiveProject } from "@/features/projects/types";
import { formatBudget } from "@/utils/projects";
import { format } from "date-fns";
import {
	ArrowUpRight,
	BriefcaseBusiness,
	CalendarDays,
	CircleDollarSign,
	UserRound,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type ViewerRole = "client" | "freelancer";

const fetchActiveProjects = async () => {
	const [userRes, activeProjectsRes] = await Promise.all([
		getUser(),
		getActiveProjects(),
	]);

	if (!userRes.success || !userRes.user) {
		redirect("/auth/signin");
	}

	if (!activeProjectsRes.success) {
		throw new Error(
			activeProjectsRes.message || "Failed to fetch active projects.",
		);
	}

	return {
		role: userRes.user.role.toLowerCase() as ViewerRole,
		projects: activeProjectsRes.projects || [],
	};
};

export default async function MyActiveProjectsPage() {
	const { role, projects } = await fetchActiveProjects();

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-10 sm:py-12">
			<section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div className="max-w-2xl">
					<div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
						<BriefcaseBusiness className="size-4" />
						<span>Work in progress</span>
					</div>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						My Active Projects
					</h1>
					<p className="mt-3 text-muted-foreground sm:text-lg">
						Keep milestones, deadlines, and the people you work with in view.
					</p>
				</div>

				<p className="rounded-md w-fit border bg-card px-3 py-2 text-sm capitalize text-muted-foreground">
					{role} account
				</p>
			</section>

			<section className="space-y-4" aria-label="Active project list">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<h2 className="text-lg font-semibold">Currently active</h2>
					<p className="text-sm text-muted-foreground">
						{projects.length} {projects.length === 1 ? "project" : "projects"}
					</p>
				</div>

				{projects.map((project) => (
					<ActiveProjectCard key={project.id} project={project} role={role} />
				))}
			</section>
		</main>
	);
}

function ActiveProjectCard({
	project,
	role,
}: {
	project: ActiveProject;
	role: ViewerRole;
}) {
	const isActive = project.status === "IN_PROGRESS";

	return (
		<Card className="rounded-lg border-border/70 bg-card/90 transition-shadow hover:shadow-md">
			<CardHeader className="gap-4 pb-4 flex flex-col sm:flex-row items-start sm:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="secondary" className="font-medium capitalize">
							{project.status.replaceAll("_", " ").toLowerCase()}
						</Badge>
						<Badge variant="outline">{project.category}</Badge>
					</div>
					<CardTitle className="text-xl">{project.title}</CardTitle>
					<p className="text-sm text-muted-foreground">
						Updated {format(project.updatedAt, "MMM dd, yyyy")}
					</p>
				</div>
				<div className="flex gap-3">
					{/* Add way to navigate to project workspace if is active */}
					{isActive && (
						<Link href={`/projects/${project.id}/workspace`}>
							<Button variant="default" className="w-full sm:w-auto">
								<ArrowUpRight className="size-4" />
								Open Workspace
							</Button>
						</Link>
					)}

					<Link href={`/projects/${project.id}`}>
						<Button variant="outline" className="w-full sm:w-auto">
							<ArrowUpRight className="size-4" />
							View Project
						</Button>
					</Link>
				</div>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					<DetailItem
						icon={<UserRound className="size-4" />}
						label={role === "client" ? "Freelancer" : "Client"}
						value={
							role === "client"
								? (project.freelancer?.name ?? "Not assigned")
								: project.client.name
						}
					/>
					<DetailItem
						icon={<CalendarDays className="size-4" />}
						label="Due date"
						value={format(project.deadline || "", "MMM dd, yyyy")}
					/>
					<DetailItem
						icon={<CircleDollarSign className="size-4" />}
						label={role === "client" ? "Project budget" : "Contract amount"}
						value={formatBudget(
							project.budgetMin,
							project.budgetMax,
							project.currency,
						)}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

function DetailItem({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-3 rounded-md border p-3">
			<span className="text-muted-foreground">{icon}</span>
			<div className="min-w-0">
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="truncate font-medium">{value}</p>
			</div>
		</div>
	);
}
