import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { fromBagAtom, loginFormAtom, userAtom } from "../store";
import { useAtom } from "jotai";
// import { fetcher } from '../lib/api';

export default function LoginPage() {
	const router = useRouter();
	const [loginForm, setLoginForm] = useAtom(loginFormAtom);
	const [toggleSignUp, setToggleSignUp] = useState(false);
	const [, setUser] = useAtom(userAtom);
	const [fromBag] = useAtom(fromBagAtom);

	const handleChange = (e: any) => {
		setLoginForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetcher(
				`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: loginForm.email,
						password: loginForm.password,
						username: "pops",
					}),
					method: "POST",
				}
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	};
	const guestCheckout = () => {
		setUser(true);
		router.push("/checkout");
	};

	return (
		<div className="w-[90%] mx-auto mt-5 min-h-[80vh]">
			{!toggleSignUp ? (
				<>
					<h3 className="text-2xl font-extralight">Login</h3>
					<form onSubmit={handleSubmit} className="mt-4 flex flex-col">
						<label htmlFor="email" className="font-semibold">
							Email
						</label>
						<input
							type="text"
							id="email"
							name="email"
							value={loginForm.email}
							onChange={handleChange}
							className="border-gray-200 border-2"
						/>
						<label htmlFor="password" className="font-semibold mt-3">
							Password
						</label>
						<input
							type="text"
							id="password"
							name="password"
							value={loginForm.password}
							onChange={handleChange}
							className="border-gray-200 border-2"
						/>

						<button
							type="submit"
							className="px-2 py-3 mt-4 bg-blue-500 text-white rounded-full">
							Login
						</button>
					</form>
					<div className="text-xs text-center mt-4">
						<span>Don't have an account yet?</span>{" "}
						<button
							type="button"
							onClick={() => setToggleSignUp((prevState) => !prevState)}
							className="text-blue-500">
							Sign up
						</button>
					</div>

					{fromBag && (
						<div className="mt-8 flex flex-col">
							<span className="text-xl font-extralight text-gray-500">In a hurry?</span>
							<p className="mt-3 text-sm">
								Checkout as a guest. Plus, you can create an account for next time.
							</p>
							<button
								type="button"
								onClick={() => guestCheckout()}
								className="border border-gray-900 px-2 py-3 rounded-full mt-4">
								Checkout As Guest
							</button>
						</div>
					)}
				</>
			) : (
				<>
					<button
						type="button"
						onClick={() => setToggleSignUp((prevState) => !prevState)}
						className="p-2 mb-2 hover:bg-gray-100 rounded-full">
						<BiArrowBack />
					</button>
					<div className="ml-2">
						<h3 className="text-2xl font-extralight">Sign Up</h3>
						<form className="mt-4 flex flex-col">
							<label htmlFor="email" className="font-semibold">
								Email
							</label>
							<input type="text" id="email" className="border-gray-200 border-2" />
							<label htmlFor="email" className="font-semibold">
								Email
							</label>
							<input type="text" id="email" className="border-gray-200 border-2" />
							<label htmlFor="password" className="font-semibold mt-3">
								Password
							</label>
							<input type="text" id="password" className="border-gray-200 border-2" />

							<button
								type="submit"
								className="px-2 py-3 mt-4 bg-blue-500 text-white rounded-full">
								Done
							</button>
						</form>
					</div>
				</>
			)}
		</div>
	);
}
