import { bagItemAtom, shippingOptionAtom } from "@/store";
import { useAtom } from "jotai";

export const OrderReview = () => {
	const [bag] = useAtom(bagItemAtom);
	const [shippingOption] = useAtom(shippingOptionAtom);
	return (
		<div className="mt-5 ">
			<h3 className="text-2xl font-semibold">Order Review</h3>
			<div>Arrives by {shippingOption}</div>
			<div className="w-[85%] mx-auto">
				{bag.map((bagItem, index) => {
					return (
						<div key={index} className="flex text-sm mt-4 w-full mx-auto">
							<div className="w-[60px]">
								<img src={bagItem.image} alt="Bag Item Image" />
							</div>
							<div className="ml-4">
								<span className="block">{bagItem.name}</span>
								<div className="mt-1 text-gray-500">
									<span className="block ">Size: {bagItem.size}</span>
									<span className="block">
										Qty: {bagItem.quantity} @ ${bagItem.price}
									</span>
									<span className="block">
										${(bagItem.price * bagItem.quantity).toFixed(2)}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
