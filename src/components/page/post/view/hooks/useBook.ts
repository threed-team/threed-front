'use client';

import { useState } from 'react';
import axios from 'axios';

export default function useBookmark(postId: number, initialState: boolean) {
    const [bookmarked, setBookmarked] = useState<boolean>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const toggleBookmark = async () => {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzQ3MTExMDMwMDg0MDAwMDB9.nia_cJhFWfYgStl_X-3lkVoOWtfrXrM5B_aSy6E2lEw'; // JWT 토큰

        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (!bookmarked) {
                await axios.post('https://dev-api.threed.site/api/v1/bookmarks/', { postId }, {
                    headers: { 'Authorization': token }
                });
            } else {
                await axios.delete(`https://dev-api.threed.site/api/v1/bookmarks/${postId}`, {
                    headers: { 'Authorization': token }
                });
            }

            setBookmarked(!bookmarked);
        } catch (err) {
            console.error('북마크 처리 실패:', err);
            alert('북마크 처리에 실패했습니다.');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { bookmarked, toggleBookmark, loading, error };
}
