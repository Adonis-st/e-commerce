import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "@/components/Nav";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	return (
		<JotaiProvider>
			<QueryClientProvider client={queryClient}>
				<Nav />
				<Component {...pageProps} />
				<Footer />
			</QueryClientProvider>
		</JotaiProvider>
	);
}
