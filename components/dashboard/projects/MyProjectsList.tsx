import type { Project } from "@/features/projects/types";

import ProjectCard from "./ProjectCard";

type Props = {
	projects: Project[];
};

const MyProjectsList = ({ projects }: Props) => {
	return (
		<section className="space-y-5">
			{projects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</section>
	);
};
export default MyProjectsList;
