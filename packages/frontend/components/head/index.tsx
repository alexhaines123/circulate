import Head from "next/head";

type Props = {
  title: string;
  description?: string;
};

export default function HeadComponent({ title, description }: Props) {
  const formattedTitle = `${title} | Circulate`;
  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
