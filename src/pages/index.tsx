import Head from "next/head";
import MemberRegistrationForm from '../components/MemberRegistrationForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>会員登録フォーム</title>
        <meta name="description" content="会員登録フォームサンプル" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MemberRegistrationForm />
    </>
  );
}