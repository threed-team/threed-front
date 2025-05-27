'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams } from 'next/navigation';

export function usePostWrite() {
    const { id } = useParams();
    // "1"은 새 글 작성일 때 사용하는 고정값
    const isEditMode = id !== '1';
    const initialPostId = isEditMode ? Number(id) : 0;

    const [postId, setPostId] = useState<number>(initialPostId);
    const [isPostReady] = useState<boolean>(isEditMode);
    const [isNewPost, setIsNewPost] = useState<boolean>(!isEditMode);

    const { submit } = useWrite();
    const { post, loading, error } = usePost(postId, 'member', isPostReady);

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();
    const [thumbnailUrl] = useState<string | null>(null);

    const didInit = useRef(false);
    useEffect(() => {
        if (!didInit.current && post) {
            didInit.current = true;
            setIsNewPost(false);
            if (titleRef.current) {
                titleRef.current.value = post.title;
            }
            if (editorRef.current) {
                editorRef.current.getInstance().setMarkdown(post.content);
            }
            setField(post.field);
            setSkills(post.skills);
        }
    }, [post]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';

        const newPostId = await submit(postId, { title, content, field, skills, image }, isNewPost);

        if (newPostId) {
            const redirectUrl = `/post/view/${newPostId}?type=member`;
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 10);
            return;
        }
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
        thumbnailUrl,
    };
}
