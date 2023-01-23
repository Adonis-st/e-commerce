import { useState } from "react";
import { cardTypes, months, years } from "@/data/checkout";

export const Payment = () => {
	const [paymentForm, setPaymentForm] = useState({
		cardType: "",
		cardNumber: "",
		month: "",
		year: "",
	});

	const { cardNumber, cardType, month, year } = paymentForm;

	return (
		<div className="mt-5 ">
			<h3 className="text-2xl font-semibold">Payment</h3>
			<div>
				<form className="flex flex-col gap-y-2">
					<div className="floating-form-border">
						<select name="cardType" id="cardType" className="floating-select ">
							<option>Select</option>
							{cardTypes.map((cardType) => {
								return <option value={cardType}>{cardType}</option>;
							})}
						</select>
						<label htmlFor="cardType" className="floating-label">
							Card Type
						</label>
					</div>

					<div className="floating-form-border">
						<input
							type="text"
							name="cardNumber"
							id="cardNumber"
							value={cardNumber}
							// onChange={handleChange}
							// onBlur={handleBlur}
							placeholder=" "
							className="floating-input"
						/>
						<label htmlFor="cardNumber" className="floating-label">
							Card Number
						</label>
					</div>

					<div className="flex  gap-x-6">
						<div className="floating-form-border w-full">
							<select name="month" id="month" className="floating-select ">
								<option>Select</option>
								{months.map((month) => {
									return <option value={month}>{month}</option>;
								})}
							</select>
							<label htmlFor="cardType" className="floating-label">
								Month
							</label>
						</div>

						<div className="floating-form-border w-full">
							<select name="year" id="year" className="floating-select ">
								<option>Select</option>
								{years.map((year) => {
									return <option value={year}>{year}</option>;
								})}
							</select>
							<label htmlFor="year" className="floating-label">
								Year
							</label>
						</div>
					</div>

					<button type="button" className="px-2 py-3 mt-4 bg-black text-white rounded-xl">
						Continue to Order Review
					</button>
				</form>
			</div>
		</div>
	);
};
