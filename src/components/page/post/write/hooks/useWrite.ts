// hooks/useWrite.ts
'use client';

import { useCallback } from 'react';
import { api } from '@lib/api/api';
import { useRouter } from 'next/navigation';

interface WriteFormData {
    title: string;
    content: string;
    field: string;
    skills: string[];
}

export function useWrite() {
    const router = useRouter();

    const submit = useCallback(async (data: WriteFormData) => {
        try {
            // 1. 임시 글 생성
            const response = await api.post<{ postId: number }>('/api/v1/member-posts');
            const postId = response.postId;
            console.log("생성된 postId:", postId);

            // 2. 본문 전송
            const detailPayload = {
                title: data.title,
                content: data.content,
                field: data.field,
                skills: data.skills,
            };

            console.log("요청 보내기", postId, detailPayload);
            const detailResponse = await api.post(`/api/v1/member-posts/${postId}`, detailPayload);
            console.log('✅ 본문 작성 완료:', detailResponse);
            alert('✅ 게시물이 등록 되었습니다.');

            // 등록 완료 후 페이지 이동
            router.push(`/post/view/${postId}?type=member`);

        } catch (error) {
            console.error("❌ 게시물 등록 중 오류 발생:", error);
            alert('❌ 게시물 등록 중 오류 발생');
        }
    }, [router]);

    return { submit };
}
