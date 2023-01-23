import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

export const Footer = () => {
	const notify = () => {
		toast.success("Congrats you joined the newsletter");
	};
	const [emailForm, setEmailForm] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		notify();
		// alert("email: " + emailForm);
	};
	return (
		<div className="static bottom-0 w-full bg-neutral-900 text-white text-sm sm:text-base pb-5 lg:pb-2 pt-4 mt-20">
			<Toaster />
			<div className="flex max-lg:flex-col max-lg:items-center justify-evenly">
				<div className="flex flex-col border-b border-gray-300 max-lg:w-[85%] items-center pb-2 sm:pb-3 lg:pb-0 lg:border-none">
					<h5 className="mb-2 text-base font-medium sm:text-lg ">Useful Links</h5>
					<Link href={"/"}>Home</Link>
					<Link href={"/about"}>About Us</Link>
					<Link href={"/contact"}>Contact</Link>
					<Link href={"/collections"}>Collections</Link>
				</div>

				<div className="mt-4 lg:mt-0">
					<form onSubmit={handleSubmit} className=" w-[85%] mx-auto ">
						<label htmlFor="email" className="text-center block">
							Get Email Offers & The Lastest New from Sneakers
						</label>
						<div className="lg:flex items-center ">
							<input
								type="email"
								id="email"
								value={emailForm}
								onChange={(e) => setEmailForm(e.target.value)}
								placeholder="Enter your Email"
								className="input-primary mt-2 text-gray-900 outline-none lg:h-full lg:rounded-r-none"
							/>
							<button
								type="submit"
								className="btn-primary mt-3 bg-neutral-800 hover:bg-neutral-700 lg:w-1/2 lg:rounded-l-none lg:shadow-none">
								Subscibe
							</button>
						</div>
					</form>
				</div>

				<div className="flex flex-col mt-3 items-center lg:mt-0">
					<h5 className="text-base mb-2 font-medium sm:text-lg ">Connect with Us</h5>
					<div className="flex gap-x-1 text-base sm:text-xl  items-center">
						<button className="p-1 rounded-full">
							<HiOutlineMail />
						</button>
						<Link href={"https://www.facebook.com/"} className="p-1 rounded-full ">
							<FaFacebook />
						</Link>
						<Link href={"https://www.instagram.com/"} className="p-1 rounded-full">
							<FaInstagram />
						</Link>
						<Link href={"https://www.youtube.com/"} className="p-1 rounded-full">
							<FaYoutube />
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-3 sm:mt-4 lg:mt-2 text-center">
				<small className="text-xs text-gray-400 ">&copy; 2023 Sneakers</small>
			</div>
		</div>
	);
};
