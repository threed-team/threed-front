'use client';

import styles from './CardBox.module.scss';
import Image from 'next/image';
import Link from "next/link";

interface CardBoxProps {
  imageSrc: string;
  isNew?: boolean;
  title: string;
  languages: string[];
  writer: string;
  views: number;
  date: string;
}

export default function CardBox({
  imageSrc,
  isNew = false,
  title,
  languages,
  writer,
  views,
  date,
}: CardBoxProps) {
  return (
    <li>
      <Link href={'#'} className={styles.card}>
        <div className={styles.card_box_top}>
          <Image 
            src={imageSrc} 
            fill={true}
            alt="sample"
          />
          {isNew && (
            <p className={styles.card_box_label}>
              <span>NEW</span>
            </p>
          )}
        </div>
        <div className={styles.card_box_bottom}>
          <h3 className={styles.card_box_title}>{title}</h3>
          <div className={styles.card_box_lang}>
            {languages.map((lang, index) => (
              <span key={index}>
                <small>{lang}</small>
              </span>
            ))}
          </div>
          <div className={styles.box_bottom_fix}>
            <div className={styles.card_box_writer}>
              <i className={styles.writer_img}></i>
              <b>{writer}</b>
            </div>
            <div className={styles.card_box_info}>
              <div>
                <i className={styles.ico_eyes}></i>
                <span>{views}</span>
              </div>
              <div>
                <i className={styles.ico_calender}></i>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
