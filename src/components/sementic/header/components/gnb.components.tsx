import React from "react";
import Link from "next/link";
import styles from "./gnb.module.scss";

export default function GnbComponent() {
  return (
    <div className={styles.nav_menu}>
      <Link href="/company">디스커버리</Link>
      <Link href="/blog">기술블로그</Link>
      <Link href="/bookmark">MY북마크</Link>
    </div>
  );
}