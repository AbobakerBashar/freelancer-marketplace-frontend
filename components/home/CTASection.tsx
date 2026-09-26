import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
	return (
		<div className="mb-8 rounded-4xl border border-border/70 bg-primary/5 p-6 sm:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
			<div className="max-w-2xl">
				<p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
					Next step
				</p>
				<h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
					Create an account and turn the browsing experience into a working
					pipeline.
				</h3>
				<p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
					Move from discovery to hiring with a workflow that already feels
					organized.
				</p>
			</div>
			<div className="flex gap-5 justify-center md:justify-start">
				<Link
					href="/projects"
					className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
				>
					Find Work
					<ArrowRight className="ml-2 size-4" />
				</Link>
				<Link
					href="/post-project"
					className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
				>
					Post a project
				</Link>
			</div>
		</div>
	);
};
export default CTASection;
