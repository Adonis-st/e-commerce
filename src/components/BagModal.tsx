import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { bagItemAtom, freeShippingAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { RxCross1 } from "react-icons/rx";

interface Props {
	setDisplayBagModal: (prevState: boolean) => boolean | void;
}

export const BagModal = ({ setDisplayBagModal }: Props) => {
	const router = useRouter();
	const [bag] = useAtom(bagItemAtom);
	const [freeShipping, setFreeShipping] = useAtom(freeShippingAtom);
	const latestBagItem = bag[bag.length - 1];
	const { name, image, brand, price, size, id, quantity } = latestBagItem;
	function closeModal() {
		setDisplayBagModal(false);
	}
	let total = 0;

	const bagItems = bag?.map((item) => item.price * item.quantity);

	for (const value of bagItems) {
		total += value;
	}
	useEffect(() => {
		if (total >= 200) {
			setFreeShipping(true);
		}
	}, [bag]);

	return (
		<>
			<Transition appear show={true} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center sm:p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden sm:rounded-2xl h-screen bg-white p-6 text-left align-middle shadow-xl transition-all">
									<h3 className="text-lg font-semibold leading-6 text-gray-900 flex justify-between mb-6">
										<span> Added to your bag &#40;{quantity}&#41; </span>
										<button onClick={() => closeModal()}>
											<RxCross1 />
										</button>
									</h3>
									<div>
										<div className="mt-2 flex border-b-[1.5px] pb-4 border-gray-300">
											<div className="w-1/3 shrink-0 grow-0 mr-6">
												<img src={image} alt="" className="w-full" />
											</div>
											<div className="flex flex-col gap-y-2">
												<span className="text-sm font-medium">{brand}</span>
												<span className="text-sm ">{name}</span>
												<span className="text-sm mb-1">Size: {size}</span>
											</div>
										</div>

										<div className="mt-4">
											<div className="flex justify-between ">
												<h4>Bag Order Total &#40;{bag.length}&#41;</h4>{" "}
												<span>${total.toFixed(2)}</span>
											</div>

											{freeShipping && <div>Congrats! You get Free Shipping</div>}

											<div className="flex flex-col gap-y-3 mt-6">
												<button
													onClick={() => router.push("/checkout")}
													className="btn-primary">
													Checkout
												</button>
												<button
													onClick={() => router.push("/bag")}
													className="btn-secondary">
													View Bag
												</button>
												<button
													onClick={() => closeModal()}
													className="underline text-sm">
													Continue Shopping
												</button>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
