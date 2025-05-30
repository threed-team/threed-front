'use client'

import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getToken } from '@lib/session/useAuth';

export default function LoginRedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const code = searchParams.get("code");

    const provider = pathname?.split("/")[2]; // ex: /login/github/redirect → 'github'

    useEffect(() => {
        if (code && provider) {
            getToken(provider, code)
                .then(({ token, user }) => {
                    console.log("✅ token: ", token);
                    console.log("✅ user: ", user);

                    // ✅ 수동 쿠키 저장
                    document.cookie = `accessToken=${token}; Path=/`;

                    if (user?.id) {
                        router.push("/");
                    } else {
                        router.replace("/login");
                    }
                })
                .catch((error) => {
                    console.error("❌ Token exchange failed:", error);
                    router.replace("/login");
                });
        }
    }, [code, provider, router]);

    return (
        <div style={{ textAlign: "center", fontSize: "20px", padding: "100px 0" }}>
            그리뷰 로그인 처리 중...
        </div>
    );
}
