"use client";

import type { Category, Pagination, Project } from "@/features/projects/types";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import DesktopFilters from "./DesktopFilters";
import PaginationSection from "./PaginationSection";
import ProjectsList from "./ProjectsList";
import MobileFilters from "./MobileFilters";

type Props = {
	projects: Project[];
	pagination: Pagination | null;
	categories: Category[];
};

const ProjectsContent = ({ projects, pagination, categories }: Props) => {
	const [params, setParams] = useQueryStates(
		{
			search: parseAsString.withDefault(""),
			category: parseAsString.withDefault(""),
			status: parseAsString.withDefault(""),
			budgetType: parseAsString.withDefault(""),
			page: parseAsInteger.withDefault(1),
			limit: parseAsInteger.withDefault(10),
		},
		{ shallow: false },
	);

	return (
		<div className="md:flex gap-8">
			{/* Search and Filters */}
			<DesktopFilters
				categories={categories}
				params={params}
				setParams={setParams}
			/>

			<MobileFilters
				categories={categories}
				params={params}
				setParams={setParams}
			/>

			{/* Results Info */}
			<ProjectsList
				projects={projects}
				totalCount={pagination?.totalCount || 0}
			>
				<PaginationSection pagination={pagination} setParams={setParams} />
			</ProjectsList>
		</div>
	);
};
export default ProjectsContent;
