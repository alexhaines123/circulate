import HeadComponent from "@/components/head";
import NavBar from "@/components/navbar";
import { amplifyConfig } from "@/lib/amplifyLib";
import "@/styles/globals.css";
import { Amplify } from "aws-amplify";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { trpc } from "@/lib/trpc";

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(amplifyConfig);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadComponent title="Circulate" />
      <main className={`${inter.className}`}>
        <div className="mx-auto max-w-screen-2xl px-1 prose">
          <div className="lg:mx-8 mx-2">
            <NavBar />
            <div className="my-4">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default trpc.withTRPC(App);
