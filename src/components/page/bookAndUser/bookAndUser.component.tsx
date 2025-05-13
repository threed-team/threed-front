'use client';

import AllCardcomponent from './components/AllCard';
import styles from './bookAndUser.module.scss';

export default function BookAndUserComponent() {
  return (
    <main className={styles.inner}>
      {/* start */}
      {/* title - MY 북마크 */}
      <div className={styles.main_header}> 
        <h2><span className={styles.ico_heart}></span>MY 북마크</h2>
      </div>
      <div className={styles.main_header}>
        <h2><span className={styles.ico_mypage}></span>MY PAGE</h2>
      </div>
      <AllCardcomponent /> {/* 필터링 된 카드 모음 */}
      {/* end */}
    </main>
  );