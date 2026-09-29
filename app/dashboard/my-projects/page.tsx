import FilterTabs from "@/components/dashboard/projects/FilterTabs";
import MyProjectsList from "@/components/dashboard/projects/MyProjectsList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUser } from "@/features/auth/api";
import { getProjects, getProjectsStatics } from "@/features/projects/api";
import { formatStatus } from "@/utils/projects";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "My Projects",
	description: "Manage projects you posted as a client",
};

const fetchMyProjects = async (status?: string) => {
	const userRes = await getUser();

	if (!userRes.success || !userRes.user) redirect("/auth/signin");

	// Set parameters for fetching projects and statistics
	const params = new URLSearchParams();
	if (status) params.append("status", status);
	params.append("clientId", userRes.user.id);

	const [projectsRes, statsRes] = await Promise.all([
		getProjects(100, params.toString()),
		getProjectsStatics(),
	]);

	const projects = projectsRes?.projects ?? [];
	const stats = statsRes?.stats ?? {
		totalProjects: 0,
		status: [],
	};

	return {
		projects,
		stats,
	};
};

const MyProjectsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ status: string }>;
}) => {
	const { status } = await searchParams;

	const { projects, stats } = await fetchMyProjects(status);

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-12">
			<section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				<div className="max-w-2xl">
					<Badge variant="outline" className="mb-3 flex items-center gap-2 p-3">
						<CalendarDays className="size-3.5" />
						Updated {format(new Date(), "MMM d, yyyy")}
					</Badge>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						My Projects
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						Track the projects you posted, monitor status, and open each project
						to review incoming proposals.
					</p>
				</div>

				<div className="flex flex-wrap gap-3 lg:justify-end">
					<Link href="/dashboard/my-projects/post">
						<Button size="lg" className="px-6">
							Post Project
						</Button>
					</Link>
					<Link href="/dashboard">
						<Button variant="outline" size="lg">
							Back to dashboard
						</Button>
					</Link>
				</div>
			</section>
			<section className="mb-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
				<StatCard label="Total Projects" value={stats.totalProjects} />
				{stats.status.map((s) => {
					const statusLabel = formatStatus(s.status);
					return (
						<StatCard key={s.status} label={statusLabel} value={s.count} />
					);
				})}
			</section>
			{/* Filter tabs for project status */}
			<FilterTabs stats={stats} />

			{/* Projects list */}
			{stats.totalProjects === 0 ? (
				<Card className="border-border/70 bg-card/90">
					<CardContent className="py-12 text-center">
						<h2 className="text-2xl font-semibold">No projects posted yet</h2>
						<p className="mt-3 text-muted-foreground">
							Create your first project to start receiving freelancer proposals.
						</p>
						<Link href="/projects" className="mt-6 block">
							<Button size="lg" className="px-5">
								Post Project
							</Button>
						</Link>
					</CardContent>
				</Card>
			) : (
				<MyProjectsList projects={projects} />
			)}
		</main>
	);
};

export default MyProjectsPage;

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
