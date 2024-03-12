import HeadComponent from "@/components/head";
import NavBar from "@/components/navbar";
import { amplifyConfig } from "@/lib/amplifyLib";
import "@/styles/globals.css";
import { Amplify } from "aws-amplify";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "@aws-amplify/ui-react/styles.css";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@notes/functions/src/products/trpc";

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(amplifyConfig);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadComponent title="Circulate" />
      <main className={`${inter.className}`}>
        <div className="mx-auto max-w-screen-lg px-1 prose">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${"https://mq6h0qck02.execute-api.eu-west-2.amazonaws.com"}/trpc`;
    return {
      url,
      /**
       * @link https://tanstack.com/query/v3/docs/react/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(App);
