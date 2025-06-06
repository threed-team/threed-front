'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@hooks/useAuth';

export function usePostWrite() {
    const { id } = useParams();
    const router = useRouter();

    const postId = id ? Number(id) : 0;
    const [currentPostId, setPostId] = useState<number>(postId);

    const { isAuthenticated } = useAuth(); // 로그인 여부 체크
    const { submit } = useWrite();

    const { post, loading, error } = usePost(
        currentPostId,
        'member',
        currentPostId > 0, // 수정 모드일 경우에만 fetch
    );

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();

    const didInit = useRef(false);

    useEffect(() => {
        if (!didInit.current && post) {
            didInit.current = true;
            if (titleRef.current) titleRef.current.value = post.title;
            if (editorRef.current) editorRef.current.getInstance().setMarkdown(post.content);
            setField(post.field);
            setSkills(post.skills);
        }
    }, [post]);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.replace('/login');
            return;
        }

        if (post && postId > 0 && !post.isMyPost) {
            alert('본인의 글만 수정할 수 있습니다.');
            router.replace('/');
        }
    }, [isAuthenticated, post, postId, router]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';

        const newPostId = await submit(currentPostId, {
            title,
            content,
            field,
            skills,
            image,
        });

        if (newPostId) {
            router.push(`/post/view/${newPostId}?type=member`);
        }
    };

    return {
        postId: currentPostId,
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
    };
}
