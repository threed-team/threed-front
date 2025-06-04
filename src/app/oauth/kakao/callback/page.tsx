// app/login/[provider]/redirect/page.tsx
'use client'

import Loading from '@lib/loading/full.component';
import { getToken, SocialProvider } from '@lib/session/useAuth';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginRedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");


    useEffect(() => {
        if (code) {
            getToken(SocialProvider.Kakao, code)
                .then(({ accessToken }) => {
                    if (accessToken != null) {
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
    }, [code, router]);

    return <Loading />;
}