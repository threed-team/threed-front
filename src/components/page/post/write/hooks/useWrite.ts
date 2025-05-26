import { useCallback } from "react";
import { api } from "@lib/api/api";
import { useRouter } from "next/navigation";
import axios from "axios";

interface WriteFormData {
    title: string;
    content: string;
    field: string;
    skills: string[];
    image?: File; // 이미지 파일 추가
}

export function useWrite(postId?: number) {
    const router = useRouter();

    const submit = useCallback(
        async (data: WriteFormData) => {
            try {
                const isEmpty = (text: string) => !text || text.trim() === "";

                // 유효성 검사
                if (isEmpty(data.title)) {
                    alert("제목을 입력해주세요.");
                    return;
                }
                if (data.title.length > 100) {
                    alert("제목의 텍스트가 너무 많습니다. (최대 100자)");
                    return;
                }
                if (isEmpty(data.content)) {
                    alert("본문을 입력해주세요.");
                    return;
                }
                if (data.content.length > 10000) {
                    alert("본문의 텍스트가 너무 많습니다. (최대 10,000자)");
                    return;
                }

                let id = postId;
                const isForcedNewPost = postId === 1;

                if (postId && !isForcedNewPost) {
                    try {
                        const check = await api.get(`/api/v1/member-posts/${postId}`);
                        console.log("✅ 게시물 존재 확인:", check);
                    } catch (error) {
                        alert("❌ 게시물이 존재하지 않습니다.");
                        return;
                    }
                }

                // 새 글 생성
                if (!id || isForcedNewPost) {
                    const response = await api.post<{ postId: number }>(
                        "/api/v1/member-posts"
                    );
                    id = response.postId;
                    console.log("✅ 새 글 postId:", id);
                }

                let imageUrl = "";

                // ✅ 이미지 presignedUrl 요청 및 업로드
                if (data.image) {
                    const uploadInfo = await api.post<{
                        presignedUrl: string;
                        fileUrl: string;
                    }>(`/api/v1/member-posts/${id}/images`);

                    await axios.put(uploadInfo.presignedUrl, data.image, {
                        headers: { "Content-Type": data.image.type },
                    });

                    imageUrl = uploadInfo.fileUrl;
                    console.log("✅ 이미지 업로드 완료:", imageUrl);
                }

                // 본문 저장
                const payload = {
                    title: data.title,
                    content: data.content,
                    field: data.field,
                    skills: data.skills,
                    thumbnailImageUrl: imageUrl, // 썸네일로 활용
                };

                const method = isForcedNewPost || !postId ? "post" : "patch";
                const detailResponse = await api[method](
                    `/api/v1/member-posts/${id}`,
                    payload
                );

                console.log("✅ 게시글 저장 완료:", detailResponse);
                alert("✅ 게시물이 저장되었습니다.");
                router.push(`/post/view/${id}?type=member`);
            } catch (err) {
                console.error("❌ 저장 실패:", err);
                alert("❌ 게시물 저장 중 오류가 발생했습니다.");
            }
        },
        [postId, router]
    );

    return { submit };
}
