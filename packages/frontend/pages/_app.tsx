import NavBar from "@/components/navbar";
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
    <main className={`${inter.className}`}>
      <div className="mx-auto max-w-screen-lg prose">
        <NavBar />
        <Component {...pageProps} />
      </div>
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
