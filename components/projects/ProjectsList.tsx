import type { Project } from "@/features/projects/types";
import { formatBudget, getStatusColor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

import ClearFilters from "./ClearFilters";
import SortSection from "./SortSection";

type Props = {
	projects: Project[];
	children: React.ReactNode;
	totalCount: number;
};

const ProjectsList = ({ projects, children, totalCount }: Props) => {
	return (
		<section className="flex-1">
			<div className="mb-6 text-muted-foreground flex items-center justify-between">
				<p className="">
					Showing {projects.length} of {totalCount} projects
				</p>
				<SortSection />
			</div>

			{/* Projects Grid */}
			{projects.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-muted-foreground mb-4">
						No projects found matching your criteria
					</p>
					<ClearFilters />
				</div>
			) : (
				<div className="space-y-4">
					{projects.map((project) => (
						<Link
							key={project.id}
							href={`/projects/${project.id}`}
							className="block"
						>
							<Card className="hover:shadow-lg transition-shadow cursor-pointer border-border/70 bg-card/90">
								<CardHeader className="pb-4">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<CardTitle className="hover:text-primary transition-colors">
													{project.title}
												</CardTitle>
												<Badge className={getStatusColor(project.status)}>
													{project.status}
												</Badge>
											</div>
											<CardDescription className="line-clamp-2">
												{project.description}
											</CardDescription>
										</div>
										<ChevronRight className="size-5 text-muted-foreground shrink-0 mt-1" />
									</div>
								</CardHeader>

								<CardContent>
									<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm mb-4">
										{/* Category */}
										<div>
											<p className="text-xs text-muted-foreground mb-1">
												Category
											</p>
											<Badge variant="secondary">{project.category}</Badge>
										</div>

										{/* Budget */}
										<div>
											<p className="text-xs text-muted-foreground mb-1">
												Budget
											</p>
											<p className="font-semibold text-foreground">
												{formatBudget(
													project.budgetMin,
													project.budgetMax,
													project.currency,
												)}
											</p>
										</div>

										{/* Duration */}
										<div>
											<p className="text-xs text-muted-foreground mb-1">
												Duration
											</p>
											<p className="font-semibold text-foreground">
												{project.duration && project.durationUnit
													? `${project.duration} ${project.durationUnit}`
													: "Not specified"}
											</p>
										</div>

										{/* Posted Date */}
										<div>
											<p className="text-xs text-muted-foreground mb-1">
												Posted
											</p>
											<p className="font-semibold text-foreground">
												{new Date(project.createdAt).toLocaleDateString(
													"en-US",
													{
														month: "short",
														day: "numeric",
													},
												)}
											</p>
										</div>
									</div>

									{/* Skills */}
									{project.skills.length > 0 && (
										<div className="flex flex-wrap gap-1">
											{project.skills.slice(0, 5).map((skill) => (
												<Badge
													key={skill}
													variant="outline"
													className="text-xs"
												>
													{skill}
												</Badge>
											))}
											{project.skills.length > 5 && (
												<Badge variant="outline" className="text-xs">
													+{project.skills.length - 5} more
												</Badge>
											)}
										</div>
									)}
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}
			{children}
		</section>
	);
};
export default ProjectsList;
