'use client';

import styles from "./postWrite.module.scss";
import dynamic from 'next/dynamic';
import HashtagInput from './components/hashTag.componant';
import FieldSelector from './components/fileSelector.componant';
import { usePostWrite } from './hooks/usePostWrite';
import Loading from '@lib/loading/full.component';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hooks/useAuth';

const WriteContent = dynamic(() => import('./components/writeContent.component'), { ssr: false });

interface WriteComponentProps {
    isEditMode: boolean;
    postId?: number;
}

export default function WriteComponent({ isEditMode, postId = 0 }: WriteComponentProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuth(); // 로그인 여부 확인

    const {
        setPostId,
        post,
        loading,
        error,
        titleRef,
        editorRef,
        field,
        skills,
        setField,
        setSkills,
        handleSubmit,
    } = usePostWrite();

    if (isAuthenticated === null || loading || (!loading && error)) {
        return <Loading />;
    }

    return (
        <div className={styles.write_main}>
            <h2>
                <span className={styles.img_box}></span>
                <span>{isEditMode ? '글 수정' : '새 글 작성'}</span>
            </h2>
            <form>
                <ul className={styles.write_list}>
                    <li>
                        <label>제목</label>
                        <input
                            type="text"
                            id="write-title"
                            ref={titleRef}
                            placeholder="제목을 입력해주세요"
                        />
                    </li>
                    <li>
                        <ul>
                            <li>
                                <label>해시태그</label>
                                <HashtagInput onChange={setSkills} initialTags={skills} />
                            </li>
                            <li>
                                <label>분야</label>
                                <FieldSelector onChange={setField} initialValue={field} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.write_txt}>내용</div>
                        <WriteContent
                            editorRef={editorRef}
                            initialContent={post?.content || "내용을 입력해주세요."}
                            postId={postId}
                            setPostId={setPostId}
                        />
                    </li>
                    <li>
                        <div className={styles.btn_box}>
                            <button
                                type="button"
                                className={styles.return}
                                onClick={() => router.push('/post/blog')}
                            >
                                목록
                            </button>
                            <button className={styles.submit} onClick={handleSubmit} type="button">
                                {isEditMode ? '수정' : '등록'}
                            </button>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    );
}
