'use client';

import styles from "./postWrite.module.scss";
import dynamic from 'next/dynamic';
import HashtagInput from './components/hashTag.componant';
import FieldSelector from './components/fileSelector.componant';
import { usePostWrite } from './hooks/usePostWrite';

const WriteContent = dynamic(() => import('./components/writeContent.component'), { ssr: false });

export default function WriteComponent() {
    const {
        postId,
        post,
        loading,
        error,
        titleRef,
        editorRef,
        setField,
        setSkills,
        handleSubmit
    } = usePostWrite();

    if (loading) return <p>불러오는 중입니다...</p>;
    if (error) return <p>오류 발생: {String(error)}</p>;

    return (
        <div className={styles.write_main}>
            <h2>
                <span className={styles.img_box}></span>
                <span>{postId ? '글 수정' : '새 글 작성'}</span>
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
                                <HashtagInput onChange={setSkills} />
                            </li>
                            <li>
                                <label>분야</label>
                                <FieldSelector onChange={setField} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.write_txt}>내용</div>
                        <WriteContent editorRef={editorRef} initialContent={post?.content || "내용을 입력해주세요."} />
                    </li>
                    <li>
                        <div className={styles.btn_box}>
                            <button className={styles.return}>목록</button>
                            <button className={styles.submit} onClick={handleSubmit}>
                                {postId === 1 ? '등록' : '수정'}
                            </button>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    );
}
