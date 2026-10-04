import EditProjectForm from "@/components/dashboard/projects/EditProjectForm";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getProjectById } from "@/features/projects/api";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Edit Project | Dashboard",
	description: "Edit your project brief and update the required information.",
};

const fetchProject = async (projectId: string) => {
	const res = await getProjectById(projectId);
	if (!res?.success || !res.project) notFound();

	return res.project;
};

type Props = {
	params: Promise<{ projectId: string }>;
};

const EditPage = async ({ params }: Props) => {
	const project = await fetchProject((await params).projectId);

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-12">
			<Link href="/dashboard/my-projects" className="mb-8 inline-block">
				<Button variant="default" size="lg">
					<ArrowLeft className="mr-1" /> Back to My Projects
				</Button>
			</Link>

			<div className="mx-auto max-w-4xl">
				<Card>
					<CardHeader>
						<CardTitle>Edit a Project</CardTitle>
						<CardDescription>
							Edit your project brief and update the required information.
						</CardDescription>
					</CardHeader>

					{/* Edit Project Form */}
					<EditProjectForm project={project} />
				</Card>
			</div>
		</main>
	);
};

export default EditPage;
