"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, ChevronRight } from "lucide-react";
import {
	getProjects,
	getPopularCategories,
} from "@/features/projects/projects";
import { Project, CategoriesRes } from "@/features/projects/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const ProjectsPage = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [categories, setCategories] = useState<CategoriesRes>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState("newest");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const [projectsRes, categoriesRes] = await Promise.all([
					getProjects(100),
					getPopularCategories(),
				]);

				if (projectsRes?.success) {
					setProjects(projectsRes.projects);
				}
				if (categoriesRes?.success) {
					setCategories(categoriesRes);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch projects",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// Filter and sort projects
	const filteredProjects = projects
		.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory =
				!selectedCategory || project.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case "newest":
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				case "oldest":
					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
				case "budget-high":
					return (b.budgetMax || 0) - (a.budgetMax || 0);
				case "budget-low":
					return (a.budgetMin || 0) - (b.budgetMin || 0);
				default:
					return 0;
			}
		});

	const formatBudget = (
		min: number | null,
		max: number | null,
		currency: string,
	) => {
		if (!min && !max) return "Not specified";
		if (min && max)
			return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
		if (min) return `From ${currency}${min.toLocaleString()}`;
		if (max) return `Up to ${currency}${max.toLocaleString()}`;
		return "Not specified";
	};

	const getStatusColor = (status: string) => {
		const colors: Record<string, string> = {
			DRAFT: "bg-gray-100 text-gray-800",
			OPEN: "bg-green-100 text-green-800",
			IN_PROGRESS: "bg-blue-100 text-blue-800",
			COMPLETED: "bg-emerald-100 text-emerald-800",
			CANCELLED: "bg-red-100 text-red-800",
			CLOSED: "bg-gray-200 text-gray-800",
		};
		return colors[status] || "bg-gray-100 text-gray-800";
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl font-bold mb-2">Explore Projects</h1>
					<p className="text-lg text-muted-foreground">
						Browse and apply to projects that match your skills
					</p>
				</div>

				{/* Search and Filters */}
				<div className="mb-8 space-y-4">
					{/* Search Bar */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
						<Input
							placeholder="Search projects by title or description..."
							className="pl-10 h-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					{/* Filter Controls */}
					<div className="flex gap-4 flex-wrap">
						<div className="flex-1 min-w-xs">
							<Select
								value={selectedCategory || ""}
								onValueChange={(value) =>
									setSelectedCategory(value === "" ? null : value)
								}
							>
								<SelectTrigger className="w-full">
									<Filter className="size-4 mr-2" />
									<SelectValue placeholder="All Categories" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="">All Categories</SelectItem>
									{categories?.categories.map((cat) => (
										<SelectItem key={cat.category} value={cat.category}>
											{cat.category} ({cat.count})
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex-1 min-w-xs">
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="newest">Newest First</SelectItem>
									<SelectItem value="oldest">Oldest First</SelectItem>
									<SelectItem value="budget-high">
										Budget: High to Low
									</SelectItem>
									<SelectItem value="budget-low">
										Budget: Low to High
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Results Info */}
				<div className="mb-6 text-sm text-muted-foreground">
					Showing {filteredProjects.length} of {projects.length} projects
				</div>

				{/* Projects Grid */}
				{isLoading ? (
					<div className="flex items-center justify-center py-12">
						<div className="text-center">
							<div className="w-12 h-12 border-4 border-muted rounded-full border-t-primary animate-spin mx-auto mb-4"></div>
							<p>Loading projects...</p>
						</div>
					</div>
				) : error ? (
					<div className="text-center py-12">
						<p className="text-destructive">{error}</p>
					</div>
				) : filteredProjects.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-muted-foreground mb-4">
							No projects found matching your criteria
						</p>
						<Button
							onClick={() => {
								setSearchTerm("");
								setSelectedCategory(null);
							}}
						>
							Clear Filters
						</Button>
					</div>
				) : (
					<div className="space-y-4">
						{filteredProjects.map((project) => (
							<Link key={project.id} href={`/projects/${project.id}`}>
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
											<ChevronRight className="size-5 text-muted-foreground flex-shrink-0 mt-1" />
										</div>
									</CardHeader>

									<CardContent>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
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
			</div>
		</div>
	);
};

export default ProjectsPage;
