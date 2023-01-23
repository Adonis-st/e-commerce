import { useState } from "react";
import { sendContactForm } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { contactFormSchema } from "@/schemas/contact.schema";

export default function ContactPage() {
	const successNotify = () => toast.success("Your message was sent successfully");
	const errorNotify = () => toast.error("Your message failed to send");
	const [contactForm, setContactForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const { name, email, subject, message } = contactForm;

	const [formErrors, setFormErrors] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (e: any) => {
		setContactForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const result = contactFormSchema.safeParse(contactForm);
		if (!result.success) {
			const formattedErrors = result.error.format();
			setFormErrors((prevState) => ({
				...prevState,
				name: formattedErrors.name?._errors.join(", ") || "",
				email: formattedErrors.email?._errors.join(", ") || "",
				subject: formattedErrors.subject?._errors.join(", ") || "",
				message: formattedErrors.message?._errors.join(", ") || "",
			}));
		} else {
			try {
				await sendContactForm(contactForm);
				successNotify();
			} catch (error) {
				errorNotify();
			}
			setFormErrors((prevState) => ({
				...prevState,
				name: "",
				email: "",
				subject: "",
				message: "",
			}));
		}
	};

	return (
		<div className="mt-10 mb-48">
			<Toaster />
			<div className="mb-5">
				<h1 className="text-3xl text-center lg:text-4xl font-medium">Contact Us</h1>
			</div>
			<div className="flex">
				<form onSubmit={handleSubmit} className="flex flex-col mx-auto w-[85%] max-w-[750px]">
					<div className={`${formErrors.name ? "border-red-500" : ""} floating-form-border`}>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={handleChange}
							// onBlur={handleBlur}
							placeholder=" "
							className="floating-input"
						/>
						<label htmlFor="name" className="floating-label">
							Name
						</label>
					</div>

					<span className="form-error-message text-xs -mt-2">{formErrors.name}</span>

					<div className={`${formErrors.email ? "border-red-500" : ""} floating-form-border `}>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={handleChange}
							// onBlur={handleBlur}
							placeholder=" "
							className="floating-input"
						/>
						<label htmlFor="email" className="floating-label">
							Email
						</label>
					</div>

					{formErrors.email && (
						<span className="form-error-message -mt-2">{formErrors.email}</span>
					)}
					<div
						className={`${formErrors.subject ? "border-red-500" : ""} floating-form-border`}>
						<input
							type="text"
							name="subject"
							id="subject"
							value={subject}
							onChange={handleChange}
							// onBlur={handleBlur}
							placeholder=" "
							className="floating-input"
						/>
						<label htmlFor="subject" className="floating-label">
							Subject
						</label>
					</div>

					<span className="form-error-message text-xs -mt-2">{formErrors.subject}</span>

					<div
						className={`${formErrors.message ? "border-red-500" : ""} floating-form-border`}>
						<textarea
							name="message"
							id="message"
							value={message}
							onChange={handleChange}
							// onBlur={handleBlur}
							rows={3}
							placeholder=" "
							className="floating-input resize-none"
						/>
						<label htmlFor="message" className="floating-label">
							Message
						</label>
					</div>

					<span className="form-error-message -mt-2">{formErrors.message}</span>

					<button type="submit" className="btn-primary mt-3">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
