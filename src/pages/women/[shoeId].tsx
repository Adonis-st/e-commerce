import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAtom } from "jotai";
import { bagItemAtom, BagItem, isLoadingAtom, userAtom } from "../../store";
import { RxCross1 } from "react-icons/rx";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineLoading3Quarters, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BagModal } from "../../components/BagModal";
import { ShoeSizeModal } from "../../components/ShoeSizeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ReviewModal } from "../../components/ReviewModal";

export default function WomenSingleShoePage({ singleShoe }: any) {
	const router = useRouter();
	const shoeId = router.query.boardId as string;

	const [selectedShoe, setSelectedShoe] = useState(0);
	const [noSizeSelected, setNoSizeSelected] = useState(false);
	const [, setBag] = useAtom(bagItemAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [displayBagModal, setDisplayBagModal] = useState(false);
	const [displayShoeSizeModal, setDisplayShoeSizeModal] = useState(false);
	const [displayReviewModal, setDisplayReviewModal] = useState(false);
	const [user] = useAtom(userAtom);

	const reviewsExample = {
		title: "Came faster than expected",
		stars: 3,
		userName: "Kris730160096",
		date: "Dec 16, 2022",
		message:
			"I ordered these because a family member asked for them for Christmas. After my order was complete, I noticed the estimated delivery date went through to Dec 29th and it appeared they would not arrive before Christmas. After spending about an hour on the issue, they were unable to cancel the order and unable to offer rush shipping. So, today, I planned to going to the mall to buy them, but was notified a shipment was 'out for delivery'. It had Nike's name on the tracking. Indeed, it turned out tehy were delivered today, 12/16 in plenty of time for Christmas. So, the estimated delivery time given was way, way off.I will update my review after my family member wears the shoes and lets me know how they like them.",
		like: 0,
		disLike: 0,
	};

	const { data } = useQuery({
		queryKey: ["singleShoe"],
		// queryFn: getShoes,
		initialData: singleShoe,
		refetchOnWindowFocus: false,
	});

	const { title, brand, price, sizes, mainImage } = data.attributes;

	const { url } = mainImage.data.attributes.formats.thumbnail;
	const imageUrl = process.env.NEXT_PUBLIC_STRAPI_IMG;

	const selectShoe = (shoeSize: number) => {
		setSelectedShoe(shoeSize);
		setNoSizeSelected(false);
	};

	const addToBag = () => {
		if (selectedShoe === 0) {
			return setNoSizeSelected(true);
		} else {
			const newBagItem: BagItem = {
				id: singleShoe.id,
				brand,
				name: title,
				image: imageUrl + url,
				price,
				quantity: 1,
				size: selectedShoe,
			};
			setBag((prev) => [...prev, newBagItem]);
			setTimeout(() => {
				setDisplayBagModal(true);
			}, 200);
		}
	};

	const writeReview = () => {
		if (!user) {
			setDisplayReviewModal(true);
		} else {
			return alert("Please sign in");
		}
	};

	return (
		<div className="w-[90%] mx-auto">
			{displayBagModal && <BagModal setDisplayBagModal={setDisplayBagModal} />}
			{displayShoeSizeModal && (
				<ShoeSizeModal setDisplayShoeSizeModal={setDisplayShoeSizeModal} />
			)}
			{displayReviewModal && <ReviewModal setDisplayReviewModal={setDisplayReviewModal} />}
			<span>{brand}</span>
			<span>{title}</span>
			<div>
				<img src={`${imageUrl}${url}`} alt="" />
			</div>

			<div className="text-[.82rem] mt-5 mb-2 font-light">
				<span className="font-medium">SIZE: </span> Please select
				{/* <button className='underline' onClick={() => setDisplayShoeSizeModal(true)}>
					Size Chart
				</button> */}
			</div>

			<div className="flex mb-5">
				{sizes?.map((shoe: any) => {
					const { id, shoeSizes: shoeSize, quantity } = shoe;
					return (
						<button
							key={id}
							type="button"
							onClick={() => selectShoe(shoeSize)}
							disabled={!quantity}
							className={`${
								selectedShoe === shoeSize ? "border-black" : "border-gray-300"
							} border py-[.65rem] w-[66px] text-gray-900 text-center rounded-md hover:border-black disabled:bg-gray-200 disabled:text-opacity-25 disabled:pointer-events-none mr-4 `}>
							{shoeSize}
						</button>
					);
				})}
			</div>
			{noSizeSelected && (
				<div className="border border-red-500 flex items-center px-4 justify-between rounded-lg py-4 text-sm text-red-500 mb-5 font-light">
					<div className=" flex items-center">
						<BiErrorCircle className="mr-4 w-6 h-6" />
						<span>Please select a size.</span>
					</div>
					<button onClick={() => setNoSizeSelected(false)}>
						<RxCross1 className="text-gray-800 w-4 h-4" />
					</button>
				</div>
			)}
			<button type="button" onClick={() => addToBag()} className="btn-primary mb-8">
				Add to Bag
			</button>

			<div className="border-t-2 pt-5">
				<div>
					<h3 className="text-xl font-semibold">Customer Reviews</h3>
					<div className="mt-3">Reviews &#40;{133}&#41;</div>
					<span>Stars</span>

					<button className="btn-secondary my-5" onClick={() => writeReview()}>
						Write a Review
					</button>

					<div className="mt-5 text-sm">
						<h4 className="font-semibold">{reviewsExample.title}</h4>
						<div className="flex items-center mt-1">
							<span className="inline-flex mr-4">
								<AiFillStar />
								<AiFillStar />
								<AiFillStar />
								<AiOutlineStar />
								<AiOutlineStar />
							</span>
							<span className="font-light">
								{reviewsExample.userName}-{reviewsExample.date}
							</span>
						</div>
						<div className="mt-2">
							<p className="leading-6">{reviewsExample.message}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async ({ params }: any) => {
	const { shoeId } = params;
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/shoes/${shoeId}?populate=%2A`
	);

	return {
		props: {
			singleShoe: response.data.data,
		},
	};
};
