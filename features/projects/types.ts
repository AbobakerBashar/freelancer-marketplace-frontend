import { projectCreateSchema, projectEditSchema } from "@/schemas/project";
import z from "zod";
import { User } from "../auth/types";
import { Proposal } from "../proposals/types";

export type Category = {
	category: string;
	count: number;
};

export type CategoriesRes = {
	success: boolean;
	message: string;
	categories: Category[];
};

export type BudgetType = "FIXED" | "HOURLY";

type DurationUnit = "HOURS" | "DAYS" | "WEEKS" | "MONTHS";

type ProjectStatus =
	| "DRAFT"
	| "OPEN"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED"
	| "CLOSED";

export type Project = {
	id: string;

	description: string;
	title: string;

	category: string;
	skills: string[];

	budgetType: BudgetType;
	budgetMin: number | null;
	budgetMax: number | null;
	currency: string;

	duration: number | null;
	durationUnit: DurationUnit | null;

	status: ProjectStatus;

	deadline: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Pagination = {
	currentPage: number;
	totalPages: number;
	totalCount: number;
	limit: number;
};

export type ProjectsResponse = {
	success: true;
	message?: string;
	projects: Project[];
	pagination: Pagination;
	statusCode?: number;
};

export type ProjectResponse = {
	statusCode?: number;
	success: boolean;
	message?: string;
	project?: Project;
	errors?: Record<string, string>;
};

export type ProjectSortField =
	| "createdAt"
	| "budgetMin"
	| "budgetMax"
	| "deadline";

export type ProjectQueryParams = {
	page?: number;
	limit?: number;

	search?: string;

	category?: string;
	status?: string;
	budgetType?: string;

	clientId?: string;

	minBudget?: number;
	maxBudget?: number;

	sort?: string;
	order?: "asc" | "desc";
};

export type Stats = {
	totalProjects: number;
	status: {
		status: ProjectStatus;
		count: number;
	}[];
};

export type ProjectStatistics = {
	success: boolean;
	message?: string;
	stats?: Stats;
};
export type ProjectFormInput = z.input<typeof projectCreateSchema>;
export type ProjectFormOutput = z.output<typeof projectCreateSchema>;

export type ProjectEditFormInput = z.input<typeof projectEditSchema>;
export type ProjectEditFormOutput = z.output<typeof projectEditSchema>;

export interface ActiveProject extends Project {
	client: {
		id: string;
		name: string;
		email: string;
	};

	freelancer?: {
		id: string;
		name: string;
		email: string;
	};
}

export type ActiveProjectsResponse = {
	success: boolean;
	message?: string;
	projects?: ActiveProject[];
	statusCode?: number;
};

export type ProjectWorkspace = {
	project: Project;
	client: Partial<User>;
	proposal: Proposal;
	freelancer?: Partial<User>;
	currentUserRole: "CLIENT" | "FREELANCER";
};

export type ProjectWorkspaceResponse = {
	success: boolean;
	message?: string;
	workspace?: ProjectWorkspace;
	statusCode?: number;
};
