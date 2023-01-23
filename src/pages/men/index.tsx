import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getShoes } from "../../lib/api";

export default function MenPage({ shoes }: any) {
	const { data } = useQuery({
		queryKey: ["men"],
		// queryFn: getShoes,
		initialData: shoes,
		refetchOnWindowFocus: false,
	});

	return (
		<div className="grid grid-cols-2 gap-x-7 w-[90%] mx-auto">
			{data?.data?.map((item: any) => {
				const { title, brand, price } = item.attributes;
				const { url } = item.attributes.mainImage.data.attributes.formats.thumbnail;

				return (
					<Link key={item.id} href={`/men/${item.id}`} className="flex flex-col gap-y-2">
						<img src={`${process.env.NEXT_PUBLIC_STRAPI_IMG}${url}`} alt="" />
						<span className="mt-2">{brand}</span>
						<span className=" text-[.82rem] font-medium tracking-wide">{title}</span>
						<span className="font-semibold text-sm tracking-wider">${price}</span>
					</Link>
				);
			})}
		</div>
	);
}

export const getStaticProps = async () => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/shoes?populate=mainImage&sort=id%3Adesc`
	);

	return {
		props: {
			shoes: response.data,
		},
	};
};
