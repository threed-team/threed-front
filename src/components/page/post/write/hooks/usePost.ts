import { useState, useEffect } from 'react';
import { api } from '@lib/api/api';  // API 클라이언트 import


interface Post {
    id: number;
    title: string;
    content: string;
}

export function usePost(
    postId: number | undefined,
    type: 'company' | 'member',
    enabled: boolean = true // ✅ 요청 실행 여부 제어
) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!enabled || !postId || postId === 1 || !type) return; // ✅ enabled로 차단

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
    }, [postId, type, enabled]);

    return { post, loading, error };
}
