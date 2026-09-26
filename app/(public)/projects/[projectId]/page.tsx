import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectById } from "@/features/projects/projects";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStatusColor } from "@/lib/utils";

type Props = {
	params: Promise<{
		projectId: string;
	}>;
};

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const { projectId } = await params;
	const project = await getProjectById(projectId);

	if (!project?.project) notFound();

	return {
		title: project.project.title,
		description: project.project.description,
	};
};

const fetchProject = async (projectId: string) => {
	const res = await getProjectById(projectId);
	if (!res || !res.success || !res.project) notFound();

	return res.project;
};

const formatCurrency = (amount: number, currency: string) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);
};

const ProjectDetails = async ({ params }: Props) => {
	const { projectId } = await params;
	const project = await fetchProject(projectId);

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-12">
			<Link
				href="/projects"
				className="px-5 py-2 rounded-lg border mb-4 flex items-center w-fit hover:bg-secondary duration-300 gap-1"
			>
				<ArrowLeft className="w-4 h-4" /> Back to all projects
			</Link>

			{/* Header Section */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">{project.title}</h1>
				<div className="flex items-center gap-2 flex-wrap">
					<Badge variant="outline" className="py-3 px-4">
						{project.category}
					</Badge>
					<Badge className={`py-3 px-4 ${getStatusColor(project.status)}`}>
						{project.status}
					</Badge>
				</div>
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
				{/* Description Card - Full width on left */}
				<div className="lg:col-span-3 flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Project Description</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
								{project.description}
							</p>
						</CardContent>
					</Card>
					{/* Skills Section */}
					{project.skills.length > 0 && (
						<Card className="mb-8">
							<CardHeader>
								<CardTitle>Required Skills</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{project.skills.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Budget Card - Right sidebar */}
				<div className="lg:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Budget</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<p className="text-sm text-muted-foreground mb-1">
									Budget Type
								</p>
								<p className="font-semibold">{project.budgetType}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground mb-1">Amount</p>
								<div className="space-y-1">
									{project.budgetMin && (
										<p className="font-semibold">
											{formatCurrency(project.budgetMin, project.currency)}
										</p>
									)}
									{project.budgetMax && (
										<p className="font-semibold">
											{formatCurrency(project.budgetMax, project.currency)}
										</p>
									)}
									{project.budgetMin && project.budgetMax && (
										<p className="text-xs text-muted-foreground">
											Range:{" "}
											{formatCurrency(project.budgetMin, project.currency)} -{" "}
											{formatCurrency(project.budgetMax, project.currency)}
										</p>
									)}
								</div>
							</div>
							{project.durationUnit && project.duration && (
								<div>
									<p className="text-sm text-muted-foreground mb-1">
										Expected Duration
									</p>
									<p className="font-semibold">
										{project.duration} {project.durationUnit}
									</p>
								</div>
							)}
							<Button className="w-full mt-4" size="lg">
								Submit a Proposal
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Timeline Section */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Timeline</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex justify-between items-center pb-4 border-b">
							<span className="text-sm text-muted-foreground">Posted On</span>
							<span className="font-medium">
								{new Date(project.createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
						</div>
						{project.deadline && (
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">Deadline</span>
								<span className="font-medium">
									{new Date(project.deadline).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* CTA Section */}
			<div className="bg-card border border-border rounded-lg p-8 text-center">
				<h3 className="text-2xl font-bold mb-4">
					Ready to work on this project?
				</h3>
				<p className="text-muted-foreground mb-6">
					Submit your proposal and let the client know why you&apos;re the best
					fit for this job.
				</p>
				<div className="flex gap-4 justify-center flex-wrap">
					<Button size="lg">Submit a Proposal</Button>
					<Button variant="outline" size="lg">
						Contact Client
					</Button>
				</div>
			</div>
		</main>
	);
};
export default ProjectDetails;
