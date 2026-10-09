export type User = {
	id: string;
	name: string;
	email: string;
	role: "CLIENT" | "FREELANCER";
	avatarUrl: string | null;
	avatarPublicId?: string | null;
	bio?: string | null;
	phone?: string | null;
	location?: string | null;
	isVerified?: boolean;
	isActive?: boolean;
	createdAt: string;
	updatedAt?: string;
};

export type AuthResponse = {
	success: boolean;
	message?: string;
	user: User | null;
	errors?: Record<string, string>;
};
