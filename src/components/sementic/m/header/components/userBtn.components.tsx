'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./userBtn.module.scss";
import { useRouter } from "next/navigation";

export default function UserBtnComponent() {
  const [session, setSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.ok)
      .then(setSession)
      .catch(() => setSession(false));
  }, []);

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    setSession(false);
    router.refresh();
  };

  return (
    <div className={styles.nav_icons}>
      <Link href="/post/write/1" className={session ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.write_icon}`}></div>
      </Link>
      <Link href="/login" className={session ? styles.off : styles.on}>
        <div className={`${styles.icon} ${styles.login_icon}`}></div>
      </Link>
      <button
        type="button"
        onClick={logout}
        className={session ? styles.on : styles.off}
      >
        <div className={`${styles.icon} ${styles.ico_logout}`}></div>
      </button>
      <Link href={'/userpage'} className={session ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.ico_mypage}`}></div>
      </Link>
    </div>
  );
}
