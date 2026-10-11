"use client";

import { Avatar } from "@/components/ui/avatar";
import { User } from "@/features/auth/types";
import { Message } from "@/features/conversations/types";
import { formatMessageDate } from "@/utils/messages";
import { socket } from "@/utils/socket";
import { MessageCircle, UserRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SendMessageArea from "./SendMessageArea";

const isSentByCurrentUser = (currentUserId: string, senderId: string) => {
	return senderId === currentUserId;
};

type Props = {
	conversationId: string;
	messages: Omit<Message, "conversationId">[];
	user: User;
};

const Messages = ({
	conversationId,
	messages: initialMessages,
	user,
}: Props) => {
	const [messages, setMessages] =
		useState<Omit<Message, "conversationId">[]>(initialMessages);
	const [error, setError] = useState<string | null>(null);

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
			setMessages((prev) => [message, ...prev]);
		};

		const handleConnectError = () => {
			setError("Unable to connect to messaging server.");
		};

		socket.on("connect", handleConnect);
		socket.on("message:new", handleNewMessage);
		socket.on("connect_error", handleConnectError);

		socket.connect();

		return () => {
			socket.emit(
				"conversation:leave",
				{
					conversationId,
				},
				(response: { success: boolean; message?: string }) => {
					if (!response.success) {
						console.error(
							response.message || "Failed to leave the conversation",
						);
					}
				},
			);

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

	const displyedMessages = [...messages].reverse();

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
						{displyedMessages.map((ms) => (
							<div key={ms.id} className="flex gap-3">
								<Avatar className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
									{ms.sender.avatarUrl ? (
										<Image
											src={ms.sender.avatarUrl}
											alt={ms.sender.name}
											fill
											sizes="100%"
											className="rounded-full object-cover"
										/>
									) : (
										<UserRound className="size-5" />
									)}
								</Avatar>
								<div className="min-w-0 flex-1">
									<div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
										{isSentByCurrentUser(user.id, ms.sender.id) ? (
											<p className="text-sm font-medium">You</p>
										) : (
											<p className="text-sm font-medium">{ms.sender.name}</p>
										)}
										<p className="text-xs text-muted-foreground">
											{formatMessageDate(ms.createdAt)}
										</p>
									</div>
									<div
										className={`rounded-2xl rounded-tl-sm px-4 py-3 ${isSentByCurrentUser(user.id, ms.sender.id) ? "bg-primary/10" : "bg-muted"}`}
									>
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
