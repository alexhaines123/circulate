import HeadComponent from "@/components/head";
import NavBar from "@/components/navbar";
import { amplifyConfig } from "@/lib/amplifyLib";
import "@/styles/globals.css";
import { Amplify } from "aws-amplify";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(amplifyConfig);

type Props = { amplifyConfig: typeof amplifyConfig };

export default function App({
  Component,
  pageProps,
  amplifyConfig,
}: AppProps & Props) {
  // useEffect(() => {
  //   Amplify.configure(amplifyConfig);
  // }, []);

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

export async function getServerSideProps() {
  return {
    props: {
      amplifyConfig,
    },
  };
}
