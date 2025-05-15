'use client';

import { useState } from 'react';
import styles from './listMainRight.module.scss';
import Link from 'next/link';


interface ListRightProps {
    write: string;
    views: number;
    hearts: number;
}

export default function ListMainRight({ write, views, hearts }: ListRightProps) {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked((prev) => !prev);
    };

    return (
        <>
            <div className={styles.right_card_box}>
                <div className={styles.main_right_card}>
                    <h3>
                        <span className={styles.img_box}>
                            <i className={styles.writer_img}></i>
                        </span>
                        <span>{write}</span>
                    </h3>
                    <div className={styles.card_list}>
                        <div className={styles.card_list_second}>
                            <button onClick={toggleLike}>
                                <span
                                    className={`${styles.heart_box} ${liked ? styles.active : ''}`}
                                ></span>
                                <p>{hearts}</p>
                            </button>
                            <button>
                                <span className={styles.view_box}></span>
                                <p>{views}</p>
                            </button>
                        </div>
                        <ul className={styles.navi_list}>
                            <li>
                                <Link href="#">목록</Link>
                            </li>
                            <li>
                                <Link href="#">이전글</Link>
                            </li>
                            <li>
                                <Link href="#">다음글</Link>
                            </li>
                        </ul>
                        <div className={styles.share_btn}>
                            <a href="#">
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
