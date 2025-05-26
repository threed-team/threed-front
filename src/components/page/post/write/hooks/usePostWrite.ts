'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams } from 'next/navigation';

export function usePostWrite() {
    const { id } = useParams();
    const initialPostId = id ? Number(id) : 1;

    const [postId, setPostId] = useState<number>(initialPostId);
    const [isPostReady, setIsPostReady] = useState<boolean>(postId !== 1);

    const { submit } = useWrite();
    const { post, loading, error } = usePost(postId, 'member', isPostReady);

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();

    // ✅ 썸네일 URL을 위한 상태 (미리보기용)
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

    // 🔄 post 데이터가 있을 경우 초기값 반영
    useEffect(() => {
        if (post) {
            if (titleRef.current) titleRef.current.value = post.title;
            if (editorRef.current) {
                editorRef.current.getInstance().setMarkdown(post.content);
            }

            setField(post.field);            // ✅ 분야
            setSkills(post.skills);          // ✅ 기술 스택
        }
    }, [post]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';

        submit(postId, { title, content, field, skills, image });
        setIsPostReady(true);
    };

    return {
        postId,
        setPostId,
        post,
        loading,
        error,
        titleRef,
        editorRef,
        setField,
        setSkills,
        handleSubmit,
        setImage,
        field,
        skills,
        image,
        thumbnailUrl, // ✅ 외부에서 img 보여줄 때 사용 가능
    };
}
