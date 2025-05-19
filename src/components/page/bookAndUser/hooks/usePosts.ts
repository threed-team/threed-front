import { useEffect, useState } from 'react';
import { api } from '@lib/api/api';

interface Post {
    id: number,
    title: string,
    thumbnailImageUrl: string
    field: string,
    viewCount: number,
    company: string
    member: string
    skills: string
    createdAt: string
}

export default function usePageData(type: 'bookmark' | 'mypage') {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response: Post[];

                if (type === 'bookmark') {
                    response = await api.get<Post[]>('/api/v1/bookmarks?page=1&size=20'); // 북마크 전용 API
                    console.log(response)
                    setTitle('MY 북마크');
                    setIcon('ico_heart');
                } else {
                    response = await api.get<Post[]>('/api/v1/members/posts'); // 마이페이지 전용 API
                    setTitle('MY PAGE');
                    setIcon('ico_mypage');
                }
                console.log('성공 입니다.')

                setPosts(response);
            } catch (err) {
                console.error(err);
                setError(err);
                console.log('error 입니다.')
            } finally {
                setLoading(false);
                console.log('finally 입니다.')
            }
        };

        fetchData();
    }, [type]);

    return { posts, icon, title, error, loading };
}
