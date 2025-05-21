'use client';

import { useEffect } from 'react';
import usePageData from './hooks/usePosts';
import AllCardcomponent from './components/AllCard';
import { useProd } from '@hooks/useCardPosts';
import styles from './bookAndUser.module.scss';

interface BookAndUserProps {
  type: 'bookmark' | 'mypage';
}

// ✅ 타입 확장
type ExtendedPost = ReturnType<typeof usePageData>['posts'][number] & {
  isCompany: boolean;
};

export default function BookAndUserComponent({ type }: BookAndUserProps) {
  const { posts, icon, title } = usePageData(type);
  const { initAllProd, allProdList } = useProd();

  useEffect(() => {
    if (posts && posts.length > 0) {
      // ✅ 'company' → 'isCompany' 정규화 + 타입 단언
      const normalizedPosts: ExtendedPost[] = posts.map(post => ({
        ...post,
        isCompany:
          typeof (post as any).isCompany !== 'undefined'
            ? (post as any).isCompany
            : (post as any).company ?? false,
      }));

      const converted = {
        elements: normalizedPosts,
        pageNumber: 1,
        pageSize: normalizedPosts.length,
        totalCount: normalizedPosts.length,
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
