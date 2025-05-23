// types/auth.ts
export interface User {
    id: number;
    email: string;
    name: string;
    profileImageUrl: string;
    // hardware_no?: string;
    // [key: string]: any;

   
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
        credentials: "include"
        // body: JSON.stringify({ code }),
    });

    console.log(response)
    // if (!response.ok) {
    //     throw new Error("Failed to exchange Google OAuth code for token");
    // }

    console.log('22222')
    const data = await response.json();

    console.log('data :', data)
    return {
        token: data.token,
        user: data.user,
    };
}
