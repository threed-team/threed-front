import { useState, useEffect } from 'react';
import axios from 'axios';

interface Company {
    name: string;
    logoImageUrl: string;
}

interface CompanyPost {
    id: number;
    title: string;
    content: string;
    thumbnailImageUrl: string;
    company: Company;  // 🔄 수정된 부분
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
                const response = await axios.get<CompanyPost>(
                    `http://192.168.0.32:8080/api/v1/company-posts/${postId}`
                );
                setPost(response.data);
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
