import { useState, useEffect, useRef } from 'react';
import { api } from '@lib/api/api';

interface Author {
    name: string;
    imageUrl: string;
    id: number;
}

interface Post {
    id: number;
    title: string;
    content: string;
    thumbnailImageUrl: string;
    author: Author;
    viewCount: number;
    createdAt: string;
    sourceUrl: string;
    bookmarkCount: number;
    isBookmarked: boolean;
    nextId: number | null;
    previousId: number | null;
}

export default function usePost(postId: number, type: 'company' | 'member') {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    const hasFetched = useRef(false); // ✅ 중복 호출 방지용 플래그

    useEffect(() => {
        if (!postId || !type) return;

        if (hasFetched.current) return; // ✅ 이미 호출했다면 무시
        hasFetched.current = true;

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
