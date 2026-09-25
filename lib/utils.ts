export { cn } from "cn";

import { Project } from "@/features/projects/types";
import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

export default api;

export const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});

export const formatBudget = (project: Project) => {
	if (project.budgetMin == null && project.budgetMax == null) {
		return "Budget negotiable";
	}

	if (project.budgetType === "HOURLY") {
		const min = project.budgetMin ?? 0;
		const max = project.budgetMax ?? min;
		return `${currencyFormatter.format(min)}-${currencyFormatter.format(max)}/hr`;
	}

	const min = project.budgetMin ?? 0;
	const max = project.budgetMax ?? min;
	return `${currencyFormatter.format(min)}-${currencyFormatter.format(max)}`;
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
