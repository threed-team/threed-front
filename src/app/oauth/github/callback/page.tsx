'use client'

import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getToken } from '@lib/session/useAuth';

export default function LoginRedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname(); 
    const code = searchParams.get("code");

    let provider: string | undefined = undefined;
    if (pathname) {
        const arr = pathname.split("/");
        
        if (arr.length >= 4) {
            provider = arr[2];
        }
    }

    useEffect(() => {
        if (code && provider) {
            console.log("provider:", provider, "code:", code);
            getToken(provider, code)
                .then(({ token, user }) => {
                    document.cookie = `accessToken=${token}; Path=/`;
                    if (user && user.id) {
                        router.push("/");
                    } else {
                        router.replace("/login");
                    }
                })
                .catch((error) => {
                    console.error("Token exchange failed:", error);
                    router.replace("/login");
                });
        }
    }, [code, provider, router]);

    return (
        <div style={{ textAlign: "center", fontSize: "20px", padding: "100px 0" }}>
            로그인 처리 중...
        </div>
    );
}
