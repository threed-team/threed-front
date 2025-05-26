'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams } from 'next/navigation';

export function usePostWrite() {
    const { id } = useParams();
    const postId = id ? Number(id) : undefined;

    const { submit } = useWrite(postId);
    const { post, loading, error } = usePost(postId, 'member');

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>(); // ✅ 이미지 파일 상태 추가

    // 🔄 post 데이터가 있을 경우 초기값 주입
    useEffect(() => {
        if (post) {
            if (titleRef.current) titleRef.current.value = post.title;
            if (editorRef.current)
                editorRef.current.getInstance().setMarkdown(post.content);
        }
    }, [post]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';
        submit({ title, content, field, skills, image }); // ✅ 이미지 포함하여 전달
    };

    return {
        postId,
        post,
        loading,
        error,
        titleRef,
        editorRef,
        setField,
        setSkills,
        handleSubmit,
        setImage, // ✅ 외부에서 setImage 사용 가능하게
    };
}
