import { useRouter } from "next/router";
import axios from "axios";
import { getShoes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAtom } from "jotai";
import { bagItemAtom, BagItem, isLoadingAtom, userAtom } from "@/store";
import { RxCross1 } from "react-icons/rx";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineLoading3Quarters, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BagModal } from "@/components/BagModal";
import { ShoeSizeModal } from "@/components/ShoeSizeModal";
import { ReviewModal } from "@/components/ReviewModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MenSingleShoePage({ singleShoe }: any) {
	const router = useRouter();
	const shoeId = router.query.shoeId as string;

	const [selectedShoe, setSelectedShoe] = useState(0);
	const [noSizeSelected, setNoSizeSelected] = useState(false);
	const [bag, setBag] = useAtom(bagItemAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [displayBagModal, setDisplayBagModal] = useState(false);
	const [displayShoeSizeModal, setDisplayShoeSizeModal] = useState(false);
	const [displayReviewModal, setDisplayReviewModal] = useState(false);
	const [user] = useAtom(userAtom);

	//delete
	const shoesLength = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const { data } = useQuery({
		queryKey: ["singleShoe"],
		// queryFn: () => getShoes(shoeId),
		initialData: singleShoe,
		refetchOnWindowFocus: false,
	});

	const { brand, price, sizes, mainImage, reviews, title } = data?.attributes;

	const { url } = mainImage.data.attributes.formats.thumbnail;
	const imageUrl = process.env.NEXT_PUBLIC_STRAPI_IMG;

	// console.log(reviews);
	const selectShoe = (shoeSize: number) => {
		setSelectedShoe(shoeSize);
		setNoSizeSelected(false);
	};

	// console.log(bag.find((bagItem) => bagItem.id === 2 && bagItem.size === 9));
	// console.log(bag);
	const addToBag = () => {
		if (selectedShoe === 0) {
			return setNoSizeSelected(true);
		} else {
			const findShoe = bag.find(
				(bagItem) => bagItem.id === singleShoe.id && bagItem.size === selectedShoe
			);

			if (!findShoe) {
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
			} else {
				setBag((prev) =>
					prev.map((item) =>
						item.id === singleShoe.id && item.size === selectedShoe
							? { ...item, quantity: item.quantity + 1 }
							: item
					)
				);
			}
		}
	};

	const writeReview = () => {
		//change
		if (!user) {
			setDisplayReviewModal(true);
		} else {
			return alert("Please sign in");
		}
	};

	const itemInfo = {
		id: singleShoe.id,
		image: imageUrl + url,
		brand,
		title,
	};

	return (
		<div className="w-[90%] mx-auto">
			{displayBagModal && <BagModal setDisplayBagModal={setDisplayBagModal} />}
			{displayShoeSizeModal && (
				<ShoeSizeModal setDisplayShoeSizeModal={setDisplayShoeSizeModal} />
			)}
			{displayReviewModal && (
				<ReviewModal setDisplayReviewModal={setDisplayReviewModal} itemInfo={itemInfo} />
			)}
			<span>{brand}</span>
			<span>{title}</span>

			<h1></h1>
			<div className="h-[40vh]">
				<Swiper
					slidesPerView={1}
					loop={true}
					pagination={{
						dynamicBullets: true,
					}}
					modules={[Pagination]}
					className="mySwiper">
					{shoesLength.map((shoe, index) => {
						return (
							<SwiperSlide key={index}>
								<img src={`${imageUrl}${url}`} alt="" className="test-img" />
							</SwiperSlide>
						);
					})}
				</Swiper>
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

			{/* Reviews */}
			<div className="border-t-2 pt-5">
				<div>
					<h3 className="text-xl font-semibold">Customer Reviews</h3>
					<div className="mt-3">Reviews &#40;{reviews?.data.length}&#41;</div>
					<span>Stars</span>
					<button className="btn-secondary my-5" onClick={() => writeReview()}>
						Write a Review
					</button>

					{reviews?.data.map((review: any) => {
						const { userName, stars, message, publishedAt } = review.attributes;

						const date = new Date(publishedAt).toLocaleDateString("en-us", {
							year: "numeric",
							month: "short",
							day: "numeric",
						});

						return (
							<div key={review.id} className="mt-5 text-sm">
								<h4 className="font-semibold">{title}</h4>
								<div className="flex items-center mt-1">
									<span className="inline-flex mr-4">
										{[...Array(5)].map((item, index) => {
											return (
												<div key={index}>
													{stars < index + 1 ? <AiOutlineStar /> : <AiFillStar />}
												</div>
											);
										})}
									</span>
									<span className="font-light">
										{userName}-{date}
									</span>
								</div>
								<div className="mt-2">
									<p className="leading-6">{message}</p>
								</div>
							</div>
						);
					})}
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
