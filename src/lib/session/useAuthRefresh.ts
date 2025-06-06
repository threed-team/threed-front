'use client'

import { useEffect } from "react";

export async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/refresh`, {
            method: "GET",
            credentials: "include", // 서버에 쿠키 전송
        });

        if (!response.ok) throw new Error("토큰 갱신 실패");

        const data = await response.json();
        const newToken = data.token;

        // 새 토큰을 쿠키에 저장
        document.cookie = `accessToken=${newToken}; Path=/`;

        return newToken;
    } catch (error) {
        console.error("리프레시 토큰 요청 실패:", error);
        return null;
    }
}

export function useCheckAuth() {
    useEffect(() => {
        const checkToken = async () => {
            const token = getCookie("accessToken");

            if (!token || isTokenExpired(token)) {
                const refreshedToken = await refreshAccessToken();

                if (!refreshedToken) {
                    // 로그인 페이지로 이동
                    window.location.replace("/login");
                }
            }
        };

        checkToken();
    }, []);
}

// 헬퍼 함수들
function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
}

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true; 
    }
}


// async function fetchProtectedData() {
//     let token = getCookie("accessToken");

//     if (!token || isTokenExpired(token)) {
//         token = await refreshAccessToken();

//         if (!token) {
//             window.location.replace("/login");
//             return;
//         }
//     }

//     const response = await fetch(`/api/protected`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         credentials: "include"
//     });

//     const data = await response.json();
//     return data;
// }
