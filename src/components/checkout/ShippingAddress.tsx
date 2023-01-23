import { useState } from "react";
import { states } from "@/data/checkout";
import { number } from "zod";

export const ShippingAddress = () => {
	const handleChange = (e: any) => {
		setShippingForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handlePhoneNumber = (e: any) => {
		const formattedPhoneNumber = formatPhoneNumber(e.target.value);
		setShippingForm((prevState) => ({
			...prevState,
			phoneNum: formattedPhoneNumber,
		}));
	};

	const formatPhoneNumber = (value: any) => {
		if (!value) return value;
		const phoneNumber = value.replace(/[^\d]/g, "");
		if (phoneNumber.length < 4) return phoneNumber;
		if (phoneNumber.length < 7) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
	};

	const [shippingForm, setShippingForm] = useState({
		firstName: "",
		lastName: "",
		address: "",
		address2: "",
		state: "",
		zipCode: "",
		city: "",
		email: "",
		phoneNum: "",
	});

	const { firstName, lastName, address, address2, zipCode, state, city, email, phoneNum } =
		shippingForm;

	const [completedShippingForm, setCompletedShippingForm] = useState(false);
	const handleBlur = () => {};

	return (
		<div>
			<div className="flex justify-between">
				<h3 className="text-2xl font-semibold">Shipping Address </h3>
				{completedShippingForm && (
					<button
						type="button"
						onClick={() => setCompletedShippingForm(false)}
						className="text-sm underline">
						Change
					</button>
				)}
			</div>
			<form className=" flex flex-col mt-3 border-b border-gray-300 pb-8">
				{!completedShippingForm ? (
					<div className="flex flex-col">
						<div className="floating-form-border">
							<input
								type="text"
								name="firstName"
								id="firstName"
								value={firstName}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="firstName" className="floating-label">
								First Name
							</label>
						</div>

						<div className="floating-form-border">
							<input
								type="text"
								name="lastName"
								id="lastName"
								value={lastName}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="lastName" className="floating-label">
								Last Name
							</label>
						</div>

						<div className="floating-form-border">
							<input
								type="text"
								name="address"
								id="address"
								value={address}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="address" className="floating-label">
								Address Line 1
							</label>
						</div>

						<div className="floating-form-border">
							<input
								type="text"
								name="address2"
								id="address2"
								value={address2}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="address2" className="floating-label">
								Address Line 2 &#40;Optional&#41;
							</label>
						</div>

						<div className="floating-form-border">
							<input
								type="text"
								name="zipCode"
								id="zipCode"
								inputMode="numeric"
								pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
								value={zipCode}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="zipCode" className="floating-label">
								ZIP Code
							</label>
						</div>

						<div className="floating-form-border">
							<select
								name="state"
								id="state"
								value={state}
								onChange={handleChange}
								className="floating-select">
								<option>Select</option>
								{states.map((state) => {
									return <option value={state[1]}>{state[0]}</option>;
								})}
							</select>
							<label htmlFor="state" className="floating-label">
								State
							</label>
						</div>

						<div className="floating-form-border">
							<input
								type="text"
								name="city"
								id="city"
								value={city}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="city" className="floating-label">
								City
							</label>
						</div>

						<div className="floating-form-border">
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="email" className="floating-label">
								Email
							</label>
						</div>

						<div className="floating-form-border">
							<input
								type="text"
								name="phoneNum"
								id="phoneNum"
								value={phoneNum}
								onChange={handlePhoneNumber}
								// onBlur={handleBlur}
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								placeholder=" "
								className="floating-input"
							/>
							<label htmlFor="phoneNum" className="floating-label">
								Phone Number
							</label>
						</div>
						<button
							type="button"
							onClick={() => setCompletedShippingForm(true)}
							className="btn-primary mt-4">
							Continue
						</button>
					</div>
				) : (
					<div className="border-2 border-black p-6 mt-2 rounded-lg text-sm font-medium">
						<div>
							<span>
								{firstName} {"  "}
							</span>
							<span>{lastName}</span>
						</div>
						<span className="block">{address}</span>
						<span>
							{city}, {"  "}
						</span>
						<span>{state}</span> {"  "}
						<span>{zipCode}</span>
						<span className="block">{email}</span>
						<span className="block">{phoneNum}</span>
					</div>
				)}
			</form>
		</div>
	);
};
