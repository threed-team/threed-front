'use client';

import styles from './postView.module.scss';
import ListMainLeft from './components/listMainLeft.component';
import ListMainRight from './components/listMainRight.component';
import useView from './hooks/useView';
import Loading from '@lib/loading/full.component';
import Image from 'next/image';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function ViewComponent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const postId = Number(params?.id);
    const type = (searchParams?.get('type') as 'company' | 'member') ?? 'company';

    const { post, loading, error } = useView(postId, type);

    if (!loading && error) {
        router.replace('/');
        return null;
    }

    if (loading) return <Loading />;
    if (!post) return (
        <div className={styles.card_no_Data}>
            <Image
                src={'/images/ico_warning.png'}
                width={50}
                height={50}
                alt="warning"
            />
            <p className={styles.warning_text}>데이터가 없습니다</p>
        </div>
    );

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
                        type={type}
                    />
                </li>
                <li>
                    <ListMainRight
                        write={post.author.name}
                        views={post.viewCount}
                        hearts={post.bookmarkCount}
                        list="/"
                        before={post.previousId ? `${post.previousId}` : "#"}
                        after={post.nextId ? `${post.nextId}` : "#"}
                        company={post.author.imageUrl}
                        postId={post.id}
                        isBookmarked={post.isBookmarked}
                        type={type}
                    />
                </li>
            </ul>
        </main>
    );
}
