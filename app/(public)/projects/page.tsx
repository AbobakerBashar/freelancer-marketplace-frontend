import ProjectsContent from "@/components/projects/ProjectsContent";
import SearchSection from "@/components/projects/SearchSection";
import {
	getPopularCategories,
	getProjects,
} from "@/features/projects/projects";
import type { ProjectQueryParams } from "@/features/projects/types";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects",
	description: "Browse and apply to projects that match your skills",
};

const fetchData = async (searchParams: Partial<ProjectQueryParams>) => {
	const queryString = new URLSearchParams(
		searchParams as Record<string, string>,
	).toString();

	const [projectsRes, categoriesRes] = await Promise.all([
		getProjects(10, queryString),
		getPopularCategories(),
	]);

	return {
		projects: projectsRes?.success ? projectsRes.projects : [],
		pagination: projectsRes?.success ? projectsRes.pagination : null,
		categories: categoriesRes?.success ? categoriesRes.categories : [],
	};
};

type Props = {
	searchParams: Promise<Partial<ProjectQueryParams>>;
};

const ProjectsPage = async ({ searchParams }: Props) => {
	const params = await searchParams;

	const { projects, categories, pagination } = await fetchData(params);

	return (
		<main className="min-h-screen bg-linear-to-b from-background to-muted/20 py-12 page-container">
			{/* Header */}
			<div className="mb-12">
				<h1 className="text-4xl font-bold mb-2">Explore Projects</h1>
				<p className="text-lg text-muted-foreground">
					Browse and apply to projects that match your skills
				</p>
			</div>

			<SearchSection />

			<ProjectsContent
				projects={projects}
				categories={categories}
				pagination={pagination}
			/>
		</main>
	);
};

export default ProjectsPage;
