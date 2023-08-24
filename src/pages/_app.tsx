import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import NextNProgress from "nextjs-progressbar";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <NextNProgress color="#7c3aed" options={{ showSpinner: false }} />
      <Component {...pageProps} className={inter.className} />
    </QueryClientProvider>
  );
}
