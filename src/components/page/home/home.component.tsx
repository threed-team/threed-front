'use client';

import IssuCardComponent from './components/IssueCard';
import AllCardcomponent from './components/AllCard';
import Filteromponent from './components/Filter';
import UserStateomponent from './components/UserState';
import styles from './home.module.scss';

export default function HomeComponent() {
  return (
    <main className={styles.inner}>
      {/* start */}
      {/* title - 가장 많이 읽은 글 */}
      <div className={styles.main_header}> 
        <h2><span className={styles.ico_fire}></span>가장 많이 읽은 글</h2>
        <div className={styles.date_list}>
          <select name="date" id="date-select">
            <option value="week">일주일</option>
          </select>
        </div>
      </div>
      <IssuCardComponent /> {/* 인기있는는 카드 모음 */}
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