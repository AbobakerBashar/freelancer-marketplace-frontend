import Messages from "@/components/dashboard/projects/workspace/Messages";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

import { getConversation } from "@/features/conversations/api";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getUser } from "@/features/auth/api";

export const metadata: Metadata = {
	title: "Workspace",
	description: "Manage your projects and collaborate with your team.",
};

const loaddata = async (projectId: string) => {
	const [conversationResult, userResult] = await Promise.all([
		getConversation(projectId),
		getUser(),
	]);

	if (!conversationResult.success || !conversationResult.data) {
		if (conversationResult.statusCode === 404) notFound();
		else if (conversationResult.statusCode === 401) redirect("/auth/signin");
		else
			throw new Error(
				conversationResult.message || "Failed to load conversation data",
			);
	}

	if (!userResult.success || !userResult.user) {
		if (userResult.statusCode === 404) notFound();
		else if (userResult.statusCode === 401) redirect("/auth/signin");
		else throw new Error(userResult.message || "Failed to load user data");
	}

	return {
		conversation: conversationResult.data,
		user: userResult.user,
	};
};

type Props = {
	params: Promise<{
		projectId: string;
	}>;
};

const Page = async ({ params }: Props) => {
	const { projectId } = await params;

	const { conversation, user } = await loaddata(projectId);

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
				conversationId={conversation.conversationId}
				messages={conversation.messages}
				user={user}
			/>
		</main>
	);
};

export default Page;
