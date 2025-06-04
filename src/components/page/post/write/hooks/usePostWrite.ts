'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams, useRouter } from 'next/navigation';

export function usePostWrite() {
    const { id } = useParams();
    const router = useRouter();

    const postId = id ? Number(id) : 0;

    const [currentPostId, setPostId] = useState<number>(postId);

    const { submit } = useWrite();
    const { post, loading, error } = usePost(
        currentPostId,
        'member',
        currentPostId > 0, // fetch는 수정일 때만
    );

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
        thumbnailUrl,
    };
}
