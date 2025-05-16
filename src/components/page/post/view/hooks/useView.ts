// hooks/useCompanyPost.ts
import { useState, useEffect } from 'react';
import { api } from '@lib/api/api';  // API 클라이언트 import

interface Company {
    name: string;
    logoImageUrl: string;
}

interface CompanyPost {
    id: number;
    title: string;
    content: string;
    thumbnailImageUrl: string;
    company: Company;
    viewCount: number;
    createdAt: string;
    sourceUrl: string;
    bookmarkCount: number;
    isBookmarked: boolean;
    nextId: number | null;
    previousId: number | null;
}

export default function useCompanyPost(postId: number) {
    const [post, setPost] = useState<CompanyPost | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!postId) return;

        const fetchPost = async () => {
            setLoading(true);
            try {
                const data = await api.get<CompanyPost>(`/api/v1/company-posts/${postId}`);
                setPost(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    return { post, loading, error };
}
