"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import { useState } from "react";

import { MessageResponse } from "@/features/conversations/types";
import { socket } from "@/utils/socket";

type Props = {
	conversationId: string;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const SendMessageArea = ({ conversationId, setError }: Props) => {
	const [content, setContent] = useState("");

	const [isSending, setIsSending] = useState(false);

	// Hnandle sending a new message
	const handleSend = () => {
		const trimmedContent = content.trim();

		if (!trimmedContent) return;

		setError(null);
		setIsSending(true);

		socket.emit(
			"message:send",
			{
				conversationId,
				content: trimmedContent,
			},
			(response: MessageResponse) => {
				if (!response.success) {
					setError(response.message || "Failed to send message");
				} else {
					setContent("");
				}

				setIsSending(false);
			},
		);
	};

	return (
		<section
			role="form"
			className="flex flex-col gap-3 border-t bg-muted/20 p-4 sm:flex-row sm:items-end h-16 sm:h-20"
		>
			<Textarea
				placeholder="Write a message..."
				aria-label="Message"
				rows={1}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className="min-h-10 resize-none bg-background"
			/>
			<Button
				type="submit"
				disabled={!content.trim() || isSending}
				className="sm:min-w-20"
				onClick={handleSend}
			>
				{isSending ? (
					<>
						<Loader className="mr-2 h-4 w-4 animate-spin" />
						Sending...
					</>
				) : (
					<>
						{" "}
						<Send className="w-4 h-4" />
						Send
					</>
				)}
			</Button>
		</section>
	);
};

export default SendMessageArea;
