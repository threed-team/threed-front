import { useEffect, useState } from 'react';
import { useProd } from '@hooks/useCardPosts';
import { api } from '@lib/api/api';

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

export default function usePageData(type: 'bookmark' | 'mypage') {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);
    const { initAllProd } = useProd();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response: PostResponse;

                if (type === 'bookmark') {
                    response = await api.get<PostResponse>('/api/v1/bookmarks?page=1&size=20');
                    setTitle('MY 북마크');
                    setIcon('ico_heart');
                } else {
                    response = await api.get<PostResponse>('/api/v1/members/posts');
                    setTitle('MY PAGE');
                    setIcon('ico_mypage');
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
    }, [type]);

    return { posts, icon, title, error, loading };
}