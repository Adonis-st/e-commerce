import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewFormSchema, CreateReviewSchema } from "@/schemas/review.schema";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from "axios";

interface Props {
	setDisplayReviewModal: (prevState: boolean) => boolean | void;
	itemInfo: {
		id: number;
		image: string;
		brand: string;
		title: string;
	};
}

export const ReviewModal = ({ setDisplayReviewModal, itemInfo }: Props) => {
	const closeModal = () => setDisplayReviewModal(false);
	const queryClient = useQueryClient();

	const [hoverRate, setHoverRate] = useState(0);

	const mutation = useMutation({
		mutationFn: (newReview: CreateReviewSchema) => {
			return axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, newReview);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["singleShoe"] });
			closeModal();
		},
	});

	const [reviewForm, setReviewForm] = useState({
		title: "",
		stars: 0,
		userName: "",
		message: "",
	});

	const [formErrors, setFormErrors] = useState({
		title: "",
		stars: "",
		userName: "",
		message: "",
	});

	const handleChange = (e: any) => {
		setReviewForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const result = reviewFormSchema.safeParse(reviewForm);
		if (!result.success) {
			const formattedErrors = result.error.format();
			setFormErrors((prevState) => ({
				...prevState,
				title: formattedErrors.title?._errors.join(", ") || "",
				stars: formattedErrors.stars?._errors.join(", ") || "",
				userName: formattedErrors.userName?._errors.join(", ") || "",
				message: formattedErrors.message?._errors.join(", ") || "",
			}));
		} else {
			mutation.mutate({
				data: {
					title: reviewForm.title,
					stars: reviewForm.stars,
					message: reviewForm.message,
					userName: reviewForm.userName,
					shoe: itemInfo.id,
				},
			});
			setFormErrors((prevState) => ({
				...prevState,
				title: "",
				stars: "",
				userName: "",
				message: "",
			}));
		}
	};

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
								<Dialog.Panel className="w-full max-w-md transform sm:rounded-2xl bg-white pt-6  pb-12 px-4 h-full text-left align-middle shadow-xl transition-all ">
									<div>
										<h3 className="text-lg font-medium leading-6 text-center text-gray-900">
											<span>Write A Review</span>{" "}
										</h3>
										<button
											onClick={() => closeModal()}
											className="absolute top-2 right-2 p-1 text-lg">
											<RxCross1 />
										</button>
									</div>

									<form onSubmit={handleSubmit}>
										<div className="flex items-center mt-5">
											<h4 className="text-lg font-bold">Hi,</h4>
											<input
												type="text"
												name="userName"
												value={reviewForm.userName}
												className="ml-2 input-primary"
												onChange={handleChange}
												placeholder="Nickname *"
											/>
										</div>
										<span className="text-xs form-error-message mt-1">
											{formErrors.userName}
										</span>
										<div className="text-center">
											<img
												src={itemInfo.image}
												alt=""
												className="mx-auto max-w-[205px]"
											/>
											<div className="font-bold">{itemInfo.brand}</div>
											<p>{itemInfo.title}</p>
										</div>
										<div className="text-center text-xl font-bold">
											How would you rate this?
										</div>
										<div
											onMouseLeave={() => setHoverRate(0)}
											className="flex gap-x-1 mt-3  w-fit mx-auto">
											{[...Array(5)].map((item, index) => {
												const givenRating = index + 1;

												return (
													<div key={index}>
														<label
															htmlFor={`rating-${givenRating}-5`}
															onMouseOver={() => setHoverRate(index + 1)}>
															<AiFillStar
																className={`${
																	givenRating <= reviewForm.stars ||
																	givenRating <= hoverRate
																		? "fill-[#000]"
																		: "fill-[rgb(192,192,192)]"
																} w-9 h-9`}
															/>
														</label>
														<input
															type="radio"
															name="rating"
															id={`rating-${givenRating}-5`}
															value={givenRating}
															className="appearance-none"
															onClick={() => {
																setReviewForm((prevState) => ({
																	...prevState,
																	stars: givenRating,
																}));
															}}
														/>
													</div>
												);
											})}
										</div>
										<span className="form-error-message -mt-5">{formErrors.stars}</span>

										<label htmlFor="message" className="block mb-1 mt-10">
											Write a review
										</label>
										<textarea
											name="message"
											id="message"
											value={reviewForm.message}
											onChange={handleChange}
											rows={4}
											placeholder="Tell us what you think"
											className="input-primary resize-none  "
										/>
										<span className="form-error-message">{formErrors.message}</span>
										<label htmlFor="title" className="block mt-8 mb-1">
											Review Title
										</label>
										<input
											name="title"
											id="title"
											value={reviewForm.title}
											onChange={handleChange}
											placeholder="Give your review a title"
											className="input-primary"
										/>
										<span className="form-error-message">{formErrors.title}</span>
										<button type="submit" className="btn-primary mt-8">
											Submit
										</button>
									</form>

									<span className="block"></span>
									<div className="mt-2"></div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
