'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
import { useProd } from '@hooks/usePosts';
import { } from './hooks/useIssuePosts';
import IssuCardComponent from './components/IssueCard';
import AllCardcomponent from './components/AllCard';
import Filteromponent from './components/Filter';
import UserStateomponent from './components/UserState';
import styles from './home.module.scss';

// type = member
// type = company

export default function HomeComponent() {

  const { posts } = usePageData(type);
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
      {/* start */}
      {/* title - 가장 많이 읽은 글 */}
      <div className={styles.main_header}>
        <h2><span className={styles.ico_fire}></span>가장 많이 읽은 글</h2>
        <div className={styles.date_list}>
          <select name="date" id="date-select">
            <option value="week">일주일</option>
            <option value="week1">1개월</option>
          </select>
        </div>
      </div>
      <IssuCardComponent data={ } /> {/* 인기있는는 카드 모음 */}
      {/* title - 새로운 기술을 확인해보세요 */}
      <div className={styles.main_header}>
        <h2><span className={styles.ico_face}></span>새로운 기술을 확인해보세요.</h2>
      </div>
      <Filteromponent /> {/* 필터 영역역 */}
      <AllCardcomponent /> {/* 필터링 된 카드 모음 */}
      <UserStateomponent /> {/* 오른쪽 고정 user 상태값 */}
      {/* end */}
    </main>
  );
};