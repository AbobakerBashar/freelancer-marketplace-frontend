import Link from "next/link";
import {
	ArrowRight,
	ClipboardList,
	Rocket,
	ShieldCheck,
	Sparkles,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

const steps = [
	{
		title: "Share a focused brief",
		description:
			"Describe the outcome, budget, and timeline in a way that attracts the right specialists.",
		icon: ClipboardList,
	},
	{
		title: "Match with the right talent",
		description:
			"Review active categories, compare profiles, and pick the freelancer that fits the work.",
		icon: Sparkles,
	},
	{
		title: "Ship with confidence",
		description:
			"Keep milestones clear, stay aligned, and hand off polished work without the usual drift.",
		icon: ShieldCheck,
	},
];

const HowItWorks = () => {
	return (
		<section>
			<div className="mx-auto max-w-2xl text-center">
				<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm shadow-primary/5">
					<Rocket className="size-4 text-primary" />
					How it works
				</div>
				<h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					A cleaner path from brief to delivery.
				</h2>
				<p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
					The homepage should do more than introduce the product. It should make
					the workflow feel obvious before a user ever signs in.
				</p>
			</div>

			<div className="mt-8 grid gap-4 lg:grid-cols-3">
				{steps.map((step, index) => {
					const Icon = step.icon;

					return (
						<Card
							key={step.title}
							className="border-border/70 bg-card/90 shadow-sm shadow-primary/5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
						>
							<CardHeader className="gap-4 border-b border-border/70 pb-5">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-muted-foreground">
										0{index + 1}
									</span>
									<div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<Icon className="size-5" />
									</div>
								</div>
								<CardTitle>{step.title}</CardTitle>
								<CardDescription>{step.description}</CardDescription>
							</CardHeader>
							<CardContent className="pt-5">
								<p className="text-sm leading-6 text-muted-foreground">
									Keep every milestone visible, reduce unnecessary hand-holding,
									and give both sides a clearer path to a successful result.
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</section>
	);
};
export default HowItWorks;
