export interface Message {
	id: string;
	conversationId: string;
	sender: ConversationUser;
	content: string | null;
	type: MessageType;
	isRead: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ConversationUser {
	id: string;
	name: string;
	avatarUrl: string | null;
}

type MessageType = "TEXT" | "IMAGE" | "FILE";

export interface MessagesResponse {
	success: boolean;
	message?: string;
	data?: Message[];
	statusCode: number;
}

export interface MessageResponse {
	statusCode: number;
	success: boolean;
	message?: string;
	data?: Message;
	errors?: Record<string, string>;
}

export interface ProjectConversationResponse {
	data?: {
		messages: Omit<Message, "conversationId">[];
		conversationId: string;
	};
	success: boolean;
	message?: string;
	statusCode: number;
}
