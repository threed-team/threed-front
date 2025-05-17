'use client';

import styles from './listMainRight.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import useCopy from '../hooks/useCopy';
import useHeart from '../hooks/useHeart';

interface ListRightProps {
    write: string;
    views: number;
    hearts: number;
    list: string;
    before: string;
    after: string;
    company: string;
    postId: number;
    isBookmarked: boolean;
}

export default function ListMainRight({ write, views, list, before, after, company, postId, isBookmarked, }: ListRightProps) {
    // hook 상태 관리
    const { bookmarked, toggleBookmark, heartCount } = useHeart(postId, isBookmarked);
    // 클립보드 복사 훅
    const copyToClipboard = useCopy();
    // 북마크 클릭시 호출 함수
    const handleBookmark = async () => {
        await toggleBookmark();
    };
    // 공유 버튼 클릭시 호출 함수
    const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        copyToClipboard(window.location.href);
    };

    return (
        <>
            <div className={styles.right_card_box}>
                <div className={styles.main_right_card}>
                    <h3>
                        <span className={styles.img_box}>
                            {company?.trim() ? (
                                <div className={styles.more_sum}>
                                    <Image src={company} fill={true} alt="sample" unoptimized />
                                </div>
                            ) : null}
                        </span>
                        <span>{write}</span>
                    </h3>
                    <div className={styles.card_list}>
                        <div className={styles.card_list_second}>
                            <button onClick={handleBookmark}>
                                <span className={`${styles.heart_box} ${bookmarked ? styles.active : ''}`}></span>
                                <p>{heartCount}</p>
                            </button>
                            <button>
                                <span className={styles.view_box}></span>
                                <p>{views}</p>
                            </button>
                        </div>
                        <ul className={styles.navi_list}>
                            <li>
                                <Link href={list}>목록</Link>
                            </li>
                            {before && before !== '#' && (
                                <li>
                                    <Link href={before}>이전글</Link>
                                </li>
                            )}
                            {after && after !== '#' && (
                                <li>
                                    <Link href={after}>다음글</Link>
                                </li>
                            )}
                        </ul>
                        <div className={styles.share_btn}>
                            <a href="#" onClick={handleCopy}>
                                <span className={styles.share_img}></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.button_box}>
                <button className={styles.edit_btn}>수정하기</button>
                <button className={styles.delete_btn}>삭제하기</button>
            </div>
        </>
    );
}
