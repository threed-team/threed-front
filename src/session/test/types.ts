// 타입지정

import { UserData } from "@libraries/auth";

/**
 * 세션 데이터의 기본 인터페이스
 */
export interface TokenType {
    accessToken: string;
    refreshToken: string;
}
export interface SessionData {
    userData: UserData;
    tokens: TokenType;
    createdAt: number;
    updatedAt: number;
    expiresAt: number;
    [key: string]: any;  // 추가 데이터를 위한 인덱스 시그니처
}

/**
 * 세션 스토어의 인터페이스
 */
export interface SessionStore {
    get(sessionId: string): Promise<SessionData | null>;
    set(sessionId: string, data: SessionData): Promise<void>;
    delete(sessionId: string): Promise<void>;
    cleanup?(): Promise<void>;
}