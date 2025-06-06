'use client';

import styles from './postView.module.scss';
import ListMainLeft from './components/listMainLeft.component';
import ListMainRight from './components/listMainRight.component';
import useView from './hooks/useView';
import Loading from '@lib/loading/full.component';
import Image from 'next/image';
import IssuCardComponent from '@components/page/m/home/components/IssueCard';
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
                        skills={post.skills}
                        field={post.field}
                    />
                </li>
                <li>
                    <ListMainRight
                        write={post.author.name}
                        views={post.viewCount}
                        hearts={post.bookmarkCount}
                        before={post.previousId ? `${post.previousId}` : "#"}
                        after={post.nextId ? `${post.nextId}` : "#"}
                        company={post.author.imageUrl}
                        postId={post.id}
                        isBookmarked={post.isBookmarked}
                        isMyPost={post.isMyPost}
                        type={type}
                    />
                </li>
            </ul>
            {/* title - 가장 많이 읽은 글 */}
            <div className={styles.main_header}>
                <h2><span className={styles.ico_fire}></span><span>가장 많이 읽은 글</span></h2>
            </div>
            <div className={styles.issueCardOverride}>
                <IssuCardComponent type={type} />
            </div>
        </main>
    );
}
