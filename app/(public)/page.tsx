import Hero from "@/components/Hero";
import LatestProjects from "@/components/home/LatestProjects";
import PopularCategories from "@/components/home/PopularCategories";
import HowItWorks from "@/components/home/HowItWorks";
import {
	getPopularCategories,
	getProjects,
} from "@/features/projects/projects";
import CTASection from "@/components/home/CTASection";

const fetchData = async () => {
	const [categories, projects] = await Promise.all([
		getPopularCategories(),
		getProjects(8),
	]);
	return {
		categories: categories?.categories || [],
		latestProjects: projects?.projects || [],
	};
};

export default async function Home() {
	const { categories, latestProjects } = await fetchData();
	return (
		<main className="page-container overflow-hidden flex flex-col gap-16 lg:gap-24">
			<Hero />

			<PopularCategories categories={categories} />

			<LatestProjects latestProjects={latestProjects} />

			<HowItWorks />

			<CTASection />
		</main>
	);
}
