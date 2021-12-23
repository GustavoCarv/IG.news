import { GetStaticProps } from "next";
import Head from "next/head";
import SubscribeButton from "../components/subscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";


// Existem 3 formas de se fazer uma chamada de API: Client-side (SSR), Server-side (SSG) e Static (SSR + SSG)

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | IG.MainNews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span> React </span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>
              for{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.amount)} 
              {' '}month
            </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K9uQKEXM6gUOAmn2sE87L0u", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
