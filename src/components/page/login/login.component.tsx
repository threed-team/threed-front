"use client";

import React from "react";
import SocialLoginButtons from "@components/page/login/components/socialLoginButtons.component";
import Header from "@components/sementic/header/header.component.tsx"
import Footer from "@components/sementic/footer/footer.component"
import styles from "./login.module.scss";
import Image from "next/image";

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
        <SocialLoginButtons />
      </section>
    </main>

    <Footer />
    </>
  );
}