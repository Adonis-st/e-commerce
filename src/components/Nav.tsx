import Link from "next/link";
import { useState, Fragment } from "react";
import { MdSearch } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { BsBag } from "react-icons/bs";
import { bagItemAtom, userAtom } from "@/store";
import { useAtom } from "jotai";

export const Nav = () => {
	const [hamburger, setHamburger] = useState(false);
	const closeHamburger = () => setHamburger(false);
	const [bag] = useAtom(bagItemAtom);
	const [user] = useAtom(userAtom);

	return (
		<nav className="border-b py-3 sm:py-5 w-10/12 mx-auto mb-5">
			<div className="flex items-center justify-between">
				<div className="flex gap-x-3 items-center">
					<button
						onClick={() => setHamburger((prevState) => !prevState)}
						className="lg:hidden">
						{hamburger ? <RxCross2 /> : <AiOutlineMenu />}
					</button>
					<Link href={"/"} className="mr-5 text-2xl font-extrabold">
						sneakers
					</Link>
					<div className="hidden lg:flex gap-x-5">
						<Links />
					</div>
				</div>

				<Transition appear show={hamburger} as={Fragment}>
					<Dialog as="div" className="relative z-10" onClose={closeHamburger}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<div className="fixed inset-0 bg-black bg-opacity-70" />
						</Transition.Child>

						<div className="fixed top-0 left-0 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center  text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95">
									<Dialog.Panel className=" w-[65vw] transform overflow-hidden h-screen bg-white pl-4 text-left align-middle shadow-xl transition-all">
										<button onClick={closeHamburger} className="mt-4">
											<img src="images/icon-close.svg" alt="Close Menu" />
										</button>

										<button
											onClick={closeHamburger}
											className="flex flex-col mt-5 gap-y-3 w-full text-left">
											<Links />
										</button>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>

				<div className="flex items-center ">
					<div className="w-1/2 mr-3 hidden sm:block">
						<input
							type="text"
							placeholder="Search"
							className="border border-gray-500 relative py-1 px-2 rounded-md w-full text-sm"
						/>
						{/* <MdSearch className='absolute 0' /> */}
					</div>

					<Link href={"/bag"} className="mr-7 flex items-center relative justify-center">
						<BsBag className="w-6 h-6 " />
						<span className="text-sm text-gray-900 absolute mt-[.35rem]">{bag.length}</span>
					</Link>
					{
						<Link href={"/login"}>
							{user ? (
								<div className="aspect-square rounded-full w-8">
									<img src="images/image-avatar.png" alt="avatar" />
								</div>
							) : (
								<span>Login</span>
							)}
						</Link>
					}
				</div>
			</div>
		</nav>
	);
};

const Links = () => {
	return (
		<>
			<Link href={"/collections"} className="nav-item">
				Collections
			</Link>
			<Link href={"/men"} className="nav-item">
				Men
			</Link>
			<Link href={"/women"} className=" nav-item">
				Women
			</Link>
			<Link href={"/about"} className="nav-item">
				About
			</Link>
			<Link href={"/contact"} className="nav-item">
				Contact
			</Link>
		</>
	);
};
