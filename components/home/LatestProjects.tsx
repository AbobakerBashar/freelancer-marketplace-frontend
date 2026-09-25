import { Project } from "@/features/projects/types";
import Link from "next/link";
import { ArrowUpRight, Clock3, DollarSign, Sparkles } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { formatBudget, formatDuration, formatStatus } from "@/lib/utils";

type Props = {
	latestProjects: Project[];
};

const LatestProjects = ({ latestProjects }: Props) => {
	return (
		<section className="py-8 lg:py-12">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm shadow-primary/5">
					<Sparkles className="size-4 text-primary" />
					Latest projects
				</h2>
				<h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					Fresh work that clients are hiring for now.
				</h2>
				<p className="mt-4 text-base leading-7 text-muted-foreground">
					Browse newly posted opportunities across the most in-demand
					categories.
				</p>
			</div>

			{latestProjects.length > 0 ? (
				<div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{latestProjects.map((project) => (
						<Card
							key={project.id}
							className="group border-border/70 bg-card/90 shadow-sm shadow-primary/5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
						>
							<CardHeader className="gap-3 border-b border-border/70 pb-5">
								<div className="flex items-start justify-between gap-3">
									<span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary">
										{project.category}
									</span>
									<span className="rounded-full border border-border bg-background px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
										{formatStatus(project.status)}
									</span>
								</div>
								<CardTitle className="line-clamp-2 text-xl font-semibold leading-snug text-foreground">
									{project.title}
								</CardTitle>
								<CardDescription className="line-clamp-3 text-sm leading-6 text-muted-foreground">
									{project.description}
								</CardDescription>
							</CardHeader>

							<CardContent className="pt-5">
								<div className="flex flex-wrap gap-2">
									{project.skills.slice(0, 3).map((skill) => (
										<span
											key={skill}
											className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
										>
											{skill}
										</span>
									))}
								</div>

								<div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
									<div className="flex items-center gap-2">
										<DollarSign className="size-4 text-primary" />
										<span>{formatBudget(project)}</span>
									</div>
									<div className="flex items-center gap-2">
										<Clock3 className="size-4 text-primary" />
										<span>{formatDuration(project)}</span>
									</div>
								</div>

								<div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
									<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
										{project.deadline
											? `Deadline ${new Date(
													project.deadline,
												).toLocaleDateString()}`
											: "No deadline set"}
									</p>
									<Link
										href={`/projects/${project.id}`}
										className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
									>
										View project
										<ArrowUpRight className="size-4" />
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="mt-8 rounded border border-dashed border-border bg-card/70 p-8 text-center text-muted-foreground">
					No latest projects are available right now.
				</div>
			)}
		</section>
	);
};

export default LatestProjects;
