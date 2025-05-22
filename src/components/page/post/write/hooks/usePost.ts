import { useState, useEffect } from 'react';
import { api } from '@lib/api/api';  // API 클라이언트 import


interface Post {
    id: number;
    title: string;
    content: string;
}

export function usePost(postId: number | undefined, type: 'company' | 'member') {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!postId || !type || postId === 1) return;

        const fetchPost = async () => {
            setLoading(true);
            try {
                const url = `/api/v1/${type}-posts/${postId}`;
                const data = await api.get<Post>(url);
                setPost(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, type]);

    return { post, loading, error };
}
