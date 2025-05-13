import styles from "./postView.module.scss";
import ListMainLeft from "./components/listMainLeft.component";

export default function ViewComponent() {
    return (
        <div className={styles.inner}>
            <h2 className={styles.main_h2}>
                Excited to share my latest tech project! #codinglife
            </h2>
            <ul className={styles.write_list}>
                <li>
                    <ListMainLeft imageSrc="/images/view-robot.png" />
                </li>
                <li></li>
            </ul>
        </div>
    );
}