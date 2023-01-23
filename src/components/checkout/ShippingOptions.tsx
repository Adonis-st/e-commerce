import { useState } from "react";
import { shippingOptionAtom } from "@/store";
import { useAtom } from "jotai";

export const ShippingOptions = () => {
	const date = new Date();
	const freeShipping = date.getDate() + 50;
	const premiumShipping = date.getDate();
	const expressShipping = date.getDate();

	const freeShippingDate = new Date(date.setDate(freeShipping)).toLocaleDateString("en-us", {
		weekday: "short",
		month: "short",
		day: "numeric",
	});

	const premiumShippingDate = new Date(date.setDate(premiumShipping)).toLocaleDateString("en-us", {
		weekday: "short",
		month: "short",
		day: "numeric",
	});

	const expressShippingDate = new Date(date.setDate(expressShipping)).toLocaleDateString("en-us", {
		weekday: "short",
		month: "short",
		day: "numeric",
	});

	// const [shippingOptions, setShippingOptions] = useState(freeShippingDate);
	const [shippingOptions, setShippingOptions] = useAtom(shippingOptionAtom);

	const handleOptionChange = (e: any) => setShippingOptions(e.target.value);

	return (
		<div className="mt-10 border-b border-gray-300 pb-12">
			<h3 className="text-2xl font-semibold">Shipping Options</h3>
			<label
				htmlFor="freeShipping"
				className={`${
					shippingOptions === freeShippingDate
						? "border-2 border-black"
						: "border border-gray-400"
				} p-4 border-gray-400 block mt-3 rounded-lg`}>
				<input
					type="radio"
					name="freeShipping"
					id="freeShipping"
					value={freeShippingDate}
					checked={shippingOptions === freeShippingDate}
					onChange={handleOptionChange}
					className="hidden"
				/>
				<span className="block">Free Shipping</span>
				<span className="text-gray-500 font-light block">Arrives by {freeShippingDate}</span>
			</label>

			<label
				htmlFor="premium"
				className={`${
					shippingOptions === premiumShippingDate
						? "border-2 border-black"
						: "border border-gray-400"
				} p-4 border-gray-400 block mt-3 rounded-lg`}>
				<input
					type="radio"
					name="premium"
					id="premium"
					value={premiumShippingDate}
					checked={shippingOptions === premiumShippingDate}
					onChange={handleOptionChange}
					className="hidden"
				/>
				<span className="block">$10.00 Shipping</span>
				<span className="text-gray-500 font-light block">Arrives by {premiumShippingDate}</span>
			</label>

			<label
				htmlFor="express"
				className={`${
					shippingOptions === expressShippingDate
						? "border-2 border-black"
						: "border border-gray-400"
				} p-4 border-gray-400 block mt-3 rounded-lg`}>
				<input
					type="radio"
					name="express"
					id="express"
					value={expressShippingDate}
					checked={shippingOptions === expressShippingDate}
					onChange={handleOptionChange}
					className="hidden"
				/>
				<span className="block">$20.00 Shipping</span>
				<span className="text-gray-500 font-light block">Arrives by {expressShippingDate}</span>
			</label>
		</div>
	);
};
