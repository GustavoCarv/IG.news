import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn } from 'next-auth/react';


export default function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <>
      <button type="button" className={styles.signInButton}>
        <FaGithub color="#04d361" />
        Your Name Here :)
        <FiX color='737380' className={styles.closeIcon} />
      </button>
    </>
  ) : (
    <>
      <button type="button" className={styles.signInButton} onClick={() => signIn("github") } >
        <FaGithub color="#eba417" />
        Sign In with Github
      </button>
    </>
  );
}
