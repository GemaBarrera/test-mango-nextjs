import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Mango logo"
          width={180}
          height={38}
          priority
        />
        <p>Welcome to my Next.js test! ❤️ Thank you for the oportunity!</p>
        <p>Please, click on the buttons below to access the exercises.</p>
        <div className={styles.ctas}>
          <Link className={styles.primary} href="/exercise1">
            Exercise 1
          </Link>
          <Link className={styles.primary} href="/exercise2">
            Exercise 2
          </Link>
        </div>
      </main>
    </div>
  );
}
