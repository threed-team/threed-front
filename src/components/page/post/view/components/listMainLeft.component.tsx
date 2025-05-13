import styles from "./listMainLeft.module.scss";
import Image from 'next/image';

// props 받기
export default function ListMainLeft({ imageSrc }: { imageSrc: string }) {
    return (
        <div className={styles.list_main_top}>
            <h3>
                <span className={styles.image_wrapper}>
                    <Image src={imageSrc} alt="sample" fill />
                </span>
                <span></span>
            </h3>
            <p>2025년 04월 30일</p>
        </div>
    );
}
