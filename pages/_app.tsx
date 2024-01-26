import Head from "next/head";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { RTCContextProvider } from "@/contexts/RTCcontext";
import { NextUIProvider } from "@nextui-org/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-toastify@9.0.6/dist/ReactToastify.css"
        />
      </Head>
      <RTCContextProvider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </RTCContextProvider>
    </>
  );
}
