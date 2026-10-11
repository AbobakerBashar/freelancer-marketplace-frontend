import { format, isToday, isYesterday } from "date-fns";

export function formatMessageDate(createdAt: string | Date) {
	const date = new Date(createdAt);

	if (isToday(date)) return "Today";
	if (isYesterday(date)) return "Yesterday";

	return format(date, "MMMM d, yyyy");
}
