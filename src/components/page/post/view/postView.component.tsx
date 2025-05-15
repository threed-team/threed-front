'use client';

import styles from './postView.module.scss';
import ListMainLeft from './components/listMainLeft.component';
import ListMainRight from './components/listMainRight.component';
import useView from './hooks/useView';
// import { useParams } from 'next/navigation';

export default function ViewComponent() {
    // const params = useParams();
    // const postId = Number(params?.id);

    const { post, loading, error } = useView(1); // 동적 ID 사용

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러 발생!</p>;
    if (!post) return <p>데이터가 없습니다.</p>;

    return (
        <main className={styles.inner}>
            <h2 className={styles.main_h2}>{post.title}</h2>
            <ul className={styles.write_list}>
                <li>
                    <ListMainLeft
                        title={post.title}
                        text={post.content}
                        date={new Date(post.createdAt).toLocaleDateString('ko-KR')}
                        link={post.sourceUrl}
                        imageSrc={post.thumbnailImageUrl}
                    />
                </li>
                <li>
                    <ListMainRight
                        write={post.company}
                        views={post.viewCount}
                        hearts={post.bookmarkCount}
                        list="/company-posts"
                        before={post.previousId ? `${post.previousId}` : "#"}
                        after={post.nextId ? `${post.nextId}` : "#"}
                    />
                </li>
            </ul>
        </main>
    );
}
