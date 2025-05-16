'use client';

import AllCardcomponent from './components/AllCard';
import usePageData from './hooks/usePosts';
import styles from './bookAndUser.module.scss';

interface BookAndUserProps {
  type: 'bookmark' | 'mypage';
}

export default function BookAndUserComponent({ type }: BookAndUserProps) {

  const { posts, icon, title } = usePageData(type);

  console.log(posts)


  return (
    <main className={styles.inner}>
      {/* start */}
      <div className={styles.main_header}>
        <h2><span className={styles[icon]}></span>{title}</h2>
      </div>

      <AllCardcomponent data={posts} />
      {/* 필터링 된 카드 모음 */}
      {/* end */}
    </main>
  );
};

