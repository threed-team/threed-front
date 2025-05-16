'use client';

import styles from './listMainRight.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import useBookmark from '../hooks/useBook';
import { useState, useEffect, useRef } from 'react';

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

export default function ListMainRight({ write, views, hearts, list, before, after, company, postId, isBookmarked }: ListRightProps) {
    const { bookmarked, toggleBookmark } = useBookmark(postId, isBookmarked);

    const [heartCount, setHeartCount] = useState(hearts);
    const prevBookmarkedRef = useRef(isBookmarked); // 이전 상태 기억

    useEffect(() => {
        // bookmarked 상태가 바뀔 때 heartCount를 업데이트
        if (bookmarked !== prevBookmarkedRef.current) {
            setHeartCount((prev) => prev + (bookmarked ? 1 : -1));
            prevBookmarkedRef.current = bookmarked;
        }
    }, [bookmarked]);

    const handleBookmark = async () => {
        await toggleBookmark(); // 서버 요청 처리
        // 이후 상태 변경은 useEffect에서 처리
    };

    const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('복사되었습니다!');
        } catch (err) {
            console.error('복사 실패:', err);
            alert('복사에 실패했습니다.');
        }
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
