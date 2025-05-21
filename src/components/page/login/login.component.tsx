"use client";

import React from "react";
import Image from "next/image";
import GoogleLoginButtons from "@components/page/login/components/googleLoginButtons.component";
import Header from "@components/sementic/header/header.component.tsx"
import Footer from "@components/sementic/footer/footer.component"
import styles from "./login.module.scss";

export default function LoginComponent() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.login_card}>
          <div className={styles.login_header}>
            <div className={styles.login_img}>
              <Image
                fill={true}
                src="/images/login_logo.png"
                alt="로고"
              />
            </div>
          </div>
          <h2 className={styles.login_title}>소셜 계정 로그인</h2>
          <ul className={styles.social_buttons}>
            <li>
              <GoogleLoginButtons />
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}