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
};

export type ProjectResponse = {
	success: boolean;
	message?: string;
	project?: Project;
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
