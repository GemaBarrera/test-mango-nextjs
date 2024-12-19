"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";
import {
  Footer,
  FooterNavigationWrapper,
  Header,
  NavigationContainer,
} from "./layout.styles";

export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = `
  ${pathname.slice(1).charAt(0).toUpperCase()}${pathname.slice(2)}
  `;
  const isExercise1 = pathname == "/exercise1";

  return (
    <div className={styles.page}>
      <Header>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="Mango logo"
            width={100}
            height={100}
            priority
          />
        </Link>
        <h3>{title}</h3>
      </Header>
      <main>{children}</main>
      <Footer className={styles.footer}>
        <FooterNavigationWrapper>
          <NavigationContainer>
            <Link
              href={isExercise1 ? "/" : "/exercise1"}
              style={{ textDecoration: "none" }}
            >
              <Image
                className={styles.logo}
                src="/left_arrow.svg"
                alt="Left arrow"
                width={30}
                height={30}
                priority
              />
              {isExercise1 ? <p>Back to home</p> : <p>Back to exercise1</p>}
            </Link>
          </NavigationContainer>
          <NavigationContainer>
            {isExercise1 && (
              <Link href={"/exercise2"} style={{ textDecoration: "none" }}>
                <p>Go to exercise2</p>
                <Image
                  className={styles.logo}
                  src="/right_arrow.svg"
                  alt="Right arrow"
                  width={30}
                  height={30}
                  priority
                />
              </Link>
            )}
          </NavigationContainer>
        </FooterNavigationWrapper>
      </Footer>
    </div>
  );
}
