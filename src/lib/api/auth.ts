// lib/api/auth.ts
export async function fetchSession(): Promise<any | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/me`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.user;
    } catch {
        return null;
    }
}
