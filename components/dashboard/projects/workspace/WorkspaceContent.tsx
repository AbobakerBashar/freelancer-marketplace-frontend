import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/features/auth/types";
import { Project } from "@/features/projects/types";
import { Proposal } from "@/features/proposals/types";
import OverviewContent from "./OverviewContent";
import DeatailsContent from "./DeatailsContent";
import ProposalContent from "./ProposalContent";

type WorkspaceContentProps = {
	project: Project;
	proposal: Proposal | null;
	collaborator?: Partial<User>;
	currentUserRole: "CLIENT" | "FREELANCER";
};

export default async function WorkspaceContent({
	project,
	proposal,
	collaborator,
	currentUserRole,
}: WorkspaceContentProps) {
	return (
		<Tabs className="w-full space-y-6" defaultValue="overview">
			<div className="w-[calc(vw)] min-w-0 rounded-lg border px-2 py-1">
				<TabsList className="w-max min-w-full">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="proposal">Proposal</TabsTrigger>
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="messages">Messages</TabsTrigger>
					<TabsTrigger value="activity">Activity</TabsTrigger>
				</TabsList>
			</div>

			<OverviewContent
				project={project}
				proposalStatus={proposal?.status}
				proposalCreatedAt={proposal?.createdAt}
				collaboratorName={collaborator?.name}
				collaboratorEmail={collaborator?.email}
				currentUserRole={currentUserRole}
			/>

			<DeatailsContent project={project} />

			<ProposalContent proposal={proposal} currency={project.currency} />
		</Tabs>
	);
}
