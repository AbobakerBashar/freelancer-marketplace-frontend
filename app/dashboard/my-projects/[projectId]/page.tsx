import ProjectCard from "@/components/dashboard/projects/ProjectCard";
import ProposalsList from "@/components/dashboard/ProposalsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectById } from "@/features/projects/api";
import { getProjectProposals } from "@/features/proposals/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { uuid } from "zod";

const fetchData = async (projectId: string) => {
	if (!uuid().validate(projectId)) throw new Error("Invalid projecct ID");

	const [projectRes, proposalsRes] = await Promise.all([
		getProjectById(projectId),
		getProjectProposals(projectId),
	]);

	if (!projectRes?.success || !projectRes.project) {
		if (projectRes.statusCode === 404) notFound();
		else throw new Error(projectRes.message);
	}

	const project = projectRes.project;
	const proposals = proposalsRes.proposals ?? [];
	return { project, proposals };
};

type Props = {
	params: Promise<{ projectId: string }>;
};

export default async function Page({ params }: Props) {
	const { projectId } = await params;

	const { project, proposals } = await fetchData(projectId);

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-12 space-y-12">
			<div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
				<h1 className="text-2xl font-semibold">{project.title}</h1>

				<Link href="/dashboard/my-projects">
					<Button size="sm" variant="outline">
						<ArrowLeft className="w-4 h-4" /> Back to Projects
					</Button>
				</Link>
			</div>

			<ProjectCard project={project} />

			{/* Proposals */}
			<section>
				<h2 className="text-lg font-semibold">Proposals</h2>
				<p className="text-sm text-muted-foreground">
					Submissions for this project
				</p>
				<div className="mt-4">
					{proposals.length ? (
						<ProposalsList proposals={proposals} isClient />
					) : (
						<Card className="border-border/70 bg-card/90">
							<CardContent className="py-12 text-center">
								<h2 className="text-2xl font-semibold">
									No proposals posted yet
								</h2>

								<Link
									href={`/dashboard/my-projects/${projectId}/edit`}
									className="mt-6 block"
								>
									<Button size="lg" className="px-5">
										Edit Project
									</Button>
								</Link>
							</CardContent>
						</Card>
					)}
				</div>
			</section>
		</main>
	);
}
