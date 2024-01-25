import Head from "next/head";
import type { AppProps } from "next/app";
import "@/styles/globals.css";



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
      <Component  {...pageProps} />
    </>
  );
}
