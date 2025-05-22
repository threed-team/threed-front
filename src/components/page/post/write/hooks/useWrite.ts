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

export function useWrite(postId?: number) {
    const router = useRouter();

    const submit = useCallback(async (data: WriteFormData) => {
        try {
            const isEmpty = (text: string) => !text || text.trim() === '';
            // 제목 유효성 검사
            if (isEmpty(data.title)) {
                alert('제목을 입력해주세요.');
            } else if (isEmpty(data.content)) {
                alert('제목을 입력해주세요.');
                return;
            }
            let id = postId;

            const isForcedNewPost = postId === 1;

            if (postId && !isForcedNewPost) {
                try {
                    const check = await api.get(`/api/v1/member-posts/${postId}`);
                    console.log('✅ 해당 postId의 게시물 존재 확인됨:', check);
                } catch (error) {
                    console.error('❌ 해당 postId의 게시물이 존재하지 않습니다:', error);
                    alert('❌ 게시물이 존재하지 않아 수정할 수 없습니다.');
                    return;
                }
            }

            if (!id || isForcedNewPost) {
                const response = await api.post<{ postId: number }>('/api/v1/member-posts');
                id = response.postId;
                console.log('✅ 새 글 생성 postId:', id);
            } else {
                console.log('✏️ 기존 글 수정 postId:', id);
            }

            const payload = {
                title: data.title,
                content: data.content,
                field: data.field,
                skills: data.skills,
            };

            const method = isForcedNewPost || !postId ? 'post' : 'patch';
            const detailResponse = await api[method](`/api/v1/member-posts/${id}`, payload);

            console.log('✅ 본문 저장 완료:', detailResponse);
            alert('✅ 게시물이 저장되었습니다.');
            router.push(`/post/view/${id}?type=member`);
        } catch (err) {
            console.error('❌ 저장 실패:', err);
            alert('❌ 게시물 저장 중 오류가 발생했습니다.');
        }
    }, [postId, router]);

    return { submit };
}

