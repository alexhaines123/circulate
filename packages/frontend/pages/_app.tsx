import { amplifyConfig } from "@/lib/amplifyLib";
import "@/styles/globals.css";
import { Amplify, Auth } from "aws-amplify";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

Amplify.configure(amplifyConfig);

type Props = { amplifyConfig: typeof amplifyConfig };

export default function App({
  Component,
  pageProps,
  amplifyConfig,
}: AppProps & Props) {
  useEffect(() => {
    console.log("amplifyConfig", amplifyConfig);
    Amplify.configure(amplifyConfig);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Component {...pageProps} />
    </main>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      amplifyConfig,
    },
  };
}
