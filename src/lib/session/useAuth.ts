// types/auth.ts
export interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
    hardware_no?: string;
    [key: string]: any;
}

export interface TokenResponse {
    token: string;
    user: User;
}

export async function getToken(code: string): Promise<TokenResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/google/callback?code=${code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({ code }),
    });

    if (!response.ok) {
        throw new Error("Failed to exchange Google OAuth code for token");
    }

    const data = await response.json();
    return {
        token: data.token,
        user: data.user,
    };
}
