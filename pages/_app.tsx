import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto as FontRoboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const fontRoboto = FontRoboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={fontRoboto.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
