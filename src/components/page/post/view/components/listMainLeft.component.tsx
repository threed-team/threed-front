import styles from './listMainLeft.module.scss';
import Image from 'next/image';

interface ListLeftProps {
    imageSrc: string;
    text: string;
    date: string;
    title: string;
    link: string;
}

export default function ListMainLeft({ text, date, title, link, imageSrc }: ListLeftProps) {
    return (
        <>
            <div className={styles.list_main_top}>
                <h3>
                    <span className={styles.image_wrapper}></span>
                    <span>DEVOTEE 요약</span>
                </h3>
                <p className={styles.list_days}>{date}</p>
            </div>
            <div className={styles.list_main_middle}>
                <p>{text}</p>
            </div>
            <div className={styles.list_main_bottom}>
                <h3>본문보기</h3>
                <div className={styles.list_main_more}>
                    <a href={link}>
                        <div className={styles.more_sum_main}>
                            <div className={styles.more_sum}>
                                <Image src={imageSrc} fill={true} alt="sample" />
                            </div>
                            <div className={styles.more_right}>
                                <div className={styles.more_title}>{title}</div>
                                <div className={styles.more_text}>
                                    {text.length > 100 ? `${text.slice(0, 90)}...` : text}
                                </div>
                                <div className={styles.more_bottom}>더보기 →</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}
