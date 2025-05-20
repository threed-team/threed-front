// app/api/auth/callback/route.ts
import { createSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    // 백엔드에서 받은 토큰 및 사용자 정보
    const { access_token, refresh_token, user } = body;

    // 세션 저장
    await createSession({
        tokens: {
            accessToken: access_token,
            refreshToken: refresh_token
        },
        userData: user
    });

    // 프론트엔드로 리디렉션
    return NextResponse.json({ success: true });
}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestOptions = AxiosRequestConfig;

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'https://dev-api.threed.site',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: true,
});

// 요청 인터셉터: Access Token 설정
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API 요청 함수
export async function apiClient<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance({
        url: endpoint,
        ...options,
    });

    console.log('response', response);
    return response.data;
}
