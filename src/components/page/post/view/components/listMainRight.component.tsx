'use client';

import { useState } from 'react';
import styles from './listMainRight.module.scss';
import Link from 'next/link';
import Image from 'next/image';


interface ListRightProps {
    write: string;
    views: number;
    hearts: number;
    list: string;
    before: string;
    after: string;
    companyImage: string;
}

export default function ListMainRight({ write, views, hearts, list, before, after, companyImage }: ListRightProps) {
    const [liked, setLiked] = useState(false);
    const [heartCount, setHeartCount] = useState(hearts); // 좋아요 수 상태 관리

    const toggleLike = () => {
        if (!liked) {
            setHeartCount((prev) => prev + 1); // 좋아요 증가
        } else {
            setHeartCount((prev) => prev - 1); // 좋아요 취소
        }
        setLiked((prev) => !prev); // 상태 토글
    };
    return (
        <>
            <div className={styles.right_card_box}>
                <div className={styles.main_right_card}>
                    <h3>
                        <span className={styles.img_box}>
                            <Image src={companyImage} fill={true} alt="sample" unoptimized />
                        </span>
                        <span>{write}</span>
                    </h3>
                    <div className={styles.card_list}>
                        <div className={styles.card_list_second}>
                            <button onClick={toggleLike}>
                                <span
                                    className={`${styles.heart_box} ${liked ? styles.active : ''}`}
                                ></span>
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
                            <li>
                                <Link href={before}>이전글</Link>
                            </li>
                            <li>
                                <Link href={after}>다음글</Link>
                            </li>
                        </ul>
                        <div className={styles.share_btn}>
                            <a href="#">
                                <span className={styles.share_img}></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div >
            <div className={styles.button_box}>
                <button className={styles.edit_btn}>수정하기</button>
                <button className={styles.delete_btn}>삭제하기</button>
            </div>
        </>
    );
}
