import { ContactFormInput } from "@/schemas/contact.schema";
import axios from "axios";

const shoesApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
});

export const getShoes = async (shoeId: string) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/shoes/${shoeId}?populate=%2Adesc`
	);
	return response.data.data;
};

const getData = async () => {
	const response = await axios.get(`https://famous-quotes4.p.rapidapi.com/random`);
};

export const sendContactForm = async (data: ContactFormInput) =>
	fetch("/api/contact", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json", Accept: "application/json" },
	}).then((res) => {
		if (!res.ok) throw new Error("Failed to send message");
		return res.json();
	});
