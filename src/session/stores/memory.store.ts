import { SessionData, SessionStore } from '../types';
import { SessionConfig } from '../config';

/**
 * 메모리 기반 세션 스토어
 */
export class MemoryStore implements SessionStore {
    private sessions: Map<string, SessionData> = new Map();
    private cleanupInterval: NodeJS.Timeout;

    constructor() {
        // 만료된 세션 정리를 위한 인터벌 설정
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, SessionConfig.CLEANUP_INTERVAL);
    }

    async get(sessionId: string): Promise<SessionData | null> {
        const session = this.sessions.get(sessionId);
        if (!session) return null;
        
        if (Date.now() > session.expiresAt) {
            await this.delete(sessionId);
            return null;
        }
        
        return session;
    }

    async set(sessionId: string, data: SessionData): Promise<void> {
        this.sessions.set(sessionId, data);
    }

    async delete(sessionId: string): Promise<void> {
        this.sessions.delete(sessionId);
    }

    async cleanup(): Promise<void> {
        const now = Date.now();
        for (const [sessionId, session] of this.sessions.entries()) {
            if (now > session.expiresAt) {
                await this.delete(sessionId);
            }
        }
    }
}