'use client';

import styles from "./postWrite.module.scss";
import dynamic from 'next/dynamic';
import HashtagInput from './components/hashTag.componant';
import FieldSelector from './components/fileSelector.componant';
import { useWrite } from './hooks/useWrite';
import { useRef, useState } from 'react';

const WriteContent = dynamic(() => import('./components/writeContent.component'), { ssr: false });

export default function WriteComponent() {
    const { submit } = useWrite();

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setHashtags] = useState<string[]>([]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';

        submit({ title, content, field, skills });
    };

    return (
        <div className={styles.write_main}>
            <h2>
                <span className={styles.img_box}></span><span>새 글 작성</span>
            </h2>
            <form>
                <ul className={styles.write_list}>
                    <li>
                        <label>제목</label>
                        <input type="text" id="write-title" ref={titleRef} placeholder="제목을 입력해주세요" />
                    </li>
                    <li>
                        <ul>
                            <li>
                                <label>해시태그</label>
                                <HashtagInput onChange={setHashtags} />
                            </li>
                            <li>
                                <label>분야</label>
                                <FieldSelector onChange={setField} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.write_txt}>내용</div>
                        <WriteContent editorRef={editorRef} />
                    </li>
                    <li>
                        <div className={styles.btn_box}>
                            <button className={styles.return}>목록</button>
                            <button className={styles.submit} onClick={handleSubmit}>등록</button>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    );
}
