export type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	avatarUrl: string;
	createdAt: string;
};

export type AuthResponse = {
	success: boolean;
	message: string;
	user: User | null;
};
