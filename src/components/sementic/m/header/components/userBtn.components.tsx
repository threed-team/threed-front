'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './userBtn.module.scss';
import { useAuth } from '@hooks/useAuth';

export default function UserBtnComponent() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className={styles.nav_icons}>
      <Link href="/post/write/1" className={isAuthenticated ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.write_icon}`}></div>
      </Link>
      <Link href="/login" className={!isAuthenticated ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.login_icon}`}></div>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className={isAuthenticated ? styles.on : styles.off}
      >
        <div className={`${styles.icon} ${styles.ico_logout}`}></div>
      </button>
      <Link href="/mypage" className={isAuthenticated ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.ico_mypage}`}></div>
      </Link>
    </div>
  );
}
