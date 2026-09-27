import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProposalTips = () => {
	return (
		<div className="lg:col-span-1">
			<Card className="sticky top-6">
				<CardHeader>
					<CardTitle className="text-lg">Tips for Success</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-3 text-sm">
						<li className="flex gap-3">
							<span className="text-primary font-bold">1.</span>
							<span className="text-foreground/70">
								Write a personalized cover letter that shows you understand the
								project
							</span>
						</li>
						<li className="flex gap-3">
							<span className="text-primary font-bold">2.</span>
							<span className="text-foreground/70">
								Be competitive with your budget while valuing your expertise
							</span>
						</li>
						<li className="flex gap-3">
							<span className="text-primary font-bold">3.</span>
							<span className="text-foreground/70">
								Provide a realistic and detailed timeline
							</span>
						</li>
						<li className="flex gap-3">
							<span className="text-primary font-bold">4.</span>
							<span className="text-foreground/70">
								Mention relevant past projects or experience
							</span>
						</li>
						<li className="flex gap-3">
							<span className="text-primary font-bold">5.</span>
							<span className="text-foreground/70">
								Be responsive and available to answer questions
							</span>
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
};
export default ProposalTips;
