import { useRouter } from "next/router";
import { userAtom, bagItemAtom } from "../store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MdHelpOutline } from "react-icons/md";
import { ShippingAddress } from "@/components/checkout/ShippingAddress";
import { ShippingOptions } from "@/components/checkout/ShippingOptions";
import { Payment } from "@/components/checkout/Payment";
import { OrderReview } from "@/components/checkout/OrderReview";

export default function CheckoutPage() {
	const router = useRouter();
	const [user] = useAtom(userAtom);
	const [bag] = useAtom(bagItemAtom);

	useEffect(() => {
		if (!bag.length) {
			router.push("/bag");
		}
		if (!user) {
			router.push("/login");
		}
	}, []);

	const shippingFormSchema = z.object({
		firstName: z.string(),
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	if (!bag.length || !user) return null;

	return (
		<div className="w-[90%] mx-auto mt-5 mb-[60vh] ">
			<div className="">
				<ShippingAddress />
				<ShippingOptions />
				<Payment />
				<OrderReview />
			</div>

			<div className="mt-32 flex flex-col">
				<div>
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>$124</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping</span>
						<span>Free</span>
					</div>
					<div className="flex justify-between">
						<span>Estimated tax</span>
						<span>$7.84</span>
					</div>
				</div>
				<div className="mt-10">
					<div className="flex justify-between">
						<span>Order total</span>
						<span>$147.81</span>
					</div>
				</div>
				<button type="button" className="px-2 py-3 mt-4 bg-black text-white rounded-xl">
					Place Order
				</button>
			</div>
		</div>
	);
}
