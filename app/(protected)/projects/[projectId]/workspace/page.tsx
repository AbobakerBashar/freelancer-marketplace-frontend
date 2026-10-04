import type { Metadata } from "next";

import WorkspaceContent from "@/components/dashboard/projects/workspace/WorkspaceContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectWorkspace } from "@/features/projects/api";
import { getStatusColor } from "@/utils/projects";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Workspace",
	description: "Manage your projects and collaborate with your team.",
};

const loadData = async (projectId: string) => {
	const res = await getProjectWorkspace(projectId);

	if (!res.success || !res.workspace) {
		if (res.statusCode === 404) notFound();
		throw new Error(res.message);
	}

	return res.workspace;
};

type Props = {
	params: Promise<{
		projectId: string;
	}>;
};

export default async function WorkspacePage({ params }: Props) {
	const { projectId } = await params;
	const workspace = await loadData(projectId);

	const { project, client, proposal, freelancer, currentUserRole } = workspace;
	const collaborator = currentUserRole === "CLIENT" ? freelancer : client;

	return (
		<main className="min-h-screen bg-background py-10">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<Link
					href={`/dashboard/my-active-projects`}
					className="mb-6 inline-block"
				>
					<Button variant="outline">
						<ArrowLeft className="mr-1 h-4 w-4" />
						Back to active projects
					</Button>
				</Link>

				<div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
							{currentUserRole === "CLIENT"
								? "Client workspace"
								: "Freelancer workspace"}
						</p>
						<h1 className="text-3xl font-bold tracking-tight md:text-4xl">
							{project.title}
						</h1>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="secondary">{project.category}</Badge>
						<Badge className={getStatusColor(project.status)}>
							{project.status}
						</Badge>
					</div>
				</div>

				<WorkspaceContent
					project={project}
					proposal={proposal}
					collaborator={collaborator}
					currentUserRole={currentUserRole}
				/>
			</div>
		</main>
	);
}
