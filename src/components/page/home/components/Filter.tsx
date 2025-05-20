// 검색창 및 스킬/분야 필터 버튼 영역
import styles from "./Filter.module.scss"

export default function Filteromponent() {
    return (
        <div className={styles.filter_area}>
            {/* 검색 및 초기화 */}
            <div className={styles.filter_area_top}>
                <form method="get" action="/search" role="search">
                    <input type="search" placeholder="원하는 키워드를 검색해주세요." />
                    <button type="submit"><i className={styles.ico_search}></i></button>
                </form>
                <button type="button" className={styles.reset_btn} id="reset_btn">초기화</button>
            </div>

            {/* 필터링 버튼 모음 */}
            <div className={styles.filter_area_bottom}>
                <ul>
                    <li>
                        <span className={styles.subject_txt}>스킬</span>
                        <button className={styles.active} type="button">JAVA</button>
                        <button type="button">SPRING</button>
                        <button type="button">NEXT.JS</button>
                        <button type="button">REACT</button>
                        <button type="button">JAVASCRIPT</button>
                        <button type="button">NODE.JS</button>
                        <button type="button">TYPESCRIPT</button>
                        <button type="button">기타</button>
                    </li>
                    <li>
                        <span className={styles.subject_txt}>분야</span>
                        <button type="button">AI</button>
                        <button type="button">Back</button>
                        <button type="button">Front</button>
                        <button type="button">Dev Ops</button>
                        <button type="button">DB</button>
                        <button type="button">Mobile</button>
                        <button type="button">Collab Tool</button>
                        <button type="button">기타</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}