import { cookies } from 'next/headers';
import { SessionConfig } from './config';
import { NextResponse } from 'next/server';

export async function extendSessionInMiddleware(response: NextResponse) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SessionConfig.COOKIE_NAME)?.value;
    
    if (sessionId) {
        const now = Date.now();
        const newExpiryTime = now + SessionConfig.MAX_AGE;

        // 쿠키 만료 시간만 업데이트
        response.cookies.set(SessionConfig.COOKIE_NAME, sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(newExpiryTime),
            path: '/',
            domain: process.env.SESSION_DOMAIN || undefined,
        });
    }

    return response;
}

export async function expireSessionInMiddleware() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SessionConfig.COOKIE_NAME)?.value;
    
    if (!sessionId) {
        return false;
    }
}