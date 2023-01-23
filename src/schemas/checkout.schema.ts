import { z } from "zod";

export const shippingAddresschema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	address: z.string(),
	address2: z.string().optional(),
	state: z.string(),
	zipCode: z.string(),
	city: z.string(),
	email: z.string().email(),
	phoneNum: z.string(),
});
