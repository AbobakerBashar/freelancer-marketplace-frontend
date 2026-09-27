import z from "zod";

export const proposalSchema = z.object({
	coverLetter: z
		.string("Invalid cover letter. should be a string")
		.trim()
		.min(10, "Cover letter must be at least 10 characters long")
		.max(1000, "Cover letter must be at most 1000 characters long"),

	bidAmount: z
		.number("Invalid bid amount. should be a number")
		.positive("Bid amount must be a positive number"),

	deliveryDays: z
		.number("Invalid delivery days. should be a number")
		.int("Delivery days must be an integer")
		.positive("Delivery days must be a positive number"),
});
