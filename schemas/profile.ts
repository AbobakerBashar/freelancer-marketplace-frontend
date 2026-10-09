import z from "zod";

export const profileSchema = z.object({
	name: z
		.string()
		.trim()
		.max(100, "Name must be 100 characters or fewer.")
		.optional(),

	bio: z
		.string()
		.trim()
		.max(250, "Bio must be 250 characters or fewer.")
		.optional(),

	phone: z
		.string()
		.trim()
		.max(20, "Phone must be 20 characters or fewer.")
		.optional(),

	location: z
		.string()
		.trim()
		.max(100, "Location must be 100 characters or fewer.")
		.optional(),
});

export type ProfileFormInput = z.infer<typeof profileSchema>;
