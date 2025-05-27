<<<<<<< HEAD
'use client'

import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getToken } from '@lib/session/useAuth';

export default function LoginRedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const code = searchParams.get("code");

    const provider = pathname?.split("/")[2];

    useEffect(() => {
        if (code && provider) {
            getToken(provider, code).then(({ token, user }) => {
                document.cookie = `accessToken=${token}; Path=/`;
                if (user?.id) {
                    router.push("/");
                } else {
                    router.replace("/login");
                }
            }).catch((error) => {
                console.error("Token exchange failed:", error);
                router.replace("/login");
            });
        }
    }, [code, provider, router]);

    return <div style={{ textAlign: "center", fontSize: "20px", padding: "100px 0" }}>로그인 처리 중...</div>;
}
=======
// ✅ 파일: src/app/oauth/google/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // URL에서 ?code=... 값을 추출
        const code = new URLSearchParams(window.location.search).get('code');
        console.log('📥 받은 code:', code);

        // code가 없으면 로그인 페이지로 이동
        if (!code) {
            console.error('❌ code 없음. 로그인 페이지로 이동');
            router.push('/login');
            return;
        }

        // code가 있으면 백엔드에 전달하여 JWT 토큰 요청
        fetch(`http://localhost:8080/api/v1/auth/google/callback?code=${code}`, {
            method: 'GET',
            credentials: 'include', // 쿠키를 같이 보내려면 반드시 필요함
        })
            .then((res) => {
                if (!res.ok) throw new Error('❌ 로그인 실패');
                return res.json();
            })
            .then((data) => {
                console.log('✅ 로그인 성공:', data.accessToken);
                router.push('/'); // 로그인 성공 시 홈으로 이동
            })
            .catch((err) => {
                console.error('❌ 로그인 요청 중 에러 발생:', err);
                router.push('/login');
            });
    }, [router]);

    return <p>구글 로그인 처리 중입니다...</p>;
}
>>>>>>> feacher/2
