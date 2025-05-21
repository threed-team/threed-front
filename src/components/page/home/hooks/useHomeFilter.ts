import { useEffect, useState } from 'react';
import { useProd } from '@hooks/useCardPosts';
import { api } from '@lib/api/api';



// 

interface Post {
    id: number,
    title: string,
    thumbnailImageUrl: string,
    field: string,
    viewCount: number,
    company: {
        name: string,
        logoImageUrl: string
    },
    member: {
        nickname: string,
        profileImageUrl: string
    },
    skills: string[],
    createdAt: string
}

interface PostResponse {
    elements: Post[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPage: number
}

export default function usePageData(type: 'company' | 'member', condition: 'WEEK' | 'MONTH') {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);
    const { initAllProd } = useProd();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let response: PostResponse;
                // 인기 글 리스트 API
                if (type === 'company') {
                    response = await api.get<PostResponse>(`/api/v1/company-posts/popular?condition=${condition}`);
                } else {
                    response = await api.get<PostResponse>(`/api/v1/member-posts/popular?condition=${condition}`);
                }

                setPosts(response.elements);
                initAllProd(response);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, condition, initAllProd]);

    return { posts, error, loading };
}