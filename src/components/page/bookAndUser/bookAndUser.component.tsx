'use client';

import { useEffect } from 'react';
import usePageData from './hooks/usePosts';
import AllCardcomponent from './components/AllCard';
import { useProd } from '@hooks/usePosts';
import styles from './bookAndUser.module.scss';

interface BookAndUserProps {
  type: 'bookmark' | 'mypage';
}

export default function BookAndUserComponent({ type }: BookAndUserProps) {
  const { posts, icon, title } = usePageData(type);
  const { initAllProd, allProdList } = useProd();

  useEffect(() => {
    if (posts && posts.length > 0) {
      const converted = {
        elements: posts,
        pageNumber: 1,
        pageSize: posts.length,
        totalCount: posts.length,
        totalPage: 1,
      };
      initAllProd(converted);
    }
  }, [posts, initAllProd]);

  return (
    <main className={styles.inner}>
      <div className={styles.main_header}>
        <h2>
          <span className={styles[icon]}></span>
          {title}
        </h2>
      </div>

      <AllCardcomponent data={allProdList.elements} />
    </main>
  );
}
