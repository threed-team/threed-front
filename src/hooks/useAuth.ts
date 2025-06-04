import { clearAccessToken as clearToken, getAccessToken, setAccessToken } from '@lib/session/useAuth';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const isInitialMount = useRef(true);

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
        if (isInitialMount.current) {
            isInitialMount.current = false;
            setIsAuthenticated(null);
        }

        let token = getAccessToken();

        if (!token) {
            try {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    token = getAccessToken();
                }
            } catch (error) {
                console.error('토큰 갱신 중 오류 발생:', error);
            }
        }

        const newAuthState = !!token;

        if (isAuthenticated !== newAuthState) {
            setIsAuthenticated(newAuthState);
        }
    }, [refreshAccessToken, isAuthenticated]);

    useEffect(() => {
        checkAuth();

        const onFocus = () => checkAuth();
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
