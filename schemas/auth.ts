import z from "zod";

export const registerSchema = z
	.object({
		name: z.string().min(3, { message: "Name is required" }),

		email: z.string().email({ message: "Invalid email address" }),

		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),

		confirmPassword: z
			.string()
			.min(8, { message: "Confirm Password must be at least 8 characters" }),

		role: z.enum(["FREELANCER", "CLIENT"], { message: "Role is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),

	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
