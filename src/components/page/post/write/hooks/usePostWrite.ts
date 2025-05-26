'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams, useRouter } from 'next/navigation';

export function usePostWrite() {
    const { id } = useParams();
    const router = useRouter();

    const initialPostId = id ? Number(id) : 1;

    const [postId, setPostId] = useState<number>(initialPostId);
    const [isPostReady, setIsPostReady] = useState<boolean>(initialPostId !== 1);
    const [isNewPost, setIsNewPost] = useState<boolean>(initialPostId === 1);

    const { submit } = useWrite();
    const { post, loading, error } = usePost(postId, 'member', isPostReady);

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

    useEffect(() => {
        if (post) {
            setIsNewPost(false);
            if (titleRef.current) titleRef.current.value = post.title;
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
            setPostId(newPostId);
            setIsNewPost(false);
            setIsPostReady(true);

            router.push(`/post/view/${newPostId}?type=member`);
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
