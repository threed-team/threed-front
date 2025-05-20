'use server';

import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { SessionData, SessionStore } from './types';
import { SessionConfig } from './config';
import { MemoryStore } from './stores/memory.store';

// 스토어 인스턴스 생성
const store: SessionStore = new MemoryStore();

/**
 * 새로운 세션 ID 생성
 */
async function generateSessionId(): Promise<string> {
    return randomBytes(32).toString('hex');
}

/**
 * 세션 생성
 */
export async function createSession(data: Pick<SessionData, 'userData' | 'tokens'>): Promise<{ sessionId: string, sessionData: SessionData }> {
    const sessionId = await generateSessionId(); //암호화 된 토큰 가져오기
    const cookieStore = await cookies();
    const now = Date.now();

    const sessionData: SessionData = {
        ...data,
        createdAt: now,
        updatedAt: now,
        expiresAt: now + SessionConfig.MAX_AGE,
    };

    await store.set(sessionId, sessionData);

    cookieStore.set(SessionConfig.COOKIE_NAME, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: now + SessionConfig.MAX_AGE,
        path: '/',
        domain: process.env.SESSION_DOMAIN || undefined,
    });

    return {
        sessionId,
        sessionData
    };
}

/**
 * 전체 세션 데이터 조회
 */
export async function getAllSession(): Promise<SessionData | null> {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SessionConfig.COOKIE_NAME)?.value;

    if (!sessionId) return null;

    const sessionData = await store.get(sessionId);
    return sessionData;
}

/**
 * 특정 키의 세션 데이터 조회
 */
export async function getSession<T>(key: string): Promise<T | null> {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SessionConfig.COOKIE_NAME)?.value;

    if (!sessionId) return null;

    const sessionData: SessionData | null = await store.get(sessionId);

    // sessionData가 null인 경우 체크 추가
    if (!sessionData) return null;

    return sessionData[key] as T ?? null;
}

/**
 * 세션 업데이트
 */
export async function updateSession(data: Partial<SessionData>): Promise<void> {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SessionConfig.COOKIE_NAME)?.value;

    if (!sessionId) throw new Error('No active session');

    const currentSession = await store.get(sessionId);
    if (!currentSession) throw new Error('Session not found');

    const now = Date.now();
    const newExpiryTime = now + SessionConfig.MAX_AGE;

    const updatedSession: SessionData = {
        ...currentSession,
        ...data,
        createdAt: currentSession.createdAt,
        updatedAt: now,
        expiresAt: newExpiryTime
    };

    await store.set(sessionId, updatedSession);
}

/**
 * 세션 삭제
 */
export async function destroySession(): Promise<{ success: boolean }> {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SessionConfig.COOKIE_NAME)?.value;

    if (sessionId) {
        await store.delete(sessionId);
    }

    // NextResponse 대신 단순 객체 반환
    cookieStore.set(SessionConfig.COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
        domain: process.env.SESSION_DOMAIN || undefined,
    });

    return { success: true };
}

/**
 * 세션 검증
 */
export async function validateSession(redirectUrl: string = '/login'): Promise<boolean> {
    const session = await getAllSession();
    if (!session) {
        return false;
    }
    return true;
}
