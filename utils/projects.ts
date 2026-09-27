import { Project } from "@/features/projects/types";
import { ProposalStatus } from "@/features/proposals/types";

export const currencyFormatter = (currency: string) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		maximumFractionDigits: 0,
	});

export const formatBudget = (
	min: number | null,
	max: number | null,
	currency: string,
) => {
	if (!min && !max) return "Not specified";
	if (min && max)
		return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
	if (min) return `From ${currency}${min.toLocaleString()}`;
	if (max) return `Up to ${currency}${max.toLocaleString()}`;
	return "Not specified";
};

export const formatDuration = (project: Project) => {
	if (!project.duration || !project.durationUnit) {
		return "Flexible timeline";
	}

	return `${project.duration} ${project.durationUnit.toLowerCase()}`;
};

export const formatStatus = (status: Project["status"]) => {
	const normalized = status.replace(/_/g, " ").toLowerCase();
	return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export const getStatusColor = (status: string) => {
	const colors: Record<string, string> = {
		DRAFT: "bg-gray-100 text-gray-800",
		OPEN: "bg-green-100 text-green-800",
		IN_PROGRESS: "bg-blue-100 text-blue-800",
		COMPLETED: "bg-emerald-100 text-emerald-800",
		CANCELLED: "bg-red-100 text-red-800",
		CLOSED: "bg-gray-200 text-gray-800",
	};
	return colors[status] || "bg-gray-100 text-gray-800";
};

export const proposalStatusStyles: Record<ProposalStatus, string> = {
	PENDING: "bg-secondary text-secondary-foreground",
	// Shortlisted: "bg-accent text-accent-foreground",
	// Interviewing:
	// 	"bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
	ACCEPTED: "bg-success/15 text-success",
	REJECTED: "bg-destructive/10 text-destructive",
	WITHDRAWN: "bg-muted text-muted-foreground",
};
