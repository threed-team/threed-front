import { clearAccessToken as clearToken, getAccessToken, setAccessToken } from '@lib/session/useAuth';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const isFetchingRef = useRef<boolean>(false); // 중복 방지용 ref

    const refreshAccessToken = useCallback(async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/reissue`;
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000
        };

        try {
            const response = await axios.post(url, {}, config);

            if (response.data?.accessToken) {
                setAccessToken(response.data.accessToken);
                return true;
            }

            return false;
        } catch (error) {
            console.error('토큰 갱신 실패:', error);
            return false;
        }
    }, []);

    const checkAuth = useCallback(async () => {
        if (isFetchingRef.current) return; // 요청 중이면 무시
        isFetchingRef.current = true;

        let token = getAccessToken();

        if (!token) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                token = getAccessToken();
            }
        }

        setIsAuthenticated(!!token);
        isFetchingRef.current = false;
    }, [refreshAccessToken]);

    useEffect(() => {
        checkAuth();

        const onFocus = () => {
            if (!isFetchingRef.current) {
                checkAuth();
            }
        };

        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, [checkAuth]);

    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${getAccessToken()}`
                }
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            clearToken();
            setIsAuthenticated(false);
        }
    };

    return {
        isAuthenticated,
        logout
    };
}
