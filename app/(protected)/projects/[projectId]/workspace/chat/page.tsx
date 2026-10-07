import Messages from "@/components/dashboard/projects/workspace/Messages";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

import { getConversation } from "@/features/conversations/api";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Workspace",
	description: "Manage your projects and collaborate with your team.",
};

const loaddata = async (projectId: string) => {
	const res = await getConversation(projectId);
	if (!res.success || !res.data) {
		if (res.statusCode === 404) notFound();
		else if (res.statusCode === 401) redirect("/auth/signin");
		else throw new Error(res.message || "Failed to load conversation data");
	}
	return res.data;
};

type Props = {
	params: Promise<{
		projectId: string;
	}>;
};

const Page = async ({ params }: Props) => {
	const { projectId } = await params;

	const conversationData = await loaddata(projectId);

	return (
		<main className="page-container h-[calc(100vh-4rem)] bg-linear-to-b from-background to-muted/20 py-10 sm:py-12 flex flex-col">
			<section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div className="max-w-2xl">
					<div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
						<MessageCircle className="size-4" />
						<span>Chat</span>
					</div>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Project messages
					</h1>
					<p className="mt-3 text-muted-foreground sm:text-lg">
						Send and receive messages in this conversation.
					</p>
				</div>

				<Link
					href={`/projects/${projectId}/workspace`}
					className="mb-6 inline-block"
				>
					<Button variant="outline">
						<ArrowLeft className="mr-1 h-4 w-4" />
						Back to workspace
					</Button>
				</Link>
			</section>

			<Messages
				conversationId={conversationData.conversationId}
				messages={conversationData.messages}
			/>
		</main>
	);
};

export default Page;
