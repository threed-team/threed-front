'use client';

import styles from "./postWrite.module.scss";
import dynamic from 'next/dynamic';
import HashtagInput from './components/hashTag.componant'
import FieldSelector from './components/fileSelector.componant'


const WriteContent = dynamic(() => import('./components/writeContent.component'), {
    ssr: false,  // 에러가 자꾸 나와서 서버 사이드 렌더링 끄기
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
                                <HashtagInput />
                            </li>
                            <li>
                                <label>분야</label>
                                <FieldSelector />
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
