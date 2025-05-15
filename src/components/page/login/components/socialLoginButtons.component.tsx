import React from "react";
import Link from "next/link";
import styles from "./socialLoginButtons.module.scss";
import Image from "next/image";

export default function SocialLoginButtons() {
  return (
    <ul className={styles.social_buttons}>
      <li>
        <Link
          href="/auth/google"
          className={`${styles.login_btn} ${styles.google_btn}`}
        >
          <Image
            width={30}
            height={30}
            src="/images/ico_google.png"
            alt="Google 로그인"
          />
          Google로 로그인
        </Link>
      </li>
      <li>
        <Link
          href="/auth/kakao"
          className={`${styles.login_btn} ${styles.kakao_btn}`}
        >
          <Image
            width={30}
            height={30}
            src="/images/ico_kakao.png"
            alt="Kakao 로그인"
          />
          Kakao로 로그인
        </Link>
      </li>
      <li>
        <Link
          href="/auth/github"
          className={`${styles.login_btn} ${styles.github_btn}`}
        >
          <Image
            width={30}
            height={30}
            src="/images/ico_github.png"
            alt="Github 로그인"
          />
          Github로 로그인
        </Link>
      </li>
    </ul>
  );
}
