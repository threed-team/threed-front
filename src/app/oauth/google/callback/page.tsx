'use client'

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getToken } from '@lib/session/useAuth';

export default function LoginRedirectPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {


            getToken(code).then(({ token, user }) => {

                // GET요청으로 받아온 토큰값을 브라우저 쿠키에 저장
                // Path =/를 설정해서 사이트 전체에서 이 쿠키를 사용
                document.cookie = `accessToken=${token}; Path=/`;
                if (user.id) {
                    window.location.href = "/";
                } else {
                    // 하드웨어 정보가 없는 상태 → /serial 페이지로 이동해서 추가 정보 등록 유도
                    //  window.location.replace("/login");
                }
            }).catch((error) => {
                console.error("Token exchange failed:", error);
            });
        }
    }, [code]);

    return <div>로그인 처리 중...</div>;
}