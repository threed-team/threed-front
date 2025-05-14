import styles from './listMainRight.module.scss';
import Image from 'next/image';

interface ListLeftProps {}

export default function ListMainRight() {
    return (
        <>
            <div className={styles.right_card_box}>
                <h3>
                    <span className={styles.image_wrapper}></span>
                    <span>DEVOTEE 요약</span>
                </h3>
            </div>
            <div className={styles.list_main_middle}></div>
            <div className={styles.list_main_bottom}>
                <h3>본문보기</h3>
                <div className={styles.list_main_more}></div>
            </div>
        </>
    );
}
