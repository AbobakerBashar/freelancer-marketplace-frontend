"use client";

import { Message } from "@/features/conversations/types";
import { socket } from "@/utils/socket";
import { format } from "date-fns";
import { MessageCircle, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SendMessageArea from "./SendMessageArea";

type Props = {
	conversationId: string;
	messages: Omit<Message, "conversationId">[];
};

const Messages = ({ conversationId, messages: initialMessages }: Props) => {
	const [messages, setMessages] =
		useState<Omit<Message, "conversationId">[]>(initialMessages);
	const [error, setError] = useState<string | null>(null);
	console.log("Initial messages:", error);

	const messagesContainerRef = useRef<HTMLDivElement>(null);

	// Connect to the socket & join the conversation room when the component mounts
	useEffect(() => {
		const handleConnect = () => {
			socket.emit(
				"conversation:join",
				{
					conversationId,
				},
				(response: { success: boolean; message?: string }) => {
					if (!response.success) {
						setError(response.message || "Failed to join the conversation");
					}
				},
			);
		};

		const handleNewMessage = (message: Omit<Message, "conversationId">) => {
			setMessages((prev) => [...prev, message]);
		};

		const handleConnectError = () => {
			setError("Unable to connect to messaging server.");
		};

		socket.on("connect", handleConnect);
		socket.on("message:new", handleNewMessage);
		socket.on("connect_error", handleConnectError);

		socket.connect();

		return () => {
			socket.emit("conversation:leave", {
				conversationId,
			});

			socket.off("connect", handleConnect);
			socket.off("message:new", handleNewMessage);
			socket.off("connect_error", handleConnectError);

			socket.disconnect();
		};
	}, [conversationId]);

	// Scroll to the bottom of the messages when new messages are received
	useEffect(() => {
		messagesContainerRef.current?.scrollTo({
			top: messagesContainerRef.current?.scrollHeight,
			behavior: "smooth",
		});
	}, [messages]);

	return (
		<section className="flex-1 flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm">
			<div
				ref={messagesContainerRef}
				className="flex-1 p-4 sm:p-6 overflow-auto"
			>
				{error ? (
					<div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 text-center">
						<p className="max-w-sm text-sm text-destructive">{error}</p>
					</div>
				) : messages.length === 0 ? (
					<div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 text-center">
						<div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
							<MessageCircle className="size-5" />
						</div>
						<p className="font-medium">Start the conversation</p>
						<p className="mt-1 max-w-sm text-sm text-muted-foreground">
							Send a message to discuss project details, updates, and next
							steps.
						</p>
					</div>
				) : (
					<div className="space-y-5">
						{messages.map((ms) => (
							<div key={ms.id} className="flex gap-3">
								<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
									<UserRound className="size-4" />
								</div>
								<div className="min-w-0 flex-1">
									<div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
										<p className="text-sm font-medium">{ms.sender.name}</p>
										<p className="text-xs text-muted-foreground">
											{format(
												new Date(ms.createdAt),
												"MMM d, yyyy 'at' h:mm a",
											)}
										</p>
									</div>
									<div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
										<p className="whitespace-pre-wrap text-sm leading-6">
											{ms.content || "This message has no text content."}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<SendMessageArea conversationId={conversationId} setError={setError} />
		</section>
	);
};

export default Messages;
