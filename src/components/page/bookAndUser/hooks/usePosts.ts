import { useEffect, useState } from 'react';
import { api } from '@lib/api/api';

interface Post {
    userId: number,
    id: number,
    title: string,
    completed: boolean
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
                    response = await api.get<Post[]>('/todos'); // 북마크 전용 API
                    setTitle('MY 북마크');
                    setIcon('ico_heart');
                } else {
                    response = await api.get<Post[]>('/todos'); // 마이페이지 전용 API
                    setTitle('MY PAGE');
                    setIcon('ico_mypage');
                }

                setPosts(response);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    return { posts, icon, title, error, loading };
}
