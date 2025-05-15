'use client';

import styles from "./postWrite.module.scss";
import dynamic from 'next/dynamic';

const WriteContent = dynamic(() => import('./components/writeContent.component'), {
    ssr: false,  // 서버 사이드 렌더링 끄기
});

export default function WriteComponent() {
    return (
        <div className={styles.write_main}>
            <h2>
                <span className={styles.img_box}></span><span>새 글 작성</span>
            </h2>
            <form>
                <ul className={styles.write_list}>
                    <li>
                        <label>제목</label>
                        <input type="text" id="write-title" placeholder="제목을 입력해주세요" />
                    </li>
                    <li>
                        <ul>
                            <li>
                                <label>해시태그</label>
                                <div className={styles.write_hashtag_box}>
                                    <span className={styles.tag_item}>#JAVA</span>
                                    <span className={styles.tag_item}>#REACT</span>
                                    <input type="text" id="write-hashtag" placeholder="기술 최대 2개 태그" />
                                </div>
                            </li>
                            <li>
                                <label>분야</label>
                                <div className={styles.write_hashtag_box}>
                                    <span className={styles.tag_item}>#AI</span>
                                    <div className={styles.select_box}>
                                        <select id="write-field">
                                            <option value="AI">AI</option>
                                            <option value="Back">Back</option>
                                            <option value="Front">Front</option>
                                            <option value="Dev-Ops">Dev Ops</option>
                                            <option value="DB">DB</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="Collab-Tool">Collab Tool</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.write_txt}>내용</div>
                        <WriteContent />
                    </li>
                    <li>
                        <div className={styles.btn_box}>
                            <button className={styles.return}>목록</button>
                            <button className={styles.submit}>등록</button>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    );
}
