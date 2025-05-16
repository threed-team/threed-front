import React from "react";
import Link from "next/link";
import styles from "./userBtn.module.scss";

export default function UserBtnComponent() {
  return (
    <div className={styles.nav_icons}>
      <Link href="/post/write/1">
        <div className={`${styles.icon} ${styles.write_icon}`}></div>
      </Link>
      <Link href="/login">
        <div className={`${styles.icon} ${styles.login_icon}`}></div>
      </Link>
    </div>
  );
}
