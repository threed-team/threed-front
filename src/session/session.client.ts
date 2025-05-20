// srd/session/session.client.ts
//import { } form '@hooks/useLogin';

export function getSession(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('access_token');
    }
    return null;
}

export function setAccessTokenToClient(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
    }
}

export function clearAccessTokenFromClient() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
    }
}
