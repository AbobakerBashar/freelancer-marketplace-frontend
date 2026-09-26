import { ArrowRight, BadgeCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
	const specialties = ["Design", "Development", "Marketing", "Operations"];

	return (
		<section className="lg:grid gap-10 pt-8 lg:grid-cols-[1.05fr_.95fr]">
			<div className="flex flex-col gap-6 items-center lg:items-start">
				<h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
					Find the right talent.
					<span className="mt-2 block text-primary">
						Launch work without friction.
					</span>
				</h1>

				<p className="max-w-2xl leading-8 text-muted-foreground sm:text-lg">
					Connect with vetted freelancers, compare expertise at a glance, and
					move from brief to delivery with fewer rounds of back-and-forth.
				</p>

				<div className="mt-12 flex flex-col gap-3 sm:flex-row">
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

				<div className="mt-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
					{specialties.map((specialty) => (
						<span
							key={specialty}
							className="rounded-full border border-border bg-background px-3 py-1.5"
						>
							{specialty}
						</span>
					))}
				</div>
			</div>

			<div className="hidden lg:block relative overflow-hidden rounded border border-border/70 bg-card shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
				<div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/10 to-transparent" />
				<div className="p-4 space-y-4">
					<div className="overflow-hidden rounded-2xl border border-border/70 bg-background/90">
						<Image
							src="/images/hero.png"
							alt="Marketplace preview showing active freelance work and hiring momentum"
							width={960}
							height={720}
							priority
							className="h-full w-full object-cover"
						/>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-2xl border border-border bg-background/90 p-4">
							<div className="flex items-center gap-2 text-sm font-medium text-foreground">
								<Users className="size-4 text-primary" />
								Talent pool
							</div>
							<p className="mt-2 text-sm text-muted-foreground">
								Shortlist stronger profiles without scanning a dozen tabs.
							</p>
						</div>
						<div className="rounded-2xl border border-border bg-background/90 p-4">
							<div className="flex items-center gap-2 text-sm font-medium text-foreground">
								<BadgeCheck className="size-4 text-success" />
								Vetted delivery
							</div>
							<p className="mt-2 text-sm text-muted-foreground">
								Clear milestones and clean handoffs from the start.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Hero;
