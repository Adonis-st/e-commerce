import Link from "next/link";

import { bagItemAtom, fromBagAtom, userAtom } from "@/store";
import { useAtom } from "jotai";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";

export default function BagPage() {
	const router = useRouter();
	const [bag, setBag] = useAtom(bagItemAtom);
	const [user] = useAtom(userAtom);
	const [, setFromBag] = useAtom(fromBagAtom);

	let total = 0;

	const bagItems = bag?.map((item) => item.price * item.quantity);

	for (const value of bagItems) {
		total += value;
	}
	const addToQuantity = (itemIndex: number) => {
		setBag((bagItem) =>
			bagItem.map((item, index) =>
				index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};
	const subToQuantity = (itemIndex: number) => {
		setBag((bagItem) =>
			bagItem.map((item, index) =>
				index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
			)
		);
	};

	const removeItem = (itemIndex: number) => {
		const removedItem = [...bag].filter((item, index) => index !== itemIndex);
		setBag(removedItem);
	};

	const handleCheckout = () => {
		if (!user) {
			setFromBag(true);
		}
		router.push("/checkout");
	};

	return (
		<div className="w-[90%] mx-auto mt-5">
			<div className="border-b border-gray-400 pb-3">
				<h1 className="text-2xl font-bold">Your Bag</h1>
			</div>
			<div className="mt-4">
				{bag.length ? (
					<div>
						{bag?.map((item, index) => {
							return (
								<div key={item.id} className="flex flex-col mb-10">
									<div className="flex">
										<Link href={"/collections"} className="shrink-0">
											<img
												src={item.image}
												alt={item.name}
												className="max-w-full h-32"
											/>
										</Link>
										<div className="flex flex-col">
											<span className="block font-bold">{item.brand}</span>
											<Link href={"/collections"} className="underline text-sm">
												{item.name}
											</Link>
											<span className="font-light block mt-2">Size: {item.size}</span>
										</div>
									</div>

									<div className="flex justify-between">
										<div className="flex border border-gray-900 items-center rounded-md">
											<button
												onClick={() => subToQuantity(index)}
												disabled={item.quantity === 1}
												className="border-r border-gray-900 p-2 disabled:bg-gray-200/75 rounded-l-md disabled:cursor-not-allowed">
												<AiOutlineMinus />
											</button>
											<span className="px-[.9rem]">{item.quantity}</span>
											<button
												onClick={() => addToQuantity(index)}
												className="border-l border-gray-900  p-2 rounded-r-md">
												<AiOutlinePlus />
											</button>
										</div>
										<div className=" ">${(item.price * item.quantity).toFixed(2)}</div>
									</div>
									<div>Shipping</div>
									<div className="flex">
										<button>Move to Favorites</button>
										<button onClick={() => removeItem(index)} className="ml-2 underline">
											Remove
										</button>
									</div>
								</div>
							);
						})}
						<div className="mt-10">SubTotal</div>
						<div>shipping</div>
						<div>
							Pre-Tax Order Total <div>{total.toFixed(2)}</div>
						</div>
						<button
							onClick={() => handleCheckout()}
							className="text-center block w-full bg-black text-white py-2 rounded-md">
							Checkout
						</button>
					</div>
				) : (
					<div>Your Shopping Bag is empty.</div>
				)}
			</div>
		</div>
	);
}
