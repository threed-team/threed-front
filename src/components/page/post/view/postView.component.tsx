'use client';

import styles from './postView.module.scss';
import ListMainLeft from './components/listMainLeft.component';
import ListMainRight from './components/listMainRight.component';
import useView from './hooks/useView';
import Loading from '@lib/loading/full.component';
import { useParams } from 'next/navigation';

export default function ViewComponent() {
    const params = useParams();
    const postId = Number(params?.id);

    const { post, loading, error } = useView(postId); // 동적 ID 사용

    if (loading) return <Loading />;
    if (error) return <p>에러 발생!</p>;
    if (!post) return <p>데이터가 없습니다.</p>;
    console.log('초기 북마크 상태:', post.isBookmarked);
    return (
        <main className={styles.inner}>
            {/* 제목 공통 */}
            <h2 className={styles.main_h2}>{post.title}</h2>
            <ul className={styles.write_list}>
                {/* 왼쪽 컴포넌트 */}
                <li>
                    <ListMainLeft
                        title={post.title}
                        text={post.content}
                        date={new Date(post.createdAt).toLocaleDateString('ko-KR')}
                        link={post.sourceUrl}
                        imageSrc={post.thumbnailImageUrl}
                    />
                </li>
                {/* 오른쪽 컴포넌트 */}
                <li>
                    <ListMainRight
                        write={post.company.name}
                        views={post.viewCount}
                        hearts={post.bookmarkCount}
                        list="/"
                        before={post.previousId ? `${post.previousId}` : "#"}
                        after={post.nextId ? `${post.nextId}` : "#"}
                        company={post.company.logoImageUrl}
                        postId={post.id}
                        isBookmarked={post.isBookmarked}
                    />
                </li>
            </ul>
        </main>
    );
}
