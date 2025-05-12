// 마이페이지/로그아웃 버튼 UI
import styles from "./UserState.module.scss"

export default function UserStateomponent() {
    return (
        <div className={styles.user_state}>
            <div className={styles.state_logout}>
                <a href="#"><i className={styles.ico_logout}></i><span>로그아웃</span></a>
            </div>
            <div className={styles.state_mypage}>
                <a href="#"><i className={styles.ico_mypage}></i><span>마이페이지</span></a>
            </div>
        </div>
    )
}