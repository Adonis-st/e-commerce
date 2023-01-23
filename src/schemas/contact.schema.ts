import { z } from "zod";

export const contactFormSchema = z.object({
	name: z
		.string()
		.min(3, "Please enter a name between 3-25 characters")
		.max(25, "Please enter a name between 3-25 characters"),
	email: z.string().email(),
	subject: z
		.string()
		.min(3, "Please enter a subject between 3-25 characters")
		.max(25, "Please enter a subject between 3-25 characters"),
	message: z.string().min(3, "Message min length is 3"),
});

export type ContactFormInput = z.TypeOf<typeof contactFormSchema>;
