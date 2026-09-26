import { Category } from "@/features/projects/types";
import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";

type Props = {
	categories: Category[];
};

const PopularCategories = ({ categories }: Props) => {
	const formatter = new Intl.NumberFormat();

	return (
		<section>
			<div className="max-w-2xl mx-auto text-center">
				<h2 className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm shadow-primary/5">
					<LayoutGrid className="size-4 text-primary" />
					Popular categories
				</h2>
				<h5 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					Start where demand is already moving.
				</h5>
				<p className="mt-4 text-base leading-7 text-muted-foreground">
					Browse the most active categories to find work quickly or post a
					project in the lanes where talent already clusters.
				</p>
			</div>

			{categories.length > 0 ? (
				<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{categories.map((category) => (
						<Link
							href={`/categories/${encodeURIComponent(category.category)}`}
							className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm shadow-primary/5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
							key={category.category}
						>
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(54,93,255,0.08),transparent_50%)] opacity-0 transition-opacity group-hover:opacity-100" />
							<div className="relative flex h-full flex-col justify-between gap-8">
								<div>
									<p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
										Category
									</p>
									<h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
										{category.category}
									</h3>
								</div>

								<div className="flex items-end justify-between gap-4">
									<div>
										<p className="text-3xl font-semibold tracking-tight text-foreground">
											{formatter.format(category.count)}
										</p>
										<p className="mt-1 text-sm text-muted-foreground">
											open projects
										</p>
									</div>
									<div className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground">
										<ArrowUpRight className="size-4" />
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className="mt-8 rounded border border-dashed border-border bg-card/70 p-8 text-center text-muted-foreground">
					No categories available yet. Check back once live project data is
					available.
				</div>
			)}
		</section>
	);
};
export default PopularCategories;
