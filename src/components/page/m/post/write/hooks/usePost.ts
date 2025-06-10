import { useState, useEffect } from 'react';
import { api } from '@lib/api/api';

interface Post {
    id: number;
    title: string;
    content: string;
    field: string;
    skills: string[];
    isMyPost: boolean;
}

export function usePost(
    postId: number | undefined,
    type: 'company' | 'member',
    enabled: boolean = true,
    editMode: boolean = false
) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!enabled || !postId || !type) return;

        const fetchPost = async () => {
            setLoading(true);
            try {
                // 수정 모드일 경우 edit API 사용
                const url = editMode
                    ? `/api/v1/${type}-posts/${postId}/edit`
                    : `/api/v1/${type}-posts/${postId}`;
                const data = await api.get<Post>(url);
                setPost(data);
            } catch (err) {
                console.error("❌ 게시물 조회 중 에러:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, type, enabled, editMode]);

    return { post, loading, error };
}
