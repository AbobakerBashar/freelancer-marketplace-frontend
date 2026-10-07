import { useQuery } from "@tanstack/react-query";
import { getMessages } from "./api";
import { MessagesResponse } from "./types";

export const useGetMessages = (conversationId: string) => {
	return useQuery<MessagesResponse>({
		queryKey: ["messages", conversationId],
		queryFn: async () => await getMessages(conversationId),
	});
};
