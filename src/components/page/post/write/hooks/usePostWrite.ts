'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams } from 'next/navigation';

export function usePostWrite() {
    const { id } = useParams();
    const initialPostId = id ? Number(id) : 1;

    const [postId, setPostId] = useState<number>(initialPostId);
    const [isPostReady, setIsPostReady] = useState<boolean>(postId !== 1); // ✅ 조건부로 true

    const { submit } = useWrite();
    const { post, loading, error } = usePost(postId, 'member', isPostReady); // ✅ enabled 추가

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();

    useEffect(() => {
        if (post) {
            if (titleRef.current) titleRef.current.value = post.title;
            if (editorRef.current) {
                editorRef.current.getInstance().setMarkdown(post.content);
            }
        }
    }, [post]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';

        submit(postId, { title, content, field, skills, image });
        setIsPostReady(true); // ✅ 저장 후 GET 가능하게 전환
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
    };
}
