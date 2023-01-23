import { z } from "zod";

export const reviewFormSchema = z.object({
	title: z
		.string()
		.min(3, "Please enter a title between 3-25 characters")
		.max(25, "Please enter a title between 3-25 characters"),
	stars: z.number().min(1, "You must give a star rating.").max(5),
	userName: z
		.string()
		.min(3, "Please enter a nickname between 3-25 characters")
		.max(25, "Please enter a nickname between 3-25 characters"),
	message: z.string().min(3, "Message min length is 3"),
});

const createReviewSchema = z.object({
	data: z.object({
		title: z.string(),
		stars: z.number(),
		message: z.string(),
		userName: z.string(),
		shoe: z.number(),
	}),
});

export type CreateReviewSchema = z.TypeOf<typeof createReviewSchema>;
