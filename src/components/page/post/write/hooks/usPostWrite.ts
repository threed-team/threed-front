'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams } from 'next/navigation';

export function usePostWrite() {
    const { id } = useParams();
    const postId = id ? Number(id) : undefined;
    const isNewWriteMode = postId === 1;

    const { submit } = useWrite(postId);

    // 🔧 조건적으로 usePost 호출
    const postQuery = !isNewWriteMode && postId ? usePost(postId, 'member') : null;
    const post = postQuery?.post || null;
    const loading = postQuery?.loading || false;
    const error = postQuery?.error || null;

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);

    // 🔄 post 데이터가 있을 경우 초기값 주입
    useEffect(() => {
        if (post) {
            if (titleRef.current) titleRef.current.value = post.title;
            if (editorRef.current) editorRef.current.getInstance().setMarkdown(post.content);
        }
    }, [post]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';
        submit({ title, content, field, skills });
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
    };
}
