'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { isSession } from '@lib/session/useAuthCheck';
import styles from './gnb.module.scss';

export default function GnbComponent() {
  const [session, setSession] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hasSession = isSession();
    setSession(hasSession);
    setMounted(true);
  }, []);

  if (!mounted) return null; // SSR 중 렌더 방지

  return (
    <div className={styles.nav_menu}>
      <Link href="/company">디스커버리</Link>
      <Link href="/blog">기술블로그</Link>
      <Link
        href="/bookmark"
        className={session ? styles.on : styles.off}
      >
        MY북마크
      </Link>
    </div>
  );
}
