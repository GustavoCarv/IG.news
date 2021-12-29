import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

interface SubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session, status } = useSession();

  const handleSubscribe = async () => {
    if (status != "authenticated") {
      signIn("github");
      return;
    }

    try {
      const {
        data: { sessionId },
      } = await api.post<Readonly<{ sessionId: string }>>('/subscribe');
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
    }};

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={() => handleSubscribe()}
    >
      Subscribe now
    </button>
  );
}
